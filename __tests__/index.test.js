/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

// Get correct paths to current file and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build path to the needed file in __fixtures___
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Check difference between 2 JSON files', () => {
  const path1 = getFixturePath('before.json');
  const path2 = getFixturePath('after.json');
  const expected = readFile('expected');
  expect(genDiff(path1, path2)).toMatch(expected);
});
