class Solution
{
public:
    vector<int> constructList(vector<vector<int>> &queries)
    {

        // Stores XOR of all future type-1 queries
        int xr = 0;

        // Resulting values before sorting
        vector<int> ans;

        // Process queries from right to left
        for (int i = (int)queries.size() - 1; i >= 0; i--)
        {

            // Type 1 query: update cumulative XOR
            if (queries[i][0] == 1)
            {
                xr ^= queries[i][1];
            }
            else
            {
                // Inserted value gets affected by all future XORs
                ans.push_back(queries[i][1] ^ xr);
            }
        }

        // Initial element 0 becomes 0 ^ xr
        ans.push_back(xr);

        // Required output is sorted
        sort(ans.begin(), ans.end());

        return ans;
    }
};