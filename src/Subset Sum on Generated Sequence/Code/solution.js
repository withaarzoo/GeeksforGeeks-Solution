/**
 * @param {number[]} arr
 * @param {number} s
 * @param {number} x
 * @returns {boolean}
 */

class Solution {
  isPossible(arr, s, x) {
    // Store only the generated numbers that can possibly
    // contribute to the target x.
    const nums = [s];

    // sum is the total of all numbers currently on the paper.
    let sum = s;

    // Generate the sequence from arr.
    for (const a of arr) {
      // The next number is the current total plus arr[i].
      const next = sum + a;

      // Once next is greater than x, all future numbers will
      // also be greater than x, so there is no need to continue.
      if (next > x) {
        break;
      }

      // Keep this useful number for the greedy step.
      nums.push(next);

      // Update the total before generating the next number.
      sum += next;
    }

    // remaining tells me how much of x is still required.
    let remaining = x;

    // Start from the largest number and move backwards.
    for (let i = nums.length - 1; i >= 0; i--) {
      // If this number does not exceed the remaining target,
      // I take it because of the superincreasing property.
      if (nums[i] <= remaining) {
        remaining -= nums[i];
      }

      // The target has been formed completely.
      if (remaining === 0) {
        return true;
      }
    }

    // Some part of x is still left, so no subset can form it.
    return false;
  }
}
