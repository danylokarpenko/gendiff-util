# gendiff-util
[![Maintainability](https://api.codeclimate.com/v1/badges/2e5f18f035faa18c7b72/maintainability)](https://codeclimate.com/github/danylokarpenko/backend-project-lvl2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/2e5f18f035faa18c7b72/test_coverage)](https://codeclimate.com/github/danylokarpenko/backend-project-lvl2/test_coverage)

[![Build Status](https://travis-ci.org/danylokarpenko/backend-project-lvl2.svg?branch=master)](https://travis-ci.org/danylokarpenko/backend-project-lvl2)

`This package is a CLI utility for generating diff between two config files.`

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

### .json files:
**Flat data:**

[![asciicast](https://asciinema.org/a/ioFAFje4RtY7MvN6Zuwipw18q.svg)](https://asciinema.org/a/ioFAFje4RtY7MvN6Zuwipw18q)

**Deep data:**

[![asciicast](https://asciinema.org/a/HRRI8WNl5NuZXHMomqUna9Quu.svg)](https://asciinema.org/a/HRRI8WNl5NuZXHMomqUna9Quu)

`gendiff -f plain`

[![asciicast](https://asciinema.org/a/05EKxvdkJ6SrwBQwkII5IJmt1.svg)](https://asciinema.org/a/05EKxvdkJ6SrwBQwkII5IJmt1)

### .yaml files:
**Flat data:**

[![asciicast](https://asciinema.org/a/qZcnDjlw8v4sWMYL6kAOZCEWd.svg)](https://asciinema.org/a/qZcnDjlw8v4sWMYL6kAOZCEWd)

**Deep data:**

[![asciicast](https://asciinema.org/a/8KMTbIHHB5RXwrI3xiYp0Mpl5.svg)](https://asciinema.org/a/8KMTbIHHB5RXwrI3xiYp0Mpl5)

`gendiff -f plain`

[![asciicast](https://asciinema.org/a/MexKdOdm89RWdsWY00K7nFhEE.svg)](https://asciinema.org/a/MexKdOdm89RWdsWY00K7nFhEE)

### .ini files:
**Flat data:**

[![asciicast](https://asciinema.org/a/halqGzbZNiZLawujyVH7FsYbI.svg)](https://asciinema.org/a/halqGzbZNiZLawujyVH7FsYbI)

**Deep data:**

[![asciicast](https://asciinema.org/a/U200qwfQc4rTzPh40SULi5ZKc.svg)](https://asciinema.org/a/U200qwfQc4rTzPh40SULi5ZKc)

`gendiff -f plain`

[![asciicast](https://asciinema.org/a/EGouCaaoJQIO5Nfl1cDqW8lSd.svg)](https://asciinema.org/a/EGouCaaoJQIO5Nfl1cDqW8lSd)

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
