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
