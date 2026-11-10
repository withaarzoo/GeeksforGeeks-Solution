class Solution:
    def firstElementKTime(self, arr: list[int], k: int) -> int:
        freq = {}
        for num in arr:
            freq[num] = freq.get(num, 0) + 1
            if freq[num] == k:
                return num
        return -1