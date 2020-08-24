/* eslint-disable no-underscore-dangle */
import { test, expect, beforeEach } from '@jest/globals';
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

let path1;
let path2;
let expected;

beforeEach(() => {
  path1 = getFixturePath('before.json');
  path2 = getFixturePath('after.json');
  expected = readFile('expected');
});

test('Check difference between 2 JSON files', () => {
  expect(genDiff(path1, path2)).toMatch(expected);
});
