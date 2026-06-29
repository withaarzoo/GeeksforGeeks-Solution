class Solution {
  public:
    int maxDotProduct(vector<int>& a, vector<int>& b) {
        int n = a.size(), m = b.size();

        // A very small value to represent an impossible state
        const int NEG = -1e9;

        // dp[j] = answer after processing current prefix of a
        vector<int> dp(m + 1, NEG);

        // Using zero elements from b always gives dot product 0
        dp[0] = 0;

        // Process every element of a
        for (int i = 1; i <= n; i++) {

            // Store previous row before updating
            vector<int> ndp = dp;

            // Try matching current a with every possible b
            for (int j = 1; j <= min(i, m); j++) {

                // Option 1: Skip current a (insert 0 in b)
                ndp[j] = max(ndp[j], dp[j]);

                // Option 2: Match current a with current b
                if (dp[j - 1] != NEG) {
                    ndp[j] = max(ndp[j],
                                 dp[j - 1] + a[i - 1] * b[j - 1]);
                }
            }

            // Move to next row
            dp = ndp;
        }

        // Final answer after using all elements of b
        return dp[m];
    }
};