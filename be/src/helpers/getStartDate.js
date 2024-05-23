export default function getStartDate () {
  const currentDate = new Date();
  currentDate.setHours(0,0,0,0);
  return currentDate;
}