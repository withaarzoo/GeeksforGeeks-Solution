class Solution
{
public:
    vector<int> exitPoint(vector<vector<int>> &mat)
    {
        int n = mat.size();
        int m = mat[0].size();

        // Current position
        int row = 0, col = 0;

        // 0=Right, 1=Down, 2=Left, 3=Up
        int dir = 0;

        // Continue while inside matrix boundaries
        while (row >= 0 && row < n && col >= 0 && col < m)
        {

            // If current cell contains 1
            if (mat[row][col] == 1)
            {

                // Turn right (clockwise)
                dir = (dir + 1) % 4;

                // Convert 1 into 0
                mat[row][col] = 0;
            }

            // Move according to current direction
            if (dir == 0)
                col++; // Right
            else if (dir == 1)
                row++; // Down
            else if (dir == 2)
                col--; // Left
            else
                row--; // Up
        }

        // We are outside the matrix.
        // Move back one step to get the exit cell.
        if (dir == 0)
            col--;
        else if (dir == 1)
            row--;
        else if (dir == 2)
            col++;
        else
            row++;

        return {row, col};
    }
};