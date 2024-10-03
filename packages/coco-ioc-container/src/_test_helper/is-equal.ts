
export function isEqual(a: unknown, b: unknown) {
  if (
    typeof a === 'number' ||
    typeof a === 'string' ||
    typeof a === 'boolean' ||
    typeof a === 'undefined'
  ) {
    return a === b;
  } else if (Array.isArray(a)) {
    // 浅比较
    if (
      !Array.isArray(b) ||
      a.length !== b.length
    ) {
      return false;
    }
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    for (let i = 0; i < sortedA.length; i++) {
      if (sortedA[i] !== sortedB[i]) {
        return false;
      }
    }
    return true;
  } else {
    throw new Error('未实现的比较')
  }
}