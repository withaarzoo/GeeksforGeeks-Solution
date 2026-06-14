class Solution {
    public List<Integer> exitPoint(int[][] mat) {

        int n = mat.length;
        int m = mat[0].length;

        // Current position
        int row = 0, col = 0;

        // 0=Right, 1=Down, 2=Left, 3=Up
        int dir = 0;

        // Continue while inside matrix
        while (row >= 0 && row < n && col >= 0 && col < m) {

            // If current cell is 1
            if (mat[row][col] == 1) {

                // Turn right
                dir = (dir + 1) % 4;

                // Change 1 to 0
                mat[row][col] = 0;
            }

            // Move in current direction
            if (dir == 0)
                col++;
            else if (dir == 1)
                row++;
            else if (dir == 2)
                col--;
            else
                row--;
        }

        // Move back to last valid cell
        if (dir == 0)
            col--;
        else if (dir == 1)
            row--;
        else if (dir == 2)
            col++;
        else
            row++;

        List<Integer> ans = new ArrayList<>();
        ans.add(row);
        ans.add(col);

        return ans;
    }
}