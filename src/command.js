const program = require('commander');

export default () => {
  program
      .description('Compares two configuration files and shows a difference.')
      .version('0.0.1', '-V, --version', 'output the current version')
      .parse(process.argv);
};
