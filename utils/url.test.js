import { decodePostUrl, encodePostUrl, getAvatarUrl, getHostName } from './url';

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

describe('getAvatarUrl', () => {
  it('Should show default avatar if file_name is empty', () => {
    const actual = getAvatarUrl('');
    expect(actual).toBe('/avatars/kaonashi.jpg');
  });

  it('Should show default avatar if file_name is undefined', () => {
    const actual = getAvatarUrl();
    expect(actual).toBe('/avatars/kaonashi.jpg');
  });

  it('Should show default avatar if file_name is null', () => {
    const actual = getAvatarUrl(null);
    expect(actual).toBe('/avatars/kaonashi.jpg');
  });

  it('Should show correct avatar if file_name is something valid', () => {
    const actual = getAvatarUrl('tlinh.png');
    expect(actual).toBe('/avatars/tlinh.png');
  });

  it('Should show default avatar if file_name is an URL', () => {
    const actual = getAvatarUrl('https://foo.bar.com/image/something.jpg');
    expect(actual).toBe('/avatars/kaonashi.jpg');
  });
});
