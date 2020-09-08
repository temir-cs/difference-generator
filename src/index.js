import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import formatDiff from './formatters/index.js';

// Read file and extract its data & extension
const getData = (filepath) => {
  // Build a full path to file
  const fullPath = path.resolve('./', filepath);
  // Get the file extension with path.extname
  const extension = path.extname(fullPath);
  // Read file data
  const data = fs.readFileSync(fullPath, 'utf-8');
  return [data, extension];
};

// Build a diff from both files
const buildDiff = (data1, data2) => {
  // build and sort a union array of keys from two files
  const united = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const iter = (arr) => arr.map((key) => {
    // if both values are objects -> recursively go deeper and build a children tree
    if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
      return {
        name: key,
        children: buildDiff(data1[key], data2[key]),
        status: 'nested',
      };
    }
    // if a key not present in file1
    // means it was ADDED
    if (!_.has(data1, key)) {
      return {
        name: key,
        value: data2[key],
        status: 'added',
      };
    }
    // if a key not present in file2
    // means it was REMOVED
    if (!_.has(data2, key)) {
      return {
        name: key,
        value: data1[key],
        status: 'removed',
      };
    }
    // if a key is present in both files, but the value was changed
    // means it was UPDATED
    if (data1[key] !== data2[key]) {
      return {
        name: key,
        before: data1[key],
        after: data2[key],
        status: 'updated',
      };
    }
    // if key and value are same in both files
    // means it was UNCHANGED
    return {
      name: key,
      value: data1[key],
      status: 'unchanged',
    };
  });
  return iter(united);
};

export default (filepath1, filepath2, format) => {
  if (!filepath1 || !filepath2) throw new Error('One of the files is not specified!');
  // Read both paths, read files and parse data

  const [data1, ext1] = getData(filepath1);
  const [data2, ext2] = getData(filepath2);

  const parsed1 = parse(data1, ext1);
  const parsed2 = parse(data2, ext2);

  // build a diff from the given data
  const diff = buildDiff(parsed1, parsed2);
  // console.log(diff);

  // return a formatted string
  return formatDiff(format, diff);
};
