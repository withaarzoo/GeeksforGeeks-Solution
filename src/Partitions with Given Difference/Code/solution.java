class Solution {
    public int countPartitions(int[] arr, int diff) {
        int totalSum = 0;

        // Calculate total sum
        for (int num : arr) {
            totalSum += num;
        }

        // If totalSum + diff is odd, answer is impossible
        if ((totalSum + diff) % 2 != 0) {
            return 0;
        }

        int target = (totalSum + diff) / 2;

        // dp[j] = number of ways to make sum j
        int[] dp = new int[target + 1];

        // One way to form sum 0
        dp[0] = 1;

        for (int num : arr) {
            // Traverse backwards
            for (int j = target; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }

        return dp[target];
    }
}