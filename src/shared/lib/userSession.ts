/**
 * Simple user session management
 * For now, uses localStorage (no auth)
 * Later, this can be replaced with proper authentication
 */

export function getUserId(): string {
  if (typeof window === 'undefined') {
    return 'server-user';
  }

  let userId = localStorage.getItem('user_id');
  
  if (!userId) {
    userId = 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('user_id', userId);
  }

  return userId;
}

export function setUserId(userId: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user_id', userId);
  }
}

export function getUserName(): string {
  if (typeof window === 'undefined') {
    return 'user';
  }

  let username = localStorage.getItem('username');
  
  if (!username) {
    // Generate a simple username
    username = 'user' + Math.random().toString(36).substr(2, 6);
    localStorage.setItem('username', username);
  }

  return username;
}

export function setUserName(username: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('username', username);
  }
}


