class Solution {
  bitonic(arr) {
    const n = arr.length;

    // Stores length of non-decreasing subarray ending at each index
    const inc = new Array(n).fill(1);

    // Build increasing lengths
    for (let i = 1; i < n; i++) {
      if (arr[i] >= arr[i - 1]) {
        inc[i] = inc[i - 1] + 1;
      }
    }

    // Stores length of non-increasing subarray starting at each index
    const dec = new Array(n).fill(1);

    // Build decreasing lengths
    for (let i = n - 2; i >= 0; i--) {
      if (arr[i] >= arr[i + 1]) {
        dec[i] = dec[i + 1] + 1;
      }
    }

    let ans = 1;

    // Treat every index as the peak
    for (let i = 0; i < n; i++) {
      ans = Math.max(ans, inc[i] + dec[i] - 1);
    }

    return ans;
  }
}
