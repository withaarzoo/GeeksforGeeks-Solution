/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
class Solution {
  kBitFlips(arr, k) {
    const n = arr.length;
    let flips = 0; // parity: 0 or 1
    let ans = 0;

    for (let i = 0; i < n; ++i) {
      if (i >= k && arr[i - k] > 1) {
        flips ^= 1; // remove the effect of the earlier flip
      }

      const bit = (arr[i] & 1) ^ flips; // effective bit at i
      if (bit === 0) {
        if (i + k > n) return -1;
        ans += 1;
        flips ^= 1; // new flip now affects next indices
        arr[i] += 2; // mark that we started a flip here
      }
    }
    return ans;
  }
}
