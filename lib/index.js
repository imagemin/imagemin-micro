'use strict';

var fs = require('fs');
var got = require('got');
var Imagemin = require('imagemin');

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

module.exports.path = function (path, cb) {
	fs.readFile(path, function (err, buf) {
		if (err) {
			cb(err);
			return;
		}

		compress(buf, cb);
	});
};

module.exports.url = function (url, cb) {
	got(url, {encoding: null}, function (err, buf) {
		if (err) {
			cb(err);
			return;
		}

		compress(buf, cb);
	});
};
