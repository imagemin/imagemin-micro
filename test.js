import fs from 'fs';
import path from 'path';
import got from 'got';
import micro from 'micro';
import nock from 'nock';
import pify from 'pify';
import test from 'ava';
import testListen from 'test-listen';
import m from '.';

const fsP = pify(fs);
const fixture = path.join(__dirname, 'fixture.png');

let url;

test.before(async () => {
	url = await testListen(micro(m));

	nock('http://foo.bar')
		.get('/test.png')
		.replyWithFile(200, path.join(__dirname, 'fixture.png'));
});

test('minify file using POST body', async t => {
	const buf = await fsP.readFile(fixture);
	const body = (await got.post(url, {
		body: buf,
		encoding: null
	})).body;

	t.true(buf.length > body.length);
});

test('minify file using url', async t => {
	const buf = await fsP.readFile(fixture);
	const body = (await got.post(`${url}?url=http://foo.bar/test.png`, {encoding: null})).body;

	t.true(buf.length > body.length);
});
