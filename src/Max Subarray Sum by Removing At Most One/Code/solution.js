class Solution {
  maxSumSubarray(arr) {
    // Maximum subarray ending here without deletion
    let keep = arr[0];

    // Maximum subarray ending here after one deletion
    let remove = 0;

    // Final answer
    let ans = arr[0];

    // Traverse remaining elements
    for (let i = 1; i < arr.length; i++) {
      // Either delete current element or extend previous deleted subarray
      remove = Math.max(keep, remove + arr[i]);

      // Standard Kadane update
      keep = Math.max(arr[i], keep + arr[i]);

      // Update answer
      ans = Math.max(ans, Math.max(keep, remove));
    }

    return ans;
  }
}
