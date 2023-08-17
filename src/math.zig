extern fn print(f64) void;

extern fn print_int(usize) void;

export fn add(a: i32, b: i32) i32 {
    // print(a + b);

    return a + b;
}

// export fn add_with_print(a: i32, b: i32) void {
//     print(a + b);
// }

export fn array_sum_wrapper(arr1: [*]f64, arr2: [*]f64, ret: [*]f64, lenBins: usize) void {
    array_sum(arr1[0..lenBins], arr2[0..lenBins], ret[0..lenBins]);
}

fn array_sum(arr1: []f64, arr2: []f64, ret: []f64) void {
    print(arr1[3]);
    print(arr2[3]);
    print_int(arr1.len);
    for (arr1, arr2, 0..) |item1, item2, i| {
        ret[i] = item1 + item2;
    }
    print(ret[3]);
}
// run with this command
// zig build-lib src/math.zig -target wasm32-freestanding -dynamic -rdynamic
