#! /usr/bin/env node
import program from 'commander';
import packageConfig from '../package.json';

program.version(packageConfig.version)
  .description('Compares two configuration files and shows a difference.');

/*
program.version('0.0.1')
  .description('Compares two configuration files and shows a difference.');
*/
program.parse(process.argv);
// console.log('Welcome to GenDiff App!');
