// The entry file of your WebAssembly module.

export { test1, test2, fib } from './test';

export function add(a: i32, b: i32): i32 {
    return a + b;
}

export function sub(a: i32, b: i32): i32 {
    return a - b;
}

export function mul(a: i32, b: i32): i32 {
    return a * b;
}

export function div(a: i32, b: i32): i32 {
    return a / b;
}

export function mod(a: i32, b: i32): i32 {
    return a % b;
}

export function floor(a: f64): f64 {
    return Math.floor(a);
}

export function ceil(a: f64): f64 {
    return Math.ceil(a);
}

export function round(a: f64): f64 {
    return Math.round(a);
}

export function abs(a: f64): f64 {
    return Math.abs(a);
}

export function min(a: f64, b: f64): f64 {
    return Math.min(a, b);
}

export function max(a: f64, b: f64): f64 {
    return Math.max(a, b);
}
