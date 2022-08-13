/** Exported memory */
export declare const memory: WebAssembly.Memory;
/**
 * assembly/index/add
 * @param a `i32`
 * @param b `i32`
 * @returns `i32`
 */
export declare function add(a: number, b: number): number;
/**
 * assembly/index/sub
 * @param a `i32`
 * @param b `i32`
 * @returns `i32`
 */
export declare function sub(a: number, b: number): number;
/**
 * assembly/index/mul
 * @param a `i32`
 * @param b `i32`
 * @returns `i32`
 */
export declare function mul(a: number, b: number): number;
/**
 * assembly/index/div
 * @param a `i32`
 * @param b `i32`
 * @returns `i32`
 */
export declare function div(a: number, b: number): number;
/**
 * assembly/index/mod
 * @param a `i32`
 * @param b `i32`
 * @returns `i32`
 */
export declare function mod(a: number, b: number): number;
/**
 * assembly/index/floor
 * @param a `f64`
 * @returns `f64`
 */
export declare function floor(a: number): number;
/**
 * assembly/index/ceil
 * @param a `f64`
 * @returns `f64`
 */
export declare function ceil(a: number): number;
/**
 * assembly/index/round
 * @param a `f64`
 * @returns `f64`
 */
export declare function round(a: number): number;
/**
 * assembly/index/abs
 * @param a `f64`
 * @returns `f64`
 */
export declare function abs(a: number): number;
/**
 * assembly/index/min
 * @param a `f64`
 * @param b `f64`
 * @returns `f64`
 */
export declare function min(a: number, b: number): number;
/**
 * assembly/index/max
 * @param a `f64`
 * @param b `f64`
 * @returns `f64`
 */
export declare function max(a: number, b: number): number;
/**
 * assembly/test/test1
 */
export declare function test1(): void;
/**
 * assembly/test/test2
 */
export declare function test2(): void;
/**
 * assembly/test/fib
 * @param n `i32`
 * @returns `i32`
 */
export declare function fib(n: number): number;
