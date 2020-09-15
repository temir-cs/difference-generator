import _ from 'lodash';
// Plain text formatter

// format string based on the type of value
const formatValue = (value) => {
  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    // other value types (e.g.: numbers, etc) are not formatted and returned as is
    default:
      return value;
  }
};

// select a proper method based on an entry status
const mapping = {
  // if a current item is a tree - traverse it recursively
  nested: (item, head, path, iter) => iter(item.children, path),
  // add a proper ending
  updated: (item, head) => `${head}updated. From ${formatValue(item.before)} to ${formatValue(item.after)}`,
  added: (item, head) => `${head}added with value: ${formatValue(item.value)}`,
  removed: (item, head) => `${head}removed`,
  // if status is unchanged - return an empty array that will be flattened by flatMap()
  unchanged: () => [],
};

const plain = (diff) => {
  const iter = (entries, path) => {
    // flatMap needed to handle values with 'unchanged' status
    const result = _.flatMap(entries, (entry) => {
      // add name of a current element to path and build a path string
      const currentPath = [...path, entry.name];
      const pathStr = currentPath.join('.');
      const head = `Property '${pathStr}' was `;
      const sentence = mapping[entry.status](entry, head, currentPath, iter);
      // console.log('Sentence: ', sentence);
      return sentence;
    });
    return result.join('\n');
  };
  return iter(diff, []);
};
export default plain;
