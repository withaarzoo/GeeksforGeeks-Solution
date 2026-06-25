/**
 * @param {number} n
 * @returns {number[]}
 */
class Solution {
  // Recursive helper function
  solve(lastDigit, len, n, num, ans) {
    // If required length is formed, save the number
    if (len === n) {
      ans.push(num);
      return;
    }

    // Pick every larger digit
    for (let d = lastDigit + 1; d <= 9; d++) {
      // Append digit and continue recursion
      this.solve(d, len + 1, n, num * 10 + d, ans);
    }
  }

  increasingNumbers(n) {
    const ans = [];

    // Impossible case
    if (n > 10) return ans;

    // Every single digit is valid
    if (n === 1) {
      for (let i = 0; i <= 9; i++) ans.push(i);
      return ans;
    }

    // Start from every possible first digit
    for (let d = 1; d <= 9; d++) {
      this.solve(d, 1, n, d, ans);
    }

    return ans;
  }
}
