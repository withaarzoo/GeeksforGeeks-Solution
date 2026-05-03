class Solution {
  sortBySetBitCount(arr) {
    // I create 32 buckets, one for each possible set-bit count.
    const buckets = Array.from({ length: 32 }, () => []);

    // I count set bits with Kernighan's trick, which removes one set bit per loop.
    const countSetBits = (num) => {
      let count = 0;
      while (num > 0) {
        num &= num - 1;
        count++;
      }
      return count;
    };

    // I place each number into the right bucket in the same order I see it.
    // That keeps ties stable without any extra work.
    for (const num of arr) {
      buckets[countSetBits(num)].push(num);
    }

    // I rebuild the array from the highest set-bit count to the lowest.
    let idx = 0;
    for (let bits = 31; bits >= 0; bits--) {
      for (const num of buckets[bits]) {
        arr[idx++] = num;
      }
    }
  }
}
