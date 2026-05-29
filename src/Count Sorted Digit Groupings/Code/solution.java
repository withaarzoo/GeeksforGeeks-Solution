class Solution {

    private int[][] dp;

    private int solve(int idx, int prevSum, String s) {
        int n = s.length();

        // Reached end -> one valid grouping
        if (idx == n)
            return 1;

        // Memoized answer
        if (dp[idx][prevSum] != -1)
            return dp[idx][prevSum];

        int ans = 0;
        int currSum = 0;

        // Try all possible group endings
        for (int end = idx; end < n; end++) {

            // Update current group sum
            currSum += s.charAt(end) - '0';

            // Maintain non-decreasing condition
            if (currSum >= prevSum) {
                ans += solve(end + 1, currSum, s);
            }
        }

        return dp[idx][prevSum] = ans;
    }

    public int validGroups(String s) {
        int n = s.length();

        dp = new int[n][901];

        // Initialize memo table
        for (int i = 0; i < n; i++) {
            java.util.Arrays.fill(dp[i], -1);
        }

        return solve(0, 0, s);
    }
}