import * as THREE from "three";

export type PartTone = "body" | "key" | "socket" | "knob";

export type TerminalParts = {
  /** per-vertex part index, or null when the mesh has no index buffer */
  partOf: Int32Array | null;
  counts: Record<PartTone, number>;
  /** true once the colour and roughness attributes are on the geometry */
  painted: boolean;
};

const KEY_MIN_VERTS = 55;
const KEY_MAX_VERTS = 75;
const KEY_MAX_EXTENT = 0.14;

// The four large function keys sit in their own recessed sockets. Those sockets
// are separate parts, and darkening them reads as a seam around the keys.
const SOCKET_MIN_VERTS = 460;
const SOCKET_MAX_VERTS = 500;
const SOCKET_MAX_EXTENT = 0.35;

const enum Kind {
  Body = 0,
  Key = 1,
  Socket = 2,
  Knob = 3,
}

// Each knob is a small cluster of parts: thin discs, pointer bars, and a housing
// whose top and bottom sit symmetrically about the knob axis. The housing shares
// a 55-75 vert count with the keycaps, so shape cannot be used to tell them
// apart; the cluster is tight enough that distance alone works.
const KNOB_CENTERS: [number, number, number][] = [
  [0.94, 0.87, 0.01],
  [0.94, 0.87, -0.219],
];
const KNOB_RADIUS = 0.08;


function classifyComponents(geometry: THREE.BufferGeometry) {
  const position = geometry.getAttribute("position");
  const index = geometry.getIndex();
  if (!position || !index) return null;

  const vertCount = position.count;
  const parent = new Int32Array(vertCount);
  for (let i = 0; i < vertCount; i++) parent[i] = i;

  const find = (a: number): number => {
    let root = a;
    while (parent[root] !== root) root = parent[root];
    while (parent[a] !== root) {
      const next = parent[a];
      parent[a] = root;
      a = next;
    }
    return root;
  };

  for (let t = 0; t < index.count; t += 3) {
    const a = find(index.getX(t));
    const b = find(index.getX(t + 1));
    const c = find(index.getX(t + 2));
    parent[b] = a;
    parent[c] = a;
  }

  // one slot per possible root, indexed by the root vertex index itself
  const min = new Float32Array(vertCount * 3);
  const max = new Float32Array(vertCount * 3);
  const size = new Int32Array(vertCount);
  const rootOf = new Int32Array(vertCount);

  for (let i = 0; i < vertCount; i++) {
    const root = find(i);
    rootOf[i] = root;
    const r = root * 3;

    for (let k = 0; k < 3; k++) {
      const v = position.getComponent(i, k);
      const c = r + k;
      if (size[root] === 0) {
        min[c] = v;
        max[c] = v;
      } else {
        if (v < min[c]) min[c] = v;
        if (v > max[c]) max[c] = v;
      }
    }
    size[root]++;
  }

  const partOf = new Int32Array(vertCount);
  for (let i = 0; i < vertCount; i++) {
    const root = rootOf[i];
    const r = root * 3;
    const extent = Math.max(max[r] - min[r], max[r + 1] - min[r + 1], max[r + 2] - min[r + 2]);
    const verts = size[root];

    const c = [min[r], min[r + 1], min[r + 2]].map((v, k) => v + (max[r + k] - v) / 2);
    const spread = [
      Math.abs(c[0] - KNOB_CENTERS[0][0]),
      Math.abs(c[1] - KNOB_CENTERS[0][1]),
      Math.abs(c[2] - KNOB_CENTERS[0][2]),
    ].reduce((s2, v) => s2 + v * v, 0) ** 0.5;
    const spread2 = [
      Math.abs(c[0] - KNOB_CENTERS[1][0]),
      Math.abs(c[1] - KNOB_CENTERS[1][1]),
      Math.abs(c[2] - KNOB_CENTERS[1][2]),
    ].reduce((s2, v) => s2 + v * v, 0) ** 0.5;

    if (spread < KNOB_RADIUS || spread2 < KNOB_RADIUS) {
      partOf[i] = Kind.Knob;
    } else if (verts >= KEY_MIN_VERTS && verts <= KEY_MAX_VERTS && extent < KEY_MAX_EXTENT) {
      partOf[i] = Kind.Key;
    } else if (verts >= SOCKET_MIN_VERTS && verts <= SOCKET_MAX_VERTS && extent < SOCKET_MAX_EXTENT) {
      partOf[i] = Kind.Socket;
    } else {
      partOf[i] = Kind.Body;
    }
  }

  const counts: Record<PartTone, number> = { body: 0, key: 0, socket: 0, knob: 0 };
  const label = (k: number) =>
    k === Kind.Key
      ? "key"
      : k === Kind.Socket
        ? "socket"
        : k === Kind.Knob
          ? "knob"
          : "body";
  for (let i = 0; i < vertCount; i++) counts[label(partOf[i])]++;

  return { partOf, counts };
}

const cache = new WeakMap<THREE.BufferGeometry, TerminalParts>();

const VERTEX_ROUGHNESS_CACHE_KEY = "retro-terminal-part-roughness";

/**
 * Roughness normally lives on the material, but every part shares one mesh, so
 * the per-vertex value rides in on a custom attribute instead. three still maps
 * `attribute` and `varying` onto GLSL3, so this stays a minimal patch.
 */
export function applyPerVertexRoughness(material: THREE.Material) {
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        "#include <common>\nattribute float aRoughness;\nvarying float vPartRoughness;",
      )
      .replace(
        "#include <begin_vertex>",
        "#include <begin_vertex>\nvPartRoughness = aRoughness;",
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        "#include <common>\nvarying float vPartRoughness;",
      )
      .replace(
        "float roughnessFactor = roughness;",
        "float roughnessFactor = roughness * vPartRoughness;",
      );
  };
  material.customProgramCacheKey = () => VERTEX_ROUGHNESS_CACHE_KEY;
}

/**
 * The terminal ships as one mesh with one material, so parts are separated by
 * index connectivity. Keycaps are the only parts that repeat at a near-constant
 * vertex count and a keycap-sized extent.
 */
export function readTerminalParts(geometry: THREE.BufferGeometry): TerminalParts {
  const cached = cache.get(geometry);
  if (cached) return cached;

  const result = classifyComponents(geometry) ?? {
    partOf: null,
    counts: { body: 0, key: 0, socket: 0, knob: 0 } as Record<PartTone, number>,
  };
  const parts: TerminalParts = { ...result, painted: false };
  cache.set(geometry, parts);
  return parts;
}

export function paintTerminalParts(
  geometry: THREE.BufferGeometry,
  tone: (kind: PartTone) => THREE.Color,
  roughness: (kind: PartTone) => number,
) {
  const parts = readTerminalParts(geometry);
  if (parts.painted) return;
  if (!parts.partOf) return;

  const count = parts.partOf.length;
  const colors = new Float32Array(count * 3);
  const rough = new Float32Array(count);
  const body = tone("body");
  const key = tone("key");
  const socket = tone("socket");
  const knob = tone("knob");

  for (let i = 0; i < count; i++) {
    const kind = parts.partOf[i];
    const color =
      kind === Kind.Key
        ? key
        : kind === Kind.Socket
          ? socket
          : kind === Kind.Knob
            ? knob
            : body;
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
    rough[i] = roughness(
      kind === Kind.Key ? "key" : kind === Kind.Socket ? "socket" : kind === Kind.Knob ? "knob" : "body",
    );
  }

  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aRoughness", new THREE.BufferAttribute(rough, 1));
  parts.painted = true;
}

