class Solution
{
private:
    // Helper function to find the path using backtracking
    bool solve(int i, int j, vector<vector<int>> &mat, vector<vector<int>> &ans, int n)
    {
        // If we reach the bottom-right cell, mark it and return success
        if (i == n - 1 && j == n - 1)
        {
            ans[i][j] = 1;
            return true;
        }

        // If the current cell is out of bounds or blocked, return failure
        if (i >= n || j >= n || mat[i][j] == 0)
        {
            return false;
        }

        // Mark the current cell as part of the path
        ans[i][j] = 1;
        int jumps = mat[i][j];

        // Try all jump lengths starting from the shortest possible jump
        for (int k = 1; k <= jumps; k++)
        {
            // Prefer moving right over moving down
            if (solve(i, j + k, mat, ans, n))
                return true;
            if (solve(i + k, j, mat, ans, n))
                return true;
        }

        // If no jumps work, backtrack by unmarking the cell in the answer
        ans[i][j] = 0;
        // Mark the cell as a dead end in the input matrix to prevent revisiting
        mat[i][j] = 0;

        return false;
    }

public:
    vector<vector<int>> shortestDist(vector<vector<int>> &mat)
    {
        int n = mat.size();
        // Initialize the answer matrix with 0s
        vector<vector<int>> ans(n, vector<int>(n, 0));

        // Start the recursion from the top-left cell
        if (solve(0, 0, mat, ans, n))
        {
            return ans;
        }

        // If no path is found, return [[-1]]
        return {{-1}};
    }
};