import { api } from "@/utils/customAxios";

// 로그인 및 회원가입 요청
export const login = async (
  nickname: string,
  password: string
): Promise<{ token: string }> => {
  try {
    // 백엔드 연결 전! 임시 데이터 반환
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("로그인 시도 중...");

        // 로그인 테스트
        if (nickname === "Test" && password === "1234") {
          const mockToken = JSON.stringify({
            token: "mockToken",
            userId: "user123",
            nickname: nickname,
          });

          localStorage.setItem("token", mockToken); // 토큰 localStorage에 저장
          console.log("로그인 성공: ", {
            token: mockToken,
          });
          resolve({ token: mockToken });
        } else {
          console.log("로그인 실패: 잘못된 아이디/비밀번호");
          reject(
            new Error("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.")
          );
        }
      }, 1000);
    });

    // 백엔드 연결 후 주석 해제
    // const response = await api.post("/api/v1/login", {
    //   nickname,
    //   password,
    // });
    // if (response.data.success) {
    //   const { token } = response.data;
    //   localStorage.setItem("token", token); // 토큰이 있다면 localStorage에 저장
    //   return response.data; // 필요한 데이터를 반환
    // } else {
    //   throw new Error("로그인 실패: " + response.data.error);
    // }
  } catch (error) {
    // 에러 처리
    throw new Error("로그인 요청 실패: " + error);
  }
};

// 로그아웃
export const logout = () => {
  localStorage.removeItem("token");
  console.log("로그아웃 성공: 토큰 삭제됨");
};

// 로그인 확인
export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const parsedToken = JSON.parse(token);
    console.log("로그인 상태 확인:", parsedToken);
    return !!parsedToken.token;
  } catch (error) {
    console.error("토큰 파싱 중 오류 발생:", error);
    return false;
  }
};
