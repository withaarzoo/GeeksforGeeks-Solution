/**
 * @param {number} n
 * @param {number} k
 * @returns {number[][]}
 */
class Solution {
  // Returns all unique combinations of k numbers from 1..9 that sum to n.
  combinationSum(n, k) {
    const res = [];
    const path = [];

    function dfs(start, remaining, k_left) {
      if (k_left === 0) {
        if (remaining === 0) res.push([...path]);
        return;
      }
      // compute min and max possible sums for pruning
      let min_sum = 0;
      for (let t = 0; t < k_left; t++) min_sum += start + t;
      let max_sum = 0;
      for (let t = 0; t < k_left; t++) max_sum += 9 - t;
      if (remaining < min_sum || remaining > max_sum) return;

      for (let num = start; num <= 9; num++) {
        if (num > remaining) break;
        path.push(num);
        dfs(num + 1, remaining - num, k_left - 1);
        path.pop();
      }
    }

    dfs(1, n, k);
    return res;
  }
}
