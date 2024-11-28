import Duplicate from './duplicate.ts';
import duplicate from './duplicate.ts';

class Source {
  private duplicates: Duplicate[] = [];

  add(Duplicate: Duplicate) {
    this.duplicates.push(Duplicate);
  }

  unsubscribe() {}

  public enqueueAllDuplicateUpdate(newState: any) {
    for (let i = 0; i < this.duplicates.length; i++) {
      this.duplicates[i].enqueueUpdate(newState);
    }
  }
}

export default Source;
