class Solution
{
public:
    int overlapInt(vector<vector<int>> &arr)
    {

        // Step 1: Find maximum ending value
        int maxEnd = 0;
        for (auto &interval : arr)
        {
            maxEnd = max(maxEnd, interval[1]);
        }

        // Step 2: Create difference array
        vector<int> diff(maxEnd + 2, 0);

        // Step 3: Mark start and end+1
        for (auto &interval : arr)
        {
            int start = interval[0];
            int end = interval[1];

            diff[start] += 1;
            diff[end + 1] -= 1;
        }

        int current = 0;
        int maxOverlap = 0;

        // Step 4: Compute prefix sum and track maximum
        for (int i = 0; i <= maxEnd; i++)
        {
            current += diff[i];
            maxOverlap = max(maxOverlap, current);
        }

        return maxOverlap;
    }
};
