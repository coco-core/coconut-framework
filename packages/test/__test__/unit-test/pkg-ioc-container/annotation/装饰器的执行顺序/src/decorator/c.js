import {push} from "../result";

export function c (name) {
  push(`${name}c1`);
  return (value, context) => {
    push(`${name}c2`);
  }
}