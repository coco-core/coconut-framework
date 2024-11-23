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

  // todo 13 这里应该存在重复订阅的问题吧？每次重新渲染都会执行一次
  subscribe = (publisher: Publisher) => {
    publisher.addListener(this);
    this.publishers.push(publisher);
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
