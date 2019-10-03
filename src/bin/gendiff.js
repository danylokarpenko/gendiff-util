#!/usr/bin/env node

import genDiff from '..';
import program from 'commander';
// const program = require('commander');

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1', '-V, --version', 'output the current version');

program
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(function(firstConfig, secondConfig, type) {
    type = type || 'plain';
    const generetedDiff = genDiff(firstConfig, secondConfig);
    console.log(generetedDiff);
  });

program.parse(process.argv);
