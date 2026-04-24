class Solution
{
public:
    int visibleBuildings(vector<int> &arr)
    {
        int n = arr.size();

        int count = 1;          // First building always gets sunlight
        int maxHeight = arr[0]; // Track max height seen so far

        for (int i = 1; i < n; i++)
        {
            // If current building is taller or equal
            if (arr[i] >= maxHeight)
            {
                count++;            // It gets sunlight
                maxHeight = arr[i]; // Update max height
            }
        }

        return count;
    }
};