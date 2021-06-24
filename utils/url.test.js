import { getHostName } from './url';

describe('getHostName', () => {
  it('Should works with URLs started with https', () => {
    const url = 'https://example.com/this-is-a-test';
    const actual = getHostName(url);
    const expected = 'example.com';
    expect(actual).toEqual(expected);
  });

  it('Should works with URLs startd with http', () => {
    const url = 'http://example.com/this-is-a-test';
    const actual = getHostName(url);
    const expected = 'example.com';
    expect(actual).toEqual(expected);
  });

  it('Should works with URLs with no path', () => {
    const url = 'http://example.com/';
    const actual = getHostName(url);
    const expected = 'example.com';
    expect(actual).toEqual(expected);
  });

  it('Should works with just a domain', () => {
    const url = 'http://example.com';
    const actual = getHostName(url);
    const expected = 'example.com';
    expect(actual).toEqual(expected);
  });
});
