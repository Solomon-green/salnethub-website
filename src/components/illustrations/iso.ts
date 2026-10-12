// Isometric projection on the brand's 30° grid.
export const COS30 = Math.cos(Math.PI / 6);
export const SIN30 = 0.5;

export type P3 = [number, number, number];

export function iso([x, y, z]: P3, u: number, ox = 0, oy = 0): [number, number] {
  return [ox + (x - y) * COS30 * u, oy + (x + y) * SIN30 * u - z * u];
}

export const pts = (list: [number, number][]) => list.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

/** Faces of a box centred on (cx, cy) on the floor, footprint w x d, height h. */
export function boxFaces(cx: number, cy: number, w: number, d: number, h: number, u: number, ox: number, oy: number) {
  const x0 = cx - w / 2,
    x1 = cx + w / 2,
    y0 = cy - d / 2,
    y1 = cy + d / 2;
  const P = (x: number, y: number, z: number) => iso([x, y, z], u, ox, oy);
  return {
    top: pts([P(x0, y0, h), P(x1, y0, h), P(x1, y1, h), P(x0, y1, h)]),
    left: pts([P(x0, y1, h), P(x1, y1, h), P(x1, y1, 0), P(x0, y1, 0)]),
    right: pts([P(x1, y0, h), P(x1, y1, h), P(x1, y1, 0), P(x1, y0, 0)]),
    labelAnchor: P(cx, cy, h),
  };
}
