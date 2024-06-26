export function prepareHour(date) {
  if (!date) return '-:-';
  const d = new Date(date);
  return d.getHours() + ':' + d.getMinutes();
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
  const year = date.getFullYear();
  const month = date.getMonth();

  const fromDate = new Date(year, month, 1);
  const toDate = new Date(year, month + 1, 0);
  return {fromDate, toDate};
}

export function getStartAndEndOfPeriod({date = new Date(), period = 'week'}) {
  switch (period) {
    case 'week':
      return getStartAndEndOfWeek(new Date(date));
    case 'month':
      return getStartAndEndOfMonth(new Date(date));
  }
}

const prepareUtcDate = (date = new Date()) => {
  const d = new Date(date);
  d.setUTCHours(7, 0, 0, 0);
  return d;
};

const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

function getLabelsInRange(fromDate, toDate) {
  const labels = [];
  const currentDate = new Date(fromDate);

  while (currentDate <= toDate) {
    labels.push(
      `${dayNames[currentDate.getDay()]} ${currentDate.getDate()}/${currentDate.getMonth() + 1}`,
    );
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return labels;
}

export const getLabels = ({period = 'month', date = prepareUtcDate(new Date())}) => {
  const d = new Date(date);

  const {fromDate, toDate} = getStartAndEndOfPeriod({date: d, period});
  return getLabelsInRange(fromDate, toDate);
};
