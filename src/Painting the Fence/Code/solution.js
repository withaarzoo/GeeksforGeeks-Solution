/**
 * @param {number} n
 * @param {number} k
 * @returns {number}
 */
class Solution {
  countWays(n, k) {
    // If there is only one post
    if (n === 1) return k;

    // same = ways where last two posts have same color
    let same = k;

    // diff = ways where last two posts have different colors
    let diff = k * (k - 1);

    // Process from 3rd post to nth post
    for (let i = 3; i <= n; i++) {
      let newSame = diff;
      let newDiff = (same + diff) * (k - 1);

      same = newSame;
      diff = newDiff;
    }

    return same + diff;
  }
}
