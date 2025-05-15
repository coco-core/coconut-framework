import {
  createDecoratorExp,
  createDecoratorExpByName,
  createDecoratorExpFactory,
  type Decorator,
} from '../../ioc-container/create-decorator-exp.ts';
import {
  KindClass,
  KindField,
  KindMethod,
} from '../../ioc-container/decorator-context.ts';

describe('create-decorator-exp:createDecoratorExpFactory', () => {
  beforeEach(async () => {});

  afterEach(async () => {
    jest.resetModules();
  });

  test('类装饰器，不需要实例化就拿到装饰器参数', async () => {
    const fn = jest.fn();
    const create = createDecoratorExpFactory(fn);

    class Meta {}
    const m = create(Meta, { optional: true });
    const param = 22;
    @m(param)
    class A {}
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith(A, {
      decoratorName: 'meta',
      metadataClass: Meta,
      metadataKind: KindClass,
      metadataParam: param,
      postConstruct: undefined,
    });
  });

  test('类装饰器，实例化多次但不会再次调用记录装饰器参数的回调', async () => {
    const fn = jest.fn();
    const createDE = createDecoratorExpFactory(fn);
    class Meta {}
    const m = createDE(Meta, { optional: true });
    const param = 22;
    @m(param)
    class A {}
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith(A, {
      decoratorName: 'meta',
      metadataClass: Meta,
      metadataKind: KindClass,
      metadataParam: param,
      postConstruct: undefined,
    });
    // 多次实例化操作
    new A();
    expect(fn).toBeCalledTimes(1);
    new A();
    expect(fn).toBeCalledTimes(1);
  });

  test('filed装饰器，需要实例化一次拿到装饰器参数', async () => {
    const fn = jest.fn();
    const create = createDecoratorExpFactory(fn);

    class Meta {}
    const m = create(Meta, { optional: true });
    const param = 22;
    class A {
      @m(param)
      f;
    }
    expect(fn).toBeCalledTimes(0);
    new A();
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith(A, {
      decoratorName: 'meta',
      metadataClass: Meta,
      metadataKind: KindField,
      metadataParam: param,
      field: 'f',
      postConstruct: undefined,
    });
  });

  test('method装饰器，需要实例化一次拿到装饰器参数', async () => {
    const fn = jest.fn();
    const create = createDecoratorExpFactory(fn);

    class Meta {}
    const m = create(Meta, { optional: true });
    const param = 22;
    class A {
      @m(param)
      fn() {}
    }
    expect(fn).toBeCalledTimes(0);
    new A();
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith(A, {
      decoratorName: 'meta',
      metadataClass: Meta,
      metadataKind: KindMethod,
      metadataParam: param,
      field: 'fn',
      postConstruct: undefined,
    });
  });

  test('filed装饰器，只有第一次实例化会记录装饰器参数，后续实例化都不会', async () => {
    const fn = jest.fn();
    const create = createDecoratorExpFactory(fn);

    class Meta {}
    const m = create(Meta, { optional: true });
    const param = 22;
    class A {
      @m(param)
      f;
    }
    expect(fn).toBeCalledTimes(0);
    new A();
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith(A, {
      decoratorName: 'meta',
      metadataClass: Meta,
      metadataKind: KindField,
      metadataParam: param,
      field: 'f',
      postConstruct: undefined,
    });
    new A();
    expect(fn).toBeCalledTimes(1);
    new A();
    expect(fn).toBeCalledTimes(1);
    new A();
    expect(fn).toBeCalledTimes(1);
  });

  test('method装饰器，只有第一次实例化会记录装饰器参数，后续实例化都不会', async () => {
    const fn = jest.fn();
    const create = createDecoratorExpFactory(fn);

    class Meta {}
    const m = create(Meta, { optional: true });
    const param = 22;
    class A {
      @m(param)
      fn() {}
    }
    expect(fn).toBeCalledTimes(0);
    new A();
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith(A, {
      decoratorName: 'meta',
      metadataClass: Meta,
      metadataKind: KindMethod,
      metadataParam: param,
      field: 'fn',
      postConstruct: undefined,
    });
    new A();
    expect(fn).toBeCalledTimes(1);
    new A();
    expect(fn).toBeCalledTimes(1);
    new A();
    expect(fn).toBeCalledTimes(1);
  });

  test('不能装饰getter', async () => {
    let shouldThrowError = false;
    try {
      const fn = jest.fn();
      const create = createDecoratorExpFactory(fn);

      class Meta {}
      const m: () => Decorator<ClassGetterDecoratorContext> = create(Meta, {
        optional: true,
      });

      class A {
        @m()
        get g() {
          return 1;
        }
      }
    } catch (e) {
      shouldThrowError = true;
    }
    expect(shouldThrowError).toBe(true);
  });

  test('不能装饰setter', async () => {
    let shouldThrowError = false;
    try {
      const fn = jest.fn();
      const create = createDecoratorExpFactory(fn);

      class Meta {}
      const m = create(Meta, { optional: true });

      class A {
        @m()
        set s(v: number) {}
      }
    } catch (e) {
      shouldThrowError = true;
    }
    expect(shouldThrowError).toBe(true);
  });
});

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
