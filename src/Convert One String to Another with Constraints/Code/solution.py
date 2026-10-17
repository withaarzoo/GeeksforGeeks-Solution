class Solution:
    def isItPossible(self, s1: str, s2: str) -> bool:
        if len(s1) != len(s2):
            return False
        n = len(s1)
        i = j = 0
        while i < n and j < n:
            while i < n and s1[i] == '#':
                i += 1
            while j < n and s2[j] == '#':
                j += 1
            if i == n or j == n:
                break
            if s1[i] != s2[j]:
                return False
            if s1[i] == 'A' and i < j:
                return False
            if s1[i] == 'B' and i > j:
                return False
            i += 1
            j += 1
        while i < n and s1[i] == '#':
            i += 1
        while j < n and s2[j] == '#':
            j += 1
        return i == n and j == n