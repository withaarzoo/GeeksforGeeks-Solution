class Solution
{
public:
    int hIndex(vector<int> &citations)
    {
        int n = citations.size();

        // Step 1: Sort the array in ascending order
        sort(citations.begin(), citations.end());

        // Step 2: Traverse and check condition
        for (int i = 0; i < n; i++)
        {
            int papers = n - i; // papers having citations >= citations[i]

            if (citations[i] >= papers)
            {
                return papers; // maximum possible H-index
            }
        }

        return 0; // if no valid H found
    }
};