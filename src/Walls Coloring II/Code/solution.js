/**
 * @param {number[][]} costs
 * @returns {number}
 */

class Solution {
  minCost(costs) {
    const n = costs.length;
    if (n === 0) return 0;
    const k = costs[0].length;

    // If only one color and more than 1 wall -> impossible
    if (k === 1) {
      if (n === 1) return costs[0][0];
      return -1;
    }

    // prev[j] = min cost to paint up to previous wall with color j
    let prev = new Array(k);
    let curr = new Array(k);

    // Base case: first wall
    for (let j = 0; j < k; j++) {
      prev[j] = costs[0][j];
    }

    // Process remaining walls
    for (let i = 1; i < n; i++) {
      let min1 = Number.POSITIVE_INFINITY;
      let min2 = Number.POSITIVE_INFINITY;
      let idx1 = -1,
        idx2 = -1;

      // Find smallest and second smallest in prev
      for (let j = 0; j < k; j++) {
        const val = prev[j];
        if (val < min1) {
          min2 = min1;
          idx2 = idx1;
          min1 = val;
          idx1 = j;
        } else if (val < min2) {
          min2 = val;
          idx2 = j;
        }
      }

      // Compute current row
      for (let j = 0; j < k; j++) {
        const bestPrev = j === idx1 ? min2 : min1;
        curr[j] = costs[i][j] + bestPrev;
      }

      // Move curr to prev
      prev = curr.slice();
    }

    // Answer is min of prev
    let ans = Number.POSITIVE_INFINITY;
    for (let j = 0; j < k; j++) {
      if (prev[j] < ans) ans = prev[j];
    }

    return ans;
  }
}
