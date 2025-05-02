import {
  createDecoratorExp,
  createDecoratorExpByName,
} from '../../ioc-container/create-decorator-exp.ts';

describe('create-decorator-exp:createDecoratorExp', () => {
  beforeEach(async () => {});

  afterEach(async () => {
    jest.resetModules();
  });

  test('createDecoratorExp第一个参数可以使用类', async () => {
    let shouldThrowError = false;
    try {
      class A {}
      createDecoratorExp(A);
    } catch (e) {
      shouldThrowError = true;
    }
    expect(shouldThrowError).toBe(false);
  });

  test('createDecoratorExp第一个参数不能使用数字', async () => {
    let shouldThrowError = false;
    try {
      // @ts-ignore
      createDecoratorExp(1);
    } catch (e) {
      shouldThrowError = true;
    }
    expect(shouldThrowError).toBe(true);
  });

  test('createDecoratorExp第一个参数不能使用字符串', async () => {
    let shouldThrowError = false;
    try {
      // @ts-ignore
      createDecoratorExp('abc');
    } catch (e) {
      shouldThrowError = true;
    }
    expect(shouldThrowError).toBe(true);
  });

  test('createDecoratorExp第一个参数不能使用对象', async () => {
    let shouldThrowError = false;
    try {
      // @ts-ignore
      createDecoratorExp({});
    } catch (e) {
      shouldThrowError = true;
    }
    expect(shouldThrowError).toBe(true);
  });

  test('createDecoratorExp第一个参数不能使用函数', async () => {
    let shouldThrowError = false;
    try {
      // @ts-ignore
      createDecoratorExp(function () {});
    } catch (e) {
      shouldThrowError = true;
    }
    expect(shouldThrowError).toBe(true);
  });
});

describe('create-decorator-exp:createDecoratorExpByName', () => {
  beforeEach(async () => {});

  afterEach(async () => {
    jest.resetModules();
  });

  test('createDecoratorExpByName第一个参数使用字符串', async () => {
    let shouldThrowError = false;
    try {
      createDecoratorExpByName('abc');
    } catch (e) {
      shouldThrowError = true;
    }
    expect(shouldThrowError).toBe(false);
  });

  test('createDecoratorExpByName第一个参数不能使用数字', async () => {
    let shouldThrowError = false;
    try {
      // @ts-ignore
      createDecoratorExpByName(1);
    } catch (e) {
      shouldThrowError = true;
    }
    expect(shouldThrowError).toBe(true);
  });

  test('createDecoratorExpByName第一个参数不能使用对象', async () => {
    let shouldThrowError = false;
    try {
      // @ts-ignore
      createDecoratorExpByName({});
    } catch (e) {
      shouldThrowError = true;
    }
    expect(shouldThrowError).toBe(true);
  });

  test('createDecoratorExpByName第一个参数不能使用函数', async () => {
    let shouldThrowError = false;
    try {
      // @ts-ignore
      createDecoratorExpByName(function () {});
    } catch (e) {
      shouldThrowError = true;
    }
    expect(shouldThrowError).toBe(true);
  });

  test('createDecoratorExpByName第一个参数不能使用类', async () => {
    let shouldThrowError = false;
    try {
      class A {}
      // @ts-ignore
      createDecoratorExpByName(A);
    } catch (e) {
      shouldThrowError = true;
    }
    expect(shouldThrowError).toBe(true);
  });
});
