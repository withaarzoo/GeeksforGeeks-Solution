class Solution
{
public:
    vector<vector<int>> levelSort(vector<int> &arr)
    {
        // Store the final answer
        vector<vector<int>> ans;

        // Total number of elements
        int n = arr.size();

        // Current index in the array
        int index = 0;

        // Number of nodes expected at the current level
        int levelSize = 1;

        // Continue until every array element is processed
        while (index < n)
        {

            // Store all nodes of the current level
            vector<int> level;

            // Pick at most levelSize elements
            for (int i = 0; i < levelSize && index < n; i++)
            {
                level.push_back(arr[index]);
                index++;
            }

            // Sort only this level
            sort(level.begin(), level.end());

            // Save the sorted level
            ans.push_back(level);

            // Next level contains twice as many nodes
            levelSize *= 2;
        }

        // Return all sorted levels
        return ans;
    }
};