function adoptClassInstance(workInProgress, instance) {
  workInProgress.stateNode = instance;
}
function constructClassInstance(workInProgress, ctor, props) {
  let instance = new ctor(props);

  adoptClassInstance(workInProgress, instance);

  return instance;
}

function mountClassInstance(
  workInProgress,
  ctor,
  newProps
) {
  const instance = workInProgress.stateNode;
  instance.props = newProps;
  instance.state = workInProgress.memoizedState;
}

export {
  constructClassInstance,
  mountClassInstance
}