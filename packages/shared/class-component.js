

export const protoFunctionsBindThis = (clazz, ins) => {
  const fns = Object.getOwnPropertyNames(clazz.prototype);
  for (const fn of fns) {
    if (fn === 'constructor') {
      continue;
    }
    ins[fn] = clazz.prototype[fn].bind(ins);
  }
}