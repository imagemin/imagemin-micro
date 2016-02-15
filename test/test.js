import api from '../';
import got from 'got';
import nock from 'nock';
import path from 'path';
import test from 'ava';

test('minify image from URL', async function (t) {
	const app = api();
	const body = JSON.stringify({url: 'http://foo.com/test.png'});
	const headers = {'Content-Type': 'application/json'};
	const scope = nock('http://foo.com')
		.get('/test.png')
		.replyWithFile(200, path.join(__dirname, 'fixtures/test.png'));

	app.listen('3000');

	const data = await got.post('http://localhost:3000/image', {body, headers});

	t.true(scope.isDone());
	t.ok(data);
});
