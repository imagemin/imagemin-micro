'use strict';

const bodyparser = require('koa-bodyparser');
const image = require('./api/image');
const koa = require('koa');
const logger = require('koa-logger');
const route = require('koa-route');

module.exports = () => {
	const app = koa();

	if (process.env.NODE_ENV !== 'test') {
		app.use(logger());
	}

	app.use(bodyparser());
	app.use(route.post('/image', image.add));

	return app;
};
