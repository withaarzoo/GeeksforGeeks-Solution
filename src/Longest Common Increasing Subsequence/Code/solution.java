class Solution {
    public int LCIS(int[] a, int[] b) {
        int n = a.length, m = b.length;
        if (n == 0 || m == 0)
            return 0;

        // dp[j] = length of LCIS that ends with b[j]
        int[] dp = new int[m];

        for (int i = 0; i < n; ++i) {
            int current = 0; // best LCIS length for values < a[i]
            for (int j = 0; j < m; ++j) {
                if (a[i] == b[j]) {
                    // extend sequences that end with smaller values
                    dp[j] = Math.max(dp[j], current + 1);
                } else if (a[i] > b[j]) {
                    // b[j] can be a prefix candidate for a future match
                    current = Math.max(current, dp[j]);
                }
                // else a[i] < b[j], ignore
            }
        }

        int ans = 0;
        for (int x : dp)
            ans = Math.max(ans, x);
        return ans;
    }
}
