export const fetchHtml = async (url) => {
  const res = await fetch(url);
  return await res.text();
};
