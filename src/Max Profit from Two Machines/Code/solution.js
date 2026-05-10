/**
 * @param {number} x
 * @param {number} y
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number}
 */

class Solution {
  maxProfit(x, y, a, b) {
    const n = a.length; // Total number of tasks.
    let base = 0; // Base profit if every task goes to B.
    const diff = new Array(n); // Stores the gain of moving each task from B to A.

    for (let i = 0; i < n; i++) {
      base += b[i]; // Add B's profit for this task.
      diff[i] = a[i] - b[i]; // Record how much A changes the profit.
    }

    diff.sort((p, q) => q - p); // Sort from largest gain to smallest gain.

    const low = Math.max(0, n - y); // Minimum tasks that must be assigned to A.
    const high = Math.min(x, n); // Maximum tasks that A can handle.

    let running = 0; // Running sum of selected gains.
    let bestGain = low === 0 ? 0 : -1e18; // Best valid gain found so far.

    for (let i = 0; i < n; i++) {
      running += diff[i]; // Gain of taking the first i+1 best tasks.
      const taken = i + 1; // Current number of tasks assigned to A.

      if (taken >= low && taken <= high) {
        bestGain = Math.max(bestGain, running); // Keep the best valid total gain.
      }

      if (taken > high) break; // No need to go beyond A's capacity.
    }

    return base + bestGain; // Final maximum profit.
  }
}
