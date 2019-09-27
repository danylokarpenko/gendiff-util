"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const program = require('commander');

var _default = () => {
  program.description('Compares two configuration files and shows a difference.').version('0.0.1', '-V, --version', 'output the current version').parse(process.argv);
};

exports.default = _default;