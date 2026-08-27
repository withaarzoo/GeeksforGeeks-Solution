class Solution:
    def maxArea(self, mat: list[list[int]]) -> int:
        # I get the matrix dimensions because n limits the maximum possible
        # height and m tells me how many column heights I need to maintain.
        n = len(mat)
        m = len(mat[0])

        # I store the consecutive number of 1s ending at the current row
        # for every column.
        height = [0] * m

        # I keep the largest rectangle area found so far.
        answer = 0

        # I process every row as a possible bottom boundary of a rectangle.
        for i in range(n):

            # I count how many columns have each height from 0 to n,
            # which lets me avoid sorting the height array.
            count = [0] * (n + 1)

            # I update the consecutive height for every column.
            for j in range(m):
                # A 1 extends the vertical sequence, while a 0 resets it.
                if mat[i][j] == 1:
                    height[j] += 1
                else:
                    height[j] = 0

                # I record how many columns currently have this height.
                count[height[j]] += 1

            # I store how many columns can be used after arranging columns
            # with larger heights before columns with smaller heights.
            width = 0

            # I process heights from largest to smallest.
            for h in range(n, 0, -1):
                # I include every column having the current height.
                width += count[h]

                # The current height limits the rectangle height.
                answer = max(answer, h * width)

        # I return the largest rectangle area found in the matrix.
        return answer