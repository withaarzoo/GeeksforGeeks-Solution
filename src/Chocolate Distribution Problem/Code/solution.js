class Solution {
  findMinDiff(arr, m) {
    let n = arr.length;

    if (m === 0 || n === 0 || m > n) return 0;

    // Step 1: Sort the array
    arr.sort((a, b) => a - b);

    let minDiff = Number.MAX_SAFE_INTEGER;

    // Step 2: Sliding window
    for (let i = 0; i <= n - m; i++) {
      let diff = arr[i + m - 1] - arr[i];
      minDiff = Math.min(minDiff, diff);
    }

    return minDiff;
  }
}
