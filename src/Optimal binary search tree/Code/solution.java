class Solution {
    public int minCost(int keys[], int freq[]) {
        int n = keys.length;
        if (n == 0)
            return 0;

        // dp[i][j] = minimum cost of optimal BST using keys[i..j]
        int[][] dp = new int[n][n];

        // prefixFreq[k] = sum of freq[0..k-1]
        int[] prefixFreq = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefixFreq[i + 1] = prefixFreq[i] + freq[i];
        }

        // Base case: single key
        for (int i = 0; i < n; i++) {
            dp[i][i] = freq[i];
        }

        // Helper lambda equivalent: rangeSum(i, j)
        // sum of freq[i..j] = prefixFreq[j+1] - prefixFreq[i]

        // length from 2 to n
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;

                int sumFreq = prefixFreq[j + 1] - prefixFreq[i];

                // Try every key as root
                for (int r = i; r <= j; r++) {
                    int left = (r > i) ? dp[i][r - 1] : 0;
                    int right = (r < j) ? dp[r + 1][j] : 0;

                    int cost = left + right + sumFreq;
                    if (cost < dp[i][j]) {
                        dp[i][j] = cost;
                    }
                }
            }
        }

        return dp[0][n - 1];
    }
}
