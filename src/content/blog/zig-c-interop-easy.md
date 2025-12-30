---
title: 'Zig C Interop Made Easy'
published: 2025-12-20
draft: false
description: 'How to use C libraries directly in your Zig code.'
series: 'Zig Features'
tags: ['zig']
---

One of Zig's strongest features is its seamless interoperability with C. You don't need to write bindings or wrappers manually; Zig can understand C header files directly.

## Importing C Headers

You can import C headers using the built-in `@cImport` function.

```zig title="c_import.zig" {1, 7}
const c = @cImport({
    @cInclude("stdio.h");
    @cInclude("stdlib.h");
});

pub fn main() void {
    _ = c.printf("Hello from C!\n");
}
```

Zig parses the header file and exposes the C types and functions as if they were Zig code.

## Zig is also a C Compiler

The Zig compiler (`zig cc`) can compile C and C++ code. This means you can easily mix C files into your Zig project build.

## Translating C to Zig

Zig even includes a tool to translate C code into Zig code automatically.

```bash title="Translate C to Zig" frame="terminal"
zig translate-c main.c
```

This is incredibly useful for porting legacy codebases or understanding how a specific C construct maps to Zig.

## No FFI Overhead

Because Zig shares the same memory layout and ABI compatibility with C, calling C functions has no overhead. It's just a function call.

```zig title="ffi.zig"
// Calling a standard C function
const time = c.time(null);
```

This makes Zig an excellent choice for extending existing C projects or gradually rewriting them.
