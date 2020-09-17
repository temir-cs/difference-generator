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
  nested: (name, entry, iter) => iter(entry.children, name),
  // build a sentence
  updated: (name, entry) => `Property '${name}' was updated. From ${formatValue(entry.before)} to ${formatValue(entry.after)}`,
  added: (name, entry) => `Property '${name}' was added with value: ${formatValue(entry.value)}`,
  removed: (name) => `Property '${name}' was removed`,
  // if status is unchanged - return an empty array that will be flattened by flatMap()
  unchanged: () => [],
};

const plain = (diff) => {
  const iter = (entries, path) => {
    // flatMap needed to handle values with 'unchanged' status
    const result = _.flatMap(entries, (entry) => {
      // add name of a current element to path and build a path string
      const currentName = path === '' ? `${entry.name}` : `${path}.${entry.name}`;
      const sentence = mapping[entry.status](currentName, entry, iter);
      // console.log('Sentence: ', sentence);
      return sentence;
    });
    return result.join('\n');
  };
  return iter(diff, '');
};
export default plain;
