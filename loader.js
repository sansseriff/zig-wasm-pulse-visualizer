

// Export JavaScript Functions to Zig
const importObject = {
    // JavaScript Functions exported to Zig
    env: {
        // JavaScript Print Function exported to Zig
        print: function (x) {
            console.log(x);
        },
        print_int: function (x) {
            console.log(x);
        }
    }
};


class Allocator {
    constructor(instance) {
      this.instance = instance;
      this.ptr = instance.initialBytes;
    }
  
    alloc(T, len) {
      console.log("pointer: ", this.ptr)
      // Align allocations to an 8-byte boundary.
      if (this.ptr % 8 > 0) this.ptr = this.ptr + 8 - (this.ptr % 8);
      const numBytes = T.BYTES_PER_ELEMENT * len;
      const buffer = new T(this.instance.exports.memory.buffer, this.ptr, len);
      this.ptr += numBytes;
      console.log("pointer: ", this.ptr)
      return buffer;
    }
  
    reset() {
      this.ptr = this.instance.initialBytes;
    }
  }



async function bootstrap() {
    let obj = await WebAssembly.instantiateStreaming(
        fetch("math.wasm"),
        importObject
    );

    maxMillions = 10
    instance = obj.instance
    const memory = instance.exports.memory;
    const bytesPerPage = 65536;
    const numPages = memory.grow(0);
    console.log("memory already has " + numPages + " pages")
    const initialBytes = numPages * bytesPerPage;
    const desiredBytes =
      Float64Array.BYTES_PER_ELEMENT * 1e6 * (maxMillions + 1);
    const additionalPages = Math.ceil(
      (desiredBytes - initialBytes) / bytesPerPage
    );
    console.log("each element of the array is " + Float64Array.BYTES_PER_ELEMENT + " bytes")
    console.log("growing by " + additionalPages + " pages")
    memory.grow(additionalPages);
    instance.initialBytes = initialBytes;


    const allocator = new Allocator(instance);


    

    arr1 = allocator.alloc(Float64Array, 100).fill(1)
    // console.log(arr1)
    arr2 = allocator.alloc(Float64Array, 100).fill(2)

    for (let i = 0; i < arr1.length; i++) {
        arr1[i] = i;
      }

    for (let i = 0; i < arr2.length; i++) {
        arr2[arr1.length-i] = i;
      }


    // console.log(arr2)
    output = allocator.alloc(Float64Array, 100).fill(0)
    // console.log(output)

    // add = obj.instance.exports.add
    // add_with_print = obj.instance.exports.add_with_print
    zig = obj.instance.exports



    zig.array_sum_wrapper(arr1.byteOffset, arr2.byteOffset, output.byteOffset, 100)


    console.log(output)

}


bootstrap();