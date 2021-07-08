import base64 from 'base-64';

const DEFAULT_AVATAR = 'kaonashi.jpg';
export const getAvatarUrl = (file_name?: string): string => {
  if (file_name?.match(/https?:\/\//)) file_name = DEFAULT_AVATAR;
  return `/avatars/${file_name || DEFAULT_AVATAR}`;
};

export const getHostName = (url: string): string => {
  const [host, _] = url.replace(/https?:\/\//, '').split('/');
  return host;
};

export const encodePostUrl = (url: string, author: number) => {
  const buffer = author.toString() + '|' + url.replace(/https?:\/\//, '');
  return base64.encode(buffer);
};

export const decodePostUrl = (
  buffer: string
): { author: number; url: string } => {
  const decoded = base64.decode(buffer);
  const match = decoded.match(/(\d+)\|(.*)/) ?? [];
  if (match.length > 2) {
    const author = +match[1];
    const url = match[2];
    return {
      author: author,
      url: `https://${url}`
    };
  }
  throw new Error('Invalid payload');
};
