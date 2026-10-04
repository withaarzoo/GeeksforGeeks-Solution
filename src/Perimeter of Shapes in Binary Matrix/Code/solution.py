class Solution:
    def findPerimeter(self, mat: List[List[int]]) -> int:
        n = len(mat)
        m = len(mat[0])
        peri = 0
        for i in range(n):
            for j in range(m):
                if mat[i][j] == 1:
                    peri += 4
                    if j + 1 < m and mat[i][j + 1] == 1:
                        peri -= 2
                    if i + 1 < n and mat[i + 1][j] == 1:
                        peri -= 2
        return peri