'use strict';

var compressor = require('../lib');
var thunkify = require('thunkify');

module.exports.create = function *() {
	var compress = thunkify(compressor);

	this.type = 'application/json';
	this.body = yield compress(this.request.body);
};
