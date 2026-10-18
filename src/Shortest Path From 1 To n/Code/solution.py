class Solution:
    def minimumStep (self, n):
        steps = 0
        while n > 1:
            if n % 3 == 0:
                n //= 3
            else:
                n -= 1
            steps += 1
        return steps