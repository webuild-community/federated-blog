import { decodePostUrl, encodePostUrl, getHostName } from './url';

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

describe('URL encode and decode', () => {
  it('Should encode and decode properly', () => {
    const authorId = 52;
    const postUrl = 'https://example.com/foo/bar/here.html';
    const encoded = encodePostUrl(postUrl, authorId);
    const decoded = decodePostUrl(encoded);
    expect(decoded.author).toEqual(authorId);
    expect(decoded.url).toEqual(postUrl);
  });

  it('Invalid payload should throw error', () => {
    const encoded = 'blahblohfoobar';
    expect(() => decodePostUrl(encoded)).toThrow('Invalid payload');
  });
});
