// emcc -Os -s INITIAL_MEMORY=64kb -s MAXIMUM_MEMORY=64kb -s ALLOW_MEMORY_GROWTH=0 -s TOTAL_STACK=0kb -s STANDALONE_WASM -s EXPORTED_FUNCTIONS="['_fib']" -Wl,--no-entry "test-comparison/fib_cpp.cc" -o "build/fib_cpp.wasm"

#include <emscripten.h>
typedef long int i32;

extern "C"
{
    i32 EMSCRIPTEN_KEEPALIVE fib(i32 n)
    {
        if (n < 2)
        {
            return 1;
        }
        return fib(n - 2) + fib(n - 1);
    }
}
