// C:\CPRG306\CapstoneV2\lib\redisUtils\listOps.js
const client = require('../redis');

async function saveSession(userId, sessionData, ttl = 7200) {
    await client.set(`session:${userId}`, JSON.stringify(sessionData), 'EX', ttl);
}

async function getSession(userId) {
    const session = await client.get(`session:${userId}`);
    return session ? JSON.parse(session) : null;
}

async function updateSession(userId, sessionData, ttl = 7200) {
    await client.set(`session:${userId}`, JSON.stringify(sessionData), 'EX', ttl);
}

async function deleteSession(userId) {
    await client.del(`session:${userId}`);
}

async function incrementLoginAttempts(loginIdentifier) {
    const key = `login_attempts_${loginIdentifier}`;
    const currentAttempts = await redisClient.incr(key);
  
    if (currentAttempts === 1) {
      // 如果是第一次尝试，设置过期时间为5分钟
      await redisClient.expire(key, 300);
    }
  
    if (currentAttempts > 5) {
      // 如果尝试次数超过5次，返回错误信息，并不再增加尝试次数
      return { tooManyAttempts: true, message: "您尝试的次数过多，请5分钟后重试" };
    }
  
    return { tooManyAttempts: false };
  }
  
module.exports = { saveSession, getSession, updateSession, deleteSession,incrementLoginAttempts };