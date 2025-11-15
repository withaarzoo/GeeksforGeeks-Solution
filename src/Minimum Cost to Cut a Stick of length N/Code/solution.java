import java.util.Arrays;

class Solution {
    public int minCutCost(int n, int[] cutsArr) {
        // convert to Integer list to add endpoints easily
        int mOrig = cutsArr.length;
        int m = mOrig + 2;
        int[] cuts = new int[m];
        for (int i = 0; i < mOrig; ++i)
            cuts[i] = cutsArr[i];
        cuts[mOrig] = 0;
        cuts[mOrig + 1] = n;
        Arrays.sort(cuts);
        int[][] dp = new int[m][m];
        // fill intervals by increasing length (j - i)
        for (int len = 2; len < m; ++len) {
            for (int i = 0; i + len < m; ++i) {
                int j = i + len;
                int best = Integer.MAX_VALUE;
                for (int k = i + 1; k < j; ++k) {
                    int cost = cuts[j] - cuts[i] + dp[i][k] + dp[k][j];
                    if (cost < best)
                        best = cost;
                }
                dp[i][j] = (best == Integer.MAX_VALUE) ? 0 : best;
            }
        }
        return dp[0][m - 1];
    }
}
