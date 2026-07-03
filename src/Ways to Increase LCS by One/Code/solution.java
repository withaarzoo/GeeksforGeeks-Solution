class Solution {
    public int waysToIncreaseLCSBy1(String s1, String s2) {

        int n = s1.length();
        int m = s2.length();

        // pref[i][j] = LCS of prefixes
        int[][] pref = new int[n + 1][m + 1];

        // Build prefix DP
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1))
                    pref[i][j] = pref[i - 1][j - 1] + 1;
                else
                    pref[i][j] = Math.max(pref[i - 1][j], pref[i][j - 1]);
            }
        }

        int lcs = pref[n][m];

        // suff[i][j] = LCS of suffixes
        int[][] suff = new int[n + 1][m + 1];

        // Build suffix DP
        for (int i = n - 1; i >= 0; i--) {
            for (int j = m - 1; j >= 0; j--) {
                if (s1.charAt(i) == s2.charAt(j))
                    suff[i][j] = suff[i + 1][j + 1] + 1;
                else
                    suff[i][j] = Math.max(suff[i + 1][j], suff[i][j + 1]);
            }
        }

        int ans = 0;

        // Try every insertion position
        for (int pos = 0; pos <= n; pos++) {

            // Try every lowercase letter
            for (char ch = 'a'; ch <= 'z'; ch++) {

                boolean ok = false;

                // Search matching character inside s2
                for (int j = 0; j < m && !ok; j++) {

                    if (s2.charAt(j) != ch)
                        continue;

                    if (pref[pos][j] + 1 + suff[pos][j + 1] == lcs + 1)
                        ok = true;
                }

                // Count once per position
                if (ok)
                    ans++;
            }
        }

        return ans;
    }
}