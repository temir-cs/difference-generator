// Stylish formatter
import _ from 'lodash';

// prefixes that are selected based on status
const prefixes = {
  added: '+',
  removed: '-',
  unchanged: ' ',
  nested: ' ',
};

const formatIfObj = (item, indentSize) => {
  const fixedIndent = 4;
  const indentStr = ' '.repeat(indentSize - 2);
  if (typeof item === 'object') {
    return _.trimStart(JSON.stringify(item, null, fixedIndent)
      .split('')
      // remove JSON.stringify chars like " and ,
      .filter((char) => char !== '"' && char !== ',')
      .join('')
      .split('\n')
      // add dynamic indent
      .map((el) => `${indentStr}${el}`)
      .join('\n'));
  }
  return item;
};

const stylish = (diff) => {
  // since (prefix + space before name) = 2 spaces, the initial indent is set to 2
  // therefore overall indent is equal 4
  const indent = 2;
  const iter = (arr, indentSize) => {
    const indentStr = ' '.repeat(indentSize);
    const nextIndent = indentSize + 4;
    const result = arr.reduce((acc, current) => {
      // select prefix based on a current status
      const head = `${indentStr}${prefixes[current.status]} ${current.name}: `;
      // if value is nested - traverse it recursively
      if (current.status === 'nested') {
        return [...acc, `${head}${iter(current.children, nextIndent)}`];
      }
      // if value was updated - add 'removed' and 'added' strings one after another
      if (current.status === 'updated') {
        return [...acc, `${indentStr}${prefixes.removed} ${current.name}: ${formatIfObj(current.before, nextIndent)}`,
          `${indentStr}${prefixes.added} ${current.name}: ${formatIfObj(current.after, nextIndent)}`];
      }
      return [...acc, `${head}${formatIfObj(current.value, nextIndent)}`];
    }, []).join('\n');
    return ['{', result, `${indentStr.substr(0, indentStr.length - 2)}}`].join('\n');
  };
  return iter(diff, indent);
};
export default stylish;
