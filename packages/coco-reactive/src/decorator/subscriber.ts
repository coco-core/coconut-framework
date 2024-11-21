class Subscriber {
  static Executing: Subscriber;

  private isDirty = true;

  // 组件方法
  private readonly fn: Function;
  // fn对应的this对象，即：组件实例
  private readonly fnThis: any;

  private value: any;

  constructor(fn: Function, fnThis: any) {
    this.fn = fn;
    this.fnThis = fnThis;
  }

  memoizedFn = () => {
    if (this.isDirty) {
      const oldExecuting = Subscriber.Executing;
      Subscriber.Executing = this;

      this.value = this.fn.call(this.fnThis);
      this.isDirty = false;

      Subscriber.Executing = oldExecuting;
    }
    return this.value;
  };

  public dirty() {
    this.isDirty = true;
  }
}

export default Subscriber;
