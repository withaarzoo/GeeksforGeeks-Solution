class Solution
{
public:
    // HashMap to store already computed answers
    unordered_map<int, int> dp;

    int solve(int n)
    {

        // Base case:
        // For 0 or 1, breaking is useless
        if (n <= 1)
            return n;

        // If already calculated, return stored answer
        if (dp.count(n))
            return dp[n];

        // Recursively calculate the broken sum
        int broken =
            solve(n / 2) +
            solve(n / 3) +
            solve(n / 4);

        // Store the maximum between:
        // original number OR broken recursive sum
        return dp[n] = max(n, broken);
    }

    int maxSum(int n)
    {

        // Start recursive calculation
        return solve(n);
    }
};