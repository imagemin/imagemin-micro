'use strict';

const fs = require('fs');
const got = require('got');
const Imagemin = require('imagemin');
const pify = require('pify');

function compress(buf) {
	const imagemin = new Imagemin();

	imagemin.src(buf);
	return pify(imagemin.run.bind(imagemin))().then(files => files[0].contents);
}

exports.path = path => pify(fs.readFile)(path).then(compress);

exports.url = url => got(url, {encoding: null}).then(res => compress(res.body));
