class Solution {
    public int maxSumIS(int arr[]) {
        int n = arr.length;
        if (n == 0)
            return 0;
        // dp[i] = max sum of increasing subsequence ending at i
        int[] dp = new int[n];
        int ans = 0;
        for (int i = 0; i < n; i++) {
            dp[i] = arr[i]; // subsequence with only arr[i]
            for (int j = 0; j < i; j++) {
                if (arr[j] < arr[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + arr[i]);
                }
            }
            ans = Math.max(ans, dp[i]);
        }
        return ans;
    }
}
