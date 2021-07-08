import MaxHeap from './MaxHeap';

const maxHeap = new MaxHeap((a, b) => {
  if (a > b) return 1;
  if (a === b) return 0;
  return -1;
});

maxHeap.push(1);
maxHeap.push(5);
maxHeap.push(3);
maxHeap.push(10);
maxHeap.push(7);

describe('Heap', () => {
  it('Should have length equals to 5', () => {
    expect(maxHeap.length).toEqual(5);
  });

  it('Should peek the biggest element', () => {
    expect(maxHeap.peek()).toEqual(10);
  });

  it('Should sort the biggest to top', () => {
    maxHeap.push(15);
    expect(maxHeap.peek()).toEqual(15);
    maxHeap.push(12);
    expect(maxHeap.peek()).toEqual(15);
  });

  it('Should pop the biggest to smallest', () => {
    expect(maxHeap.pop()).toEqual(15);
    expect(maxHeap.pop()).toEqual(12);
    expect(maxHeap.pop()).toEqual(10);
    expect(maxHeap.pop()).toEqual(7);
    expect(maxHeap.pop()).toEqual(5);
    expect(maxHeap.pop()).toEqual(3);
    expect(maxHeap.pop()).toEqual(1);
  });

  it('Should return undefined if peek/pop when empty', () => {
    expect(maxHeap.length).toEqual(0);
    expect(maxHeap.pop()).toBeUndefined();
    expect(maxHeap.peek()).toBeUndefined();
  });
});
