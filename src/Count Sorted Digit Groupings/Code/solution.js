class Solution {
  validGroups(s) {
    const n = s.length;

    // dp[index][prevSum]
    const dp = Array.from({ length: n }, () => Array(901).fill(-1));

    const solve = (idx, prevSum) => {
      // Reached end -> one valid grouping
      if (idx === n) {
        return 1;
      }

      // Memoized answer
      if (dp[idx][prevSum] !== -1) {
        return dp[idx][prevSum];
      }

      let ans = 0;
      let currSum = 0;

      // Try every possible group
      for (let end = idx; end < n; end++) {
        // Add digit to current sum
        currSum += Number(s[end]);

        // Check non-decreasing condition
        if (currSum >= prevSum) {
          ans += solve(end + 1, currSum);
        }
      }

      return (dp[idx][prevSum] = ans);
    };

    return solve(0, 0);
  }
}
