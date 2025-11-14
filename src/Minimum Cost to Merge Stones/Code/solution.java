import java.util.*;

class Solution {
    public static int mergeStones(int[] stones, int k) {
        int n = stones.length;
        if ((n - 1) % (k - 1) != 0)
            return -1;

        // prefix sums
        int[] pref = new int[n + 1];
        for (int i = 0; i < n; ++i)
            pref[i + 1] = pref[i] + stones[i];

        final long INF = (long) 1e15;
        long[][] dp = new long[n][n];

        for (int len = 2; len <= n; ++len) {
            for (int i = 0; i + len - 1 < n; ++i) {
                int j = i + len - 1;
                dp[i][j] = INF;
                // split by steps of (k-1)
                for (int m = i; m < j; m += (k - 1)) {
                    dp[i][j] = Math.min(dp[i][j], dp[i][m] + dp[m + 1][j]);
                }
                if ((len - 1) % (k - 1) == 0)
                    dp[i][j] += pref[j + 1] - pref[i];
            }
        }

        return (int) dp[0][n - 1];
    }
}
