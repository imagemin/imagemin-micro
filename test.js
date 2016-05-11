import path from 'path';
import got from 'got';
import isPng from 'is-png';
import nock from 'nock';
import test from 'ava';
import m from './';

let app;
let scope;

test.before(() => {
	app = m();
	scope = nock('http://foo.com')
		.get('/test.png')
		.replyWithFile(200, path.join(__dirname, 'fixture.png'));

	app.listen(3000);
});

test.after(t => {
	t.true(scope.isDone());
});

test(async t => {
	const res = await got.post('http://localhost:3000/image', {
		body: JSON.stringify({url: 'http://foo.com/test.png'}),
		encoding: null,
		headers: {'content-type': 'application/json'}
	});

	t.true(isPng(res.body));
});
