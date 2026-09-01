
class Solution:
    def palindromicStrings(self, n, k):
        MOD = 1000000007       # Store the required modulo value.
        ways = 1               # Ways to choose 0 characters for the first half.
        ans = 0                # Store the total number of valid palindromes.

        for length in range(1, n + 1):  # Check every possible palindrome length.
            if length % 2 == 1:         # Odd length has one character in the center.
                pairs = length // 2      # Number of mirrored pairs.

                # The center cannot use a character already present in the pairs.
                # Therefore, k - pairs choices are available.
                ans = (ans + ways * (k - pairs)) % MOD
            else:                       # Even length has no center character.
                pairs = length // 2      # Number of characters in the first half.

                # Choose a new distinct character for the next position.
                # There are k - pairs + 1 unused characters available.
                ways = (ways * (k - pairs + 1)) % MOD

                # The first half completely determines the even palindrome.
                ans = (ans + ways) % MOD

        return ans                       # Return the answer modulo 10^9 + 7.