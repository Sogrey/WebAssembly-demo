const gulp = require('gulp'); //gulp自身  
const exec = require('child_process').exec;

gulp.task('task1', function (cb) {
    console.log("task1");
    cb();
});
gulp.task('task2', function (cb) {
    console.log("task2");
    cb();
})
// gulp.task("default", gulp.series('task1', 'task2', function (cb) {
//     console.log("success");
//     cb();
// }))
gulp.task("default", gulp.series('task1', 'task2'))

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task("test", function (cb) {
    console.log("执行测试编译。");
    try {
        exec('emcc -Os -s INITIAL_MEMORY=64kb -s MAXIMUM_MEMORY=64kb -s ALLOW_MEMORY_GROWTH=0 -s TOTAL_STACK=0kb -s STANDALONE_WASM -s EXPORTED_FUNCTIONS="[\'_fib\']" -Wl,--no-entry "test-comparison/fib_cpp.cc" -o "build/fib_cpp.wasm"', function (error, stdout, stderr) {
            if (error) {
                console.error('error: ' + error);
                return;
            } else {
                console.log("执行完毕。",'build/fib_cpp.wasm');
            }
        });

        exec('emcc -Os -s INITIAL_MEMORY=64kb -s MAXIMUM_MEMORY=64kb -s ALLOW_MEMORY_GROWTH=0 -s TOTAL_STACK=0kb -s STANDALONE_WASM -s EXPORTED_FUNCTIONS="[\'_fib\',\'_add\']" -Wl,--no-entry "test-comparison/fib_cpp.cc" "test-comparison/fib_cpp1.cc" -o "build/fib_cpp1.wasm"', function (error, stdout, stderr) {
            if (error) {
                console.error('error: ' + error);
                return;
            } else {
                console.log("执行完毕。",'build/fib_cpp1.wasm');
            }
        });

        exec('emcc test-comparison/fib_c.c -Os -s WASM=1 -s SIDE_MODULE=1 -o build/fib_c.wasm', function (error, stdout, stderr) {
            if (error) {
                console.error('error: ' + error);
                return;
            } else {
                console.log("执行完毕。",'build/fib_c.wasm');
            }
        });
    } catch (error) {
        cb(error);
    }
    cb();
})
