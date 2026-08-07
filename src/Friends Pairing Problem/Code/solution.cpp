class Solution {
  public:
    int countFriendsPairings(int n) {
        // Modulo value given in the problem
        const int MOD = 1000000007;

        // Base case: only one friend
        if (n == 1) return 1;

        // Base case: two friends
        if (n == 2) return 2;

        // prev2 stores f(1)
        long long prev2 = 1;

        // prev1 stores f(2)
        long long prev1 = 2;

        // Compute answers from 3 to n
        for (int i = 3; i <= n; i++) {

            // Current answer using recurrence:
            // f(i) = f(i-1) + (i-1) * f(i-2)
            long long curr = (prev1 + ((i - 1) * prev2) % MOD) % MOD;

            // Shift values for next iteration
            prev2 = prev1;
            prev1 = curr;
        }

        // Final answer
        return prev1;
    }
};