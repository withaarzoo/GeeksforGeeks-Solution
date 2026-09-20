class Solution:
    def largestSubsquare(self, mat):
        n = len(mat)
        if n == 0:
            return 0
        hor = [[0] * n for _ in range(n)]
        ver = [[0] * n for _ in range(n)]
        for i in range(n):
            for j in range(n):
                if mat[i][j] == 'X':
                    hor[i][j] = 1 if j == 0 else hor[i][j - 1] + 1
                    ver[i][j] = 1 if i == 0 else ver[i - 1][j] + 1
        ans = 0
        for i in range(n):
            for j in range(n):
                if mat[i][j] == 'X':
                    maxSide = min(hor[i][j], ver[i][j])
                    for s in range(maxSide, ans, -1):
                        if hor[i - s + 1][j] >= s and ver[i][j - s + 1] >= s:
                            ans = s
                            break
        return ans