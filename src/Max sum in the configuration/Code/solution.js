/**
 * @param {number[]} arr
 * @returns {number}
 */
class Solution {
  maxSum(arr) {
    const n = arr.length;

    let arrSum = 0;
    let currVal = 0;

    // Initial sum
    for (let i = 0; i < n; i++) {
      arrSum += arr[i];
      currVal += i * arr[i];
    }

    let maxVal = currVal;

    // Compute values for all rotations
    for (let i = 1; i < n; i++) {
      currVal = currVal + arrSum - n * arr[n - i];
      maxVal = Math.max(maxVal, currVal);
    }

    return maxVal;
  }
}
