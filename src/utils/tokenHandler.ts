//토큰이 생겼을 때 토큰 관련 로직 (예시) -> 바뀔예정

import { redirect } from 'react-router-dom';

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

  return token;
}

export function checkAdminToken() {
  const token = localStorage.getItem('token');
  if (
    token !==
    'eyJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6ImFkbWluIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcyOTI3MjE1MSwiZXhwIjoxNzI5ODc2OTUxfQ.TTVtY67gKeB0CnUuqKO74BD5jzxpgCTuvi1TMGelXsM'
  )
    return null;

  return token;
}

export function checkAdminLoader() {
  const token = localStorage.getItem('token');
  if (
    token !==
    'eyJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6ImFkbWluIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcyOTI3MjE1MSwiZXhwIjoxNzI5ODc2OTUxfQ.TTVtY67gKeB0CnUuqKO74BD5jzxpgCTuvi1TMGelXsM'
  ) {
    return redirect('/');
  }
  return null;
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect('/');
  }
  return null;
}
