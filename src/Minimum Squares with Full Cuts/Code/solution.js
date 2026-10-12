/**
 * @param {number} n
 * @param {number} m
 * @returns {number}
 */
class Solution {
  minSquares(n, m) {
    if (n < m) {
      let t = n;
      n = m;
      m = t;
    }
    let ans = 0;
    while (m > 0) {
      ans += Math.floor(n / m);
      let r = n % m;
      n = m;
      m = r;
    }
    return ans;
  }
}
