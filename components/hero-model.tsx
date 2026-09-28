"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { paintTerminalParts } from "@/components/terminal-parts";
import { createGrainTexture } from "@/components/terminal-surface";
import {
  BODY_COLOR,
  GRAIN_LOW,
  GRAIN_REPEAT,
  GRAIN_SIZE,
  KEY_COLOR,
  KNOB_COLOR,
  MODEL_URL,
  PART_ROUGHNESS,
  SCREEN_COLOR,
  SCREEN_ENV_INTENSITY,
  SCREEN_MESH_NAME,
  SCREEN_METALNESS,
  SCREEN_ROUGHNESS,
  SOCKET_COLOR,
} from "@/components/terminal-palette";

useGLTF.preload(MODEL_URL);

export type TerminalHandle = {
  /** world-space centre of the screen plate, so the camera can aim at it */
  screenCenter: THREE.Vector3;
  /** half-height of the screen plate, used to frame it to fill the viewport */
  screenHalfHeight: number;
  /**
   * half-width of the screen plate along the approach axis. The screen is
   * narrower than a landscape viewport, so height alone leaves the bezel
   * visible at the sides of the end state.
   */
  screenHalfWidth: number;
  /** bounding radius of the whole model, used for the wide framing */
  radius: number;
  /**
    The plate's silhouette in viewport pixels, projected from the live mesh.

    Live rather than measured once: the unit leans towards the cursor, so a
    rectangle sampled at load would be pointing somewhere the screen no longer
    is by the time the entrance tries to land the black on it. Eight corners of
    the plate's own bounding box, through the world matrix, through the camera —
    the silhouette is correct whichever way the body has turned.
  */
  projectScreen: (
    camera: THREE.Camera,
    width: number,
    height: number,
  ) => { x: number; y: number; w: number; h: number } | null;
};

/**
 * Roughness normally lives on the material, but the body, keycaps, sockets and
 * knobs are all one mesh, so the per-part value rides in on a custom attribute.
 * three still maps `attribute` and `varying` onto GLSL3, so the patch stays small.
 */
function patchPerVertexRoughness(shader: { vertexShader: string; fragmentShader: string }) {
  shader.vertexShader = shader.vertexShader
    .replace(
      "#include <common>",
      "#include <common>\nattribute float aRoughness;\nvarying float vPartRoughness;",
    )
    .replace("#include <begin_vertex>", "#include <begin_vertex>\nvPartRoughness = aRoughness;");

  shader.fragmentShader = shader.fragmentShader
    .replace("#include <common>", "#include <common>\nvarying float vPartRoughness;")
    .replace(
      "float roughnessFactor = roughness;",
      "float roughnessFactor = roughness * vPartRoughness;",
    );
}

export default function HeroModel({
  onReady,
}: {
  onReady: (handle: TerminalHandle) => void;
}) {
  const gltf = useGLTF(MODEL_URL);
  const grain = useMemo(() => createGrainTexture(GRAIN_SIZE, GRAIN_LOW), []);

  const scene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;

      // clone(true) shares materials with the cached scene, so style a copy
      const source = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
      const material = (source as THREE.MeshStandardMaterial).clone();

      if (mesh.name === SCREEN_MESH_NAME) {
        material.color.set(SCREEN_COLOR);
        material.roughness = SCREEN_ROUGHNESS;
        material.metalness = SCREEN_METALNESS;
        material.envMapIntensity = SCREEN_ENV_INTENSITY;
      } else {
        material.color.set(0xffffff);
        material.vertexColors = true;
        material.roughness = 1;
        if (grain) material.roughnessMap = grain;
        material.onBeforeCompile = patchPerVertexRoughness;
        material.customProgramCacheKey = () => "terminal-part-roughness";

        paintTerminalParts(
          mesh.geometry,
          (kind) =>
            new THREE.Color(
              kind === "key"
                ? KEY_COLOR
                : kind === "socket"
                  ? SOCKET_COLOR
                  : kind === "knob"
                    ? KNOB_COLOR
                    : BODY_COLOR,
            ),
          (kind) => PART_ROUGHNESS[kind],
        );
      }

      mesh.material = material;
    });

    /*
      Move the model's own bounding-box centre to the origin, here rather than
      with drei's Center. Center measures once and caches, and at the moment it
      runs the primitive has not resolved its geometry yet, so it centres an empty
      box and leaves the model off-frame. Doing it explicitly also means the
      screen metrics below are read in the same space the camera works in.
    */
    clone.updateMatrixWorld(true);
    const origin = new THREE.Box3().setFromObject(clone).getCenter(new THREE.Vector3());
    clone.position.sub(origin);

    return clone;
  }, [gltf.scene, grain]);

  useEffect(() => {
    scene.updateMatrixWorld(true);
    const screen = scene.getObjectByName(SCREEN_MESH_NAME) as THREE.Mesh | undefined;
    if (!screen) return;

    const box = new THREE.Box3().setFromObject(scene);
    const screenBox = new THREE.Box3().setFromObject(screen);
    const size = box.getSize(new THREE.Vector3());
    const screenSize = screenBox.getSize(new THREE.Vector3());
    if (!screen.geometry.boundingBox) screen.geometry.computeBoundingBox();

    const corner = new THREE.Vector3();

    onReady({
      screenCenter: screenBox.getCenter(new THREE.Vector3()),
      screenHalfHeight: screenSize.y / 2,
      screenHalfWidth: screenSize.x / 2,
      radius: Math.hypot(size.x, size.y, size.z) / 2,
      projectScreen(camera, width, height) {
        const local = screen.geometry.boundingBox;
        if (!local || width <= 0 || height <= 0) return null;

        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        for (let i = 0; i < 8; i++) {
          corner.set(
            i & 1 ? local.max.x : local.min.x,
            i & 2 ? local.max.y : local.min.y,
            i & 4 ? local.max.z : local.min.z,
          );
          corner.applyMatrix4(screen.matrixWorld).project(camera);
          if (corner.x < minX) minX = corner.x;
          if (corner.x > maxX) maxX = corner.x;
          if (corner.y < minY) minY = corner.y;
          if (corner.y > maxY) maxY = corner.y;
        }

        return {
          x: ((minX + 1) / 2) * width,
          y: ((1 - maxY) / 2) * height,
          w: ((maxX - minX) / 2) * width,
          h: ((maxY - minY) / 2) * height,
        };
      },
    });
  }, [scene, onReady]);

  useEffect(() => {
    return () => {
      scene.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const material of materials) material.dispose();
      });
      grain?.dispose();
    };
  }, [scene, grain]);

  if (grain) grain.repeat.set(GRAIN_REPEAT, GRAIN_REPEAT);

  return <primitive object={scene} />;
}
