#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    int maxScore(string &s, vector<vector<char>> &jumps)
    {
        int n = (int)s.size();
        if (n <= 1)
            return 0;

        // 1. Prefix sum of ASCII values
        vector<int> pref(n + 1, 0);
        for (int i = 0; i < n; ++i)
        {
            pref[i + 1] = pref[i] + (int)s[i];
        }

        // 2. Build nextInd table: nextInd[i][c] = next index > i where char c occurs
        const int ALPHA = 26;
        vector<array<int, ALPHA>> nextInd(n);
        array<int, ALPHA> last;
        last.fill(-1);

        for (int i = n - 1; i >= 0; --i)
        {
            // copy current "last" into nextInd[i]
            nextInd[i] = last;
            // update last for current character
            int idx = s[i] - 'a';
            last[idx] = i;
        }

        // 3. Build adjacency for characters
        vector<vector<int>> adj(ALPHA);
        // from jumps list
        for (auto &p : jumps)
        {
            if (p.size() < 2)
                continue;
            char u = p[0];
            char v = p[1];
            int ui = u - 'a';
            int vi = v - 'a';
            if (ui < 0 || ui >= ALPHA || vi < 0 || vi >= ALPHA)
                continue;
            adj[ui].push_back(vi);
        }
        // always allow same-character jumps
        for (int c = 0; c < ALPHA; ++c)
        {
            adj[c].push_back(c);
            // optional: remove duplicates later if needed
            sort(adj[c].begin(), adj[c].end());
            adj[c].erase(unique(adj[c].begin(), adj[c].end()), adj[c].end());
        }

        // 4. DP from right to left
        vector<int> dp(n, 0);
        dp[n - 1] = 0; // last index can't jump

        for (int i = n - 2; i >= 0; --i)
        {
            int best = 0;
            int fromIdx = s[i] - 'a';
            int fromAscii = (int)s[i];

            for (int destChar : adj[fromIdx])
            {
                int j = nextInd[i][destChar];
                if (j == -1)
                    continue; // no such next index

                int gain = pref[j] - pref[i]; // sum s[i..j-1]
                if (destChar == fromIdx)
                {
                    // same character as destination -> remove s[i]'s ASCII
                    gain -= fromAscii;
                }
                best = max(best, gain + dp[j]);
            }
            dp[i] = best;
        }

        return dp[0];
    }
};
