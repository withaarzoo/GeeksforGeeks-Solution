
class Solution {
  public:
    int palindromicStrings(int n, int k) {
        const long long MOD = 1000000007LL; // Store the required modulo value.
        long long ways = 1;                 // Ways to choose 0 characters for the first half.
        long long ans = 0;                  // Store the total number of valid palindromes.

        for (int len = 1; len <= n; ++len) { // Check every possible palindrome length.
            if (len % 2 == 1) {             // Odd length has one character in the center.
                int pairs = len / 2;        // Number of mirrored pairs in this palindrome.

                // The first half has already been counted in ways.
                // The center must be a character not used in those pairs.
                ans = (ans + ways * (k - pairs)) % MOD;
            } else {                        // Even length has no center character.
                int pairs = len / 2;        // Number of characters needed in the first half.

                // Add one new distinct character to the first half.
                // There are k - pairs + 1 choices for this new position.
                ways = (ways * (k - pairs + 1)) % MOD;

                // The first half completely determines an even palindrome.
                ans = (ans + ways) % MOD;
            }
        }

        return (int)ans;                    // Return the answer modulo 10^9 + 7.
    }
};
