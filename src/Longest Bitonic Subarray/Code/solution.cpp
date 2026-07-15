class Solution
{
public:
    int bitonic(vector<int> &arr)
    {
        int n = arr.size();

        // Stores length of non-decreasing subarray ending at each index
        vector<int> inc(n, 1);

        // Build the increasing information
        for (int i = 1; i < n; i++)
        {
            if (arr[i] >= arr[i - 1])
                inc[i] = inc[i - 1] + 1;
        }

        // Stores length of non-increasing subarray starting at each index
        vector<int> dec(n, 1);

        // Build the decreasing information from right to left
        for (int i = n - 2; i >= 0; i--)
        {
            if (arr[i] >= arr[i + 1])
                dec[i] = dec[i + 1] + 1;
        }

        int ans = 1;

        // Treat every index as the peak of a bitonic subarray
        for (int i = 0; i < n; i++)
        {
            ans = max(ans, inc[i] + dec[i] - 1);
        }

        return ans;
    }
};