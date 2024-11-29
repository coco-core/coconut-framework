import Publisher from './publisher.ts';

class Subscriber {
  static Executing: Subscriber;

  private isDirty = true;

  private publishers: Publisher[] = [];

  // 组件方法
  private readonly fn: Function;
  // fn对应的this对象，即：组件实例
  private readonly fnThis: any;

  private value: any;

  constructor(fn: Function, fnThis: any) {
    this.fn = fn;
    this.fnThis = fnThis;
  }

  subscribe = (publisher: Publisher) => {
    if (this.publishers.indexOf(publisher) === -1) {
      publisher.addListener(this);
      this.publishers.push(publisher);
    }
  };

  // **必须是field，绑定当前this对象**
  memoizedFn = () => {
    if (this.isDirty) {
      const childSubscriber = Subscriber.Executing;
      Subscriber.Executing = this;

      {
        this.value = this.fn.call(this.fnThis);
      }
      this.isDirty = false;

      if (childSubscriber) {
        this.publishers.forEach(childSubscriber.subscribe);
      }
      Subscriber.Executing = childSubscriber;
    }
    return this.value;
  };

  public dirty() {
    this.isDirty = true;
  }
}

export default Subscriber;
