class Solution:
    def maxValue(self, n: int) -> int:
        res = 0
        consec = 0
        for i in range(30, -1, -1):
            if n & (1 << i):
                if consec < 2:
                    res |= (1 << i)
                    consec += 1
                else:
                    consec = 0
            else:
                consec = 0
        return res
