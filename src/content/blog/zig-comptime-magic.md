---
title: 'Zig Comptime Magic'
published: 2025-12-08
draft: false
description: 'Understanding compile-time code execution in Zig.'
series: 'Zig Features'
tags: ['zig']
---

Zig doesn't have a traditional macro system or complex template syntax like C++. Instead, it allows you to run Zig code during compilation. This feature is called `comptime`.

## Running Code at Compile Time

You can use the `comptime` keyword to force a block of code to execute while your program is being compiled.

```zig title="comptime_block.zig" {1}
const result = comptime {
    var sum = 0;
    var i = 0;
    while (i < 10) : (i += 1) {
        sum += i;
    }
    return sum;
};
```

Since `result` is computed at compile time, it's just a constant `45` in the final binary.

## Generic Types

`comptime` is also how Zig handles generics. A generic type is just a function that returns a `type` at compile time.

```zig title="generics.zig" {1}
fn List(comptime T: type) type {
    return struct {
        items: []T,
        len: usize,
    };
}

const IntList = List(i32);
const FloatList = List(f64);
```

This approach is incredibly powerful because it uses the same language syntax you already know, rather than a separate template language.

## Inline Loops

You can even use `inline for` to unroll loops at compile time:

```zig title="inline_loop.zig" {1}
inline for (.{ "hello", "world" }) |word| {
    // This code is generated twice, once for "hello" and once for "world"
    std.debug.print("{s}\n", .{word});
}
```

`comptime` turns metaprogramming from a dark art into standard programming.
