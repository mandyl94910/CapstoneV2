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
  const currentAttempts = await client.incr(key);  // Use 'client' instead of 'redisClient'

  if (currentAttempts === 1) {
    // If this is the first attempt, set expiration time to 5 minutes
    await client.expire(key, 300);
  }

  if (currentAttempts > 5) {
    // If attempts exceed 5, return an error message and stop incrementing
    return { tooManyAttempts: true, message: "您尝试的次数过多，请5分钟后重试" };
  }

  return { tooManyAttempts: false };
}
  
module.exports = { saveSession, getSession, updateSession, deleteSession,incrementLoginAttempts };