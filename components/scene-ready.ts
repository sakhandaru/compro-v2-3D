/*
  A one-bit signal: the 3D terminal has something to show.

  The entrance holds a black screen over the page until the model behind it is
  actually ready, and the two live in different trees — the canvas is loaded
  lazily with `ssr: false`, the entrance is rendered with the page — so the
  message has to travel through something neither of them imports from the
  other. A store of one boolean is the smallest thing that does that.

  `markSceneReady` is called from HeroCanvas on both paths: the model landing,
  and the scene failing. A failed model must release the veil too, or the reader
  waits three and a half seconds to be shown an error message.
*/
let ready = false;

const listeners = new Set<() => void>();

export function markSceneReady() {
  if (ready) return;
  ready = true;
  for (const listener of listeners) listener();
}

export function subscribeSceneReady(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function isSceneReady() {
  return ready;
}
