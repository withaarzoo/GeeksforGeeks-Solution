class Solution
{
public:
    vector<int> findPeakGrid(vector<vector<int>> &mat)
    {
        int n = mat.size();
        int m = mat[0].size();

        // Traverse every cell in the matrix
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {

                int curr = mat[i][j];

                // Safely get neighbor values
                int up = (i > 0) ? mat[i - 1][j] : INT_MIN;
                int down = (i < n - 1) ? mat[i + 1][j] : INT_MIN;
                int left = (j > 0) ? mat[i][j - 1] : INT_MIN;
                int right = (j < m - 1) ? mat[i][j + 1] : INT_MIN;

                // Check peak condition
                if (curr >= up && curr >= down &&
                    curr >= left && curr >= right)
                {
                    return {i, j};
                }
            }
        }

        return {-1, -1};
    }
};
