class Solution {
    public int countFriendsPairings(int n) {

        // Modulo value
        final int MOD = 1000000007;

        // Base case
        if (n == 1)
            return 1;

        // Base case
        if (n == 2)
            return 2;

        // Stores f(1)
        long prev2 = 1;

        // Stores f(2)
        long prev1 = 2;

        // Build answer iteratively
        for (int i = 3; i <= n; i++) {

            // Apply recurrence relation
            long curr = (prev1 + ((long)(i - 1) * prev2) % MOD) % MOD;

            // Update previous values
            prev2 = prev1;
            prev1 = curr;
        }

        // Return final answer
        return (int) prev1;
    }
}