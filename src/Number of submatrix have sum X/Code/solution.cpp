class Solution
{
public:
    int countSquare(vector<vector<int>> &mat, int x)
    {
        int n = mat.size();
        int m = mat[0].size();

        // Step 1: Create prefix sum matrix
        vector<vector<long long>> prefix(n, vector<long long>(m, 0));

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {
                prefix[i][j] = mat[i][j];

                if (i > 0)
                    prefix[i][j] += prefix[i - 1][j];
                if (j > 0)
                    prefix[i][j] += prefix[i][j - 1];
                if (i > 0 && j > 0)
                    prefix[i][j] -= prefix[i - 1][j - 1];
            }
        }

        int count = 0;

        // Step 2: Try every possible square
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {

                // Try all possible square sizes
                for (int size = 1; i + size - 1 < n && j + size - 1 < m; size++)
                {

                    int r = i + size - 1;
                    int c = j + size - 1;

                    long long sum = prefix[r][c];

                    if (i > 0)
                        sum -= prefix[i - 1][c];
                    if (j > 0)
                        sum -= prefix[r][j - 1];
                    if (i > 0 && j > 0)
                        sum += prefix[i - 1][j - 1];

                    if (sum == x)
                        count++;
                }
            }
        }

        return count;
    }
};