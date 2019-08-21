import test from 'ava';
import sinon from 'sinon';
import canTrackUser from './canTrackUser';
import * as cookie from './cookie';
import * as isGdprCountryModule from './isGdprCountry';

const isGdprCountry = sinon.stub(isGdprCountryModule, 'default');
const acknowledge = sinon.stub(cookie, 'acknowledge');
const acknowledged = sinon.stub(cookie, 'acknowledged');

const stubs = () => ({
  notice: sinon.fake.returns(Promise.resolve()),
  register: sinon.fake()
});

test.beforeEach(() => {
  isGdprCountry.reset();
  acknowledge.reset();
  acknowledged.reset();
});

test('calls notice if not previously acknowledged', async t => {
  const { notice, register } = stubs();
  acknowledged.returns(false);
  await canTrackUser({ notice, register });
  t.true(notice.called);
});

test('does not call notice if previously acknowledged', async t => {
  const { notice, register } = stubs();
  acknowledged.returns(true);
  await canTrackUser({ notice, register });
  t.false(notice.called);
});

test('calls register if previously acknowledged', async t => {
  const { notice, register } = stubs();
  acknowledged.returns(true);
  await canTrackUser({ notice, register });
  t.true(register.called);
});

test("doesn't check location if previously acknowledged", async t => {
  const { notice, register } = stubs();
  acknowledged.returns(true);
  await canTrackUser({ notice, register });
  t.false(isGdprCountry.called);
});

test("requsests notice and register when outisde gdpr country", async t => {
  const { notice, register } = stubs();
  acknowledged.returns(false);
  isGdprCountry.returns(Promise.resolve(false));
  await canTrackUser({ notice, register });
  t.true(notice.called);
  t.true(register.called);
});

test("doesn't request notice or register inside gdpr country", async t => {
  const { notice, register } = stubs();
  acknowledged.returns(false);
  isGdprCountry.returns(Promise.resolve(true));
  await canTrackUser({ notice, register });
  t.false(notice.called);
  t.false(register.called);
});

test('acknowledges after notice is resolved', async t => {
  const { register } = stubs();
  let resolve: undefined | (() => void);

  const notice = sinon.fake.returns(new Promise(r => (resolve = r)));

  acknowledged.returns(false);
  isGdprCountry.returns(Promise.resolve(false));
  const promise = canTrackUser({ notice, register });

  t.false(acknowledge.called);

  if (!resolve) {
    return t.truthy(resolve);
  }

  resolve();

  await promise;

  t.true(acknowledge.called);
});
