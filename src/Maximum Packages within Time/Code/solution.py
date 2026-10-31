class Solution:
    def maxPackages(self, arr: list[int], totalTime: int) -> int:
        n = len(arr)
        k = min(n, totalTime)
        if k == 0:
            return 0
        
        s = sum(arr[:k])
        ans = s
        
        for i in range(k, n):
            s += arr[i] - arr[i - k]
            ans = max(ans, s)
        return ans