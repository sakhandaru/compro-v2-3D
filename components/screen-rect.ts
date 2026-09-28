/*
  Where the terminal's screen plate is, in viewport pixels.

  Written once a frame by the render loop, read by the entrance while it sucks
  the black into that screen. The two never share a component — the canvas is
  loaded lazily with `ssr: false`, the entrance ships with the page — so the
  rectangle travels through here.

  `valid` is what keeps the entrance honest: before the model has a handle, or
  if the scene failed outright, the rect is meaningless and the entrance falls
  back to a plain fade instead of collapsing the black towards the middle of
  nothing.
*/
export const screenRect = { x: 0, y: 0, w: 0, h: 0, valid: false };

export function writeScreenRect(x: number, y: number, w: number, h: number) {
  screenRect.x = x;
  screenRect.y = y;
  screenRect.w = w;
  screenRect.h = h;
  screenRect.valid = w > 0 && h > 0;
}
