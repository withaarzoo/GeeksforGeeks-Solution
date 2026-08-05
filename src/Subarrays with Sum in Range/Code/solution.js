class Solution {
  // Returns number of subarrays with sum <= limit
  countAtMost(arr, limit) {
    // Positive numbers cannot produce negative sums
    if (limit < 0) return 0;

    let left = 0;
    let sum = 0;
    let ans = 0;

    // Expand window
    for (let right = 0; right < arr.length; right++) {
      // Add current element
      sum += arr[right];

      // Shrink while sum is too large
      while (sum > limit) {
        sum -= arr[left];
        left++;
      }

      // Count all valid subarrays ending at right
      ans += right - left + 1;
    }

    return ans;
  }

  countSubarray(arr, l, r) {
    // Required answer
    return this.countAtMost(arr, r) - this.countAtMost(arr, l - 1);
  }
}
