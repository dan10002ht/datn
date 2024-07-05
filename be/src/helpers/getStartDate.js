export default function getStartDate() {
  const currentDate = new Date(new Date().setHours(new Date().getHours() + 7));
  currentDate.setHours(0, 0, 0, 0);
  return currentDate;
}
