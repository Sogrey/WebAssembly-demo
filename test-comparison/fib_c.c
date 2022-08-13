// emcc test-comparison/fib_c.c -Os -s WASM=1 -s SIDE_MODULE=1 -o build/fib_c.wasm


typedef long int i32;

i32 fib(i32 n)
{
    if (n < 2)
    {
        return 1;
    }
    return fib(n - 2) + fib(n - 1);
}