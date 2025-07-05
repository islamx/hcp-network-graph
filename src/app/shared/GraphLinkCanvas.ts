export function drawGraphLink(
  link: { [key: string]: unknown },
  ctx: CanvasRenderingContext2D,
  getLinkColor: (link: { [key: string]: unknown }) => string
) {
  const source = link.source as { [key: string]: unknown };
  const target = link.target as { [key: string]: unknown };
  if (typeof source.x === 'number' && typeof source.y === 'number' && typeof target.x === 'number' && typeof target.y === 'number') {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(source.x, source.y);
    ctx.lineTo(target.x, target.y);
    ctx.strokeStyle = getLinkColor(link);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }
} 