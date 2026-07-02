class Solution {
    public boolean divisibleByK(int[] arr, int k) {

        // dp[r] tells whether some non-empty subset
        // can produce remainder r
        boolean[] dp = new boolean[k];

        // Process every element
        for (int num : arr) {

            // Copy previous DP states
            boolean[] next = dp.clone();

            // Current element alone forms a subset
            next[num % k] = true;

            // Extend all previous subsets
            for (int r = 0; r < k; r++) {
                if (dp[r]) {
                    int newRem = (r + num) % k;
                    next[newRem] = true;
                }
            }

            // Update DP
            dp = next;

            // Remainder 0 means divisible
            if (dp[0])
                return true;
        }

        // No valid subset exists
        return false;
    }
}