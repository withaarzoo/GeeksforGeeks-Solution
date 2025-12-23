class Solution
{
public:
    vector<int> cntInRange(vector<int> &arr, vector<vector<int>> &queries)
    {
        // Step 1: Sort the array
        sort(arr.begin(), arr.end());

        vector<int> result;

        for (auto &q : queries)
        {
            int a = q[0];
            int b = q[1];

            // First element greater than b
            int right = upper_bound(arr.begin(), arr.end(), b) - arr.begin();

            // First element greater than or equal to a
            int left = lower_bound(arr.begin(), arr.end(), a) - arr.begin();

            // Count of elements in range [a, b]
            result.push_back(right - left);
        }

        return result;
    }
};
