class Solution
{
public:
    vector<int> prefixSum2D(vector<vector<int>> &mat, vector<vector<int>> &queries)
    {

        int n = mat.size();
        int m = mat[0].size();

        // Create prefix sum matrix
        vector<vector<int>> prefix(n, vector<int>(m, 0));

        // Build prefix matrix
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

        vector<int> ans;

        // Process each query
        for (auto &q : queries)
        {
            int r1 = q[0], c1 = q[1];
            int r2 = q[2], c2 = q[3];

            int sum = prefix[r2][c2];

            if (r1 > 0)
                sum -= prefix[r1 - 1][c2];
            if (c1 > 0)
                sum -= prefix[r2][c1 - 1];
            if (r1 > 0 && c1 > 0)
                sum += prefix[r1 - 1][c1 - 1];

            ans.push_back(sum);
        }

        return ans;
    }
};
