class Solution:
    def countWays(self, n, k):
        # If there is only one post
        if n == 1:
            return k

        # same = ways where last two posts have same color
        same = k

        # diff = ways where last two posts have different colors
        diff = k * (k - 1)

        # Process from 3rd post to nth post
        for i in range(3, n + 1):
            new_same = diff
            new_diff = (same + diff) * (k - 1)

            same = new_same
            diff = new_diff

        return same + diff