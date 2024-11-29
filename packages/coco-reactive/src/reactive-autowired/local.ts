class Local {
  private fn: Function;

  setEnqueueUpdate(enqueueUpdate: Function): void {
    this.fn = enqueueUpdate;
  }

  public enqueueUpdate = (v: any) => {
    this.fn(v);
  };
}

export default Local;
