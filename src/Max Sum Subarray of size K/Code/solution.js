class Solution {
  maxSubarraySum(arr, k) {
    let n = arr.length;

    // Step 1: Calculate sum of first window
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
      windowSum += arr[i];
    }

    let maxSum = windowSum;

    // Step 2: Slide the window
    for (let i = k; i < n; i++) {
      windowSum += arr[i]; // add next element
      windowSum -= arr[i - k]; // remove previous element
      maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
  }
}
