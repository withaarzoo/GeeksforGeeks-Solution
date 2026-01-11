class Solution
{
public:
    string minWindow(string &s1, string &s2)
    {
        int n = s1.size(), m = s2.size();
        int minLen = INT_MAX;
        int start = -1;

        for (int i = 0; i < n; i++)
        {
            if (s1[i] != s2[0])
                continue;

            int p1 = i, p2 = 0;

            // Forward scan to match s2
            while (p1 < n && p2 < m)
            {
                if (s1[p1] == s2[p2])
                    p2++;
                p1++;
            }

            if (p2 == m)
            {
                int end = p1 - 1;

                // Backward shrink
                p2 = m - 1;
                while (p2 >= 0)
                {
                    if (s1[end] == s2[p2])
                        p2--;
                    end--;
                }
                end++;

                if (p1 - end < minLen)
                {
                    minLen = p1 - end;
                    start = end;
                }
            }
        }

        return start == -1 ? "" : s1.substr(start, minLen);
    }
};
