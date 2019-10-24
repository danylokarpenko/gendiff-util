#!/usr/bin/env node

import genDiff from '..';
import program from 'commander';

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1', '-V, --version', 'output the current version');

program
  .option('-f, --format [type]', 'Add output format with otional type')
  .arguments('<firstConfig> <secondConfig>')
  .action(function(firstConfig, secondConfig, options) {
    const format = options.format || 'simple';

    const generetedDiff = genDiff(firstConfig, secondConfig, format);
    console.log(generetedDiff);
  });

program.parse(process.argv);
