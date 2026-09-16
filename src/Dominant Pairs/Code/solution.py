class Solution:
    def dominantPairs(self, arr: list[int]) -> int:
        n = len(arr)
        mid = n // 2                         # split point
        
        # sort left half [0 .. mid)
        left = sorted(arr[:mid])
        # sort right half [mid .. n)
        right = sorted(arr[mid:])
        
        ans = 0
        j = 0                                # pointer into the right half
        
        # walk through every element of the left half
        for i in range(mid):
            # advance j while 5 * right[j] is still <= left[i]
            while j < mid and left[i] >= 5 * right[j]:
                j += 1
            # all indices from 0 to j-1 form a valid pair with this i
            ans += j
        return ans