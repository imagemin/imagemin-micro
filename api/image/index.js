'use strict';
const fs = require('fs');
const busboy = require('busboy-promise');
const got = require('got');
const imagemin = require('imagemin');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');
const pify = require('pify');
const fsP = pify(fs);

const minifyImage = buf => imagemin.buffer(buf, {
	use: [
		imageminGifsicle(),
		imageminMozjpeg(),
		imageminOptipng({optimizationLevel: 3}),
		imageminSvgo({multipass: true})
	]
});

module.exports.create = ctx => {
	if (ctx.request.type === 'multipart/form-data') {
		return busboy(ctx.request)
			.then(files => fsP.readFile(files[0].filename))
			.then(minifyImage)
			.then(buf => {
				ctx.body = buf;
			});
	}

	if (ctx.request.type === 'application/json') {
		return got(ctx.request.body.url, {encoding: null})
			.then(res => minifyImage(res.body))
			.then(buf => {
				ctx.body = buf;
			});
	}

	ctx.throw(500);
};
