class Solution:
    def minOperation(self, n):
        ops = 0
        while n > 0:
            if n % 2 == 1:
                n -= 1
            else:
                n //= 2
            ops += 1
        return ops