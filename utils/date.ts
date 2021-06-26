export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-GB').format(new Date(date));
