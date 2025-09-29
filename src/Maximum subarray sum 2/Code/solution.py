from collections import deque

class Solution:
    def maxSubarrSum(self, arr, a, b):
        n = len(arr)
        if n == 0:
            return 0

        # prefix sums: prefix[i] = sum of first i elements (arr[0..i-1])
        prefix = [0] * (n + 1)
        for i in range(1, n + 1):
            prefix[i] = prefix[i-1] + arr[i-1]

        dq = deque()    # will store indices with increasing prefix values
        ans = -10**30

        for r in range(1, n + 1):
            leftBound = max(0, r - b)
            newIdx = r - a

            # remove indices out of the window
            while dq and dq[0] < leftBound:
                dq.popleft()

            # insert new index while maintaining increasing prefix values
            if newIdx >= 0:
                while dq and prefix[dq[-1]] >= prefix[newIdx]:
                    dq.pop()
                dq.append(newIdx)

            if dq:
                ans = max(ans, prefix[r] - prefix[dq[0]])

        return ans
