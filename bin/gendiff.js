#! /usr/bin/env node
import program from 'commander';
import packageConfig from '../package.json';
import genDiff from '../src/index.js';

program
  .version(packageConfig.version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [stylish]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const output = genDiff(filepath1, filepath2, program.format);
    console.log(output);
  });

program.parse(process.argv);
