import java.util.*;

class Solution {
    public int maxProfit(int[][] jobs) {
        int n = jobs.length;
        // Sort by end time
        Arrays.sort(jobs, (a, b) -> Integer.compare(a[1], b[1]));

        int[] ends = new int[n];
        for (int i = 0; i < n; i++) ends[i] = jobs[i][1];

        long[] dp = new long[n];
        for (int i = 0; i < n; i++) {
            long take = jobs[i][2];

            // upperBound(ends, i, jobs[i][0]) - 1
            int j = upperBound(ends, i, jobs[i][0]) - 1;
            if (j >= 0) take += dp[j];

            long skip = (i > 0) ? dp[i - 1] : 0;
            dp[i] = Math.max(skip, take);
        }
        return (int)dp[n - 1];
    }

    // upperBound on prefix [0, high) for value x
    private int upperBound(int[] a, int high, int x) {
        int l = 0, r = high; // search in [0, high)
        while (l < r) {
            int m = l + (r - l) / 2;
            if (a[m] <= x) l = m + 1;
            else r = m;
        }
        return l; // first index with a[idx] > x
    }
}
