import Publisher from './publisher.ts';
import publisher from './publisher.ts';

class Subscriber {
  static Executing: Subscriber;

  private isDirty = true;

  private publishers: Publisher[] = [];

  // 组件方法，且绑定了fn对应的this
  private readonly fn: Function;

  private value: any;

  constructor(bindThisFn: Function) {
    this.fn = bindThisFn;
  }

  subscribe = (publisher: Publisher) => {
    publisher.addListener(this);
    this.publishers.push(publisher);
  };

  // **必须是field，绑定当前this对象**
  memoizedFn = () => {
    if (this.isDirty) {
      {
        // clear
        for (const pub of this.publishers) {
          pub.removeListener(this);
        }
        this.publishers = [];
      }
      const childSubscriber = Subscriber.Executing;
      Subscriber.Executing = this;

      {
        this.value = this.fn();
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
