//토큰이 생겼을 때 토큰 관련 로직 (예시) -> 바뀔예정

// export function getTokenDuration() {
//   const storedExpirationDate = localStorage.getItem('expiration');
//   if (!storedExpirationDate) return;
//   const expirationDate = new Date(storedExpirationDate);
//   const nowDate = new Date();
//   const duration = expirationDate.getTime() - nowDate.getTime();
//   return duration;
// }

export function getToken(token: string) {
  localStorage.setItem('token', token);
  // const expiration = new Date();
  // expiration.setHours(expiration.getHours() + 1);
  // localStorage.setItem('expiration', expiration.toISOString());
}

//토큰이 있는지 계산하는 함수. 토큰 계산 값을 확인해 리턴해준다.
export function getAuthToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  // const tokenDuration = getTokenDuration();
  // if (!tokenDuration) return null;
  // if (tokenDuration < 0) {
  //   return 'EXPIRED';
  // }
  return token;
}
