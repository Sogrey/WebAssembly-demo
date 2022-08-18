// emcc -Os -s WASM=1 "test-comparison/js_library/js_library.cc" -o "test-comparison/js_library/js_library.html" --js-library "test-comparison/js_library/js_library_command.js"

// emcc "test-comparison/js_library/js_library.cc" \
// -Os \
// -s WASM=1  \
// -o "test-comparison/js_library/js_library.html"  \
// --js-library "test-comparison/js_library/js_library_command.js";

#include <iostream>
#include <math.h>

using namespace std;

extern "C" {
  extern int custom_add (int x, int y);
}

int main () {
  int x = 10, y = 100;
  std::cout << custom_add(x, y) << std::endl;

  return 0;
}