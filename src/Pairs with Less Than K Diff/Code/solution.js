/**
 * @param {number[]} arr
 * @param {number} k
 * @returns {number}
 */
class Solution {
  countPairs(arr, k) {
    // Sort the array in ascending order
    arr.sort((a, b) => a - b);

    const n = arr.length;
    let j = 1;
    let ans = 0;

    // Consider every element as the first element of a pair
    for (let i = 0; i < n; i++) {
      // Ensure j always stays ahead of i
      if (j <= i) j = i + 1;

      // Increase j while the pair remains valid
      while (j < n && arr[j] - arr[i] < k) j++;

      // Count all valid pairs with arr[i]
      ans += j - i - 1;
    }

    // Return total pairs
    return ans;
  }
}
