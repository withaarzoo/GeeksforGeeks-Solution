class Solution {
    public int getMaxWeight(String s) {
        int n = s.length();
        if (n == 0) return 0;
        int m = n - 1;
        int[] gain = new int[m];
        for (int i = 0; i < m; i++) {
            gain[i] = (s.charAt(i) == s.charAt(i + 1) ? 1 : 2);
        }
        int[] dp = new int[m + 1];
        for (int i = 1; i <= m; i++) {
            dp[i] = Math.max(dp[i - 1], (i >= 2 ? dp[i - 2] : 0) + gain[i - 1]);
        }
        return n + dp[m];
    }
}