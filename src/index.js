import _ from 'lodash';
import parse from './parsers.js';
// import parse from './parsers.js';

// Resolve the both paths and read files

export default (filepath1, filepath2) => {
  if (!filepath1 || !filepath2) throw new Error('One of the files is not specified!');
  // Read both paths, read files and parse data
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

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
