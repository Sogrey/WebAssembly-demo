// emcc -Os -s INITIAL_MEMORY=64kb -s MAXIMUM_MEMORY=64kb -s ALLOW_MEMORY_GROWTH=0 -s TOTAL_STACK=0kb -s STANDALONE_WASM -s EXPORTED_FUNCTIONS="['_fib']" -Wl,--no-entry "test-comparison/fib_cpp.cc" -o "build/fib_cpp.wasm"

#include <emscripten.h>
typedef long int i32;

extern "C"
{
    i32 EMSCRIPTEN_KEEPALIVE add(i32 m, i32 n)
    {
        return m + n;
    }
}
