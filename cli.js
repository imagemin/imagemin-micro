#!/usr/bin/env node
'use strict';
const execa = require('execa');

execa('npm', ['run', 'start', '--'].concat(process.argv.slice(2)), {
	cwd: __dirname,
	stdio: 'inherit'
});
