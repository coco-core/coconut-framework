import Watcher from '../prepare-build';

function prepareBuild(monorepoProjPath: string) {
  const watch = new Watcher(monorepoProjPath);
  watch.doPrepareWork('build');
}

const _test_helper = {
  prepareBuild,
};

export { _test_helper };
