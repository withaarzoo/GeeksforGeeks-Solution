class Solution {
public:
    int countSubsets(vector<int> &arr) {
        const int MOD = 1000000007;

        // All prime numbers up to 30
        vector<int> primes = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29};

        // mask[x] stores the prime factor mask of x
        // -1 means x contains a repeated prime factor and is invalid
        vector<int> mask(31, 0);

        // Precompute mask for every value from 2 to 30
        for (int x = 2; x <= 30; x++) {
            int cur = x;
            int bits = 0;
            bool ok = true;

            for (int i = 0; i < 10; i++) {
                int p = primes[i];

                // Count how many times this prime divides the number
                int cnt = 0;
                while (cur % p == 0) {
                    cur /= p;
                    cnt++;
                }

                // If a prime appears more than once,
                // this number can never be used
                if (cnt > 1) {
                    ok = false;
                    break;
                }

                // Store this prime in the mask
                if (cnt == 1)
                    bits |= (1 << i);
            }

            mask[x] = ok ? bits : -1;
        }

        // dp[mask] = number of ways to build this prime mask
        vector<long long> dp(1 << 10, 0);
        dp[0] = 1;

        int ones = 0;

        for (int x : arr) {

            // Count ones separately
            if (x == 1) {
                ones++;
                continue;
            }

            // Ignore numbers having repeated prime factors
            if (mask[x] == -1)
                continue;

            int curMask = mask[x];

            // Traverse backwards so one element is used only once
            for (int m = (1 << 10) - 1; m >= 0; m--) {

                // If both masks share any prime,
                // choosing both would repeat that prime
                if ((m & curMask) != 0)
                    continue;

                dp[m | curMask] = (dp[m | curMask] + dp[m]) % MOD;
            }
        }

        long long ans = 0;

        // Sum every valid state
        for (long long ways : dp)
            ans = (ans + ways) % MOD;

        // Remove the empty subset
        ans = (ans - 1 + MOD) % MOD;

        // Every 1 can either be taken or skipped
        long long mul = 1;
        while (ones--) {
            mul = (mul * 2) % MOD;
        }

        return (ans * mul) % MOD;
    }
};