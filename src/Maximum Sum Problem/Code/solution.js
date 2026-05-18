/**
 * @param {number} n
 * @return {number}
 */

class Solution {
  constructor() {
    // Map for memoization
    this.dp = new Map();
  }

  solve(n) {
    // Base case
    if (n <= 1) return n;

    // Return stored answer if available
    if (this.dp.has(n)) return this.dp.get(n);

    // Recursive calculation
    let broken =
      this.solve(Math.floor(n / 2)) +
      this.solve(Math.floor(n / 3)) +
      this.solve(Math.floor(n / 4));

    // Choose maximum value
    let ans = Math.max(n, broken);

    // Store answer
    this.dp.set(n, ans);

    return ans;
  }

  maxSum(n) {
    // Start recursive process
    return this.solve(n);
  }
}
