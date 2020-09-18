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
  nested: (path, entry, iter) => iter(entry.children, path),
  // build a sentence
  updated: (path, entry) => `Property '${path.join('.')}' was updated. From ${formatValue(entry.before)} to ${formatValue(entry.after)}`,
  added: (path, entry) => `Property '${path.join('.')}' was added with value: ${formatValue(entry.value)}`,
  removed: (path) => `Property '${path.join('.')}' was removed`,
  // if status is unchanged - return an empty array that will be flattened by flatMap()
  unchanged: () => [],
};

const plain = (diff) => {
  const iter = (entries, path) => {
    // flatMap needed to handle values with 'unchanged' status
    const result = _.flatMap(entries, (entry) => mapping[entry.status]([...path, entry.name],
      entry, iter));
    return result.join('\n');
  };
  return iter(diff, []);
};
export default plain;
