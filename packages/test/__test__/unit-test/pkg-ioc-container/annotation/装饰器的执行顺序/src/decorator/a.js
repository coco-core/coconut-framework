import {push} from "../result";

export function a (name) {
  push(`${name}a1`)
  return (value, context) => {
    push(`${name}a2`)
  }
}