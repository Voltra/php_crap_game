# babili-inplace

Supply a list of files and they will be minified via [babili](https://github.com/babel/babili#readme) in-place. If your code does not use ES6 features, also consider [uglify-inplace](https://github.com/gkovacs/uglify-inplace)

## Install

```bash
npm install -g babili-inplace
```

## Usage

Supply a list of files and they will be uglified. For example, the following will overwrite index.js with a minified version.

```bash
babili-inplace index.js
```

You can also use wildcards. It will only minify Javascript files ending in .js and ignore other files. For example, to minify all javascipt files in the current directory:

```bash
babili-inplace ./*
```

### Credits

[Geza Kovacs](https://github.com/gkovacs)

