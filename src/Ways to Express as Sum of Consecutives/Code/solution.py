class Solution:
    def getCount(self, n):
        # Remove every factor of 2 because only odd divisors matter.
        while n % 2 == 0:
            n //= 2

        # This will store the number of divisors of the remaining odd part.
        divisor_count = 0

        # I start from 1 and only check possible divisors up to sqrt(n).
        i = 1
        while i * i <= n:
            # If i divides n, then i and n // i form a divisor pair.
            if n % i == 0:
                # A perfect square has only one divisor at this point.
                if i * i == n:
                    divisor_count += 1
                else:
                    # Otherwise, both divisors in the pair are different.
                    divisor_count += 2

            # Move to the next possible divisor.
            i += 1

        # Remove the single-number representation consisting of n itself.
        return divisor_count - 1