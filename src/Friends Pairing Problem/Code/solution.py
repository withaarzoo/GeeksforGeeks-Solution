class Solution:
    def countFriendsPairings(self, n: int) -> int:

        # Modulo value
        MOD = 1000000007

        # Base case
        if n == 1:
            return 1

        # Base case
        if n == 2:
            return 2

        # Stores f(1)
        prev2 = 1

        # Stores f(2)
        prev1 = 2

        # Compute answer from 3 to n
        for i in range(3, n + 1):

            # Apply recurrence relation
            curr = (prev1 + ((i - 1) * prev2) % MOD) % MOD

            # Update previous values
            prev2 = prev1
            prev1 = curr

        # Return final answer
        return prev1