class Solution {
  public:
    int countPartitions(vector<int>& arr, int diff) {
        int totalSum = 0;
        
        // Calculate total sum of array
        for (int num : arr) {
            totalSum += num;
        }
        
        // If totalSum + diff is odd, partition is impossible
        if ((totalSum + diff) % 2 != 0) {
            return 0;
        }
        
        int target = (totalSum + diff) / 2;
        
        // dp[j] = number of ways to make sum j
        vector<int> dp(target + 1, 0);
        
        // One way to make sum 0 -> choose nothing
        dp[0] = 1;
        
        for (int num : arr) {
            // Traverse backwards to avoid reusing same element
            for (int j = target; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }
        
        return dp[target];
    }
};