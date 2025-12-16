class Solution
{
public:
    vector<vector<int>> mergeOverlap(vector<vector<int>> &arr)
    {
        // If no intervals, return empty result
        if (arr.empty())
            return {};

        // Step 1: Sort intervals by start time
        sort(arr.begin(), arr.end());

        vector<vector<int>> result;

        // Step 2: Take first interval as current
        int start = arr[0][0];
        int end = arr[0][1];

        // Step 3: Traverse remaining intervals
        for (int i = 1; i < arr.size(); i++)
        {
            // If overlapping
            if (arr[i][0] <= end)
            {
                end = max(end, arr[i][1]);
            }
            // If not overlapping
            else
            {
                result.push_back({start, end});
                start = arr[i][0];
                end = arr[i][1];
            }
        }

        // Step 4: Add last interval
        result.push_back({start, end});

        return result;
    }
};
