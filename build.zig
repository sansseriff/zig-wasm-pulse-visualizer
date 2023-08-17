const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = .{ .cpu_arch = .wasm32, .os_tag = .freestanding };
    const optimize = b.standardOptimizeOption(.{ .preferred_optimize_mode = .ReleaseSmall });

    const lib = b.addSharedLibrary(.{
        .name = "math",
        .root_source_file = .{ .path = "math.zig" },
        .target = target,
        .optimize = optimize,
    });
    lib.use_lld = false;
    lib.rdynamic = true;
    lib.install();
    // lib.
}

// zig build-lib src/math.zig -target wasm32-freestanding -dynamic -rdynamic -O ReleaseSmall
