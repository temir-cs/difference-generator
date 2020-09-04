// Plain text formatter

// format string based on the type of value
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

const plain = (diff) => {
  const iter = (arr, path) => {
    const result = arr.reduce((acc, current) => {
      // add name of a current element to path and build a path string
      const currentPath = [...path, current.name];
      const pathStr = currentPath.join('.');
      const head = `Property '${pathStr}' was `;
      switch (current.status) {
        case 'nested':
          return [...acc, iter(current.children, currentPath)];
        case 'updated':
          return [...acc, `${head}updated. From ${formatValue(current.before)} to ${formatValue(current.after)}`];
        case 'added':
          return [...acc, `${head}added with value: ${formatValue(current.value)}`];
        case 'removed':
          return [...acc, `${head}removed`];
        default:
          // if a value was unchanged
          return acc;
      }
    }, []);
    return result.join('\n');
  };
  return iter(diff, []);
};
export default plain;
