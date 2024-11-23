import Subscriber from './subscriber.ts';

class Publisher {
  private subscribers: Subscriber[] = [];

  // todo 13 这里应该存在重复订阅的问题吧？每次重新渲染都会执行一次
  addListener(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
    subscriber.subscribe(this);
  }

  unsubscribe() {}

  public notify() {
    for (let i = 0; i < this.subscribers.length; i++) {
      this.subscribers[i].dirty();
    }
  }
}

export default Publisher;
