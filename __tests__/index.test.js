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

test('Read an unexistent file', () => {
  const path1 = getFixturePath('undefined.json');
  const path2 = getFixturePath('after.json');
  expect(() => genDiff(path1, path2)).toThrowError();
});

test('Check with only 1 argument', () => {
  const path1 = getFixturePath('before-flat.json');
  expect(() => genDiff(path1)).toThrowError();
});

test('Parse file with unknown extension', () => {
  const pathToNoExtensionFile = getFixturePath('expected.txt');
  expect(() => parse(pathToNoExtensionFile)).toThrowError();
});

test('Check difference between 2 flat JSON files', () => {
  const path1 = getFixturePath('before-flat.json');
  const path2 = getFixturePath('after-flat.json');
  const expected = readFile('expected-flat.txt');
  expect(genDiff(path1, path2, 'stylish')).toMatch(expected);
});

test('Check difference between 2 flat YAML files', () => {
  const path1 = getFixturePath('before-flat.yml');
  const path2 = getFixturePath('after-flat.yml');
  const expected = readFile('expected-flat.txt');
  expect(genDiff(path1, path2, 'stylish')).toMatch(expected);
});

test('Check difference between 2 flat INI files', () => {
  const path1 = getFixturePath('before-flat.ini');
  const path2 = getFixturePath('after-flat.ini');
  const expected = readFile('expected-flat.txt');
  expect(genDiff(path1, path2, 'stylish')).toMatch(expected);
});

test('Check difference between 2 nested JSONs - stylish output', () => {
  const path1 = getFixturePath('before.json');
  const path2 = getFixturePath('after.json');
  const expected = readFile('expected-stylish.txt');
  expect(genDiff(path1, path2, 'stylish')).toMatch(expected);
});

test('Check difference between 2 nested JSONs - plain output', () => {
  const path1 = getFixturePath('before.json');
  const path2 = getFixturePath('after.json');
  const expected = readFile('expected-plain.txt');
  expect(genDiff(path1, path2, 'plain')).toMatch(expected);
});

test('Check difference between 2 nested JSONs - json output', () => {
  const path1 = getFixturePath('before.json');
  const path2 = getFixturePath('after.json');
  const expected = readFile('expected-json.txt');
  expect(genDiff(path1, path2, 'json')).toMatch(expected);
});
