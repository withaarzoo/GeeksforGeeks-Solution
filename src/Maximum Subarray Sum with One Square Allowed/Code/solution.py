class Solution:
    def maximumSubarray(self, arr: list[int]) -> int:
        n = len(arr)
        noSq = arr[0]
        withSq = arr[0] * arr[0]
        ans = max(noSq, withSq)
        for i in range(1, n):
            cur = arr[i]
            sq = cur * cur
            newNo = max(cur, noSq + cur)
            newWith = max(sq, noSq + sq, withSq + cur)
            noSq = newNo
            withSq = newWith
            ans = max(ans, noSq, withSq)
        return ans