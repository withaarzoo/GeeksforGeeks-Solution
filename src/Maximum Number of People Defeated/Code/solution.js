class Solution {
  maxPeopleDefeated(p) {
    // Binary search limits
    let low = 0;
    let high = 10000;

    // Best answer found so far
    let ans = 0;

    while (low <= high) {
      // Middle value
      let mid = Math.floor((low + high) / 2);

      // Sum of squares formula
      let sum = (mid * (mid + 1) * (2 * mid + 1)) / 6;

      // Check if this many people can be defeated
      if (sum <= p) {
        ans = mid; // Valid answer
        low = mid + 1; // Try larger answer
      } else {
        high = mid - 1; // Reduce answer
      }
    }

    return ans;
  }
}
