module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // 프론트엔드에서 API 호출 경로
        destination: "http://localhost:3001/api/:path*", // 백엔드 서버 포트로 리다이렉트
      },
    ];
  },
};
