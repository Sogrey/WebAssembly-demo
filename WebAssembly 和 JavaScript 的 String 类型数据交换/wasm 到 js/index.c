// emcc \
//     index.c \
//     -s ERROR_ON_UNDEFINED_SYMBOLS=0 \
//     -s EXPORTED_FUNCTIONS="[_malloc,_free,_get_str_from_js,_set_str_from_js]" \
//     --no-entry \
//     -o \
//         ./index.wasm

char * js_str; // set string pointer
void set_str_from_js(char *str) { js_str = str; }
// return string pointer
char *get_str_from_js() { return js_str; }