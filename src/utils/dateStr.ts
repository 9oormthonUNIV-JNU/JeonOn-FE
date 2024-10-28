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
  // Date 객체로 변환
  const date = new Date(dateStr);

  // 월, 일 부분 (MM-DD)
  const formattedDate =
    String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');

  // 시간 부분 (hh:mm)
  const formattedTime =
    String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');

  // 날짜와 시간 결합
  return `${formattedDate} ${formattedTime}`;
}
