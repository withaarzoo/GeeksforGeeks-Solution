/**
 * @param {number[][]} jobs
 * @returns {number}
 */
class Solution {
  maxProfit(jobs) {
    const n = jobs.length;
    // Sort by end time
    jobs.sort((a, b) => a[1] - b[1]);

    const ends = jobs.map((j) => j[1]);
    const dp = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
      let take = jobs[i][2];

      // rightmost j < i with ends[j] <= start_i
      const idx = this.upperBound(ends, 0, i, jobs[i][0]) - 1;
      if (idx >= 0) take += dp[idx];

      const skip = i ? dp[i - 1] : 0;
      dp[i] = Math.max(skip, take);
    }
    return dp[n - 1];
  }

  // upperBound on a[left..right-1] for value x
  upperBound(a, left, right, x) {
    let l = left,
      r = right;
    while (l < r) {
      const m = (l + r) >> 1;
      if (a[m] <= x) l = m + 1;
      else r = m;
    }
    return l; // first position where a[pos] > x
  }
}
