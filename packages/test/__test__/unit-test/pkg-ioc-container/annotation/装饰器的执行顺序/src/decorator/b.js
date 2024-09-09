import {push} from "../result";

export function b (name) {
  push(`${name}b1`);
  return (value, context) => {
    push(`${name}b2`);
  }
}