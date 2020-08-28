import _ from 'lodash';
import parse from './parsers.js';
// import parse from './parsers.js';

// Resolve the both paths and read files

const prefixes = {
  none: ' ',
  added: '+',
  removed: '-',
};

// Build a diff from both files
const buildDiff = (data1, data2) => {
  // build and sort a union array from keys
  const united = _.union(Object.keys(data1), Object.keys(data2)).sort();
  // recursively traverse the united array
  const iter = (arr) => arr.reduce((acc, key) => {
    // if both values are objects -> recursively go deeper
    if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
      return [...acc, [prefixes.none, key, buildDiff(data1[key], data2[key])]];
    }
    // if a key not present in file1 was added to file2
    if (!_.has(data1, key)) {
      return [...acc, [prefixes.added, key, data2[key]]];
    }
    // if a key present in file1 was removed in file2
    if (!_.has(data2, key)) {
      return [...acc, [prefixes.removed, key, data1[key]]];
    }
    // if a key remains the same, but the value was changed
    if (data1[key] !== data2[key]) {
      return [...acc, [prefixes.removed, key, data1[key]], [prefixes.added, key, data2[key]]];
    }
    // if key and value are same for both files
    return [...acc, [prefixes.none, key, data1[key]]];
  }, []);
  return iter(united);
};

// format an object without analysing
const formatObject = (obj) => Object.keys(obj).map((key) => [prefixes.none, key, obj[key]]);

// Formatter that builds an output string from Diff
const stylish = (diffArr) => {
  const iter = (arr, indentSize) => {
    const indent = ' '.repeat(indentSize);
    const nextIndentSize = indentSize + 4;
    const result = arr.map((item) => {
      const [prefix, key, value] = item;
      if (Array.isArray(value)) {
        return `${indent}${prefix} ${key}: ${iter(value, nextIndentSize)}`;
      }
      if (typeof value === 'object') {
        return `${indent}${prefix} ${key}: ${iter(formatObject(value), nextIndentSize)}`;
      }
      return `${indent}${prefix} ${key}: ${value}`;
    }).join('\n');
    return ['{', result, `${indent.substr(0, indent.length - 2)}}`].join('\n');
  };
  return iter(diffArr, 2);
};

export default (filepath1, filepath2) => {
  if (!filepath1 || !filepath2) throw new Error('One of the files is not specified!');
  // Read both paths, read files and parse data
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  // build a Diff from the given data
  const diff = buildDiff(data1, data2);

  // return formatted string
  return stylish(diff);
};
