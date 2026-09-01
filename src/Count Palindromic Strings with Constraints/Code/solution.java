
class Solution {
    public int palindromicStrings(int n, int k) {
        final long MOD = 1000000007L; // Store the required modulo value.
        long ways = 1;                // Ways to choose 0 characters for the first half.
        long ans = 0;                 // Store the total number of valid palindromes.

        for (int len = 1; len <= n; len++) { // Check every possible palindrome length.
            if (len % 2 == 1) {             // Odd length has one character in the center.
                int pairs = len / 2;        // Number of mirrored pairs.

                // The center must be different from every character used in the pairs.
                // Therefore, k - pairs choices are available for the center.
                ans = (ans + ways * (k - pairs)) % MOD;
            } else {                        // Even length has no center character.
                int pairs = len / 2;        // Number of characters in the first half.

                // Choose a new distinct character for the next position.
                // There are k - pairs + 1 unused characters available.
                ways = (ways * (k - pairs + 1)) % MOD;

                // The first half completely determines the even palindrome.
                ans = (ans + ways) % MOD;
            }
        }

        return (int) ans;                   // Return the answer modulo 10^9 + 7.
    }
}
