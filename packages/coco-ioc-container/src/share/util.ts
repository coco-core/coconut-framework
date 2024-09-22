/**
 * 第一个字母改为小写，其他不变
 */
export function lowercaseFirstLetter(str: string) {
  if (!str) {
    if (__DEV__ && typeof str !== 'string') {
      throw new Error(`请传入字符串:[${str}]`)
    }
    return str;
  }
  return str[0].toLowerCase() + str.slice(1);
}
