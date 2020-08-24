import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

test('Check difference between 2 JSON', () => {
  const path1 = '../src/file1.json';
  const path2 = '../src/file2.json';
  expect(genDiff(path1, path2)).toEqual(`{
   host : hexlet.io
 - timeout : 50
 + timeout : 20
 - proxy : 123.234.53.22
 - follow : false
 + verbose : true
}`);
});
