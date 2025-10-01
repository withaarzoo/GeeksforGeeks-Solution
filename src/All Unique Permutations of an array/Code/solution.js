/**
 * @param {number[]} arr
 * @returns {number[][]}
 */
class Solution {
  uniquePerms(arr) {
    const n = arr.length;
    const res = [];
    if (n === 0) {
      res.push([]); // one empty permutation
      return res;
    }
    arr.sort((a, b) => a - b); // group duplicates
    const used = new Array(n).fill(false);
    const curr = [];

    function dfs() {
      if (curr.length === n) {
        res.push(curr.slice()); // push a shallow copy
        return;
      }
      for (let i = 0; i < n; ++i) {
        if (used[i]) continue;
        if (i > 0 && arr[i] === arr[i - 1] && !used[i - 1]) continue; // skip duplicates
        used[i] = true;
        curr.push(arr[i]);
        dfs();
        curr.pop();
        used[i] = false;
      }
    }

    dfs();
    return res;
  }
}
