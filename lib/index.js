'use strict';

var got = require('got');
var Imagemin = require('imagemin');

module.exports = function (data, cb) {
	var imagemin = new Imagemin();
	var res = {};

	got(data.url, {encoding: null}, function (err, buf) {
		if (err) {
			cb(err);
			return;
		}

		imagemin.src(buf);
		imagemin.run(function (err, files) {
			if (err) {
				cb(err);
				return;
			}

			res.data = files[0].contents;

			cb(null, res);
		});
	});
};
