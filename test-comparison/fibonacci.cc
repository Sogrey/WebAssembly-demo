// fibonacci.cc
// https://www.cntofu.com/book/150/zh/ch2-c-js/ch2-04-data-exchange.md
// https://blog.csdn.net/qq_40834030/article/details/103130011
// emcc test-comparison/fibonacci.cc -o out/fibonacci.js -sWASSM -std=c++11 

#ifndef EM_PORT_API
#	if defined(__EMSCRIPTEN__)
#		include <emscripten.h>
#		if defined(__cplusplus)
#			define EM_PORT_API(rettype) extern "C" rettype EMSCRIPTEN_KEEPALIVE
#		else
#			define EM_PORT_API(rettype) rettype EMSCRIPTEN_KEEPALIVE
#		endif
#	else
#		if defined(__cplusplus)
#			define EM_PORT_API(rettype) extern "C" rettype
#		else
#			define EM_PORT_API(rettype) rettype
#		endif
#	endif
#endif

#include <stdio.h>
#include <malloc.h>

EM_PORT_API(int *)
fibonacci(int count)
{
    if (count <= 0)
        return NULL;

    int *re = (int *)malloc(count * 4);
    if (NULL == re)
    {
        printf("Not enough memory.\n");
        return NULL;
    }

    re[0] = 1;
    int i0 = 0, i1 = 1;
    for (int i = 1; i < count; i++)
    {
        re[i] = i0 + i1;
        i0 = i1;
        i1 = re[i];
    }

    return re;
}

EM_PORT_API(void)
free_buf(void *buf)
{
    free(buf);
}

// fibonacci.html
//    var ptr = Module._fibonacci(10);
//    if (ptr == 0) return;
//    var str = '';
//    for (var i = 0; i < 10; i++){
//      str += Module.HEAP32[(ptr >> 2) + i];
//      str += ' ';
//    }
//    console.log(str);
//    Module._free_buf(ptr);