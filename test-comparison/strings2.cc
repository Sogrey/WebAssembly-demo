// emcc test-comparison/strings2.c -o out/strings2.js -sWASM -std=c++11
// https://www.cnblogs.com/xuanhun/p/9963082.html
#include <stdio.h>
#include <string.h>
char* EMSCRIPTEN_KEEPALIVE outName(char *n){ 
 char xhName[] = "xuanhun";   
 strcat(n, xhName);   
 return n;
}
