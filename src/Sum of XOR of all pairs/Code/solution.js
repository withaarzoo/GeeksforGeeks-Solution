/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
  sumXOR(arr) {
    let n = arr.length; // total elements
    let result = 0; // final sum

    // Loop through each bit
    for (let bit = 0; bit < 32; bit++) {
      let count1 = 0; // count of numbers with bit set

      // Count numbers with current bit = 1
      for (let i = 0; i < n; i++) {
        if ((arr[i] & (1 << bit)) !== 0) {
          count1++;
        }
      }

      let count0 = n - count1; // remaining have bit = 0

      // Add contribution
      result += count1 * count0 * (1 << bit);
    }

    return result;
  }
}
