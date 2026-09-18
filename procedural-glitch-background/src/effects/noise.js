import { sample } from '../random.js';

export function drawNoise(ctx, frame) {
  const { width, height, time, config } = frame;
  const count = Math.floor(width * height * config.density * 0.05);

  for (let i = 0; i < count; i += 1) {
    const xSample = sample(config.seed, i * 5 + 1);
    const ySample = sample(config.seed, i * 5 + 2);
    const speedSample = sample(config.seed, i * 5 + 3);
    const phase = Math.sin(time * (0.45 + speedSample * 2.8) + xSample * 13);
    const brightness = 45 + Math.floor((phase * 0.5 + 0.5) * 190);
    const alpha = 0.08 + sample(config.seed, i * 5 + 4) * 0.58;

    ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${alpha})`;
    ctx.fillRect(
      Math.floor(xSample * width),
      Math.floor(ySample * height),
      1 + Math.floor(sample(config.seed, i * 5 + 5) * 3),
      1,
    );
  }
}
