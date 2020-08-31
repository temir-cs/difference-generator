// Fancy JSON-ish type formatter
const stylish = (diffArr) => {
  const currentIndentSize = 2;
  const iter = (arr, indentSize) => {
    const indent = ' '.repeat(indentSize);
    const nextIndentSize = indentSize + 4;
    const result = arr.map((item) => {
      const [prefix, key, value] = item;
      if (Array.isArray(value)) {
        return `${indent}${prefix} ${key}: ${iter(value, nextIndentSize)}`;
      }
      if (typeof value === 'object') {
        // format an object without analysing
        const formatted = Object.keys(value).map((k) => [' ', key, value[k]]);
        return `${indent}${prefix} ${key}: ${iter(formatted, nextIndentSize)}`;
      }
      return `${indent}${prefix} ${key}: ${value}`;
    }).join('\n');
    return ['{', result, `${indent.substr(0, indent.length - 2)}}`].join('\n');
  };
  return iter(diffArr, currentIndentSize);
};

export default stylish;
