// Stylish formatter

// build an indent space (default is 4 spaces)
const makeIndent = (depth, tab = '    ') => tab.repeat(depth);

const formatIfObj = (entry, depth) => {
  if (typeof entry !== 'object') {
    return entry;
  }
  const result = Object.entries(entry).map(([key, value]) => `${makeIndent(depth)}    ${key}: ${formatIfObj(value, depth + 1)}`)
    .join('\n');
  return `{\n${result}\n${makeIndent(depth)}}`;
};

// select a proper method based on an entry status
const mapping = {
  // if a current item is a tree - traverse it recursuvely
  nested: (depth, entry, iter) => `${makeIndent(depth)}    ${entry.name}: ${iter(entry.children, depth + 1)}`,
  // if an item was updated - add old and new lines one after another
  updated: (depth, entry) => {
    const removedLine = `${makeIndent(depth)}  - ${entry.name}: ${formatIfObj(entry.before, depth + 1)}`;
    const addedLine = `${makeIndent(depth)}  + ${entry.name}: ${formatIfObj(entry.after, depth + 1)}`;
    return `${removedLine}\n${addedLine}`;
  },
  // otherwise - add a line with a proper prefix (e.g: +, -, ' ')
  added: (depth, entry) => `${makeIndent(depth)}  + ${entry.name}: ${formatIfObj(entry.value, depth + 1)}`,
  removed: (depth, entry) => `${makeIndent(depth)}  - ${entry.name}: ${formatIfObj(entry.value, depth + 1)}`,
  unchanged: (depth, entry) => `${makeIndent(depth)}    ${entry.name}: ${formatIfObj(entry.value, depth + 1)}`,
};

const stylish = (diff) => {
  const iter = (entries, depth) => {
    // use dynamic dispatch to select method based on entry status
    const result = entries.map((entry) => mapping[entry.status](depth, entry, iter)).join('\n');
    return `{\n${result}\n${makeIndent(depth)}}`;
  };
  return iter(diff, 0);
};
export default stylish;
