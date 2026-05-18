import java.util.HashMap;

class Solution {
    
    // HashMap for memoization
    HashMap<Integer, Integer> dp = new HashMap<>();

    int solve(int n) {

        // Base case
        if (n <= 1)
            return n;

        // Return stored answer if already computed
        if (dp.containsKey(n))
            return dp.get(n);

        // Recursively calculate all three parts
        int broken =
            solve(n / 2) +
            solve(n / 3) +
            solve(n / 4);

        // Take maximum between original number
        // and recursive broken sum
        int ans = Math.max(n, broken);

        // Store answer for future reuse
        dp.put(n, ans);

        return ans;
    }

    public int maxSum(int n) {
        
        // Start recursion
        return solve(n);
    }
}