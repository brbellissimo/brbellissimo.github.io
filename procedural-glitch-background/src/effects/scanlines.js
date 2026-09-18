export function drawScanlines(ctx, frame) {
  const { width, height, config } = frame;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';

  for (let y = 0; y < height; y += config.scanlines) {
    ctx.fillRect(0, y, width, 1);
  }
}
