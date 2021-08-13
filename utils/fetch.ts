import channelsData from '@/channels.json';
import { Doc } from '@/types/sharedTypes';
import MaxHeap from '@/utils/MaxHeap';
import Parser from 'rss-parser';

export const fetchHtml = async (url: string) => {
  const res = await fetch(url);
  return await res.text();
};

type HeapNode = [Doc, number, number];

export const fetchDocs = async (): Promise<Doc[]> => {
  const parser = new Parser();
  let docs = [];
  const docsArray: Array<Doc[]> = await Promise.all(
    channelsData.channels.map(async (channel, channelIndex) => {
      try {
        const result = await parser.parseURL(channel.url);
        return (
          result?.items.map((item) => ({
            ...item,
            author: channel,
            authorId: channelIndex
          })) ?? []
        );
      } catch (error) {
        console.error('Error reading blog:', channel.url);
        console.error(error);
        return [];
      }
    })
  );
  const maxHeap = new MaxHeap<HeapNode>((node1, node2) => {
    let dateNode1 = new Date(node1[0].pubDate as string);
    let dateNode2 = new Date(node2[0].pubDate as string);
    if (dateNode1 > dateNode2) {
      return 1;
    }
    if (dateNode1 == dateNode2) {
      return 0;
    }
    return -1;
  });
  for (let channel = 0; channel < docsArray.length; channel++) {
    if (docsArray[channel].length > 0) {
      maxHeap.push([docsArray[channel][0], channel, 0]);
    }
  }
  while (maxHeap.length > 0) {
    const [bePushedDoc, channel, indexOnChannel] = maxHeap.pop() as HeapNode;
    docs.push(bePushedDoc);
    if (indexOnChannel !== docsArray[channel].length - 1) {
      maxHeap.push([
        docsArray[channel][indexOnChannel + 1],
        channel,
        indexOnChannel + 1
      ]);
    }
  }
  return docs;
};
