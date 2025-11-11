/**
 * @param {string} s1
 * @param {string} s2
 * @returns {number}
 */
class Solution {
  minSuperSeq(s1, s2) {
    let n = s1.length,
      m = s2.length;
    // Keep s2 as the shorter one for O(min) space
    if (m > n) return this.minSuperSeq(s2, s1);

    let prev = new Array(m + 1).fill(0);
    let cur = new Array(m + 1).fill(0);

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          cur[j] = 1 + prev[j - 1];
        } else {
          cur[j] = Math.max(prev[j], cur[j - 1]);
        }
      }
      // swap rows
      [prev, cur] = [cur, prev];
      cur.fill(0);
    }

    const lcs = prev[m];
    return n + m - lcs;
  }
}
