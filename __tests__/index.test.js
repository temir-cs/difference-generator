/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import parse from '../src/parsers.js';

// Get correct paths to current file and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build path to the needed file in __fixtures___
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Check difference between 2 JSON files', () => {
  const path1 = getFixturePath('before.json');
  const path2 = getFixturePath('after.json');
  const expected = readFile('expected.txt');
  expect(genDiff(path1, path2)).toMatch(expected);
});

test('Check difference between 2 YAML files', () => {
  const path1 = getFixturePath('before.yml');
  const path2 = getFixturePath('after.yml');
  const expected = readFile('expected.txt');
  expect(genDiff(path1, path2)).toMatch(expected);
});

test('Check difference between 2 INI files', () => {
  const path1 = getFixturePath('before.ini');
  const path2 = getFixturePath('after.ini');
  const expected = readFile('expected.txt');
  expect(genDiff(path1, path2)).toMatch(expected);
});

test('Read an unexistent file', () => {
  const path1 = getFixturePath('undefined.json');
  const path2 = getFixturePath('after.json');
  expect(() => genDiff(path1, path2)).toThrowError();
});

test('Check with only 1 argument', () => {
  const path1 = getFixturePath('before.json');
  expect(() => genDiff(path1)).toThrowError();
});

test('Parse file with unknown extension', () => {
  const pathToNoExtensionFile = getFixturePath('expected.txt');
  expect(() => parse(pathToNoExtensionFile)).toThrowError();
});

test('Check difference between 2 nested JSONs', () => {
  const path1 = getFixturePath('beforeNested.json');
  const path2 = getFixturePath('afterNested.json');
  const expected = readFile('expectedNested.txt');
  expect(genDiff(path1, path2)).toMatch(expected);
});
