class Solution
{
public:
    int minCost(vector<int> &height)
    {
        int n = (int)height.size();
        if (n <= 1)
            return 0;
        // dp[0] = 0, dp[1] = |h1 - h0|
        int prev2 = 0;
        int prev1 = abs(height[1] - height[0]);
        if (n == 2)
            return prev1;

        for (int i = 2; i < n; ++i)
        {
            int jump1 = prev1 + abs(height[i] - height[i - 1]); // from i-1
            int jump2 = prev2 + abs(height[i] - height[i - 2]); // from i-2
            int curr = min(jump1, jump2);
            // slide window
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1; // dp[n-1]
    }
};
