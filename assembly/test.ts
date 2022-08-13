function test1(): void {
    console.log("test1");
}
function test2(): void {
    console.error("test1");
}

function fib(n: i32): i32 {
    if (n < 2) {
        return 1
    }
    return fib(n - 2) + fib(n - 1)
}


export { test1, test2, fib };