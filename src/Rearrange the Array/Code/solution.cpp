class Solution
{
public:
    int minOperations(vector<int> &b)
    {
        const int MOD = 1000000007;
        int n = b.size();

        // Marks whether an index has already been included in a cycle
        vector<int> vis(n, 0);

        // Stores maximum exponent needed for every prime
        unordered_map<int, int> mxExp;

        // Find every cycle in the permutation
        for (int i = 0; i < n; i++)
        {
            if (vis[i])
                continue;

            int cur = i;
            int len = 0;

            // Traverse one complete cycle
            while (!vis[cur])
            {
                vis[cur] = 1;
                cur = b[cur] - 1; // Convert to 0-based index
                len++;
            }

            // Prime factorization of current cycle length
            int x = len;
            for (int p = 2; p * p <= x; p++)
            {
                if (x % p == 0)
                {
                    int cnt = 0;
                    while (x % p == 0)
                    {
                        x /= p;
                        cnt++;
                    }
                    mxExp[p] = max(mxExp[p], cnt);
                }
            }

            // Remaining value is also a prime
            if (x > 1)
                mxExp[x] = max(mxExp[x], 1);
        }

        long long ans = 1;

        // Build the LCM using highest prime powers
        for (auto &it : mxExp)
        {
            long long base = it.first;
            int exp = it.second;

            while (exp--)
            {
                ans = (ans * base) % MOD;
            }
        }

        return (int)ans;
    }
};