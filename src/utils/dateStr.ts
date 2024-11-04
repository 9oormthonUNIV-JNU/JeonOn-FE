export function formatDateToYYYYMMDD(dateStr: string) {
  // Date 객체로 변환
  const date = new Date(dateStr);

  const formattedDate =
    date.getFullYear() +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0');

  return formattedDate;
}

export function formatDateToMMDDhhmm(dateStr: string) {
  const date = new Date(dateStr);

  const kstOffset = 9 * 60; // KST (UTC+9) offset in minutes
  const utcOffset = date.getTimezoneOffset();
  const kstDate = new Date(date.getTime() + (kstOffset - utcOffset) * 60000);

  const formattedDate =
    String(kstDate.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(kstDate.getDate()).padStart(2, '0');

  const formattedTime =
    String(kstDate.getHours()).padStart(2, '0') +
    ':' +
    String(kstDate.getMinutes()).padStart(2, '0');

  return `${formattedDate} ${formattedTime}`;
}
