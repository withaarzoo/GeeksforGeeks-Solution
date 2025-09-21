class Solution:
    def maxArea(self, mat):
        # handle empty matrix
        if not mat or not mat[0]:
            return 0

        n = len(mat)
        m = len(mat[0])
        heights = [0] * m
        max_area = 0

        for i in range(n):
            # update heights for row i (consecutive ones ending at row i)
            for j in range(m):
                heights[j] = heights[j] + 1 if mat[i][j] == 1 else 0

            # compute largest rectangle in histogram (heights)
            stack = []
            for j, cur in enumerate(heights + [0]):  # add sentinel 0
                while stack and heights[stack[-1]] > cur:
                    h = heights[stack.pop()]
                    width = j if not stack else j - stack[-1] - 1
                    max_area = max(max_area, h * width)
                stack.append(j)
        return max_area
