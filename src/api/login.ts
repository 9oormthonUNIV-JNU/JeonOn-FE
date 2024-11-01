import { api } from '@/utils/customAxios';
import { getToken } from '@/utils/tokenHandler';

// 로그인 및 회원가입 요청
export const login = async (nickname: string, password: string) => {
  try {
    // 백엔드 연결 후 주석 해제
    const response = await api.post('/login', {
      nickname,
      password,
    });

    getToken(response.headers['access-token']);
    return response.data;
  } catch (error) {
    // 에러 처리
    throw new Error('로그인 요청 실패: ' + error);
  }
};

// 로그아웃
export const logout = () => {
  localStorage.removeItem('token');
  console.log('로그아웃 성공: 토큰 삭제됨');
};

// 로그인 확인
export const isLoggedIn = () => {
  const token = localStorage.getItem('token');

  if (!token) return false;

  return token;

  // try {
  //   const parsedToken = JSON.parse(token);
  //   console.log('로그인 상태 확인:', parsedToken);
  //   return !!parsedToken.token;
  // } catch (error) {
  //   console.error('토큰 파싱 중 오류 발생:', error);
  //   return false;
  // }
};
