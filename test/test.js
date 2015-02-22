'use strict';

var api = require('../');
var got = require('got');
var nock = require('nock');
var path = require('path');
var test = require('ava');

test('minify image from URL', function (t) {
	t.plan(3);

	var app = api();
	var body = JSON.stringify({url: 'http://foo.com/test.png'});
	var headers = {'Content-Type': 'application/json'};
	var scope = nock('http://foo.com')
		.get('/test.png')
		.replyWithFile(200, path.join(__dirname, 'fixtures/test.png'));

	app.listen('3000');
	got.post('http://localhost:3000/url', {
		body: body,
		headers: headers
	}, function (err, data) {
		t.assert(!err, err);
		t.assert(scope.isDone());
		t.assert(data);
	});
});
