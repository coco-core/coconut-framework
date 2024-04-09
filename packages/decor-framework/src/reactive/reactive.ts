import { updateRender } from '../reconciler';

export function reactive(value: void, { kind, name, addInitializer }: any) {
  if (kind === 'field') {
    addInitializer(function() {
      console.log('=======add initializer===========', this);
      let innerValue: any = this[name];
      Object.defineProperty(this, name, {
        enumerable: true,
        configurable: true,
        get: function () {
          console.log('=======get===========', name);
          return innerValue;
        },
        set(v: any): boolean {
          console.log('=======set===========');
          innerValue = v;
          setTimeout(updateRender, 10);
          return true;
        },
      });
    })
    return function (initialValue: any) {
      console.log(this, `initializing ${name} with value ${initialValue}`);
      // todo 不使用ts的话，这里定义响应式有问题，似乎没有在类实例上定义
      // 有可能又被重新定义了
      return initialValue;
    };
  }
  // ...
}
