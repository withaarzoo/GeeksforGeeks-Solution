/**
 * @param {number[]} arr
 * @returns {number[]}
 */
class Solution {
  findDuplicates(arr) {
    const n = arr.length;
    const ans = [];

    for (let i = 0; i < n; i++) {
      const x = Math.abs(arr[i]); // value between [1, n]
      const idx = x - 1; // mapped index

      if (arr[idx] > 0) {
        // First time seeing x, mark as seen
        arr[idx] = -arr[idx];
      } else {
        // Seen before -> duplicate
        ans.push(x);
      }
    }

    return ans; // any order is fine
  }
}
