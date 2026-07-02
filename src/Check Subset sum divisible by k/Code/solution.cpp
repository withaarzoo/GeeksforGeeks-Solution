class Solution {
  public:
    bool divisibleByK(vector<int>& arr, int k) {
        // dp[r] tells whether some non-empty subset
        // can produce remainder r
        vector<bool> dp(k, false);

        // Process every element
        for (int num : arr) {

            // Copy previous states so current element
            // is not reused multiple times
            vector<bool> next = dp;

            // Current element alone forms a subset
            next[num % k] = true;

            // Try adding current element to every
            // previously possible remainder
            for (int r = 0; r < k; r++) {
                if (dp[r]) {
                    int newRem = (r + num) % k;
                    next[newRem] = true;
                }
            }

            // Update DP
            dp = next;

            // If remainder 0 exists, answer is true
            if (dp[0])
                return true;
        }

        // No valid subset found
        return false;
    }
};