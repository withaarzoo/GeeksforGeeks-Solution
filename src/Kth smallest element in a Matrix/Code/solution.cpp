class Solution
{
public:
    int kthSmallest(vector<vector<int>> &mat, int k)
    {
        int n = mat.size();

        int low = mat[0][0];          // smallest element
        int high = mat[n - 1][n - 1]; // largest element

        // Binary search on value range
        while (low < high)
        {
            int mid = low + (high - low) / 2;
            int count = 0;

            // Count elements <= mid
            int col = n - 1;
            for (int row = 0; row < n; row++)
            {
                while (col >= 0 && mat[row][col] > mid)
                {
                    col--;
                }
                count += (col + 1);
            }

            if (count < k)
            {
                low = mid + 1; // need bigger values
            }
            else
            {
                high = mid; // mid might be the answer
            }
        }

        return low;
    }
};
