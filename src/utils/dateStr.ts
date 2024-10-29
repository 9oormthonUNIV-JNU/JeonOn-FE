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

  const kstOffset = 9 * 60;
  const utcOffset = date.getTimezoneOffset();
  const kstDate = new Date(date.getTime() + (kstOffset - utcOffset) * 60000);

  const utcDate = new Date(kstDate.getTime() - 9 * 60 * 60000);

  const formattedDate =
    String(utcDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(utcDate.getDate()).padStart(2, "0");

  const formattedTime =
    String(utcDate.getHours()).padStart(2, "0") +
    ":" +
    String(utcDate.getMinutes()).padStart(2, "0");

  return `${formattedDate} ${formattedTime}`;
}