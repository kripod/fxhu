export function isCurrency(/** @type {string} */ value) {
  return /^[A-Z]{3}$/.test(value);
}
