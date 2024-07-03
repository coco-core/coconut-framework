xdescribe('reactive', () => {
  test('修改值，则支持cb', () => {
    const obj = { age: 22 };
    const cb = jest.fn();
    const decor = _factory(cb);
    const initFns = [];
    decor(undefined, {
      kind: 'field',
      name: 'age',
      addInitializer: (fn) => initFns.push(fn),
    });
    initFns.map((fn) => fn.call(obj));
    obj.age = 23;
    expect(cb).toHaveBeenCalledTimes(1);
    expect(obj.age).toBe(23);
  });
});
