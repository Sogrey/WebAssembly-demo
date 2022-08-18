// 连接C/C++与Webassembly
// emcc test-comparison/emscrripten_standalone.cc -Os -s WASM=1 -o out/emscrripten_standalone.js  # 函数名被混淆
// 编译成动态库
// emcc test-comparison/emscrripten_standalone.cc -o out/emscrripten_standalone.wasm -Os -s WASM=1 -s SIDE_MODULE=1
#include <emscripten.h>

// #define EMSCRIPTEN_KEEPALIVE __attribute__((used))
#ifdef __cplusplus
extern "C"
{
#endif

    // 函数定义，利用Emscripten提供的宏避免函数被DCE处理掉
    int EMSCRIPTEN_KEEPALIVE add(int a, int b)
    {
        return a + b;
    }

#ifdef __cplusplus
}
#endif
