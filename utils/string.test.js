import { excerpt } from './string';

describe('excerpt', () => {
  it('Should work with strings that longer than the word count', () => {
    const str =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.';
    const actualResult = excerpt(str, 5);
    expect(actualResult).toEqual('Lorem ipsum dolor sit amet...');
  });

  it('Should work with strings that shorter than the word count', () => {
    const str = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const actualResult = excerpt(str, 9);
    expect(actualResult).toEqual(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    );
  });

  it('Should work with empty string', () => {
    const str = '';
    const actualResult = excerpt(str, 10);
    expect(actualResult).toEqual('');
  });

  it('Should work with undefined content', () => {
    const actualResult = excerpt(undefined, 10);
    expect(actualResult).toEqual('');
  });

  it('Should work with undefined word count', () => {
    const str = 'Hello world';
    const actualResult = excerpt(str);
    expect(actualResult).toEqual('');
  });

  it('Should work with zero as word count', () => {
    const str = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const actualResult = excerpt(str, 0);
    expect(actualResult).toEqual('');
  });

  it('Should work with unicode string', () => {
    const str = 'Xin chào các bạn, đây là tiếng Việt.';
    const actualResult = excerpt(str, 3);
    expect(actualResult).toEqual('Xin chào các...');
  });

  it('Punctuation at the end of the excerpt should be removed', () => {
    const str = 'Xin chào các bạn, đây là tiếng Việt.';
    const actualResult = excerpt(str, 4);
    expect(actualResult).toEqual('Xin chào các bạn...');
  });
});
