/**
 * @param {number[]} arr
 * @returns {String}
 */

class Solution {
  findLargest(arr) {
    // Convert numbers to strings
    let nums = arr.map((num) => num.toString());

    // Sort using custom comparator
    nums.sort((a, b) => (b + a).localeCompare(a + b));

    // Edge case: if largest is "0"
    if (nums[0] === "0") return "0";

    // Join all strings
    return nums.join("");
  }
}
