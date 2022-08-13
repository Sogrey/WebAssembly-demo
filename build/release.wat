(module
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (type $f64_=>_f64 (func (param f64) (result f64)))
 (type $f64_f64_=>_f64 (func (param f64 f64) (result f64)))
 (type $i32_=>_none (func (param i32)))
 (type $none_=>_none (func))
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $i32_i32_i32_i32_=>_none (func (param i32 i32 i32 i32)))
 (import "env" "console.log" (func $~lib/bindings/dom/console.log (param i32)))
 (import "env" "console.error" (func $~lib/bindings/dom/console.error (param i32)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 17452))
 (memory $0 1)
 (data (i32.const 1036) "\1c")
 (data (i32.const 1048) "\01\00\00\00\n\00\00\00t\00e\00s\00t\001")
 (export "add" (func $assembly/index/add))
 (export "sub" (func $assembly/index/sub))
 (export "mul" (func $assembly/index/mul))
 (export "div" (func $assembly/index/div))
 (export "mod" (func $assembly/index/mod))
 (export "floor" (func $assembly/index/floor))
 (export "ceil" (func $assembly/index/ceil))
 (export "round" (func $assembly/index/round))
 (export "abs" (func $assembly/index/abs))
 (export "min" (func $assembly/index/min))
 (export "max" (func $assembly/index/max))
 (export "test1" (func $assembly/test/test1))
 (export "test2" (func $assembly/test/test2))
 (export "fib" (func $assembly/test/fib))
 (export "memory" (memory $0))
 (func $assembly/index/add (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.add
 )
 (func $assembly/index/sub (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.sub
 )
 (func $assembly/index/mul (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.mul
 )
 (func $assembly/index/div (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.div_s
 )
 (func $assembly/index/mod (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.rem_s
 )
 (func $assembly/index/floor (param $0 f64) (result f64)
  local.get $0
  f64.floor
 )
 (func $assembly/index/ceil (param $0 f64) (result f64)
  local.get $0
  f64.ceil
 )
 (func $assembly/index/round (param $0 f64) (result f64)
  (local $1 f64)
  local.get $0
  f64.ceil
  local.tee $1
  local.get $1
  f64.const 1
  f64.sub
  local.get $1
  f64.const 0.5
  f64.sub
  local.get $0
  f64.le
  select
 )
 (func $assembly/index/abs (param $0 f64) (result f64)
  local.get $0
  f64.abs
 )
 (func $assembly/index/min (param $0 f64) (param $1 f64) (result f64)
  local.get $0
  local.get $1
  f64.min
 )
 (func $assembly/index/max (param $0 f64) (param $1 f64) (result f64)
  local.get $0
  local.get $1
  f64.max
 )
 (func $assembly/test/fib (param $0 i32) (result i32)
  local.get $0
  i32.const 2
  i32.lt_s
  if
   i32.const 1
   return
  end
  local.get $0
  i32.const 2
  i32.sub
  call $assembly/test/fib
  local.get $0
  i32.const 1
  i32.sub
  call $assembly/test/fib
  i32.add
 )
 (func $assembly/test/test1
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 1068
  i32.lt_s
  if
   i32.const 17472
   i32.const 17520
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 1056
  i32.store
  i32.const 1056
  call $~lib/bindings/dom/console.log
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/test/test2
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 1068
  i32.lt_s
  if
   i32.const 17472
   i32.const 17520
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 1056
  i32.store
  i32.const 1056
  call $~lib/bindings/dom/console.error
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
)
