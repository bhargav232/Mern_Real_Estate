const montrealTimeZone = 'America/Toronto';

const options = {
  timeZone: montrealTimeZone,
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
};

export const montrealDate = new Date().toLocaleString('en-US', options);

