# Gendiff-util
This package is a CLI utility for generating diff between two config files.

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

[![asciicast](https://asciinema.org/a/ioFAFje4RtY7MvN6Zuwipw18q.svg)](https://asciinema.org/a/ioFAFje4RtY7MvN6Zuwipw18q)

#### Example:

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
