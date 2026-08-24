class Solution {
  public:
    // This function calculates (base^exp) % mod using binary exponentiation.
    long long power(long long base, long long exp, long long mod) {
        long long result = 1; // Start with the multiplicative identity.
        
        while (exp > 0) { // Process every bit of the exponent.
            if (exp & 1) { // If the current bit is set, include base in the answer.
                result = (result * base) % mod; // Keep the value within modulo.
            }
            
            base = (base * base) % mod; // Square base for the next binary bit.
            exp >>= 1; // Move to the next bit of the exponent.
        }
        
        return result; // Return the final modular power.
    }

    int prefixStrings(int n) {
        const long long MOD = 1000000007LL; // Prime modulo required by the problem.
        long long factN = 1; // This will store n!.
        long long fact2N = 1; // This will store (2n)!.

        for (int i = 1; i <= 2 * n; i++) { // Calculate factorial values up to 2n.
            fact2N = (fact2N * i) % MOD; // Build (2n)! step by step.

            if (i <= n) { // Only multiply the first n values for n!.
                factN = (factN * i) % MOD; // Build n! step by step.
            }
        }

        // By Fermat's theorem, x^(MOD-2) is the modular inverse of x.
        long long inverseFactN = power(factN, MOD - 2, MOD);

        // Find the modular inverse of (n + 1) for the Catalan formula.
        long long inverseNPlusOne = power(n + 1, MOD - 2, MOD);

        // Apply Cn = (2n)! / (n! * n! * (n + 1)) under modulo.
        long long answer = fact2N;
        answer = (answer * inverseFactN) % MOD; // Divide by the first n!.
        answer = (answer * inverseFactN) % MOD; // Divide by the second n!.
        answer = (answer * inverseNPlusOne) % MOD; // Divide by (n + 1).

        return (int)answer; // Return the nth Catalan number.
    }
};