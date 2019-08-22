import test from 'ava';
import sinon from 'sinon';
import isGdprCountry from './isGdprCountry';

const mockResponse = (countryCode: string) => Promise.resolve({
  json: () => Promise.resolve({
    countryCode
  })
});

let fetchSpy: sinon.SinonSpy;
const stubFetch = (countryCode: string) =>
  (global as any).fetch = fetchSpy = sinon.fake.returns(mockResponse(countryCode));

test('returns false when it should', async t => {
  stubFetch('CA');
  t.false(await isGdprCountry());
});

test('returns true when it should', async t => {
  stubFetch('GB');
  t.true(await isGdprCountry());
});

test('fetches from the api', async t => {
  stubFetch('GB');
  await isGdprCountry();

  t.is(fetchSpy.args[0][0], 'http://ip-api.com/json');
});
