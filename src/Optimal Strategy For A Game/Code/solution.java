class Solution {
    public int maximumAmount(int arr[]) {
        int n = arr.length;
        // dp[i][j] -> max amount current player can collect from arr[i..j]
        long[][] dp = new long[n][n];

        for (int gap = 0; gap < n; gap++) {
            for (int i = 0; i + gap < n; i++) {
                int j = i + gap;

                if (i == j) {
                    // Only one coin
                    dp[i][j] = arr[i];
                } else if (j == i + 1) {
                    // Two coins
                    dp[i][j] = Math.max(arr[i], arr[j]);
                } else {
                    long x = (i + 2 <= j) ? dp[i + 2][j] : 0;
                    long y = (i + 1 <= j - 1) ? dp[i + 1][j - 1] : 0;
                    long z = (i <= j - 2) ? dp[i][j - 2] : 0;

                    long pickLeft = arr[i] + Math.min(x, y);
                    long pickRight = arr[j] + Math.min(y, z);

                    dp[i][j] = Math.max(pickLeft, pickRight);
                }
            }
        }

        return (int) dp[0][n - 1];
    }
}
