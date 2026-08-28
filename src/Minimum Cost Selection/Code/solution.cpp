class Solution
{
public:
    int minCost(vector<vector<int>> &mat)
    {
        // I store the minimum costs for all three choices in the first row.
        int prev0 = mat[0][0];
        int prev1 = mat[0][1];
        int prev2 = mat[0][2];

        // I process every row starting from the second row.
        for (int i = 1; i < mat.size(); i++)
        {
            // I cannot repeat choice 0, so I come from choice 1 or 2.
            int curr0 = mat[i][0] + min(prev1, prev2);

            // I cannot repeat choice 1, so I come from choice 0 or 2.
            int curr1 = mat[i][1] + min(prev0, prev2);

            // I cannot repeat choice 2, so I come from choice 0 or 1.
            int curr2 = mat[i][2] + min(prev0, prev1);

            // I update the previous-row costs for processing the next row.
            prev0 = curr0;
            prev1 = curr1;
            prev2 = curr2;
        }

        // I return the cheapest valid selection ending with any of the three choices.
        return min(prev0, min(prev1, prev2));
    }
};