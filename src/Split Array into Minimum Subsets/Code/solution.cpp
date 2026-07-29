class Solution
{
public:
    int minSubsets(vector<int> &arr)
    {
        // Store all numbers for O(1) average lookup
        unordered_set<int> st(arr.begin(), arr.end());

        int ans = 0;

        // Check every number
        for (int x : arr)
        {
            // If previous consecutive number does not exist,
            // then this number starts a new subset
            if (!st.count(x - 1))
                ans++;
        }

        // Return total number of starting points
        return ans;
    }
};