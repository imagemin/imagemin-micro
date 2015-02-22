'use strict';

var compressor = require('../lib');
var multipart = require('co-multipart');
var thunkify = require('thunkify');

module.exports.create = function *() {
	var compress = thunkify(compressor.path);
	var parts = yield* multipart(this);

	this.type = 'application/json';
	this.body = yield compress(parts.files[0].path);

	parts.dispose();
};
