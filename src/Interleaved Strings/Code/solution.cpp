#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    bool isInterleave(string &s1, string &s2, string &s3)
    {
        int n = s1.size(), m = s2.size();
        if (n + m != (int)s3.size())
            return false;

        // Make sure s2 is the shorter string to minimize space
        if (m > n)
        { // swap so that m <= n
            swap(s1, s2);
            swap(n, m);
        }

        vector<bool> dp(m + 1, false);
        dp[0] = true;

        // initialize first row: using only s2 to match prefix of s3
        for (int j = 1; j <= m; ++j)
        {
            dp[j] = dp[j - 1] && (s2[j - 1] == s3[j - 1]);
        }

        // iterate over characters of s1
        for (int i = 1; i <= n; ++i)
        {
            // update dp[0] for j = 0 using s1 only
            dp[0] = dp[0] && (s1[i - 1] == s3[i - 1]);

            for (int j = 1; j <= m; ++j)
            {
                // if s1 contributes current char:
                bool takeFromS1 = dp[j] && (s1[i - 1] == s3[i + j - 1]);
                // if s2 contributes current char:
                bool takeFromS2 = dp[j - 1] && (s2[j - 1] == s3[i + j - 1]);
                dp[j] = takeFromS1 || takeFromS2;
            }
        }

        return dp[m];
    }
};
