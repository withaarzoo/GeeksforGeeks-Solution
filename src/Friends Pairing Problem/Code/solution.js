/**
 * @param {number} n
 * @return {number}
 */

class Solution {

    countFriendsPairings(n) {

        // Modulo value
        const MOD = 1000000007;

        // Base case
        if (n === 1) return 1;

        // Base case
        if (n === 2) return 2;

        // Stores f(1)
        let prev2 = 1;

        // Stores f(2)
        let prev1 = 2;

        // Compute answers iteratively
        for (let i = 3; i <= n; i++) {

            // Apply recurrence relation
            const curr = (prev1 + ((i - 1) * prev2) % MOD) % MOD;

            // Update previous answers
            prev2 = prev1;
            prev1 = curr;
        }

        // Final answer
        return prev1;
    }
}