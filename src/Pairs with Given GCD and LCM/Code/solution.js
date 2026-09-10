class Solution {
    /**
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    pairCount(x, y) {
        // If y is not divisible by x, there is no valid pair.
        if (y % x !== 0)
            return 0;

        // After removing the required GCD, p * q must equal y / x.
        let n = y / x;

        // Stores the number of distinct prime factors.
        let distinctPrimes = 0;

        // Try possible divisors up to sqrt(n).
        for (let p = 2; p * p <= n; p++) {
            // If p divides n, p is one distinct prime factor.
            if (n % p === 0) {
                distinctPrimes++;

                // Remove all copies of p so it is counted only once.
                while (n % p === 0)
                    n /= p;
            }
        }

        // If a value greater than 1 remains, it is also a prime factor.
        if (n > 1)
            distinctPrimes++;

        // Each distinct prime can be assigned to either number.
        return 2 ** distinctPrimes;
    }
}