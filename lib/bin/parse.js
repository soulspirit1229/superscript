#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ssParser = require('ss-parser');

var _ssParser2 = _interopRequireDefault(_ssParser);

var _sfacts = require('sfacts');

var _sfacts2 = _interopRequireDefault(_sfacts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('1.0.1').option('-p, --path [type]', 'Input path', './chat').option('-o, --output [type]', 'Output options', 'data.json').option('-f, --force [type]', 'Force save if output file already exists', false).option('-F, --facts [type]', 'Fact system files path', files => files.split(','), []).parse(process.argv);

_fs2.default.exists(_commander2.default.output, exists => {
  if (exists && !_commander2.default.force) {
    console.log('File', _commander2.default.output, 'already exists, remove file first or use -f to force save.');
    return process.exit();
  }

  return _sfacts2.default.load('mongodb://localhost/superscriptParse', _commander2.default.facts, true, (err, factSystem) => {
    _ssParser2.default.parseDirectory(_commander2.default.path, { factSystem }, (err, result) => {
      if (err) {
        console.error(`Error parsing bot script: ${err}`);
      }
      _fs2.default.writeFile(_commander2.default.output, JSON.stringify(result, null, 4), err => {
        if (err) throw err;
        console.log(`Saved output to ${_commander2.default.output}`);
        process.exit();
      });
    });
  });
});