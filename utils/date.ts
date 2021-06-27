export const formatDate = (
  date: string | number | Date,
  locate: string | string[] = [],
  options: Intl.DateTimeFormatOptions = {}
) => new Intl.DateTimeFormat(locate, options).format(new Date(date));
