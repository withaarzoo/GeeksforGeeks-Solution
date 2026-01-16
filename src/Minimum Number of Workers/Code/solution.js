class Solution {
  minMen(arr) {
    const n = arr.length;
    const intervals = [];

    // Convert workers to intervals
    for (let i = 0; i < n; i++) {
      if (arr[i] === -1) continue;

      const left = Math.max(0, i - arr[i]);
      const right = Math.min(n - 1, i + arr[i]);
      intervals.push([left, right]);
    }

    // Sort intervals
    intervals.sort((a, b) => a[0] - b[0]);

    let count = 0;
    let idx = 0;
    let coveredTill = 0;

    // Greedy coverage
    while (coveredTill < n) {
      let farthest = coveredTill;

      while (idx < intervals.length && intervals[idx][0] <= coveredTill) {
        farthest = Math.max(farthest, intervals[idx][1] + 1);
        idx++;
      }

      if (farthest === coveredTill) return -1;

      count++;
      coveredTill = farthest;
    }

    return count;
  }
}
