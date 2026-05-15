class Solution
{
public:
    int optimalKeys(int n)
    {

        // dp[i] stores the maximum number of A's
        // possible using exactly i key presses
        vector<int> dp(n + 1, 0);

        // Base case:
        // For small values, simply press 'A'
        for (int i = 1; i <= n; i++)
        {
            dp[i] = i;
        }

        // Try all lengths from 1 to n
        for (int i = 1; i <= n; i++)
        {

            // j represents the point where
            // we stop typing and start copy-paste operations
            for (int j = 1; j <= i - 3; j++)
            {

                // After j presses:
                // Ctrl+A -> 1 press
                // Ctrl+C -> 1 press
                // Remaining are Ctrl+V operations
                // Total multiplication becomes (i - j - 1)
                dp[i] = max(dp[i], dp[j] * (i - j - 1));
            }
        }

        // Final answer
        return dp[n];
    }
};