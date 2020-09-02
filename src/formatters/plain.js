// Plain text formatter

// get the proper string based on the type of value
const formatValue = (value) => {
  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const plain = (diffArr) => {
  const iter = (arr, path) => {
    const result = arr.reduce((acc, current, index, array) => {
      const [prefix, key, value] = current;
      // add current key to path and build a path string
      const currentPath = [...path, key];
      const pathStr = currentPath.join('.');
      // if a value has children - check it recursively
      if (Array.isArray(value)) {
        return [...acc, iter(value, currentPath)];
      }
      const prev = array[index - 1];
      // if a previous value has the same key - skip
      // This is to avoid 'added value' duplication after 'updated value'
      if (prev) {
        const [, prevKey] = prev;
        if (key === prevKey) return acc;
      }
      const next = array[index + 1];
      // if the NEXT value has the SAME key - means it was UPDATED
      if (next) {
        const [, nextKey, nextValue] = next;
        if (key === nextKey) {
          return [...acc, `Property '${pathStr}' was updated. From ${formatValue(value)} to ${formatValue(nextValue)}`];
        }
      }
      // If a value was added / removed
      if (prefix === '+' || prefix === '-') {
        const ending = prefix === '+' ? `added with value: ${formatValue(value)}` : 'removed';
        return [...acc, `Property '${pathStr}' was ${ending}`];
      }
      // if a value was unchanged - skip
      return acc;
    }, []);
    return result.join('\n');
  };
  return iter(diffArr, []);
};
export default plain;
