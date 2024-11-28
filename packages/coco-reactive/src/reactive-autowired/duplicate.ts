import Source from './source.ts';

class Duplicate {
  private source: Source;

  private readonly fn: Function;

  private value: any;

  constructor(enqueueUpdate: Function) {
    this.fn = enqueueUpdate;
  }

  subscribe = (source: Source) => {
    this.source = source;
  };

  public enqueueUpdate = (v: any) => {
    this.fn(v);
  };
}

export default Duplicate;
