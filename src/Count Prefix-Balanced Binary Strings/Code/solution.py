class Solution:
    # This function calculates (base ** exp) % mod using binary exponentiation.
    def power(self, base: int, exp: int, mod: int) -> int:
        result = 1  # Start with the multiplicative identity.

        while exp > 0:  # Process every bit of the exponent.
            if exp & 1:  # If the current bit is set, include base in the result.
                result = (result * base) % mod  # Keep the result within modulo.

            base = (base * base) % mod  # Square base for the next binary bit.
            exp >>= 1  # Move to the next bit of the exponent.

        return result  # Return the final modular power.

    def prefixStrings(self, n: int) -> int:
        MOD = 1000000007  # Prime modulo required by the problem.
        fact_n = 1  # This will store n!.
        fact_2n = 1  # This will store (2n)!.

        for i in range(1, 2 * n + 1):  # Calculate factorial values up to 2n.
            fact_2n = (fact_2n * i) % MOD  # Build (2n)!.

            if i <= n:  # Use only values from 1 to n for n!.
                fact_n = (fact_n * i) % MOD  # Build n!.

        # Calculate the modular inverse of n! using Fermat's Little Theorem.
        inverse_fact_n = self.power(fact_n, MOD - 2, MOD)

        # Calculate the modular inverse of (n + 1).
        inverse_n_plus_one = self.power(n + 1, MOD - 2, MOD)

        # Apply Cn = (2n)! / (n! * n! * (n + 1)) under modulo.
        answer = fact_2n
        answer = (answer * inverse_fact_n) % MOD  # Divide by the first n!.
        answer = (answer * inverse_fact_n) % MOD  # Divide by the second n!.
        answer = (answer * inverse_n_plus_one) % MOD  # Divide by (n + 1).

        return answer  # Return the nth Catalan number.