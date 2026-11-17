class Solution:
    def findPattern(self, s):
        n = len(s)
        i = 0
        while i < n:
            x = 0
            while i < n and s[i] == 'x':
                x += 1
                i += 1
            y = 0
            while i < n and s[i] == 'y':
                y += 1
                i += 1
            if x == 0 or x != y:
                return False
        return True