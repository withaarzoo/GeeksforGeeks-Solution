class Solution {
    public int countSubsets(int[] arr) {

        final int MOD = 1000000007;

        // All prime numbers up to 30
        int[] primes = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29};

        // mask[x] stores the prime factor mask
        // -1 means invalid number
        int[] mask = new int[31];

        // Precompute masks
        for (int x = 2; x <= 30; x++) {

            int cur = x;
            int bits = 0;
            boolean ok = true;

            for (int i = 0; i < 10; i++) {

                int p = primes[i];
                int cnt = 0;

                // Count occurrences of this prime
                while (cur % p == 0) {
                    cur /= p;
                    cnt++;
                }

                // Repeated prime makes the number invalid
                if (cnt > 1) {
                    ok = false;
                    break;
                }

                // Add this prime to the mask
                if (cnt == 1)
                    bits |= (1 << i);
            }

            mask[x] = ok ? bits : -1;
        }

        // DP over all masks
        long[] dp = new long[1 << 10];
        dp[0] = 1;

        int ones = 0;

        for (int x : arr) {

            // Count ones separately
            if (x == 1) {
                ones++;
                continue;
            }

            // Skip invalid numbers
            if (mask[x] == -1)
                continue;

            int curMask = mask[x];

            // Traverse backwards to avoid reusing the same element
            for (int m = (1 << 10) - 1; m >= 0; m--) {

                // Shared prime means invalid selection
                if ((m & curMask) != 0)
                    continue;

                dp[m | curMask] = (dp[m | curMask] + dp[m]) % MOD;
            }
        }

        long ans = 0;

        // Sum all states
        for (long v : dp)
            ans = (ans + v) % MOD;

        // Remove empty subset
        ans = (ans - 1 + MOD) % MOD;

        // Multiply by 2^ones
        long mul = 1;
        while (ones-- > 0)
            mul = (mul * 2) % MOD;

        return (int) ((ans * mul) % MOD);
    }
}