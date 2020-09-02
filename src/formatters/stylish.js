// Fancy JSON-ish type formatter
const stylish = (diffArr) => {
  const currentIndentSize = 2;
  const iter = (arr, indentSize) => {
    const indent = ' '.repeat(indentSize);
    const nextIndentSize = indentSize + 4;
    const result = arr.map((item) => {
      const [prefix, key, value] = item;
      const beginning = `${indent}${prefix} ${key}: `;
      // if a value is compex and was analyzed - means if it is an Array
      if (Array.isArray(value)) {
        return `${beginning}${iter(value, nextIndentSize)}`;
      }
      // if a value is complex and was not analyzed - means if it is an object
      if (typeof value === 'object') {
        const formatted = Object.keys(value).map((k) => [' ', k, value[k]]);
        return `${beginning}${iter(formatted, nextIndentSize)}`;
      }
      return `${beginning}${value}`;
    }).join('\n');
    return ['{', result, `${indent.substr(0, indent.length - 2)}}`].join('\n');
  };
  return iter(diffArr, currentIndentSize);
};

export default stylish;
