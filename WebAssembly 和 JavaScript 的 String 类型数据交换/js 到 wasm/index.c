// emcc \
//     index.c \
//     -s ERROR_ON_UNDEFINED_SYMBOLS=0 \
//     -s EXPORTED_FUNCTIONS="[_malloc,_free,_get_str_from_wasm]" \
//     --no-entry \
//     -o \
//         ./index.wasm


// wasm string pointer
char * get_str_from_wasm(void)
{
    return (char *)"Hello, From WASM";
}