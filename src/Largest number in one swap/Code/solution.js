class Solution {
  largestSwap(s) {
    let arr = s.split("");
    let n = arr.length;

    let last = new Array(10).fill(-1);

    // Store last occurrence of each digit
    for (let i = 0; i < n; i++) {
      last[arr[i] - "0"] = i;
    }

    for (let i = 0; i < n; i++) {
      for (let d = 9; d > arr[i] - "0"; d--) {
        if (last[d] > i) {
          // Swap
          let temp = arr[i];
          arr[i] = arr[last[d]];
          arr[last[d]] = temp;

          return arr.join("");
        }
      }
    }

    return s;
  }
}
