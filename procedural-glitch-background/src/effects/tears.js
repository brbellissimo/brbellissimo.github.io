import { sample } from '../random.js';

export function drawTears(ctx, frame) {
  const { width, height, time, config } = frame;
  const moment = Math.floor(time * 8);
  const count = Math.floor(config.glitch * 9);

  for (let i = 0; i < count; i += 1) {
    const y = Math.floor(sample(config.seed + moment, i + 900) * height);
    const bandHeight = 1 + Math.floor(
      sample(config.seed, i + 1200) * config.tearHeight,
    );
    const shift = Math.floor(
      (sample(config.seed + moment * 3, i + 1500) - 0.5)
        * config.shift
        * config.glitch,
    );
    const safeHeight = Math.min(bandHeight, height - y);

    if (shift === 0 || safeHeight <= 0) continue;

    const strip = ctx.getImageData(0, y, width, safeHeight);
    ctx.fillStyle = config.background;
    ctx.fillRect(0, y, width, safeHeight);
    ctx.putImageData(strip, shift, y);
  }
}
