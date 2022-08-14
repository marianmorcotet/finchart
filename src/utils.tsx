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
  return [
    'date: ' +
      months[new Date(date).getMonth()] +
      ' ' +
      new Date(date).getUTCDate(),
    'time: ' +
      new Date(date).getUTCHours() +
      ':' +
      new Date(date).getUTCMinutes() +
      ':' +
      new Date(date).getUTCSeconds(),
  ]
}
