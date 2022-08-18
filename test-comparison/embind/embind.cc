// emcc -Os -s INITIAL_MEMORY=64kb -s MAXIMUM_MEMORY=64kb -s ALLOW_MEMORY_GROWTH=0 -s TOTAL_STACK=0kb -s STANDALONE_WASM -s EXPORTED_FUNCTIONS="['_fib']" -Wl,--no-entry "test-comparison/fib_cpp.cc" -o "build/fib_cpp.wasm"

#include <emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

typedef long int i32;

// bind
i32 bindAdd(i32 x, i32 y) { return x + y; }
EMSCRIPTEN_BINDINGS(module)
{
    function("bindAdd", &bindAdd);
}
