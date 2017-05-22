'use strict';
const got = require('got');
const imagemin = require('imagemin');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');
const micro = require('micro');
const queryString = require('query-string');

module.exports = req => micro.buffer(req, {limit: '10mb'}).then(buf => {
	const query = queryString.parse(queryString.extract(req.url));
	const url = query.url;

	delete query.url;

	const plugins = [
		imageminGifsicle(query),
		imageminJpegtran(query),
		imageminOptipng(query),
		imageminSvgo(query)
	];

	if (!url && buf.length === 0) {
		const err = new Error('Expected a Buffer or URL');
		err.statusCode = 400;
		throw err;
	}

	if (url) {
		return got(url, {encoding: null}).then(res => imagemin.buffer(res.body, {plugins}));
	}

	return imagemin.buffer(buf, {plugins});
});
