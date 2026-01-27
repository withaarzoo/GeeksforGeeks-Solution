class Solution:
    def isWordExist(self, mat, word):
        n, m = len(mat), len(mat[0])
        directions = [(1,0), (-1,0), (0,1), (0,-1)]

        def dfs(i, j, idx):
            if idx == len(word):
                return True

            if i < 0 or j < 0 or i >= n or j >= m or mat[i][j] != word[idx]:
                return False

            temp = mat[i][j]
            mat[i][j] = '#'

            for dx, dy in directions:
                if dfs(i + dx, j + dy, idx + 1):
                    return True

            mat[i][j] = temp
            return False

        for i in range(n):
            for j in range(m):
                if dfs(i, j, 0):
                    return True

        return False
