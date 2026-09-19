class Solution {
    public int findMinCost(String s1, String s2, int costS1, int costS2) {
        int n = s1.length(), m = s2.length();
        if (n < m) {
            String temp = s1; s1 = s2; s2 = temp;
            int t = n; n = m; m = t;
            t = costS1; costS1 = costS2; costS2 = t;
        }
        int[] prev = new int[m + 1];
        int[] curr = new int[m + 1];
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1))
                    curr[j] = prev[j - 1] + 1;
                else
                    curr[j] = Math.max(prev[j], curr[j - 1]);
            }
            int[] temp = prev; prev = curr; curr = temp;
        }
        int lcs = prev[m];
        return (n - lcs) * costS1 + (m - lcs) * costS2;
    }
}