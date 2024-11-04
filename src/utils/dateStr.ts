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
  // 입력된 날짜 문자열을 UTC 기준으로 파싱
  const date = new Date(dateStr);

  // KST 시간으로 변환 (UTC + 9시간)
  const kstDate = new Date(date.getTime() + 9 * 60 * 60000);

  // MM-DD hh:mm 형식으로 포맷팅
  const formattedDate =
    String(kstDate.getUTCMonth() + 1).padStart(2, '0') +
    '-' +
    String(kstDate.getUTCDate()).padStart(2, '0');

  const formattedTime =
    String(kstDate.getUTCHours()).padStart(2, '0') +
    ':' +
    String(kstDate.getUTCMinutes()).padStart(2, '0');

  return `${formattedDate} ${formattedTime}`;
}
