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

/**
 * 是{}，不是基础数据类型，也不是function array set map...
 * @param v
 */
export function isPlainObject(v: any) {
  return Object.prototype.toString.call(v) === '[object Object]';
}

/**
 * 返回构造函数
 */
export function constructOf<T>(o: any): Class<T> {
  return o.constructor;
}
