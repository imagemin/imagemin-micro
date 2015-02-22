'use strict';

var fs = require('fs');
var got = require('got');
var Imagemin = require('imagemin');
var isUrl = require('is-url-superb');

function compress(buf, cb) {
	var imagemin = new Imagemin();
	var res = {};

	imagemin.src(buf);
	imagemin.run(function (err, files) {
		if (err) {
			cb(err);
			return;
		}

		res.data = files[0].contents;

		cb(null, res);
	});
}

module.exports = function (path, cb) {
	if (!isUrl(path)) {
		return fs.readFile(path, function (err, buf) {
			if (err) {
				cb(err);
				return;
			}

			compress(buf, cb);
		});
	}

	got(path, {encoding: null}, function (err, buf) {
		if (err) {
			cb(err);
			return;
		}

		compress(buf, cb);
	});
};
