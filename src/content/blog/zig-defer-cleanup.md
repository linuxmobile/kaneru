---
title: 'Zig Defer Cleanup'
published: 2025-12-14
draft: false
description: 'Managing resources safely and easily with the defer keyword.'
series: 'Zig Features'
tags: ['zig']
---

Resource management is hard in C. You have to remember to free memory, close files, and release locks. If you return early from a function, it's easy to forget a cleanup step. Zig solves this with `defer`.

## How Defer Works

The `defer` statement schedules a block of code to run when the current scope exits. It doesn't matter how the scope exits—whether by `return`, reaching the end, or breaking from a loop.

```zig title="defer_basic.zig" {4}
fn processFile() !void {
    var file = try std.fs.cwd().openFile("data.txt", .{});
    // This will run when the function returns, no matter what
    defer file.close();

    var buffer: [1024]u8 = undefined;
    const bytes_read = try file.readAll(&buffer);
    // ... process data ...
}
```

## Memory Management

`defer` is especially useful with allocators. You can allocate memory and immediately schedule its release.

```zig title="memory_management.zig" {3}
fn heavyComputation(allocator: std.mem.Allocator) !void {
    const data = try allocator.alloc(u8, 1024);
    defer allocator.free(data);

    // Use 'data' safely knowing it will be freed
    // even if an error occurs later
    try performStep1(data);
    try performStep2(data);
}
```

## Stack-Like Execution

If you have multiple `defer` statements, they run in reverse order of definition (LIFO).

```zig title="lifo_defer.zig" {2-3}
{
    defer std.debug.print("First\n", .{});
    defer std.debug.print("Second\n", .{});
    // Prints:
    // Second
    // First
}
```

This simple keyword eliminates a whole class of resource leak bugs.
