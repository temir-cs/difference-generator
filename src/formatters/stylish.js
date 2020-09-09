// Stylish formatter

// prefixes that are selected based on status
const prefixes = {
  added: '+',
  removed: '-',
  unchanged: ' ',
  nested: ' ',
};

const formatIfObj = (item, indentSize) => {
  const indentStr = ' '.repeat(indentSize);
  if (typeof item !== 'object') {
    return item;
  }
  const result = Object.entries(item).map(([key, value]) => `${indentStr}${prefixes.unchanged} ${key}: ${formatIfObj(value, indentSize + 4)}`)
    .join('\n');
  return `{\n${result}\n${indentStr.substr(0, indentStr.length - 2)}}`;

  // Alternative method
  /* _.trimStart(JSON.stringify(item, null, fixedIndent)
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
  // since (prefix + space before name) = 2 spaces, the initial indent is set to 2
  // therefore overall indent is equal 4
  const indent = 2;
  const iter = (arr, indentSize) => {
    const indentStr = ' '.repeat(indentSize);
    const nextIndent = indentSize + 4;
    const result = arr.map((item) => {
      // select prefix based on a current status
      const head = `${indentStr}${prefixes[item.status]} ${item.name}: `;
      // if value is nested - traverse it recursively
      if (item.status === 'nested') {
        return `${head}${iter(item.children, nextIndent)}`;
      }
      // if value was updated - add 'removed' and 'added' strings one after another
      if (item.status === 'updated') {
        return `${indentStr}${prefixes.removed} ${item.name}: ${formatIfObj(item.before, nextIndent)}\n${indentStr}${prefixes.added} ${item.name}: ${formatIfObj(item.after, nextIndent)}`;
      }
      return `${head}${formatIfObj(item.value, nextIndent)}`;
    }).join('\n');
    return `{\n${result}\n${indentStr.substr(0, indentStr.length - 2)}}`;
  };
  return iter(diff, indent);
};
export default stylish;
