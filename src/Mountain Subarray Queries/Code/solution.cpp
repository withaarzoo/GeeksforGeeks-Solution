class Solution
{
public:
    vector<bool> processQueries(vector<int> &arr, vector<vector<int>> &queries)
    {
        int n = arr.size();

        // up[i] = farthest index reachable from i while array stays non-decreasing
        vector<int> up(n);

        // down[i] = farthest index reachable from i while array stays non-increasing
        vector<int> down(n);

        // Last element can reach only itself
        up[n - 1] = n - 1;

        // Build the non-decreasing reach array from right to left
        for (int i = n - 2; i >= 0; i--)
        {
            if (arr[i] <= arr[i + 1])
                up[i] = up[i + 1];
            else
                up[i] = i;
        }

        // Last element can also reach only itself
        down[n - 1] = n - 1;

        // Build the non-increasing reach array from right to left
        for (int i = n - 2; i >= 0; i--)
        {
            if (arr[i] >= arr[i + 1])
                down[i] = down[i + 1];
            else
                down[i] = i;
        }

        vector<bool> ans;

        // Answer every query in O(1)
        for (auto &q : queries)
        {
            int l = q[0];
            int r = q[1];

            // End of the increasing part
            int peak = up[l];

            // Entire range is non-decreasing
            if (peak >= r)
                ans.push_back(true);

            // Check whether decreasing part covers the remaining range
            else
                ans.push_back(down[peak] >= r);
        }

        return ans;
    }
};