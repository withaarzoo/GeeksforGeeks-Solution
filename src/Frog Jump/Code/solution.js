/**
 * @param {number[]} height
 * @return {number}
 */
class Solution {
  minCost(height) {
    const n = height.length;
    if (n <= 1) return 0;
    let prev2 = 0; // dp[i-2]
    let prev1 = Math.abs(height[1] - height[0]); // dp[i-1]
    if (n === 2) return prev1;

    for (let i = 2; i < n; i++) {
      const jump1 = prev1 + Math.abs(height[i] - height[i - 1]); // from i-1
      const jump2 = prev2 + Math.abs(height[i] - height[i - 2]); // from i-2
      const curr = Math.min(jump1, jump2);
      prev2 = prev1;
      prev1 = curr;
    }
    return prev1;
  }
}
