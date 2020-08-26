import fs from 'fs';
import path from 'path';
import _ from 'lodash';
// import parse from './parsers.js';

export default (filepath1, filepath2) => {
  // Resolve the both paths and connect with the absolute path with process.cwd
  const path1 = path.resolve('./', filepath1);
  const path2 = path.resolve('./', filepath2);
  // console.log('Path1: ', path1, 'Path2: ', path2);

  // Read both files
  const file1 = fs.readFileSync(path1);
  const file2 = fs.readFileSync(path2);

  // Parse both files to -> objects
  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);

  // console.log for debugging purposes =)
  /*
  console.log('--------');
  console.log('Object 1');
  console.log('--------');
  Object.entries(data1).map(([key, value]) => console.log(`${key} : ${value}`));
  console.log('--------');
  console.log('Object 2');
  console.log('--------');
  Object.entries(data2).map(([key, value]) => console.log(`${key} : ${value}`));
  console.log('--------');
  */

  // Form an array of unique keys from both files
  const united = _.union(Object.keys(data1), Object.keys(data2));
  const result = united.reduce((acc, key) => {
    // if a key of file1 is not present in file2
    if (!data2[key]) {
      return [...acc, ` - ${key} : ${data1[key]}`];
    }
    // if a key of file2 is not present in file1
    if (!data1[key]) {
      return [...acc, ` + ${key} : ${data2[key]}`];
    }
    // if a key of file1 is present but the value is different
    if (data1[key] !== data2[key]) {
      return [...acc, ` - ${key} : ${data1[key]}`, ` + ${key} : ${data2[key]}`];
    }
    // if a key and value is the same for both files
    return [...acc, `   ${key} : ${data1[key]}`];
  }, []);
  // const result = Object
  return ['{', ...result, '}'].join('\n');
};
