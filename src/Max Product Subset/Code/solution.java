class Solution {
    static final long MOD = 1000000007L;

    // I use fast power to compute modular inverse with Fermat's theorem.
    private long modPow(long base, long exp) {
        long result = 1L;
        base %= MOD;

        while (exp > 0) {
            if ((exp & 1L) == 1L) {
                result = (result * base) % MOD;
            }
            base = (base * base) % MOD;
            exp >>= 1;
        }
        return result;
    }

    public int findMaxProduct(int[] arr) {
        int n = arr.length;

        // I return the only element directly so [-1] stays -1.
        if (n == 1) {
            return arr[0];
        }

        int zeroCount = 0;
        int positiveCount = 0;
        int negativeCount = 0;

        // I keep the smallest absolute negative value for later removal.
        int minNegAbs = 11;

        long product = 1L;

        for (int x : arr) {
            if (x == 0) {
                zeroCount++;
                continue; // Zero does not help unless all choices are weak.
            }

            if (x > 0) {
                positiveCount++;
            } else {
                negativeCount++;
                minNegAbs = Math.min(minNegAbs, Math.abs(x));
            }

            // I multiply absolute values and keep the number inside modulo.
            product = (product * Math.abs((long) x)) % MOD;
        }

        // If everything is zero, the answer is zero.
        if (zeroCount == n) {
            return 0;
        }

        // If there is only one negative and no positive number,
        // I prefer zero over a negative answer.
        if (negativeCount == 1 && positiveCount == 0) {
            return 0;
        }

        // If negatives are odd, I remove the negative closest to zero.
        if ((negativeCount & 1) == 1) {
            long inv = modPow(minNegAbs, MOD - 2);
            product = (product * inv) % MOD;
        }

        return (int) product;
    }
}