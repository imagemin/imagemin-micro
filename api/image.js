'use strict';

var compressor = require('../lib');
var multipart = require('co-multipart');
var thunkify = require('thunkify');

module.exports.add = function *() {
	var compress;
	var path;
	var parts;

	if (this.request.type === 'multipart/form-data') {
		compress = thunkify(compressor.path);
		parts = yield multipart(this);
		path = parts.files[0].path;
	}

	if (this.request.type === 'application/json') {
		compress = thunkify(compressor.url);
		path = this.request.body.url;
	}

	this.type = 'application/json';
	this.body = yield compress(path);

	if (parts) {
		parts.dispose();
	}
};
