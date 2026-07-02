class Solution {
  divisibleByK(arr, k) {
    // dp[r] tells whether some non-empty subset
    // can produce remainder r
    let dp = new Array(k).fill(false);

    // Process every number
    for (let num of arr) {
      // Copy previous states
      let next = [...dp];

      // Current number alone forms a subset
      next[num % k] = true;

      // Add current number to previous subsets
      for (let r = 0; r < k; r++) {
        if (dp[r]) {
          let newRem = (r + num) % k;
          next[newRem] = true;
        }
      }

      // Update DP
      dp = next;

      // If remainder becomes 0
      if (dp[0]) return true;
    }

    // No valid subset found
    return false;
  }
}
