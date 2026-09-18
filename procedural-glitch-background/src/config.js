import { integer, randomSeed, range } from './random.js';

const LIMITS = Object.freeze({
  density: [0.05, 0.8],
  glitch: [0, 1],
  speed: [0.15, 2],
  scale: [2, 8],
  scanlines: [2, 8],
  shift: [4, 48],
  tearHeight: [1, 12],
});

function numberParam(params, name, fallback, { integer = false } = {}) {
  const raw = params.get(name);
  if (raw === null || raw.trim() === '') return fallback;

  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return fallback;

  const [min, max] = LIMITS[name];
  const clamped = Math.min(max, Math.max(min, parsed));
  return integer ? Math.round(clamped) : clamped;
}

function seedParam(params) {
  const raw = params.get('seed');
  if (raw === null || raw.trim() === '') return randomSeed();

  const parsed = Number(raw);
  return Number.isFinite(parsed) ? Math.trunc(parsed) >>> 0 : randomSeed();
}

export function readConfig(search = window.location.search) {
  const params = new URLSearchParams(search);
  const seed = seedParam(params);

  const config = Object.freeze({
    seed,
    density: numberParam(params, 'density', range(seed, 1, 0.16, 0.55)),
    glitch: numberParam(params, 'glitch', range(seed, 2, 0.2, 0.85)),
    speed: numberParam(params, 'speed', range(seed, 3, 0.35, 1.25)),
    scale: numberParam(params, 'scale', integer(seed, 4, 3, 6), { integer: true }),
    scanlines: numberParam(params, 'scanlines', integer(seed, 5, 2, 6), { integer: true }),
    shift: numberParam(params, 'shift', integer(seed, 6, 12, 36), { integer: true }),
    tearHeight: numberParam(params, 'tearHeight', integer(seed, 7, 2, 8), { integer: true }),
    background: '#050505',
  });

  return config;
}

export function configQuery(config) {
  const params = new URLSearchParams();

  for (const key of [
    'seed',
    'density',
    'glitch',
    'speed',
    'scale',
    'scanlines',
    'shift',
    'tearHeight',
  ]) {
    params.set(key, String(config[key]));
  }

  return `?${params.toString()}`;
}
