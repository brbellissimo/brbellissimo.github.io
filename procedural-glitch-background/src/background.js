import { readConfig, configQuery } from './config.js';
import { drawClusters } from './effects/clusters.js';
import { drawNoise } from './effects/noise.js';
import { drawScanlines } from './effects/scanlines.js';
import { drawTears } from './effects/tears.js';

const canvas = document.querySelector('#background');
const ctx = canvas.getContext('2d', {
  alpha: false,
  willReadFrequently: true,
});
const config = readConfig();
const effects = [drawNoise, drawClusters, drawTears, drawScanlines];

let animationFrame = null;
let startedAt = performance.now();

function resize() {
  canvas.width = Math.max(80, Math.floor(window.innerWidth / config.scale));
  canvas.height = Math.max(60, Math.floor(window.innerHeight / config.scale));
}

function render(timestamp) {
  const frame = {
    width: canvas.width,
    height: canvas.height,
    time: ((timestamp - startedAt) / 1000) * config.speed,
    config,
  };

  ctx.fillStyle = config.background;
  ctx.fillRect(0, 0, frame.width, frame.height);

  for (const effect of effects) effect(ctx, frame);
  animationFrame = requestAnimationFrame(render);
}

function start() {
  resize();
  startedAt = performance.now();
  animationFrame = requestAnimationFrame(render);
}

window.addEventListener('resize', resize);

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
    return;
  }

  if (animationFrame === null) start();
});

window.proceduralBackground = Object.freeze({
  config,
  query: configQuery(config),
});

start();
