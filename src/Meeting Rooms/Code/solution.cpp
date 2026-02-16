class Solution
{
public:
    bool canAttend(vector<vector<int>> &arr)
    {
        int n = arr.size();

        // Step 1: Sort meetings by starting time
        sort(arr.begin(), arr.end());

        // Step 2: Check for overlapping
        for (int i = 1; i < n; i++)
        {
            // If current meeting starts before previous ends
            if (arr[i][0] < arr[i - 1][1])
            {
                return false;
            }
        }

        // If no overlap found
        return true;
    }
};
