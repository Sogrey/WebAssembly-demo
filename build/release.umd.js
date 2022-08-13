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
        console.log(result)

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
        console.log(result)

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

getExportFunctionPromise("./build/fib_c.wasm")
    .then(result => {
        console.log(result)

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
