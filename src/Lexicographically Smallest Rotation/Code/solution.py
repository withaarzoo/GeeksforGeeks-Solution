class Solution:
    def lexiString(self, s: str) -> str:
        doubled = s + s
        n = len(doubled)
        f = [-1] * n
        k = 0
        for j in range(1, n):
            sj = doubled[j]
            i = f[j - k - 1]
            while i != -1 and sj != doubled[k + i + 1]:
                if sj < doubled[k + i + 1]:
                    k = j - i - 1
                i = f[i]
            if sj != doubled[k + i + 1]:
                if sj < doubled[k]:
                    k = j
                f[j - k] = -1
            else:
                f[j - k] = i + 1
        return doubled[k:k + len(s)]