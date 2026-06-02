class Solution {
  sumDiffPairs(arr, k) {
    // Sort array in ascending order
    arr.sort((a, b) => a - b);

    let ans = 0;
    let i = arr.length - 1;

    // Process from right to left
    while (i > 0) {
      // Valid pair found
      if (arr[i] - arr[i - 1] < k) {
        // Add both values
        ans += arr[i] + arr[i - 1];

        // Skip both elements
        i -= 2;
      } else {
        // Skip current element
        i--;
      }
    }

    return ans;
  }
}
