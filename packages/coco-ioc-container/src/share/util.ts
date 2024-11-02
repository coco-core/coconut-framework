/**
 * 第一个字母改为小写，其他不变
 */
export function lowercaseFirstLetter(str: string) {
  if (!str) {
    if (__DEV__ && typeof str !== 'string') {
      throw new Error(`请传入字符串:[${str}]`);
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

/**
 * 生成一个只能执行一次的函数
 * 支持后赋值，只需要在实际调用之前赋值即可
 * @param fn
 */
export function once<Input extends any[], Output>(
  fn?: (...args: Input) => Output
): (...args: Input) => Output | void {
  let runTimes = 0;
  const onceFn = (...args: Input) => {
    if (onceFn.fn) {
      if (runTimes === 0) {
        runTimes++;
        return onceFn.fn(...args);
      }
    }
  };
  onceFn.fn = fn;
  return onceFn;
}
