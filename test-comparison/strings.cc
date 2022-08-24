// fibonacci.cc
// https://www.cntofu.com/book/150/zh/ch2-c-js/ch2-04-data-exchange.md
// emcc test-comparison/fibonacci.cc -o out/fibonacci.js -sWASSM -std=c++11

#ifndef EM_PORT_API
#if defined(__EMSCRIPTEN__)
#include <emscripten.h>
#if defined(__cplusplus)
#define EM_PORT_API(rettype) extern "C" rettype EMSCRIPTEN_KEEPALIVE
#else
#define EM_PORT_API(rettype) rettype EMSCRIPTEN_KEEPALIVE
#endif
#else
#if defined(__cplusplus)
#define EM_PORT_API(rettype) extern "C" rettype
#else
#define EM_PORT_API(rettype) rettype
#endif
#endif
#endif

#include <stdio.h>
#include <string>
// strings.cc
EM_PORT_API(const char *)
get_string()
{
    static const char str[] = "Hello, wolrd! 你好，世界！";
    return str;
}

// char *EMSCRIPTEN_KEEPALIVE outName(char *n)
// {

//     char xhName[] = "xuanhun";
//     strcat(n, xhName);
//     return n;
// }