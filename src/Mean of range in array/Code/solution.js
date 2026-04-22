/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */
class Solution {
  findMean(arr, queries) {
    let n = arr.length;

    // Prefix sum array
    let prefix = new Array(n + 1).fill(0);

    // Build prefix sum
    for (let i = 0; i < n; i++) {
      prefix[i + 1] = prefix[i] + arr[i];
    }

    let ans = [];

    // Process each query
    for (let [l, r] of queries) {
      // Sum of subarray [l...r]
      let sum = prefix[r + 1] - prefix[l];

      // Length of range
      let len = r - l + 1;

      // Floor mean
      ans.push(Math.floor(sum / len));
    }

    return ans;
  }
}
