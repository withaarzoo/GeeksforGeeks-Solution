class Solution:
    def getLastMoment(self, n, left, right):
        ans = 0

        # Ants moving to the left
        for pos in left:
            ans = max(ans, pos)

        # Ants moving to the right
        for pos in right:
            ans = max(ans, n - pos)

        return ans
