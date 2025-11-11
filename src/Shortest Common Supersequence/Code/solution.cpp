class Solution
{
public:
    int minSuperSeq(string &s1, string &s2)
    {
        int n = s1.size(), m = s2.size();
        // Ensure s2 is the shorter one to use O(min(n,m)) memory
        if (m > n)
            return minSuperSeq(s2, s1);

        vector<int> prev(m + 1, 0), cur(m + 1, 0);

        for (int i = 1; i <= n; ++i)
        {
            for (int j = 1; j <= m; ++j)
            {
                if (s1[i - 1] == s2[j - 1])
                {
                    cur[j] = 1 + prev[j - 1];
                }
                else
                {
                    cur[j] = max(prev[j], cur[j - 1]);
                }
            }
            prev.swap(cur);
            fill(cur.begin(), cur.end(), 0);
        }

        int lcs = prev[m];
        return n + m - lcs;
    }
};
