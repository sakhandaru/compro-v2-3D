"use client";

import { Component, useEffect, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useProgress } from "@react-three/drei";
import HeroModel, { type TerminalHandle } from "@/components/hero-model";
import { markSceneReady } from "@/components/scene-ready";
import { writeScreenRect } from "@/components/screen-rect";
import { heroContent } from "@/content/hero";
import {
  AMBIENT_INTENSITY,
  BACK_FILL_INTENSITY,
  CAMERA_LAG,
  ENVIRONMENT_INTENSITY,
  FRONT_FILL_INTENSITY,
  KEY_INTENSITY,
  KEY_POSITION,
  SCREEN_BLEED,
  SIDE_FILL_INTENSITY,
  WIDE_MARGIN_LANDSCAPE,
  WIDE_MARGIN_PORTRAIT,
} from "@/components/terminal-palette";

const FOV = 40;
const HALF_FOV_RAD = (FOV / 2) * (Math.PI / 180);

/*
  The screen's own outward normal, taken from the model rather than guessed. The
  camera rides exactly this axis, so the wide shot is dead on: zero off-axis
  angle, and the terminal reads square instead of subtly skewed.
*/
const SCREEN_AXIS = new THREE.Vector3(1, 0.07, 0).normalize();

/*
  The wide shot sits on the screen normal, not on a hand-picked direction. An
  earlier version used (1, 0.2, 0.05) and that 0.05 in z put the camera 2.86
  degrees off in azimuth, which is small enough to look like an accident and
  large enough that the terminal never quite reads as straight. The elevation is
  inherited from the screen's own 4 degree tilt, so the keyboard deck still
  catches light instead of going flat.
*/
const START_DIRECTION = SCREEN_AXIS.clone();

/**
 * Cursor follow.
 *
 * The amplitude is large for a cursor effect and that is deliberate. The screen is
 * a flat plate pointed straight at the reader, so its apparent width only changes
 * by cos(theta): at seven degrees that is 0.75%, which is nothing. A flat plate
 * turned a few degrees simply does not register as looking at you, no matter how
 * the damping is tuned. The read comes from the housing's side face falling into
 * shadow, and that needs real angle.
 *
 * Still not a swivel: past roughly twenty-five degrees the unit reads as toppling
 * rather than turning, and DESIGN..md 1119 is one bad hover away from the "generic
 * 3D floating object" it warns about.
 */
const FOLLOW_YAW = 0.314; // 18 degrees
const FOLLOW_PITCH = 0.175; // 10 degrees
/** Higher is snappier. Kept soft so the unit has mass rather than snapping. */
const FOLLOW_DAMPING = 3.2;
/**
 * The body leans as well as turns. Rotation alone moves edges around; the lean is
 * what makes it read as attention rather than as a rotating prop. Fractions of the
 * model radius, so it scales with the framing.
 */
const FOLLOW_LEAN_X = 0.075;
const FOLLOW_LEAN_Y = 0.045;

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function clamp01(t: number) {
  return Math.min(1, Math.max(0, t));
}

/**
 * The camera is driven by one scrubbed number rather than by a library tweening
 * the scene. GSAP only ever touches DOM transforms and this single value, which
 * keeps the render loop doing nothing but reading a float.
 */
function Rig({
  driver,
  handle,
  reduced,
  onReady,
}: {
  driver: RefObject<{ t: number }>;
  handle: TerminalHandle | null;
  reduced: boolean;
  onReady: (handle: TerminalHandle) => void;
}) {
  const camera = useThree((state) => state.camera);
  const aspect = useThree((state) => state.size.width / state.size.height);
  /** CSS pixels of the canvas, which is what a viewport rectangle is quoted in */
  const viewport = useThree((state) => state.size);
  const pointer = useThree((state) => state.pointer);
  const position = useRef(new THREE.Vector3());
  const scratch = useRef(new THREE.Vector3());
  const unit = useRef<THREE.Group>(null);
  const [follows, setFollows] = useState(false);

  // No cursor means nothing to follow. On touch this stays off rather than
  // guessing from taps, which would read as the machine flinching.
  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const sync = () => setFollows(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useFrame((_, delta) => {
    if (!handle) return;

    // Lag the travel so the wide framing holds while the type performs, and the
    // push is reserved for the part of the scroll where nothing else is moving.
    const raw = clamp01(reduced ? 0 : driver.current.t);
    const eased = smoothstep(Math.pow(raw, CAMERA_LAG));

    // Fit against whichever axis is tighter. On a portrait viewport the
    // horizontal fov is the smaller one, and using only the vertical one cropped
    // the model off the right edge on mobile.
    const horizontalFov = Math.atan(Math.tan(HALF_FOV_RAD) * aspect);
    const tightest = Math.min(HALF_FOV_RAD, horizontalFov);
    // Room for the type bands above and below. The landscape value is larger
    // because the model's height is the binding constraint there.
    const margin = aspect < 1 ? WIDE_MARGIN_PORTRAIT : WIDE_MARGIN_LANDSCAPE;
    const wide = (handle.radius * margin) / Math.sin(tightest);

    // The end state is a screen that covers the frame, so the screen has to clear
    // both axes. Taking the tighter requirement and bleeding slightly past it
    // crops the bezel off the edges instead of leaving it floating in the room.
    const byHeight = handle.screenHalfHeight / Math.tan(HALF_FOV_RAD);
    const byWidth = handle.screenHalfWidth / Math.tan(horizontalFov);
    const close = Math.min(byHeight, byWidth) * SCREEN_BLEED;

    const widePosition = position.current.copy(START_DIRECTION).multiplyScalar(wide);
    const closePosition = scratch.current
      .copy(handle.screenCenter)
      .addScaledVector(SCREEN_AXIS, close);

    camera.position.lerpVectors(widePosition, closePosition, eased);

    if (unit.current) {
      // Scaled by (1 - eased) so the follow is gone before the camera closes in.
      // The end state has to be a square-on black screen filling the frame, and any
      // leftover tilt would leave a crooked rectangle. The handle's screen centre
      // is measured in the unrotated local space, so the error this introduces
      // only exists while the framing is wide, where a few degrees is invisible.
      const authority = follows && !reduced ? 1 - eased : 0;
      // Frame-rate independent damping, so the feel does not change with fps.
      const blend = 1 - Math.exp(-FOLLOW_DAMPING * delta);
      // The unit faces +X with +Y up. Turning toward the viewer is yaw about Y,
      // nodding is pitch about Z, and the viewer sees +x as world -Z.
      const yaw = FOLLOW_YAW * pointer.x * authority;
      const pitch = FOLLOW_PITCH * pointer.y * authority;
      const leanX = -handle.radius * FOLLOW_LEAN_X * pointer.x * authority;
      const leanY = handle.radius * FOLLOW_LEAN_Y * pointer.y * authority;
      unit.current.rotation.y += (yaw - unit.current.rotation.y) * blend;
      unit.current.rotation.z += (pitch - unit.current.rotation.z) * blend;
      unit.current.position.x += (leanX - unit.current.position.x) * blend;
      unit.current.position.y += (leanY - unit.current.position.y) * blend;
    }

    // Aim at the screen from the start, not at the model's bounding centre. The
    // centre sits below the screen because of the keyboard deck, so aiming there
    // tilted the terminal up and broke the front-on read.
    camera.lookAt(scratch.current.copy(handle.screenCenter));

    /*
      Publish where the plate is on screen, last thing in the frame, so the
      entrance can collapse the black into it. Written every frame rather than
      measured on demand because the body leans with the cursor: a rectangle
      sampled once would be stale by the time it is read.
    */
    const projected = handle.projectScreen(camera, viewport.width, viewport.height);
    if (projected) writeScreenRect(projected.x, projected.y, projected.w, projected.h);
  });

  return (
    <>
      {/* No background colour here on purpose. The canvas is transparent so the
          marquee behind it shows through and the model occludes it. */}
      <directionalLight position={KEY_POSITION} intensity={KEY_INTENSITY} />
      <Environment resolution={256} frames={1} environmentIntensity={ENVIRONMENT_INTENSITY}>
        <Lightformer
          form="rect"
          intensity={FRONT_FILL_INTENSITY}
          position={[7, 5, 6]}
          scale={[10, 8, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={SIDE_FILL_INTENSITY}
          position={[8, 2, 3]}
          scale={[8, 8, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={BACK_FILL_INTENSITY}
          position={[-8, 5, -4]}
          scale={[10, 9, 1]}
          target={[0, 0, 0]}
        />
      </Environment>
      <ambientLight intensity={AMBIENT_INTENSITY} />
      {/*
        No Bounds and no Center. Bounds with `fit` drives the camera itself and
        fought the rig every frame, which at the end of the scroll put the camera
        inside the housing with the body shell filling the view. Center measures
        once and caches, and it measures before the primitive has its geometry, so
        it centres an empty box. HeroModel places itself at the origin instead,
        which leaves the rig as the only thing that touches the camera.

        The group is the whole unit, so the cursor follow turns the terminal
        rather than just the screen. That was the owner's call: a swivelling head
        on a static body reads as a gimmick, a shifting body reads as weight.
      */}
      <group ref={unit}>
        <HeroModel onReady={onReady} />
      </group>
    </>
  );
}

function LoadBar() {
  const { active, progress, errors } = useProgress();
  if (!active && errors.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-4 pt-4">
      <p className="font-mono text-[11px] tracking-wide text-zinc-600">
        {errors.length > 0 ? heroContent.model.error : `${heroContent.model.loading} ${progress.toFixed(0)}%`}
      </p>
      <div className="mt-2 h-px w-full bg-zinc-300">
        <div className="h-px bg-zinc-900" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

class SceneBoundary extends Component<
  { children: ReactNode; onFail: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFail();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function HeroCanvas({
  driver,
  reduced,
}: {
  driver: RefObject<{ t: number }>;
  reduced: boolean;
}) {
  const [handle, setHandle] = useState<TerminalHandle | null>(null);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 grid place-items-center bg-[#f7f6f2] px-6 text-center">
        <p className="font-mono text-xs leading-relaxed text-zinc-600">
          Model 3D tidak dapat dimuat.
          <br />
          Teks hero tetap terbaca tanpa animasi.
        </p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <LoadBar />
      <SceneBoundary
        onFail={() => {
          setFailed(true);
          // A dead scene releases the entrance too. The reader should not hold a
          // black screen for three and a half seconds to be shown this message.
          markSceneReady();
        }}
      >
        <Canvas
          /*
            near and far are set here rather than derived per frame. On a narrow
            portrait viewport the horizontal fov collapses towards six degrees, which
            pushes the wide camera distance past four thousand units, and the default
            far of 2000 clipped the terminal out of existence entirely. It is not a
            subtle crop and it only shows up in portrait, so it reads as a
            mobile-only bug. 20000 clears the worst case with room to spare, and
            near is 1 rather than 0.1 so the depth buffer stays usable across that
            range. Adjusting camera.far per frame is not an option: the
            react-hooks/immutability rule rejects assigning to it from the frame loop.
          */
          camera={{ fov: FOV, near: 1, far: 20000, position: [700, 360, 430] }}
          dpr={[1, 1.75]}
          gl={{
            alpha: true,
            toneMapping: THREE.NeutralToneMapping,
            toneMappingExposure: 1.15,
          }}
          onCreated={({ gl }) => gl.setClearAlpha(0)}
        >
          <Rig
            driver={driver}
            handle={handle}
            reduced={reduced}
            onReady={(next) => {
              setHandle((previous) => previous ?? next);
              markSceneReady();
            }}
          />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
