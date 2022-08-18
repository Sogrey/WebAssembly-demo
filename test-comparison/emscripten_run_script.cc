// 连接C/C++与Webassembly
// emcc test-comparison/emscrripten_standalone.cc -Os -s WASM=1 -o out/emscrripten_standalone.js  # 函数名被混淆
// 编译成动态库
// emcc test-comparison/emscripten_run_script.cc -o out/emscripten_run_script.wasm -Os -s WASM=1 -s SIDE_MODULE=1
#include <emscripten.h>
#include <iostream>

using namespace std;
EM_JS(int, add, (int x, int y), {
    return x + y;
});
int main(int argc, char **argv)
{
    emscripten_run_script("console.log('Hello. This is emscripten standalone.')");
    cout << add(1,2) << endl;
    EM_ASM(console.log('Hello. This is emscripten standalone.'));
    return 0;
}
