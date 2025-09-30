/**
 * @param {number} n
 * @returns {string[]}
 */
class Solution {
  binstr(n) {
    const total = 1 << n; // 2^n (safe for n up to 31 in JS bit ops)
    const ans = new Array(total);

    for (let mask = 0; mask < total; ++mask) {
      const arr = new Array(n).fill("0");
      for (let j = 0; j < n; ++j) {
        // check j-th bit of mask and set from right
        if (((mask >> j) & 1) === 1) arr[n - 1 - j] = "1";
      }
      ans[mask] = arr.join("");
    }
    return ans;
  }
}
