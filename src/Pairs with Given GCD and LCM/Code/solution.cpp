class Solution {
  public:
    int pairCount(int x, int y) {
        // If y is not divisible by x, x cannot be the GCD and y the LCM.
        if (y % x != 0)
            return 0;

        // After removing the required GCD, p * q must be equal to y / x.
        int n = y / x;

        // This stores the number of distinct prime factors of n.
        int distinctPrimes = 0;

        // Try every possible prime factor up to sqrt(n).
        for (int p = 2; p * p <= n; ++p) {
            // If p divides n, p is one distinct prime factor.
            if (n % p == 0) {
                ++distinctPrimes;

                // Remove all copies of p so it is counted only once.
                while (n % p == 0)
                    n /= p;
            }
        }

        // If something greater than 1 remains, it is also a distinct prime factor.
        if (n > 1)
            ++distinctPrimes;

        // Each distinct prime can independently go completely to either number.
        return 1 << distinctPrimes;
    }
};