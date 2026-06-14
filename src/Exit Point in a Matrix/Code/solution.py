class Solution:
    def exitPoint(self, mat):

        n = len(mat)
        m = len(mat[0])

        # Current position
        row, col = 0, 0

        # 0=Right, 1=Down, 2=Left, 3=Up
        direction = 0

        # Continue while inside matrix
        while 0 <= row < n and 0 <= col < m:

            # If current cell contains 1
            if mat[row][col] == 1:

                # Turn right (clockwise)
                direction = (direction + 1) % 4

                # Convert 1 into 0
                mat[row][col] = 0

            # Move according to current direction
            if direction == 0:
                col += 1      # Right
            elif direction == 1:
                row += 1      # Down
            elif direction == 2:
                col -= 1      # Left
            else:
                row -= 1      # Up

        # Move back one step to reach the exit cell
        if direction == 0:
            col -= 1
        elif direction == 1:
            row -= 1
        elif direction == 2:
            col += 1
        else:
            row += 1

        return [row, col]