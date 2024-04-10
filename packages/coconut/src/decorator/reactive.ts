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
  }
  // ...
}
