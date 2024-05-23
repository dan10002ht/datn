import {HOUR, MINUTE} from '../const/common';

export function prepareSeconds(date = new Date()) {
  const currentDate = new Date(date);
  return (
    currentDate.getHours() * HOUR + currentDate.getMinutes() * MINUTE + currentDate.getSeconds()
  );
}
