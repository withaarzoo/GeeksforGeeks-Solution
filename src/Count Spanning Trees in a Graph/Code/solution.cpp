class Solution
{
public:
    // Function to calculate determinant using Gaussian Elimination
    long long determinant(vector<vector<double>> &mat, int size)
    {

        double det = 1;

        // Process every column
        for (int i = 0; i < size; i++)
        {

            int pivot = i;

            // Find a row having non-zero value in current column
            for (int j = i; j < size; j++)
            {
                if (abs(mat[j][i]) > 1e-9)
                {
                    pivot = j;
                    break;
                }
            }

            // If pivot element is 0, determinant becomes 0
            if (abs(mat[pivot][i]) < 1e-9)
                return 0;

            // Swap rows if needed
            if (pivot != i)
            {
                swap(mat[pivot], mat[i]);
                det *= -1; // Row swap changes sign of determinant
            }

            // Multiply diagonal element
            det *= mat[i][i];

            // Eliminate values below pivot
            for (int j = i + 1; j < size; j++)
            {

                double factor = mat[j][i] / mat[i][i];

                for (int k = i; k < size; k++)
                {
                    mat[j][k] -= factor * mat[i][k];
                }
            }
        }

        // Round because determinant should be integer
        return round(det);
    }

    int countSpanTree(int n, vector<vector<int>> &edges)
    {

        // Special case: single node graph
        if (n == 1)
            return 1;

        // Create Laplacian matrix
        vector<vector<double>> lap(n, vector<double>(n, 0));

        // Build Laplacian matrix
        for (auto &e : edges)
        {

            int u = e[0];
            int v = e[1];

            // Increase degree count
            lap[u][u]++;
            lap[v][v]++;

            // Mark connection
            lap[u][v]--;
            lap[v][u]--;
        }

        // Create cofactor matrix by removing last row and column
        vector<vector<double>> cof(n - 1, vector<double>(n - 1));

        for (int i = 0; i < n - 1; i++)
        {
            for (int j = 0; j < n - 1; j++)
            {
                cof[i][j] = lap[i][j];
            }
        }

        // Determinant gives number of spanning trees
        return determinant(cof, n - 1);
    }
};