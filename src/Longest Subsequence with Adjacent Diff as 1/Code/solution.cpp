class Solution
{
public:
    int longestSubseq(vector<int> &arr)
    {
        // dp[x] stores the longest valid subsequence ending with value x.
        unordered_map<int, int> dp;

        // This stores the longest subsequence found anywhere in the array.
        int ans = 0;

        // Process elements from left to right so only previous elements are used.
        for (int x : arr)
        {
            // A valid previous value must be exactly x - 1 or x + 1.
            int left = dp.count(x - 1) ? dp[x - 1] : 0;
            int right = dp.count(x + 1) ? dp[x + 1] : 0;

            // Extend the longer subsequence by adding the current element x.
            int current = max(left, right) + 1;

            // Store the best length ending with x.
            dp[x] = current;

            // Update the overall maximum answer.
            ans = max(ans, current);
        }

        // Return the length of the longest valid subsequence.
        return ans;
    }
};