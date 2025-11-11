class Solution {
    public static int minSuperSeq(String s1, String s2) {
        int n = s1.length(), m = s2.length();
        // Use the shorter string for columns to minimize space
        if (m > n)
            return minSuperSeq(s2, s1);

        int[] prev = new int[m + 1];
        int[] cur = new int[m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = Math.max(prev[j], cur[j - 1]);
                }
            }
            // move current row to prev and reset cur
            int[] tmp = prev;
            prev = cur;
            cur = tmp;
            java.util.Arrays.fill(cur, 0);
        }

        int lcs = prev[m];
        return n + m - lcs;
    }
}
