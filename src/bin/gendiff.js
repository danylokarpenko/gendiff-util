#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the current version');

program
  .option('-f, --format [type]', 'Add output format with otional type', 'simple')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, options) => {
    const generetedDiff = genDiff(firstConfig, secondConfig, options.format);
    console.log(generetedDiff);
  });

program.parse(process.argv);
