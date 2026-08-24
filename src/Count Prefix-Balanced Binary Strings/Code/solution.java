class Solution {
    static final long MOD = 1000000007L; // Prime modulo used for all calculations.

    // This function calculates (base^exp) % MOD using binary exponentiation.
    private long power(long base, long exp) {
        long result = 1; // Start with the multiplicative identity.
        
        while (exp > 0) { // Process every bit of the exponent.
            if ((exp & 1) == 1) { // If the current bit is set, multiply base.
                result = (result * base) % MOD; // Keep the result under modulo.
            }
            
            base = (base * base) % MOD; // Square base for the next binary bit.
            exp >>= 1; // Move to the next bit.
        }
        
        return result; // Return the calculated modular power.
    }

    public int prefixStrings(int n) {
        long factN = 1; // This will store n!.
        long fact2N = 1; // This will store (2n)!.

        for (int i = 1; i <= 2 * n; i++) { // Calculate factorials up to 2n.
            fact2N = (fact2N * i) % MOD; // Build (2n)!.

            if (i <= n) { // Use only values from 1 to n for n!.
                factN = (factN * i) % MOD; // Build n!.
            }
        }

        // Calculate the modular inverse of n!.
        long inverseFactN = power(factN, MOD - 2);

        // Calculate the modular inverse of (n + 1).
        long inverseNPlusOne = power(n + 1L, MOD - 2);

        // Apply the Catalan number formula under modulo.
        long answer = fact2N;
        answer = (answer * inverseFactN) % MOD; // Divide by the first n!.
        answer = (answer * inverseFactN) % MOD; // Divide by the second n!.
        answer = (answer * inverseNPlusOne) % MOD; // Divide by (n + 1).

        return (int) answer; // Return the final count.
    }
}