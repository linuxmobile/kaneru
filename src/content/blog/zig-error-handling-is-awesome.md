---
title: 'Zig Error Handling is Awesome'
published: 2025-12-02
draft: false
description: 'Why Zig error handling is safer and cleaner than exceptions.'
series: 'Zig Features'
tags: ['zig']
---

One of the first things you'll notice coming to Zig is that there are no exceptions. Instead, Zig treats errors as values, but with some syntactic sugar that makes handling them feel incredibly natural.

## Errors are Values

In Zig, an error is just a member of an error set. You can define them like enums:

```zig title="errors.zig"
const FileError = error{
    AccessDenied,
    FileNotFound,
    DiskQuota,
};
```

When a function might fail, its return type is prefixed with `!`. This is an **Error Union**.

```zig title="error_union.zig" {1}
fn openFile(path: []const u8) !void {
    if (path.len == 0) return FileError.FileNotFound;
    // ... logic ...
}
```

## The `try` Keyword

The real magic happens with `try`. It allows you to propagate errors up the stack with a single word.

```zig title="try_usage.zig" {3}
fn loadConfig() !void {
    // If openFile fails, the error is returned immediately
    try openFile("config.json"); 
}
```

This is equivalent to checking the error and returning it if present, but much cleaner.

## Catching Errors

If you want to handle the error, you use `catch`. You can provide a default value or run a block of code.

```zig title="catch_usage.zig" {2, 5}
// Provide a default value
const value = tryParse("123") catch 0;

// Run a block (payload capturing)
openFile("data.txt") catch |err| {
    std.debug.print("Failed to open file: {}", .{err});
    return;
};
```

This approach forces you to acknowledge that an error can happen, making your software more robust by default.
