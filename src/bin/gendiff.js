#!/usr/bin/env node

import genDiff from '..';
import program from 'commander';

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1', '-V, --version', 'output the current version');

program
  .option('-f, --format [type]', 'Output format', 'plain')
  .arguments('<firstConfig> <secondConfig>')
  .action(function(firstConfig, secondConfig, type) {
    const generetedDiff = genDiff(firstConfig, secondConfig);
    console.log(generetedDiff);
  });

program.parse(process.argv);
