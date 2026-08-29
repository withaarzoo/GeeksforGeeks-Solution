class Solution {
    public int countSubsequences(String s, int n) {
        // Store the answer modulo 1e9 + 7.
        final int MOD = 1_000_000_007;

        // dp[r] stores the number of non-empty subsequences seen so far
        // whose numeric value gives remainder r when divided by n.
        long[] dp = new long[n];

        // Process every digit from left to right to preserve subsequence order.
        for (int i = 0; i < s.length(); i++) {
            // Convert the current character into its numeric digit value.
            int digit = s.charAt(i) - '0';

            // Copy dp because every old subsequence can skip the current digit
            // and therefore remain unchanged.
            long[] next = dp.clone();

            // Append the current digit to every existing subsequence.
            for (int remainder = 0; remainder < n; remainder++) {
                // Calculate the remainder after adding this digit at the end.
                int newRemainder = (int) ((remainder * 10L + digit) % n);

                // Add all subsequences having the old remainder to the new state.
                next[newRemainder] =
                    (next[newRemainder] + dp[remainder]) % MOD;
            }

            // The current digit by itself forms one new subsequence.
            int singleRemainder = digit % n;
            next[singleRemainder] = (next[singleRemainder] + 1) % MOD;

            // Use the newly calculated state for the next character.
            dp = next;
        }

        // All subsequences with remainder 0 are divisible by n.
        return (int) dp[0];
    }
}