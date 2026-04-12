class Solution:
    def isToeplitz(self, mat):
        rows = len(mat)
        cols = len(mat[0])

        # Start from second row and second column
        for i in range(1, rows):
            for j in range(1, cols):

                # Compare current element with top-left diagonal element
                if mat[i][j] != mat[i - 1][j - 1]:
                    return False

        return True