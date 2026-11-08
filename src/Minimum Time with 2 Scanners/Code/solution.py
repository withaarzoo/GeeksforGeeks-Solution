class Solution:
    def minTime(self, n: int, s1: int, s2: int) -> int:
        low = 0
        high = min(s1, s2) * n
        while low < high:
            mid = low + (high - low) // 2
            if mid // s1 + mid // s2 >= n:
                high = mid
            else:
                low = mid + 1
        return low