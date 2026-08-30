/**
 * @param {number[]} l
 * @param {number[]} r
 * @param {number[]} rank
 * @returns {number[]}
 */
class Solution {
  getMarks(l, r, rank) {
    // Store the number of valid marks up to each interval.
    const n = l.length;
    const prefix = new Array(n);

    // Build prefix sums of interval sizes.
    for (let i = 0; i < n; i++) {
      // Calculate how many consecutive marks this interval contains.
      const count = r[i] - l[i] + 1;

      // Add the current interval size to all previous interval sizes.
      prefix[i] = count + (i > 0 ? prefix[i - 1] : 0);
    }

    // Store the mark corresponding to every requested rank.
    const answer = [];

    // Process every rank query independently.
    for (const currentRank of rank) {
      // Search for the first interval whose prefix value is at least currentRank.
      let left = 0;
      let right = n - 1;

      // Use binary search because prefix is sorted in increasing order.
      while (left < right) {
        // Find the middle interval.
        const mid = left + Math.floor((right - left) / 2);

        // The required rank belongs to this interval or an earlier one.
        if (prefix[mid] >= currentRank) {
          right = mid;
        } else {
          // The required rank must belong to a later interval.
          left = mid + 1;
        }
      }

      // left is now the interval containing currentRank.
      const index = left;

      // Count how many valid marks appear before the found interval.
      const marksBefore = index > 0 ? prefix[index - 1] : 0;

      // Calculate the zero-based position inside the current interval.
      const offset = currentRank - marksBefore - 1;

      // Move offset positions from the interval's starting mark.
      answer.push(l[index] + offset);
    }

    // Return all marks in the same order as the input rank queries.
    return answer;
  }
}
