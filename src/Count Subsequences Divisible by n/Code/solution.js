class Solution {
  countSubsequences(s, n) {
    // Store the answer modulo 1e9 + 7.
    const MOD = 1000000007;

    // dp[r] stores the number of non-empty subsequences seen so far
    // whose numeric value leaves remainder r when divided by n.
    let dp = new Array(n).fill(0);

    // Process every digit from left to right to maintain subsequence order.
    for (const ch of s) {
      // Convert the current character into a numeric digit.
      const digit = ch.charCodeAt(0) - 48;

      // Copy dp because existing subsequences may skip this digit
      // and should remain part of the next state.
      const next = dp.slice();

      // Append the current digit to every previously formed subsequence.
      for (let remainder = 0; remainder < n; remainder++) {
        // Find the remainder after multiplying the old number by 10
        // and placing the current digit at the end.
        const newRemainder = (remainder * 10 + digit) % n;

        // Add all subsequences from the old remainder state.
        next[newRemainder] = (next[newRemainder] + dp[remainder]) % MOD;
      }

      // The current digit alone creates one new non-empty subsequence.
      const singleRemainder = digit % n;
      next[singleRemainder] = (next[singleRemainder] + 1) % MOD;

      // Update the DP state after processing this digit.
      dp = next;
    }

    // Remainder 0 represents numbers divisible by n.
    return dp[0];
  }
}
