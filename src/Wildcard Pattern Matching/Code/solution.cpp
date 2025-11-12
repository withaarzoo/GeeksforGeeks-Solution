#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    bool wildCard(string &txt, string &pat)
    {
        int n = txt.size();
        int m = pat.size();
        // prev[j] -> dp for previous i (i-1)
        vector<bool> prev(m + 1, false), cur(m + 1, false);
        prev[0] = true; // empty text matches empty pattern

        // empty text vs pattern: only true when pattern prefix is all '*'
        for (int j = 1; j <= m; ++j)
        {
            if (pat[j - 1] == '*')
                prev[j] = prev[j - 1];
            else
                prev[j] = false;
        }

        for (int i = 1; i <= n; ++i)
        {
            cur[0] = false; // non-empty text cannot match empty pattern
            for (int j = 1; j <= m; ++j)
            {
                if (pat[j - 1] == '*')
                {
                    // '*' matches empty (cur[j-1]) or matches one more char (prev[j])
                    cur[j] = cur[j - 1] || prev[j];
                }
                else if (pat[j - 1] == '?' || pat[j - 1] == txt[i - 1])
                {
                    cur[j] = prev[j - 1];
                }
                else
                {
                    cur[j] = false;
                }
            }
            // move cur to prev for next iteration
            prev.swap(cur);
        }

        return prev[m];
    }
};
