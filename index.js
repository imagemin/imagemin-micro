'use strict';

var bodyparser = require('koa-bodyparser');
var koa = require('koa');
var logger = require('koa-logger');
var route = require('koa-route');
var url = require('./api/url.js');

module.exports = function () {
	var app = koa();

	if (process.env.NODE_ENV !== 'test') {
		app.use(logger());
	}

	app.use(bodyparser());
	app.use(route.post('/url', url.create));

	return app;
};
