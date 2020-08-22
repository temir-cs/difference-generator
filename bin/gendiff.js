#! /usr/bin/env node
import program from 'commander';
import packageConfig from '../package.json';
import genDiff from '../src/index.js';

// Define variables for both filepaths
let path1;
let path2;

program.version(packageConfig.version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    path1 = filepath1;
    path2 = filepath2;
  })
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);

// console.log('Welcome to GenDiff App!');

const output = genDiff(path1, path2);
console.log(output);
