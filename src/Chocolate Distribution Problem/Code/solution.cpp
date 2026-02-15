class Solution
{
public:
    int findMinDiff(vector<int> &a, int m)
    {

        int n = a.size();

        // If students are zero or more than packets
        if (m == 0 || n == 0 || m > n)
            return 0;

        // Step 1: Sort the array
        sort(a.begin(), a.end());

        int minDiff = INT_MAX;

        // Step 2: Sliding window of size m
        for (int i = 0; i <= n - m; i++)
        {
            int diff = a[i + m - 1] - a[i];
            minDiff = min(minDiff, diff);
        }

        return minDiff;
    }
};
