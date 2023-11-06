const montrealTimeZone = 'America/Toronto';

const options = {
  timeZone: montrealTimeZone,
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

export const montrealDate = new Date().toLocaleString('en-US', options);

