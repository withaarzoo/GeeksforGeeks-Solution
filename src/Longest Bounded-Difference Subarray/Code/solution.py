from collections import deque

class Solution:
    def longestSubarray(self, arr, x):
        n = len(arr)
        if n == 0:
            return []
        maxD = deque()  # indices, values decreasing
        minD = deque()  # indices, values increasing

        l = 0
        bestL = 0
        bestLen = 0

        for r, _ in enumerate(arr):
            # maintain max deque (decreasing values)
            while maxD and arr[r] > arr[maxD[-1]]:
                maxD.pop()
            maxD.append(r)

            # maintain min deque (increasing values)
            while minD and arr[r] < arr[minD[-1]]:
                minD.pop()
            minD.append(r)

            # shrink while invalid
            while maxD and minD and arr[maxD[0]] - arr[minD[0]] > x:
                if maxD[0] == l:
                    maxD.popleft()
                if minD[0] == l:
                    minD.popleft()
                l += 1

            cur_len = r - l + 1
            if cur_len > bestLen:  # strictly greater -> keep smallest start for ties
                bestLen = cur_len
                bestL = l

        return arr[bestL: bestL + bestLen]
