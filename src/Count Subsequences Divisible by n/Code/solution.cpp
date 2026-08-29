class Solution {
  public:
    int countSubsequences(string& s, int n) {
        // Store the answer modulo 1e9 + 7.
        const int MOD = 1000000007;

        // dp[r] stores the number of non-empty subsequences seen so far
        // whose numeric value gives remainder r when divided by n.
        vector<long long> dp(n, 0);

        // Process every digit from left to right so subsequence order is preserved.
        for (char ch : s) {
            // Convert the current character into its numeric digit value.
            int digit = ch - '0';

            // next starts as dp because every existing subsequence can ignore
            // the current digit and remain exactly the same.
            vector<long long> next = dp;

            // Try appending the current digit to every previously formed subsequence.
            for (int remainder = 0; remainder < n; ++remainder) {
                // If a number has remainder r, appending digit d makes the number
                // r*10 + d modulo n, so only the remainder needs to be calculated.
                int newRemainder = (remainder * 10LL + digit) % n;

                // Add all subsequences with this old remainder to their new remainder.
                next[newRemainder] =
                    (next[newRemainder] + dp[remainder]) % MOD;
            }

            // The current digit alone is also a new non-empty subsequence.
            next[digit % n] = (next[digit % n] + 1) % MOD;

            // Move to the DP state after processing the current digit.
            dp.swap(next);
        }

        // Remainder 0 means the subsequence is divisible by n.
        return dp[0];
    }
};