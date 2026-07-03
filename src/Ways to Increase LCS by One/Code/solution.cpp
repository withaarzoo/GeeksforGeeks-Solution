class Solution {
  public:
    int waysToIncreaseLCSBy1(string &s1, string &s2) {
        int n = s1.size(), m = s2.size();

        // pref[i][j] = LCS of s1[0..i-1] and s2[0..j-1]
        vector<vector<int>> pref(n + 1, vector<int>(m + 1, 0));

        // Build prefix LCS DP
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1[i - 1] == s2[j - 1])
                    pref[i][j] = pref[i - 1][j - 1] + 1;
                else
                    pref[i][j] = max(pref[i - 1][j], pref[i][j - 1]);
            }
        }

        // Current LCS
        int lcs = pref[n][m];

        // suff[i][j] = LCS of s1[i..] and s2[j..]
        vector<vector<int>> suff(n + 1, vector<int>(m + 1, 0));

        // Build suffix LCS DP
        for (int i = n - 1; i >= 0; i--) {
            for (int j = m - 1; j >= 0; j--) {
                if (s1[i] == s2[j])
                    suff[i][j] = suff[i + 1][j + 1] + 1;
                else
                    suff[i][j] = max(suff[i + 1][j], suff[i][j + 1]);
            }
        }

        int ans = 0;

        // Try every insertion position
        for (int pos = 0; pos <= n; pos++) {

            // Try every lowercase character
            for (char ch = 'a'; ch <= 'z'; ch++) {

                bool ok = false;

                // Check every occurrence of this character in s2
                for (int j = 0; j < m && !ok; j++) {

                    if (s2[j] != ch)
                        continue;

                    // If prefix + inserted char + suffix gives LCS+1,
                    // then this insertion is valid.
                    if (pref[pos][j] + 1 + suff[pos][j + 1] == lcs + 1)
                        ok = true;
                }

                // Count this character only once for this position
                if (ok)
                    ans++;
            }
        }

        return ans;
    }
};