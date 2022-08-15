const wasmPath = "./build/release.wasm";
const getExportFunctionPromise = function (url) {
    return new Promise(async function (resolve, reject) {
        try {
            let imports = {
                env: {
                    memory: new WebAssembly.Memory({
                        initial: 256
                    }),
                    table: new WebAssembly.Table({
                        initial: 2,
                        element: 'anyfunc'
                    }),
                    // 以下都是编译生成的wasm所需要的变量，不需要可以直接传0
                    abortStackOverflow: function () { },
                    DYNAMICTOP_PTR: 0,
                    tempDoublePtr: 0,
                    ABORT: 0,
                    STACKTOP: 0,
                    STACK_MAX: 0,
                    gb: 0,
                    fb: 0,
                    memoryBase: 0,
                    tableBase: 0
                }
            };
            const adaptedImports = {
                env: Object.assign(Object.create(globalThis), imports.env || {}, {
                    "console.log"(text) {
                        // ~lib/bindings/dom/console.log(~lib/string/String) => void
                        text = __liftString(text >>> 0);
                        console.log(text);
                    },
                    "console.error"(text) {
                        // ~lib/bindings/dom/console.error(~lib/string/String) => void
                        text = __liftString(text >>> 0);
                        console.error(text);
                    },
                    abort(message, fileName, lineNumber, columnNumber) {
                        // ~lib/builtins/abort(~lib/string/String | null?, ~lib/string/String | null?, u32?, u32?) => void
                        message = __liftString(message >>> 0);
                        fileName = __liftString(fileName >>> 0);
                        lineNumber = lineNumber >>> 0;
                        columnNumber = columnNumber >>> 0;
                        (() => {
                            // @external.js
                            throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
                        })();
                    },
                }),
            };

            const response = await fetch(url);
            const bytes = await response.arrayBuffer();
            const instance = await WebAssembly.instantiate(bytes, adaptedImports);
            const exports = instance.instance.exports;
            const memory = exports.memory || imports.env.memory;
            function __liftString(pointer) {
                if (!pointer) return null;
                const
                    end = pointer + new Uint32Array(memory.buffer)[pointer - 4 >>> 2] >>> 1,
                    memoryU16 = new Uint16Array(memory.buffer);
                let
                    start = pointer >>> 1,
                    string = "";
                while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
                return string + String.fromCharCode(...memoryU16.subarray(start, end));
            }
            resolve(exports);
        } catch (error) {
            reject(error)
        }
    })
}

const wasmUrl = wasmPath;
getExportFunctionPromise(wasmUrl)
    .then(result => {
        // console.log(result)

        // console.log(result.add, result.add(89, 20));
        // console.log(result.sub, result.sub(89, 20));
        // console.log(result.mul, result.mul(89, 20));
        // console.log(result.div, result.div(89, 20));


        console.time('wasm typescript');
        let x = result.fib(40);
        console.log(x);
        console.timeEnd('wasm typescript');

    })
    .catch(error => {
        console.error(error)
    });

getExportFunctionPromise("./build/fib_cpp.wasm")
    .then(result => {
        // console.log(result)

        // console.log(result.add, result.add(89, 20));
        // console.log(result.sub, result.sub(89, 20));
        // console.log(result.mul, result.mul(89, 20));
        // console.log(result.div, result.div(89, 20));


        console.time('wasm cpp');
        let x = result.fib(40);
        console.log(x);
        console.timeEnd('wasm cpp');

    })
    .catch(error => {
        console.error(error)
    });

getExportFunctionPromise("./build/fib_cpp1.wasm")
    .then(result => {
        // console.log(result)

        // console.log(result.add, result.add(89, 20));
        // console.log(result.sub, result.sub(89, 20));
        // console.log(result.mul, result.mul(89, 20));
        // console.log(result.div, result.div(89, 20));


        console.time('wasm cpp1');
        let x = result.fib(40);
        console.log(x);
        console.log(result.add(520, 1314));
        console.timeEnd('wasm cpp1');

    })
    .catch(error => {
        console.error(error)
    });

getExportFunctionPromise("./build/fib_c.wasm")
    .then(result => {
        // console.log(result)

        // console.log(result.add, result.add(89, 20));
        // console.log(result.sub, result.sub(89, 20));
        // console.log(result.mul, result.mul(89, 20));
        // console.log(result.div, result.div(89, 20));

        console.time('wasm c');
        let x = result.fib(40);
        console.log(x);
        console.timeEnd('wasm c');

    })
    .catch(error => {
        console.error(error)
    });

let importObject = {};

// 異步邊下載邊編譯 WASM 檔案
WebAssembly.compileStreaming(fetch("./build/fib_c.wasm"))
    .then(module => {
        // 得到 WebAssembly.Module
        // console.log(module);

        let instance = new WebAssembly.Instance(module, importObject);

        // console.log(instance);

        console.time('wasm c | compileStreaming');
        let x = instance.exports.fib(40);
        console.log(x);
        console.timeEnd('wasm c | compileStreaming');

    })

// WebAssembly.compileStreaming(fetch("./out/downloadFile.wasm"))
//     .then(module => {
//         // 得到 WebAssembly.Module
//         console.log(module);

//         // Uncaught (in promise) RangeError: WebAssembly.Instance is disallowed on the main thread, if the buffer size is larger than 4KB. Use WebAssembly.instantiate.

//         let instance = WebAssembly.instantiate(module, importObject);

//         console.log(instance);

//         // console.time('wasm c | compileStreaming');
//         // let x = instance.exports.fib(40);
//         // console.log(x);
//         // console.timeEnd('wasm c | compileStreaming');

//     })


// 封装 WebAssembly 模块的读取函数
async function wasmBrowserInstantiate(
    wasmModuleUrl,
    importObject
) {
    let response

    // 传入的 importObject 需要提供 env.abort() 方法
    if (typeof importObject?.env?.abort !== 'function') {
        importObject = Object.assign({}, importObject, {
            env: {
                abort: () => console.log('Abort!'),
                emscripten_is_main_browser_thread: () => console.log('Abort!'),
                emscripten_start_fetch: () => console.log('Abort!'),
                _emscripten_fetch_free: () => console.log('Abort!'),
                emscripten_memcpy_big: () => console.log('Abort!'),
                emscripten_resize_heap: () => console.log('Abort!'),
                setTempRet0: () => console.log('Abort!'),
                consoleLog: () => console.log,
                emscripten_run_script: (script) => {
                    eval(script)
                    console.log(script.toString());
                },
            },
            wasi_snapshot_preview1: {
                proc_exit: () => { },
                fd_write: () => { },
            }
        })
    }

    // 判断是否支持 streaming instantiation
    if (WebAssembly.instantiateStreaming) {
        // 请求模块然后初始化
        response = await WebAssembly.instantiateStreaming(
            fetch(wasmModuleUrl),
            importObject
        )
    } else {
        // 不支持要 fallback，手动转成 Buffer
        const fetchAndInstantiateTask = async () => {
            const wasmArrayBuffer = await fetch(wasmModuleUrl).then((response) =>
                response.arrayBuffer()
            )
            return WebAssembly.instantiate(wasmArrayBuffer, importObject)
        }
        response = await fetchAndInstantiateTask()
    }

    return response;
}

// 解析后的 wasm 模块
wasmBrowserInstantiate("./out/downloadFile.wasm").then((response) => {
    console.log(response);
    response.instance.exports.download("data/myfile.dat")
});