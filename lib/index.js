'use strict';

const fs = require('fs');
const got = require('got');
const Imagemin = require('imagemin');

function compress(buf, cb) {
	const imagemin = new Imagemin();
	const res = {};

	imagemin.src(buf);
	imagemin.run((err, files) => {
		if (err) {
			cb(err);
			return;
		}

		res.data = files[0].contents;

		cb(null, res);
	});
}

module.exports.path = (path, cb) => {
	fs.readFile(path, (err, buf) => {
		if (err) {
			cb(err);
			return;
		}

		compress(buf, cb);
	});
};

module.exports.url = (url, cb) => {
	got(url, {encoding: null}).then(res => compress(res.body, cb)).catch(cb);
};
