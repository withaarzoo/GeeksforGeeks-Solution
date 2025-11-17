/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
  maxSumIS(arr) {
    const n = arr.length;
    if (n === 0) return 0;
    // dp[i] = max sum of strictly increasing subsequence ending at i
    const dp = new Array(n);
    let ans = 0;
    for (let i = 0; i < n; i++) {
      dp[i] = arr[i]; // at least arr[i] itself
      for (let j = 0; j < i; j++) {
        if (arr[j] < arr[i]) {
          dp[i] = Math.max(dp[i], dp[j] + arr[i]);
        }
      }
      ans = Math.max(ans, dp[i]);
    }
    return ans;
  }
}
