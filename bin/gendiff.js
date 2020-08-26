#! /usr/bin/env node
import program from 'commander';
import packageConfig from '../package.json';
import genDiff from '../src/index.js';

program.version(packageConfig.version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const output = genDiff(filepath1, filepath2);
    console.log(output);
  })
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);

// console.log('Welcome to GenDiff App!');
