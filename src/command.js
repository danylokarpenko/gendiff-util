const program = require('commander');

export default () => {
  program
      .description('Compares two configuration files and shows a difference.')
      .version('0.0.1', '-V, --version', 'output the current version');

  program
    .option('-f, --format [type]', 'Output format')
    .arguments('<firstConfig> <secondConfig>')
    .action(function(firstConfig, secondConfig, type) {
      type = type || 'plain';
      console.log(firstConfig);
    });

  program.parse(process.argv);
};
