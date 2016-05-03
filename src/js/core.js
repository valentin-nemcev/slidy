export function hashFromPath(path) {
  return '#slidy-' + path;
}

export function pathFromHash(hash) {
  const match = hash.match(/^#slidy-(\d+)$/i);
  return match && parseInt(match[1], 10);
}
