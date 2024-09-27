// C:\CPRG306\CapstoneV2\lib\redisUtils\listOps.js
const client = require('../redis');

// Function name: saveSession
// Function: Saves the user session information into the Redis cache. If the session already exists, the existing cache is updated.
// Parameters:
// userId (string): the user's unique identifier.
// sessionData (object): An object containing the session details.
// ttl (number, optional): the cache expiration time in seconds, defaults to 7200 seconds (2 hours).
async function saveSession(userId, sessionData, ttl = 7200) {
    //Purge old cached data to ensure no obfuscation
    await client.del(`session_${userId}`); 

    await client.set(`session:${userId}`, JSON.stringify(sessionData), 'EX', ttl);
}

// Function name: getSession
// Function: Get user session information from the Redis cache.
// Parameters:
// userId (string): the user's unique identifier.
// Parameters: // userId (string): the user's unique identifier. // Return value: the parsed session object if it exists, or null if it does not.
async function getSession(userId) {
    const session = await client.get(`session:${userId}`);
    return session ? JSON.parse(session) : null;
}

// Function name: updateSession
// Function: Updates the user session information in the Redis cache. If the session information already exists, update the existing cache.
// Parameters:
// userId (string): the user's unique identifier.
// sessionData (object): The object containing the session details.
// ttl (number, optional): the cache expiration time in seconds, defaults to 7200 seconds (2 hours).
async function updateSession(userId, sessionData, ttl = 7200) {
    await client.set(`session:${userId}`, JSON.stringify(sessionData), 'EX', ttl);
}

// Function name: deleteSession
// Function: Deletes the session information for the specified user from the Redis cache.
// Parameters:
// userId (string): the user's unique identifier.
async function deleteSession(userId) {
    await client.del(`session:${userId}`);
}

// function name: incrementLoginAttempts
// Function name: incrementLoginAttempts. If the number of attempts is too high, prevent further attempts.
// Parameters:
// loginIdentifier (string): the identifier (e.g. username or IP address) used to identify the login attempts.
// Parameters: // loginIdentifier (string): the identifier used to identify the login attempt (e.g. username or IP address).
async function incrementLoginAttempts(loginIdentifier) {
  const key = `login_attempts_${loginIdentifier}`;
  const currentAttempts = await client.incr(key);  

  if (currentAttempts === 1) {
    // If this is the first attempt, set expiration time to 5 minutes
    await client.expire(key, 300);
  }

  if (currentAttempts > 5) {
    // If attempts exceed 5, return an error message and stop incrementing
    return { tooManyAttempts: true, message: "You have tried too many times, please try again in 5 minutes." };
  }

  return { tooManyAttempts: false };
}
  
module.exports = { saveSession, getSession, updateSession, deleteSession,incrementLoginAttempts };