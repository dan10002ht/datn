export function getDateRanges(fromDate, toDate) {
  let currentDate = new Date(fromDate);
  const toDateObj = new Date(toDate);
  const dateRanges = [];

  while (currentDate <= toDateObj) {
    const fromDateFormatted = new Date(currentDate);
    fromDateFormatted.setUTCHours(0, 0, 0, 0); // Set toDate to 07:00
    fromDateFormatted.setUTCHours(fromDateFormatted.getUTCHours() + 7); // Adjust to timezone with offset +7

    const toDateFormatted = new Date(fromDateFormatted);
    toDateFormatted.setDate(toDateFormatted.getDate());
    toDateFormatted.setUTCHours(23, 59, 59, 999); // Set toDate to 23:59
    toDateFormatted.setUTCHours(toDateFormatted.getUTCHours() + 7);

    dateRanges.push({
      fromDate: fromDateFormatted,
      toDate: toDateFormatted,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateRanges;
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
  return {fromDate: new Date(fromDate), toDate: new Date(toDate)};
}

export function getStartAndEndOfMonth(date = new Date()) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth();

  const fromDate = new Date(year, month, 1);
  const toDate = new Date(year, month + 1, 0);
  return {fromDate, toDate};
}

export function getStartAndEndOfDay(date = new Date()) {
  const [dateRange] = getDateRanges(new Date(), new Date());
  return dateRange;
}

export function getStartAndEndOfPeriod({date = new Date(), period = 'week'}) {
  switch (period) {
    case 'week':
      return getStartAndEndOfWeek(new Date(date));
    case 'month':
      return getStartAndEndOfMonth(new Date(date));
    case 'day':
      return getStartAndEndOfDay(new Date(date));
  }
}
