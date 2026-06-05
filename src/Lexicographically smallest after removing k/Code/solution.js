/**
 * @param {string} s
 * @param {number} k
 * @returns {string}
 */

class Solution {
  lexicographicallySmallest(s, k) {
    const n = s.length;

    // Check whether n is a power of 2
    if ((n & (n - 1)) === 0) k = Math.floor(k / 2);
    else k = k * 2;

    // If removal is impossible or result becomes empty
    if (k >= n) return "-1";

    const st = [];

    for (const ch of s) {
      // Remove larger characters from the end
      while (st.length > 0 && k > 0 && st[st.length - 1] > ch) {
        st.pop();
        k--;
      }

      st.push(ch);
    }

    // Remove remaining characters from the end
    while (k > 0) {
      st.pop();
      k--;
    }

    const ans = st.join("");

    return ans.length === 0 ? "-1" : ans;
  }
}
