class Solution:
    def nthCharacter(self, n):
        digits = 1
        count = 9
        start = 1
        
        while n > digits * count:
            n -= digits * count
            digits += 1
            count *= 10
            start *= 10
        
        num = start + (n - 1) // digits
        s = str(num)
        return s[(n - 1) % digits]