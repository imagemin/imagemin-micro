'use strict';
const koaBodyparser = require('koa-bodyparser');
const Koa = require('koa');
const koaLogger = require('koa-logger');
const koaRoute = require('koa-route');

module.exports = () => {
	const app = new Koa();

	app.use(koaLogger());
	app.use(koaBodyparser());
	app.use(koaRoute.post('/image', require('./api/image').create));

	return app;
};
