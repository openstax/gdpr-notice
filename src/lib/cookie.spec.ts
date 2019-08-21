import test from 'ava';
import * as cookie from './cookie';

const key = 'cookie_notice_acknowledged';

test.beforeEach(() => {
  (global as any).document = {
    cookie: ''
  };
});

test('acknowledged returns true when it should', t => {
  document.cookie = `${key}=true`;
  t.true(cookie.acknowledged());
});

test('acknowledged returns true when there are multiple cookies', t => {
  document.cookie = `foobar=asdf; ${key}=true; fobaz=qwer`;
  t.true(cookie.acknowledged());
});

test('acknowledged returns false when cookie is empty', t => {
  t.false(cookie.acknowledged());
});

test('acknowledged returns false when unrelated cookie exists', t => {
  document.cookie = `foobar=true; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
  t.false(cookie.acknowledged());
});

test('acknowledge sets cookie', t => {
  cookie.acknowledge();
  t.is(document.cookie, `${key}=true; expires=Fri, 31 Dec 9999 23:59:59 GMT`);
});
