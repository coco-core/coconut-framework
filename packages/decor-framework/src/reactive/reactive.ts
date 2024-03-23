import { updateRender } from '../reconciler';

export function reactive(value: void, { kind, name }: any) {
  if (kind === 'field') {
    return function (initialValue: any) {
      console.log(this, `initializing ${name} with value ${initialValue}`);
      const obj: any = {};
      Reflect.defineProperty(this, name, {
        get: function () {
          console.log('=======get===========');
          return obj[name];
        },
        set(v: any): boolean {
          console.log('=======set===========');
          obj[name] = v;
          setTimeout(updateRender, 10);
          return true;
        },
      });
      return initialValue;
    };
  }
  // ...
}
