/*
 * @param {number} n
 * @return {number}
 */
class Solution {
    // This function calculates (base^exp) % mod using binary exponentiation.
    power(base, exp, mod) {
        let result = 1n; // Start with the multiplicative identity.
        base %= mod; // Keep the starting base inside the modulo range.

        while (exp > 0n) { // Process every bit of the exponent.
            if (exp & 1n) { // If the current bit is set, multiply base.
                result = (result * base) % mod; // Keep the result under modulo.
            }

            base = (base * base) % mod; // Square base for the next binary bit.
            exp >>= 1n; // Move to the next bit.
        }

        return result; // Return the modular power.
    }

    prefixStrings(n) {
        const MOD = 1000000007n; // Prime modulo used by the problem.
        const N = BigInt(n); // Convert n to BigInt for exact multiplication.
        let factN = 1n; // This will store n!.
        let fact2N = 1n; // This will store (2n)!.

        for (let i = 1n; i <= 2n * N; i++) { // Calculate factorials up to 2n.
            fact2N = (fact2N * i) % MOD; // Build (2n)!.

            if (i <= N) { // Use only the first n values for n!.
                factN = (factN * i) % MOD; // Build n!.
            }
        }

        // Calculate the modular inverse of n! using Fermat's theorem.
        const inverseFactN = this.power(factN, MOD - 2n, MOD);

        // Calculate the modular inverse of (n + 1).
        const inverseNPlusOne = this.power(N + 1n, MOD - 2n, MOD);

        // Apply the Catalan number formula under modulo.
        let answer = fact2N;
        answer = (answer * inverseFactN) % MOD; // Divide by the first n!.
        answer = (answer * inverseFactN) % MOD; // Divide by the second n!.
        answer = (answer * inverseNPlusOne) % MOD; // Divide by (n + 1).

        return Number(answer); // Convert the final value back to Number.
    }
}