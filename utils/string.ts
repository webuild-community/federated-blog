export const minimum = (str: string = '', length: number): string => {
  if (str.length < length) return '';
  else return str;
};

export const excerpt = (str: string = '', wordCount: number = 0): string => {
  let taken = str.split(/\s/).slice(0, wordCount).join(' ');
  if (taken.length && taken.length < str.length) {
    taken = taken.replace(/(\.|\,)$/g, '');
    taken += '...';
  }
  return taken;
};
