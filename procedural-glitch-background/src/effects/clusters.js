import { sample } from '../random.js';

export function drawClusters(ctx, frame) {
  const { width, height, time, config } = frame;
  const moment = Math.floor(time * (2 + config.glitch * 7));
  const count = Math.floor(4 + config.density * 24);

  for (let i = 0; i < count; i += 1) {
    const base = i * 7;
    const visibility = sample(config.seed + moment, base);
    if (visibility > 0.2 + config.glitch * 0.7) continue;

    const x = Math.floor(sample(config.seed + moment, base + 1) * width);
    const y = Math.floor(sample(config.seed, base + 2) * height);
    const blockWidth = 1 + Math.floor(sample(config.seed, base + 3) * width * 0.08);
    const blockHeight = 1 + Math.floor(sample(config.seed, base + 4) * 4);
    const value = 80 + Math.floor(sample(config.seed + moment, base + 5) * 175);
    const alpha = 0.12 + sample(config.seed, base + 6) * 0.5;

    ctx.fillStyle = `rgba(${value}, ${value}, ${value}, ${alpha})`;
    ctx.fillRect(x, y, blockWidth, blockHeight);
  }
}
