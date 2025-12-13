class Solution
{
public:
    void swapDiagonal(vector<vector<int>> &mat)
    {
        int n = mat.size(); // size of the square matrix

        // Traverse each row
        for (int i = 0; i < n; i++)
        {
            // Swap major and minor diagonal elements of the same row
            swap(mat[i][i], mat[i][n - 1 - i]);
        }
    }
};
