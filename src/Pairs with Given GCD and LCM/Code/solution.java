class Solution {
    public int pairCount(int x, int y) {
        // If y is not divisible by x, no valid pair can exist.
        if (y % x != 0)
            return 0;

        // After removing the required GCD, p * q must be y / x.
        int n = y / x;

        // Stores the number of distinct prime factors of n.
        int distinctPrimes = 0;

        // Try possible divisors up to sqrt(n).
        for (int p = 2; p * p <= n; p++) {
            // If p divides n, p is a distinct prime factor.
            if (n % p == 0) {
                distinctPrimes++;

                // Remove every occurrence of p so it is counted once.
                while (n % p == 0)
                    n /= p;
            }
        }

        // Any remaining value greater than 1 is a distinct prime factor.
        if (n > 1)
            distinctPrimes++;

        // Every distinct prime has two choices: it goes to a or to b.
        return 1 << distinctPrimes;
    }
}