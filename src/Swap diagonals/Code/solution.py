class Solution:
    def swapDiagonal(self, mat):
        n = len(mat)  # size of the matrix

        # Traverse each row
        for i in range(n):
            # Swap major and minor diagonal elements
            mat[i][i], mat[i][n - 1 - i] = mat[i][n - 1 - i], mat[i][i]
