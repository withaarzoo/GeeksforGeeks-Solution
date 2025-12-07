class Solution
{
public:
    int distinctSubseq(string &str)
    {
        const int MOD = 1000000007;
        int n = (int)str.size();

        // dp[i] = number of distinct subsequences of prefix str[0..i-1]
        vector<long long> dp(n + 1, 0);
        dp[0] = 1; // empty subsequence

        // last[pos] = last index (1..n) where character 'a'+pos appeared
        vector<int> last(26, 0);

        for (int i = 1; i <= n; i++)
        {
            int chIndex = str[i - 1] - 'a';

            // Initially double the subsequences (take or not take current char)
            long long val = (2LL * dp[i - 1]) % MOD;

            // If this character appeared before, subtract old contribution
            if (last[chIndex] != 0)
            {
                int prevPos = last[chIndex]; // previous position (1..n)
                val = (val - dp[prevPos - 1] + MOD) % MOD;
            }

            dp[i] = val;
            last[chIndex] = i; // update last occurrence
        }

        return (int)(dp[n] % MOD);
    }
};
