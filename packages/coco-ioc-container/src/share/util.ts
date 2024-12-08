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
 * 判断subclass是否是superclass的子类
 * @param subclass
 * @param superclass
 */
export function isSubclassOf(subclass: Class<any>, superclass: Class<any>) {
  if (typeof subclass !== 'function' || typeof superclass !== 'function') {
    return false;
  }

  let proto = Object.getPrototypeOf(subclass); // 获取子类的父类
  while (proto) {
    if (proto === superclass) {
      return true; // 找到父类
    }
    proto = Object.getPrototypeOf(proto); // 向上查找原型链
  }
  return false; // 没有匹配到父类
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
