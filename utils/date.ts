export const formatDate = (date: string | number | Date) =>
  new Intl.DateTimeFormat('en-GB').format(new Date(date));
