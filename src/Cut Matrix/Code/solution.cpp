class Solution
{
public:
    int findWays(vector<vector<int>> &matrix, int k)
    {
        const int MOD = 1000000007;

        int rows = matrix.size();
        int cols = matrix[0].size();

        // suffixOnes[r][c] = number of 1s inside submatrix (r,c) -> bottom-right
        vector<vector<int>> suffixOnes(rows + 1, vector<int>(cols + 1));

        for (int r = rows - 1; r >= 0; r--)
        {
            for (int c = cols - 1; c >= 0; c--)
            {
                suffixOnes[r][c] =
                    matrix[r][c] + suffixOnes[r + 1][c] + suffixOnes[r][c + 1] - suffixOnes[r + 1][c + 1];
            }
        }

        // Even the best cutting strategy cannot create more pieces than total 1s.
        if (suffixOnes[0][0] < k)
            return 0;

        vector<vector<int>> nextRow(rows, vector<int>(cols, rows));
        vector<vector<int>> nextCol(rows, vector<int>(cols, cols));

        // First row where a horizontal cut becomes valid.
        for (int c = 0; c < cols; c++)
        {
            for (int r = rows - 1; r >= 0; r--)
            {
                if (suffixOnes[r][c] > suffixOnes[r + 1][c])
                    nextRow[r][c] = r + 1;
                else if (r + 1 < rows)
                    nextRow[r][c] = nextRow[r + 1][c];
            }
        }

        // First column where a vertical cut becomes valid.
        for (int r = 0; r < rows; r++)
        {
            for (int c = cols - 1; c >= 0; c--)
            {
                if (suffixOnes[r][c] > suffixOnes[r][c + 1])
                    nextCol[r][c] = c + 1;
                else if (c + 1 < cols)
                    nextCol[r][c] = nextCol[r][c + 1];
            }
        }

        vector<vector<int>> dp(rows + 1, vector<int>(cols + 1));

        // One piece is always valid if this submatrix still contains a 1.
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                dp[r][c] = suffixOnes[r][c] ? 1 : 0;

        for (int pieces = 2; pieces <= k; pieces++)
        {

            vector<vector<int>> rowSuffix(rows + 1, vector<int>(cols + 1));
            vector<vector<int>> colSuffix(rows + 1, vector<int>(cols + 1));

            for (int r = rows - 1; r >= 0; r--)
            {
                for (int c = cols - 1; c >= 0; c--)
                {
                    rowSuffix[r][c] = (rowSuffix[r + 1][c] + dp[r][c]) % MOD;
                    colSuffix[r][c] = (colSuffix[r][c + 1] + dp[r][c]) % MOD;
                }
            }

            vector<vector<int>> current(rows + 1, vector<int>(cols + 1));

            for (int r = 0; r < rows; r++)
            {
                for (int c = 0; c < cols; c++)
                {

                    // Need at least one 1 for every remaining piece.
                    if (suffixOnes[r][c] < pieces)
                        continue;

                    long long ways = 0;

                    if (nextRow[r][c] < rows + 1)
                        ways += rowSuffix[nextRow[r][c]][c];

                    if (nextCol[r][c] < cols + 1)
                        ways += colSuffix[r][nextCol[r][c]];

                    current[r][c] = ways % MOD;
                }
            }

            dp.swap(current);
        }

        return dp[0][0];
    }
};