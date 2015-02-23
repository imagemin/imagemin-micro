'use strict';

var bodyparser = require('koa-bodyparser');
var image = require('./api/image');
var koa = require('koa');
var logger = require('koa-logger');
var route = require('koa-route');

module.exports = function () {
	var app = koa();

	if (process.env.NODE_ENV !== 'test') {
		app.use(logger());
	}

	app.use(bodyparser());
	app.use(route.post('/image', image.add));

	return app;
};
