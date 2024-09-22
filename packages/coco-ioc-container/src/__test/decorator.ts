const order = [];
function item (action: 'exec' | 'apply', name: string, params: any) {
  return `[${action}][${name}][${params}]`;
}

export function reset() {
  order.length = 0;
}


export function exec(decoratorName: string, params: any) {
  order.push(item('exec', decoratorName, params));
}

export function apply(decoratorName: string, params: any) {
  order.push(item('apply', decoratorName, params));
}

export function get() {
  return order;
}

/**
 * 期望list的每一项都存在于order中，且每一项的前后位置和order是一样的
 * @param list
 */
export function expectInOrder(list: {
  type: 'exec' | 'apply',
  name: string,
  params: any
}[]) {
  const index = list.map(i => {
    return order.indexOf(item(i.type, i.name, i.params));
  })

  for (let i = 1; i < index.length; i++) {
    if (index[i] <= index[i - 1]) {
      return false;
    }
  }
  return true;
}
