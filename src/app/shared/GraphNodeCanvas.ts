export function drawGraphNode(
  node: { [key: string]: unknown },
  ctx: CanvasRenderingContext2D,
  globalScale: number,
  centerNodeId: string | null,
  getNodeLabel: (node: { [key: string]: unknown }) => string,
  getNodeBorderColor: (node: { [key: string]: unknown }) => string,
  getNodeBackgroundColor: (node: { [key: string]: unknown }) => string,
  drawNodeAvatar: (node: { [key: string]: unknown }, ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => void
) {
  const x = typeof node.x === "number" ? node.x : 0;
  const y = typeof node.y === "number" ? node.y : 0;
  const isCenter = node.id === centerNodeId;
  const nodeCount = 20; // يمكن تمريرها لو أردت
  const baseRadius = isCenter ? 32 : (nodeCount > 30 ? 12 : 16);
  const minRadius = isCenter ? 18 : (nodeCount > 30 ? 7 : 8);
  const maxRadius = isCenter ? 40 : (nodeCount > 30 ? 18 : 24);
  const r = Math.max(minRadius, Math.min(maxRadius, baseRadius / globalScale));

  // Draw node background
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = getNodeBackgroundColor(node);
  ctx.fill();
  ctx.strokeStyle = getNodeBorderColor(node);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // Draw avatar/icon
  drawNodeAvatar(node, ctx, x, y, r);

  // Draw label
  if (globalScale > 0.5) {
    ctx.save();
    ctx.font = `${Math.max(10, 12 / globalScale)}px Inter, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#374151";
    const label = getNodeLabel(node);
    if (typeof label === 'string') {
      ctx.fillText(label, x, y + r + 5);
    }
    ctx.restore();
  }
} 