export const excerpt = (str: string, wordCount: number): string => {
  let taken = str.split(/\s/).slice(0, wordCount).join(' ');
  if (taken.length < str.length) {
    taken = taken.replace(/(\.|\,)$/g, '');
    taken += '...';
  }
  return taken;
};
