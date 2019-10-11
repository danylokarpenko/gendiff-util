# gendiff-util
[![Maintainability](https://api.codeclimate.com/v1/badges/2e5f18f035faa18c7b72/maintainability)](https://codeclimate.com/github/danylokarpenko/backend-project-lvl2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/2e5f18f035faa18c7b72/test_coverage)](https://codeclimate.com/github/danylokarpenko/backend-project-lvl2/test_coverage)

[![Build Status](https://travis-ci.org/danylokarpenko/backend-project-lvl2.svg?branch=master)](https://travis-ci.org/danylokarpenko/backend-project-lvl2)


## Installation
```
$ npm install -g gendiff-util
```

### Usage
```
Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the current version
  -f, --format [type]  Output format
  -h, --help           output usage information
```

### Example:

#### .json format:
[![asciicast](https://asciinema.org/a/ioFAFje4RtY7MvN6Zuwipw18q.svg)](https://asciinema.org/a/ioFAFje4RtY7MvN6Zuwipw18q)

#### .yaml format:
[![asciicast](https://asciinema.org/a/qZcnDjlw8v4sWMYL6kAOZCEWd.svg)](https://asciinema.org/a/qZcnDjlw8v4sWMYL6kAOZCEWd)

#### .ini format:
[![asciicast](https://asciinema.org/a/halqGzbZNiZLawujyVH7FsYbI.svg)](https://asciinema.org/a/halqGzbZNiZLawujyVH7FsYbI)
This package is a CLI utility for generating diff between two config files.

**Config 1:**
```
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```

**Config 2:**
```
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```

**Result:**
```
{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  - follow: false
}
```
