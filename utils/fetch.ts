export const fetchHtml = async (url: string) => {
  const res = await fetch(url);
  return await res.text();
};
