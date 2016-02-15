'use strict';

const compressor = require('../lib');
const multipart = require('co-multipart');

module.exports.add = function *() {
	let compress;
	let path;
	let parts;

	if (this.request.type === 'multipart/form-data') {
		compress = compressor.path;
		parts = yield multipart(this);
		path = parts.files[0].path;
	}

	if (this.request.type === 'application/json') {
		compress = compressor.url;
		path = this.request.body.url;
	}

	this.type = 'application/json';
	this.body = yield compress(path);

	if (parts) {
		parts.dispose();
	}
};
