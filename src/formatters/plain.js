// Plain text formatter

// format string based on the type of value
const formatValue = (value) => {
  const values = {
    object: '[complex value]',
    string: `'${value}'`,
    boolean: value,
  };
  return values[typeof value];
};

// build a full sentence based on the item status
const makeSentence = (beginning, item) => {
  const endings = {
    updated: `updated. From ${formatValue(item.before)} to ${formatValue(item.after)}`,
    added: `added with value: ${formatValue(item.value)}`,
    removed: 'removed',
  };
  const result = `${beginning}${endings[item.status]}`;
  return result;
};

const plain = (diff) => {
  const iter = (entries, path) => {
    // first filter items that are unchanged - we don't need them
    const result = entries.filter((entry) => entry.status !== 'unchanged')
      .map((entry) => {
        // add name of a current element to path and build a path string
        const currentPath = [...path, entry.name];
        const pathStr = currentPath.join('.');
        const head = `Property '${pathStr}' was `;
        // if a current item is a tree - traverse it recursively
        // otherwise - build a sentence
        const sentence = entry.status === 'nested' ? iter(entry.children, currentPath) : makeSentence(head, entry);
        return sentence;
      });
    return result.join('\n');
  };
  return iter(diff, []);
};
export default plain;
