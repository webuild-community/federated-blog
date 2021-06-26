import { formatDate } from './date';

describe('formatDate', () => {
  it('Should works with locate string', () => {
    const input = '6/26/2021, 17:20:45';
    const actual = formatDate(input);
    const expected = '26/06/2021';
    expect(actual).toEqual(expected);
  });

  it('Should works with timestamp', () => {
    const input = 1624702929549;
    const actual = formatDate(input);
    const expected = '26/06/2021';
    expect(actual).toEqual(expected);
  });

  it('Should works with time string', () => {
    const input = 'Sat Jun 26 2021 17:23:19 GMT+0700 (Indochina Time)';
    const actual = formatDate(input);
    const expected = '26/06/2021';
    expect(actual).toEqual(expected);
  });
});
