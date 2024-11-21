import Subscriber from './subscriber.ts';

class Publisher {
  private subscribers: Subscriber[] = [];

  subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe() {}

  public notify() {
    for (let i = 0; i < this.subscribers.length; i++) {
      this.subscribers[i].dirty();
    }
  }
}

export default Publisher;
