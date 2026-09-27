import * as THREE from "three";

/**
 * Value noise baked into a CanvasTexture, used as a roughnessMap.
 * three multiplies material.roughness by this map's green channel, so the
 * values sit just under 1.0 and only break up the surface, never darken it
 * into plastic-looking flatness.
 */
export function createGrainTexture(size = 256, lo = 0.82, hi = 1) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const image = ctx.createImageData(size, size);
  const data = image.data;

  const lattice = (n: number) => {
    const grid = new Float32Array(n * n);
    for (let i = 0; i < grid.length; i++) grid[i] = Math.random();
    return grid;
  };

  const smooth = (t: number) => t * t * (3 - 2 * t);
  const sample = (grid: Float32Array, n: number, x: number, y: number) => {
    const fx = x * n;
    const fy = y * n;
    const x0 = Math.floor(fx) % n;
    const y0 = Math.floor(fy) % n;
    const x1 = (x0 + 1) % n;
    const y1 = (y0 + 1) % n;
    const tx = smooth(fx - Math.floor(fx));
    const ty = smooth(fy - Math.floor(fy));
    const top = grid[y0 * n + x0] * (1 - tx) + grid[y0 * n + x1] * tx;
    const bottom = grid[y1 * n + x0] * (1 - tx) + grid[y1 * n + x1] * tx;
    return top * (1 - ty) + bottom * ty;
  };

  const octaves = [
    { n: 4, weight: 0.5 },
    { n: 11, weight: 0.28 },
    { n: 29, weight: 0.15 },
    { n: 67, weight: 0.07 },
  ].map((o) => ({ ...o, grid: lattice(o.n) }));

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let value = 0;
      for (const o of octaves) value += sample(o.grid, o.n, x / size, y / size) * o.weight;
      const g = Math.round(255 * (lo + (hi - lo) * Math.min(1, Math.max(0, value))));
      const i = (y * size + x) * 4;
      data[i] = g;
      data[i + 1] = g;
      data[i + 2] = g;
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.colorSpace = THREE.NoColorSpace;
  texture.anisotropy = 4;
  return texture;
}
