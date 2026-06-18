class Solution
{
public:
    int findCoverage(vector<vector<int>> &mat)
    {
        // Get matrix dimensions so I can scan it safely.
        int n = mat.size();
        int m = mat[0].size();

        // colTotal[j] stores total number of 1s in column j.
        vector<int> colTotal(m, 0);

        // First pass: count total 1s in every column.
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {
                colTotal[j] += mat[i][j];
            }
        }

        // colPrefix[j] stores number of 1s seen in column j in rows above the current row.
        vector<int> colPrefix(m, 0);

        int ans = 0;

        // Second pass: compute coverage for every zero cell.
        for (int i = 0; i < n; i++)
        {
            // rowTotal stores total number of 1s in the current row.
            int rowTotal = 0;
            for (int j = 0; j < m; j++)
            {
                rowTotal += mat[i][j];
            }

            // leftOnes stores number of 1s already seen to the left in the current row.
            int leftOnes = 0;

            for (int j = 0; j < m; j++)
            {
                if (mat[i][j] == 0)
                {
                    int coverage = 0;

                    // If I have already seen a 1 on the left, left direction is covered.
                    if (leftOnes > 0)
                        coverage++;

                    // If there is at least one 1 after this cell in the row, right is covered.
                    if (rowTotal - leftOnes > 0)
                        coverage++;

                    // If there is at least one 1 above this cell, up is covered.
                    if (colPrefix[j] > 0)
                        coverage++;

                    // If there is at least one 1 below this cell, down is covered.
                    if (colTotal[j] - colPrefix[j] > 0)
                        coverage++;

                    ans += coverage;
                }
                else
                {
                    // Current cell is 1, so it may help future zero cells on the right.
                    leftOnes++;
                }
            }

            // After finishing the row, update column prefixes with the current row's 1s.
            // I do this at the end so the current row is not counted in "up".
            for (int j = 0; j < m; j++)
            {
                if (mat[i][j] == 1)
                {
                    colPrefix[j]++;
                }
            }
        }

        return ans;
    }
};