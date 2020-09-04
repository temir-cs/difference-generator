import _ from 'lodash';
import parse from './parsers.js';
import formatDiff from './formatters/index.js';

// Build a diff from both files
const buildDiff = (data1, data2) => {
  // build and sort a union array of keys from two files
  const united = _.union(Object.keys(data1), Object.keys(data2)).sort();
  const iter = (arr) => arr.reduce((acc, key) => {
    // if both values are objects -> recursively go deeper and build a children tree
    if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
      return [...acc, {
        name: key,
        children: buildDiff(data1[key], data2[key]),
        status: 'nested',
      }];
    }
    // if a key not present in file1
    // means it was ADDED
    if (!_.has(data1, key)) {
      return [...acc, {
        name: key,
        value: data2[key],
        status: 'added',
      }];
    }
    // if a key not present in file2
    // means it was REMOVED
    if (!_.has(data2, key)) {
      return [...acc, {
        name: key,
        value: data1[key],
        status: 'removed',
      }];
    }
    // if a key is present in both files, but the value was changed
    // means it was UPDATED
    if (data1[key] !== data2[key]) {
      return [...acc, {
        name: key,
        before: data1[key],
        after: data2[key],
        status: 'updated',
      }];
    }
    // if key and value are same in both files
    // means it was UNCHANGED
    return [...acc, {
      name: key,
      value: data1[key],
      status: 'unchanged',
    }];
  }, []);
  return iter(united);
};

export default (filepath1, filepath2, format) => {
  if (!filepath1 || !filepath2) throw new Error('One of the files is not specified!');
  // Read both paths, read files and parse data
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  // build a diff from the given data
  const diff = buildDiff(data1, data2);
  // console.log(diff);

  // return a formatted string
  return formatDiff(format, diff);
};
