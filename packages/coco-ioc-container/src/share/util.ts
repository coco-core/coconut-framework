function transformFirstLetter(str: string, transform: 'lower' | 'upper') {
  if (!str) {
    if (__DEV__ && typeof str !== 'string') {
      throw new Error(`请传入字符串:[${str}]`);
    }
    return str;
  }
  switch (transform) {
    case 'lower':
      return str[0].toLowerCase() + str.slice(1);
    case 'upper':
      return str[0].toUpperCase() + str.slice(1);
    default:
      return str;
  }
}
/**
 * 第一个字母改为小写，其他不变
 */
export function lowercaseFirstLetter(str: string) {
  return transformFirstLetter(str, 'lower');
}
/**
 * 第一个字母改为大写，其他不变
 */
export function uppercaseFirstLetter(str: string) {
  return transformFirstLetter(str, 'upper');
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
 * 判断subclass是否是superclass的子类
 * @param childCls
 * @param parentCls
 */
export function isChildClass(childCls: Class<any>, parentCls: Class<any>) {
  if (typeof childCls !== 'function' || typeof parentCls !== 'function') {
    return false;
  }

  return parentCls === Object.getPrototypeOf(childCls);
}

/**
 * 生成一个只能执行一次的函数
 * @param fn
 */
export function once(fn?: () => void): (THIS: any) => void {
  let runTimes = 0;
  const onceFn = (THIS: any) => {
    if (onceFn.fn) {
      if (runTimes === 0) {
        runTimes++;
        return onceFn.fn.call(THIS);
      }
    }
  };
  onceFn.fn = fn;
  return onceFn;
}

// 判断入参是否是类
export function isClass(v: any) {
  return typeof v === 'function' && v.toString().includes('class');
}
