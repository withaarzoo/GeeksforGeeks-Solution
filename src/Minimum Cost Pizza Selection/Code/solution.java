class Solution {
    public int minimumCost(int x, int s, int m, int l, int cs, int cm, int cl) {
        int mx = Math.max(s, Math.max(m, l));
        int MAX = x + mx;
        int INF = 1000000000;
        int[] dp = new int[MAX + 1];
        Arrays.fill(dp, INF);
        dp[0] = 0;
        for (int i = 0; i <= MAX; i++) {
            if (dp[i] == INF) continue;
            if (i + s <= MAX) dp[i + s] = Math.min(dp[i + s], dp[i] + cs);
            if (i + m <= MAX) dp[i + m] = Math.min(dp[i + m], dp[i] + cm);
            if (i + l <= MAX) dp[i + l] = Math.min(dp[i + l], dp[i] + cl);
        }
        int ans = INF;
        for (int i = x; i <= MAX; i++) ans = Math.min(ans, dp[i]);
        return ans;
    }
}