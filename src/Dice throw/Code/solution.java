class Solution {
    static int noOfWays(int m, int n, int x) {

        long[] dp = new long[x + 1];
        dp[0] = 1;

        for (int dice = 1; dice <= n; dice++) {

            long[] temp = new long[x + 1];

            for (int sum = 1; sum <= x; sum++) {

                for (int face = 1; face <= m; face++) {

                    if (sum - face >= 0) {
                        temp[sum] += dp[sum - face];
                    }
                }
            }

            dp = temp;
        }

        return (int) dp[x];
    }
}