class Solution {
    public int getCount(int n) {
        // Remove every factor of 2 because only odd divisors matter.
        while (n % 2 == 0) {
            n /= 2;
        }

        // This will store the number of divisors of the remaining odd part.
        int divisorCount = 0;

        // I only check up to sqrt(n) because divisors always come in pairs.
        for (int i = 1; (long) i * i <= n; i++) {
            // If i divides n, then i and n / i form a divisor pair.
            if (n % i == 0) {
                // A perfect square has only one divisor at this point.
                if ((long) i * i == n) {
                    divisorCount++;
                } else {
                    // Otherwise, both i and n / i are different divisors.
                    divisorCount += 2;
                }
            }
        }

        // Remove the single-number representation consisting of n itself.
        return divisorCount - 1;
    }
};