export function prepareHour(date) {
  if (!date) return "-:-";
  const d = new Date(date);
  return d.getHours() + ":" + d.getMinutes();
}

export function getStartAndEndOfWeek(date = new Date()) {
  const dayOfWeek = date.getDay();
  const fromDate = new Date(date);

  // Calculate the start date of the week (Monday 00:00) in the timezone with offset +7
  fromDate.setDate(fromDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
  fromDate.setUTCHours(7, 0, 0, 0);

  const toDate = new Date(fromDate);
  // Calculate the end date of the week (Sunday 23:59) in the timezone with offset +7
  toDate.setDate(toDate.getDate() + 6); // Adding 6 days to get to Sunday
  toDate.setUTCHours(23, 59, 59, 999);
  toDate.setUTCHours(toDate.getUTCHours() + 7);
  return { fromDate: new Date(fromDate), toDate: new Date(toDate) };
}

export function getStartAndEndOfMonth(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const fromDate = new Date(year, month, 1);
  const toDate = new Date(year, month + 1, 0);
  return { fromDate, toDate };
}

export function getStartAndEndOfPeriod({ date = new Date(), period = "week" }) {
  switch (period) {
    case "week":
      return getStartAndEndOfWeek(new Date(date));
    case "month":
      return getStartAndEndOfMonth(new Date(date));
  }
}
