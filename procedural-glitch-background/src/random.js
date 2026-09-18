export function hash(value) {
  let n = value | 0;
  n = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
  n = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
  return (n ^ (n >>> 16)) >>> 0;
}

export function sample(seed, index = 0) {
  return hash(seed + Math.imul(index, 374761393)) / 4294967295;
}

export function range(seed, index, min, max) {
  return min + sample(seed, index) * (max - min);
}

export function integer(seed, index, min, max) {
  return Math.floor(range(seed, index, min, max + 1));
}

export function randomSeed() {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0];
}
