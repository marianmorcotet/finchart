export const customGetDate = (date: number): Array<string> => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  let newDate = date * 1000
  return [
    'date: ' +
      months[new Date(newDate).getMonth()] +
      ' ' +
      new Date(newDate).getUTCDate(),
    'time: ' +
      new Date(newDate).getUTCHours() +
      ':' +
      new Date(newDate).getUTCMinutes() +
      ':' +
      new Date(newDate).getUTCSeconds(),
  ]
}
