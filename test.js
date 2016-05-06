import path from 'path';
import got from 'got';
import isPng from 'is-png';
import nock from 'nock';
import test from 'ava';
import m from './';

test(async t => {
	const app = m();
	const scope = nock('http://foo.com')
		.get('/test.png')
		.replyWithFile(200, path.join(__dirname, 'fixture.png'));

	app.listen('3000');

	const res = await got.post('http://localhost:3000/image', {
		body: JSON.stringify({url: 'http://foo.com/test.png'}),
		encoding: null,
		headers: {'content-type': 'application/json'}
	});

	t.true(scope.isDone());
	t.true(isPng(res.body));
});
