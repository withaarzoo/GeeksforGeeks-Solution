class Solution:
    def transpose(self, mat):
        n = len(mat)
        # swap symmetric elements across the main diagonal (i < j)
        for i in range(n):
            for j in range(i + 1, n):
                tmp = mat[i][j]
                mat[i][j] = mat[j][i]
                mat[j][i] = tmp
        return mat
