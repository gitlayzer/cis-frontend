export const maskUsername = (username: string): string => {
  if (!username) return '';
  
  // 邮箱格式
  if (username.includes('@')) {
    const [local, domain] = username.split('@');
    const maskedLocal = local.length > 3 
      ? `${local.slice(0, 3)}${'*'.repeat(local.length - 3)}`
      : local;
    return `${maskedLocal}@${domain}`;
  }
  
  // 普通用户名
  return username.length > 2 
    ? `${username.slice(0, 2)}${'*'.repeat(username.length - 2)}`
    : username;
}; 