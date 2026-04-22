class Solution
{
public:
    vector<int> findMean(vector<int> &arr, vector<vector<int>> &queries)
    {
        int n = arr.size();

        // Prefix sum array
        vector<long long> prefix(n + 1, 0);

        // Build prefix sum
        for (int i = 0; i < n; i++)
        {
            prefix[i + 1] = prefix[i] + arr[i];
        }

        vector<int> ans;

        // Process each query
        for (auto &q : queries)
        {
            int l = q[0];
            int r = q[1];

            // Sum of subarray [l...r]
            long long sum = prefix[r + 1] - prefix[l];

            // Number of elements in range
            int len = r - l + 1;

            // Floor mean
            ans.push_back(sum / len);
        }

        return ans;
    }
};