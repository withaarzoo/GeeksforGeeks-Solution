class Solution {
  subarrayXor(arr, k) {
    let freq = new Map();
    let count = 0;
    let prefixXor = 0;

    // Initial case
    freq.set(0, 1);

    for (let num of arr) {
      prefixXor ^= num;

      if (freq.has(prefixXor ^ k)) {
        count += freq.get(prefixXor ^ k);
      }

      freq.set(prefixXor, (freq.get(prefixXor) || 0) + 1);
    }

    return count;
  }
}
