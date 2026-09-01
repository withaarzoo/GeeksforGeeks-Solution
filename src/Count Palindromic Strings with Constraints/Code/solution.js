/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

class Solution {
  palindromicStrings(n, k) {
    const MOD = 1000000007n; // BigInt keeps multiplication exact beyond JavaScript's safe integer range.
    let ways = 1n; // Ways to choose 0 characters for the first half.
    let ans = 0n; // Store the total number of valid palindromes.

    for (let len = 1; len <= n; len++) {
      // Check every possible palindrome length.
      if (len % 2 === 1) {
        // Odd length contains one center character.
        const pairs = Math.floor(len / 2); // Number of mirrored pairs.

        // The center cannot be any character already used in the first half.
        // Therefore, k - pairs choices are available.
        ans = (ans + ways * BigInt(k - pairs)) % MOD;
      } else {
        // Even length has no center character.
        const pairs = len / 2; // Number of characters in the first half.

        // Choose a new character that has not appeared in the first half.
        // There are k - pairs + 1 choices for this position.
        ways = (ways * BigInt(k - pairs + 1)) % MOD;

        // The first half completely determines the even palindrome.
        ans = (ans + ways) % MOD;
      }
    }

    return Number(ans); // Convert the final modulo result back to a normal number.
  }
}
