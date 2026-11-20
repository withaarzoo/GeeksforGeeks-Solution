class Solution:
    def minFlips(self, s):
        n = len(s)
        flips0 = 0
        flips1 = 0
        for i in range(n):
            expected0 = '0' if i % 2 == 0 else '1'
            expected1 = '1' if i % 2 == 0 else '0'
            if s[i] != expected0:
                flips0 += 1
            if s[i] != expected1:
                flips1 += 1
        return min(flips0, flips1)