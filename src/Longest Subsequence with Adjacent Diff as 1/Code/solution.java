class Solution {
    public int longestSubseq(int[] arr) {
        // dp[x] stores the longest valid subsequence ending with value x.
        HashMap<Integer, Integer> dp = new HashMap<>();

        // This stores the longest subsequence found so far.
        int ans = 0;

        // Process the array from left to right to preserve subsequence order.
        for (int x : arr) {
            // Get the best subsequence ending at x - 1, or 0 if it does not exist.
            int left = dp.getOrDefault(x - 1, 0);

            // Get the best subsequence ending at x + 1, or 0 if it does not exist.
            int right = dp.getOrDefault(x + 1, 0);

            // Extend the better neighboring subsequence with the current x.
            int current = Math.max(left, right) + 1;

            // Store the best length ending with value x.
            dp.put(x, current);

            // Update the overall maximum length.
            ans = Math.max(ans, current);
        }

        // Return the longest valid subsequence length.
        return ans;
    }
}