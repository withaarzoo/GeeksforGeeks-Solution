class Solution {
    public String matrixChainOrder(int arr[]) {
        int n = arr.length;
        int N = n - 1; // number of matrices

        long[][] dp = new long[N + 1][N + 1];
        int[][] split = new int[N + 1][N + 1];

        // for len = 2..N
        for (int len = 2; len <= N; len++) {
            for (int i = 1; i + len - 1 <= N; i++) {
                int j = i + len - 1;
                dp[i][j] = Long.MAX_VALUE;

                for (int k = i; k < j; k++) {
                    long cost = dp[i][k] + dp[k + 1][j]
                            + 1L * arr[i - 1] * arr[k] * arr[j];
                    if (cost < dp[i][j]) {
                        dp[i][j] = cost;
                        split[i][j] = k;
                    }
                }
            }
        }

        // recursive builder
        return build(1, N, split);
    }

    private String build(int i, int j, int[][] split) {
        if (i == j) {
            char ch = (char) ('A' + (i - 1));
            return String.valueOf(ch);
        }
        int k = split[i][j];
        String left = build(i, k, split);
        String right = build(k + 1, j, split);
        return "(" + left + right + ")";
    }
}
