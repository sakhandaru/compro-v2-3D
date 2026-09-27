// Every value here is fixed on purpose. The preview harness offered switches for
// these while they were being tuned; the hero does not.
//
// Reason for each group is on the same line, per DESIGN..md 21 (maintainable,
// worth its complexity).

export const MODEL_URL = "/models/retro-terminal.glb";

/** Screen plate name. Verified from the GLB, not guessed. */
export const SCREEN_MESH_NAME = "Cube004_1";

/**
 * Palette. Three core values plus one accent, which is the ceiling set in
 * DESIGN..md 29. The body is pulled from the original asset's own texture so it
 * stays recognisable, the screen is the near-black the portal needs, and the
 * knob is the single accent.
 */
export const BODY_COLOR = "#e3dcc8";
export const KEY_COLOR = "#c4b99c";
export const SOCKET_COLOR = "#8a8069";
export const KNOB_COLOR = "#dd6a2b";
export const SCREEN_COLOR = "#05050a";

/**
 * Roughness per part rather than per material, because the body, keycaps and
 * sockets share one mesh. Keycaps are smoother so they catch a sharper
 * highlight than the painted deck.
 */
export const PART_ROUGHNESS = {
  body: 0.44,
  key: 0.3,
  socket: 0.62,
  knob: 0.34,
} as const;

/**
 * A dark matte plate reads as a hole in the wall. Low roughness plus a stronger
 * environment response is what makes it read as glass.
 */
export const SCREEN_ROUGHNESS = 0.11;
export const SCREEN_METALNESS = 0.1;
export const SCREEN_ENV_INTENSITY = 1.9;

/** Surface noise so the plastic stops looking injection-moulded. */
export const GRAIN_SIZE = 256;
export const GRAIN_LOW = 0.76;
export const GRAIN_REPEAT = 2;

/**
 * Lighting. The key sits on the camera side of the model: with it behind, the
 * face the reader actually sees is lit only by fill, and the two planes of the
 * deck separate by 90 luminance units instead of 12.
 * Direction is world space. The model faces +X and the camera starts on +X.
 */
export const KEY_POSITION: [number, number, number] = [6, 11, 5];
export const KEY_INTENSITY = 3.4;
export const FRONT_FILL_INTENSITY = 1.6;
export const SIDE_FILL_INTENSITY = 0.7;
export const BACK_FILL_INTENSITY = 2.2;
export const ENVIRONMENT_INTENSITY = 0.8;
export const AMBIENT_INTENSITY = 0.12;

/**
 * Background is a warm off-white rather than #ffffff. Pure white leaves the
 * cream body with almost no value separation, and DESIGN..md 15.3 requires a
 * defined silhouette on a light hero.
 */
export const BACKGROUND = "#f7f6f2";

/**
 * Camera path. The end state is 15.3's "black screen fills viewport", and the
 * screen is narrower than a landscape viewport, so fitting its height alone left
 * bezel and knobs on both sides. Framing against the tighter of the two axes
 * makes the screen cover the frame instead of floating inside it.
 */
export const SCREEN_BLEED = 0.94;

/**
 * The push is held back early so the type performs while the computer is still
 * wide, and the long travel is reserved for the move into the screen. Without
 * this the model grew into the type bands while the type was still at 50%
 * opacity, and the two collided.
 */
export const CAMERA_LAG = 1.7;

/**
 * Breathing room around the model in the wide shot. The marquee is a full-bleed
 * field and the model sits on top of it, so this is purely about how much
 * presence the terminal has.
 * Measured: at 1.2 the terminal was 31% of frame width on a 1440x900 desktop,
 * which already matched the reference, but 57% on an 834x1112 tablet because
 * portrait is bound by the horizontal fit. 1.5 lands both near 25% and 40%, so
 * the type keeps the frame and the terminal stops crowding it.
 */
export const WIDE_MARGIN_LANDSCAPE = 1.9;
export const WIDE_MARGIN_PORTRAIT = 1.85;
