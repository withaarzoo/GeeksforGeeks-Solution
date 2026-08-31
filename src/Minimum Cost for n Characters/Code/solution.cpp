class Solution
{
public:
    int minCost(int n, int i, int d, int c)
    {
        // dp[x] stores the minimum cost needed to get exactly x characters.
        vector<int> dp(n + 1, 0);

        // The screen is initially empty, so getting 0 characters costs nothing.
        dp[0] = 0;

        // Calculate the answer for every length from 1 to n.
        for (int x = 1; x <= n; x++)
        {
            // The simplest way to get x characters is to insert one
            // character after already getting x - 1 characters.
            dp[x] = dp[x - 1] + i;

            if (x % 2 == 0)
            {
                // If x is even, x / 2 characters can be copied exactly
                // to make x characters.
                dp[x] = min(dp[x], dp[x / 2] + c);
            }
            else
            {
                // For odd x, start with floor(x / 2) characters,
                // copy them, and insert the remaining one character.
                dp[x] = min(dp[x], dp[x / 2] + c + i);

                // Another option is to start with ceil(x / 2) characters,
                // copy them to get x + 1 characters, and delete one.
                dp[x] = min(dp[x], dp[x / 2 + 1] + c + d);
            }
        }

        // dp[n] contains the minimum cost for exactly n characters.
        return dp[n];
    }
};