class Solution {
  public:
    int totalWays(vector<int>& arr, int target) {
        int totalSum = 0;
        
        for (int num : arr) {
            totalSum += num;
        }

        // If target is impossible to achieve
        if (abs(target) > totalSum) {
            return 0;
        }

        // totalSum + target must be even
        if ((totalSum + target) % 2 != 0) {
            return 0;
        }

        int required = (totalSum + target) / 2;

        vector<int> dp(required + 1, 0);
        dp[0] = 1;

        for (int num : arr) {
            for (int sum = required; sum >= num; sum--) {
                dp[sum] += dp[sum - num];
            }
        }

        return dp[required];
    }
};