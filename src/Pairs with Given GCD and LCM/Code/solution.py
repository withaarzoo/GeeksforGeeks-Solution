class Solution:

    def pairCount(self, x, y):
        # If y is not divisible by x, no valid pair can exist.
        if y % x != 0:
            return 0

        # After removing the required GCD, p * q must equal y / x.
        n = y // x

        # Stores the number of distinct prime factors of n.
        distinct_primes = 0

        # Try possible divisors up to sqrt(n).
        p = 2
        while p * p <= n:
            # If p divides n, p is one distinct prime factor.
            if n % p == 0:
                distinct_primes += 1

                # Remove all copies of p so it is counted only once.
                while n % p == 0:
                    n //= p

            # Move to the next possible divisor.
            p += 1

        # If something greater than 1 remains, it is a distinct prime factor.
        if n > 1:
            distinct_primes += 1

        # Each distinct prime has two choices: a or b.
        return 2 ** distinct_primes