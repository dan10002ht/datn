export default function getStartDate(date = new Date()) {
  const _date = new Date(date);
  const currentDate = new Date(_date.setHours(_date.getHours() + 7));
  currentDate.setHours(0, 0, 0, 0);
  return currentDate;
}
