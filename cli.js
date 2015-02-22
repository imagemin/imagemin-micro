#!/usr/bin/env node
'use strict';

var api = require('./');
var app = api();

app.listen('3000', function () {
	console.log('Listening on 127.0.0.1:3000');
});
