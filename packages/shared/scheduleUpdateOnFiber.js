let scheduleUpdateOnFiber;

export function register(fn) {
  scheduleUpdateOnFiber = fn
}

export function run(root) {
  if (scheduleUpdateOnFiber) {
    scheduleUpdateOnFiber(root)
  }
}