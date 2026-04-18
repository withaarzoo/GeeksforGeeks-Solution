/**
 * @param {number[]} arr
 * @returns {number}
 */
class Solution {
  maxOnes(arr) {
    let ones = 0;

    // Count existing 1s
    for (let num of arr) {
      if (num === 1) {
        ones++;
      }
    }

    let currentGain = 0;
    let maxGain = 0;

    // Kadane's Algorithm
    for (let num of arr) {
      let value;

      // 0 becomes +1 gain, 1 becomes -1 loss
      if (num === 0) {
        value = 1;
      } else {
        value = -1;
      }

      currentGain = Math.max(value, currentGain + value);
      maxGain = Math.max(maxGain, currentGain);
    }

    return ones + maxGain;
  }
}
