export function snakeToKebab(str) {
  return str.replace(/_/g, '-');
}

export function pluralToSinglular(str) {
  return str.replace(/es$/, '').replace(/ers$/, 'er');
}

export function formatAPIString(str) {
  return pluralToSinglular(str);
}