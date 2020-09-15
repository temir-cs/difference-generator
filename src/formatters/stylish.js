// Stylish formatter

// prefixes that are selected based on status
const prefixes = {
  added: '+',
  removed: '-',
  unchanged: ' ',
  nested: ' ',
};

// standard indent size is 4
const indent = 4;

// build an indent space
const buildIndent = (depth, backspace, symbol = ' ') => symbol.repeat(indent * (depth + 1) - backspace);

const formatIfObj = (entry, depth) => {
  const indentStr = ' '.repeat(indent * (depth + 1) - 2);
  if (typeof entry !== 'object') {
    return entry;
  }
  const result = Object.entries(entry).map(([key, value]) => `${indentStr}${prefixes.unchanged} ${key}: ${formatIfObj(value, depth + 1)}`)
    .join('\n');
  return `{\n${result}\n${buildIndent(depth, 4)}}`;

  // Alternative method
  /* _.trimStart(JSON.stringify(item, null, 4)
    .split('')
    // remove JSON.stringify chars like " and ,
    .filter((char) => char !== '"' && char !== ',')
    .join('')
    .split('\n')
    // add dynamic indent
    .map((el) => `${indentStr}${el}`)
    .join('\n')); */
};

const stylish = (diff) => {
  const iter = (entries, depth) => {
    // in order to compensate for 'prefix + space' before name we use 2 as a backspace
    const indentStr = buildIndent(depth, 2);
    const result = entries.map((entry) => {
      // select prefix based on a current status
      const head = `${indentStr}${prefixes[entry.status]} ${entry.name}: `;
      // if value is nested - traverse it recursively
      if (entry.status === 'nested') {
        return `${head}${iter(entry.children, depth + 1)}`;
      }
      // if value was updated - add 'removed' and 'added' lines one after another
      if (entry.status === 'updated') {
        // can't use head here, since we need two separate lines
        const removedLine = `${indentStr}${prefixes.removed} ${entry.name}: ${formatIfObj(entry.before, depth + 1)}`;
        const addedLine = `${indentStr}${prefixes.added} ${entry.name}: ${formatIfObj(entry.after, depth + 1)}`;
        return `${removedLine}\n${addedLine}`;
      }
      return `${head}${formatIfObj(entry.value, depth + 1)}`;
    }).join('\n');
    return `{\n${result}\n${buildIndent(depth, 4)}}`;
  };
  return iter(diff, 0);
};
export default stylish;
