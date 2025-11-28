/**
 * @param {number} n
 * @returns {number[]}
 */
class Solution {
  subsetXOR(n) {
    let T;
    // XOR of 1..n using pattern
    if (n % 4 === 0) T = n;
    else if (n % 4 === 1) T = 1;
    else if (n % 4 === 2) T = n + 1;
    else T = 0; // n % 4 === 3

    const ans = [];

    if (T === n) {
      // Case 1: take all numbers 1..n
      for (let i = 1; i <= n; i++) {
        ans.push(i);
      }
    } else {
      // Case 2: remove exactly one element x = T ^ n
      const x = T ^ n;
      for (let i = 1; i <= n; i++) {
        if (i === x) continue; // skip x
        ans.push(i);
      }
    }

    return ans;
  }
}
