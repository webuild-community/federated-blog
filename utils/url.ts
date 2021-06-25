export const getHostName = (url: string): string => {
  const [host, _] = url.replace(/https?:\/\//, '').split('/');
  return host;
};
