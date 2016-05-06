#!/usr/bin/env node
'use strict';
const api = require('./');
const app = api();

app.listen('3000', () => console.log('Listening on 127.0.0.1:3000'));
