class Solution
{
    vector<vector<int>> dp;

    int solve(int idx, int prevSum, string &s)
    {
        int n = s.size();

        // Reached end -> one valid grouping found
        if (idx == n)
            return 1;

        // Return already computed answer
        if (dp[idx][prevSum] != -1)
            return dp[idx][prevSum];

        int ans = 0;
        int currSum = 0;

        // Try every possible group starting at idx
        for (int end = idx; end < n; end++)
        {

            // Add current digit to group sum
            currSum += s[end] - '0';

            // Current group is valid only if sums remain non-decreasing
            if (currSum >= prevSum)
            {
                ans += solve(end + 1, currSum, s);
            }
        }

        // Store result for memoization
        return dp[idx][prevSum] = ans;
    }

public:
    int validGroups(string &s)
    {
        int n = s.size();

        // prevSum can be from 0 to 900
        dp.assign(n, vector<int>(901, -1));

        return solve(0, 0, s);
    }
};