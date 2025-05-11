import * as crypto from 'crypto';

/**
 * 生成 md5 哈希值
 * @param str 要哈希的字符串
 * @returns 哈希值
 */
export function md5(str: string) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}
