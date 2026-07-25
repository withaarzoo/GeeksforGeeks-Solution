class Solution {
  public:
    int maximumSum(vector<vector<int>>& mat, int k) {
        int n = mat.size();

        // Prefix sum matrix
        vector<vector<int>> prefix(n, vector<int>(n, 0));

        // Build the prefix sum matrix
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {

                // Current cell value
                prefix[i][j] = mat[i][j];

                // Add the sum from the top
                if (i > 0)
                    prefix[i][j] += prefix[i - 1][j];

                // Add the sum from the left
                if (j > 0)
                    prefix[i][j] += prefix[i][j - 1];

                // Remove the overlapping area counted twice
                if (i > 0 && j > 0)
                    prefix[i][j] -= prefix[i - 1][j - 1];
            }
        }

        // Store the maximum square sum
        int ans = INT_MIN;

        // Iterate through every possible k x k square
        for (int i = k - 1; i < n; i++) {
            for (int j = k - 1; j < n; j++) {

                // Coordinates of the top-left corner
                int r = i - k + 1;
                int c = j - k + 1;

                // Start with the complete prefix sum
                int sum = prefix[i][j];

                // Remove the area above the square
                if (r > 0)
                    sum -= prefix[r - 1][j];

                // Remove the area left of the square
                if (c > 0)
                    sum -= prefix[i][c - 1];

                // Add back the overlapping area
                if (r > 0 && c > 0)
                    sum += prefix[r - 1][c - 1];

                // Update the maximum answer
                ans = max(ans, sum);
            }
        }

        return ans;
    }
};