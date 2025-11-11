class Solution:
    def minSuperSeq(self, s1, s2):
        n, m = len(s1), len(s2)
        # Keep s2 shorter to minimize space
        if m > n:
            return self.minSuperSeq(s2, s1)

        prev = [0] * (m + 1)
        cur  = [0] * (m + 1)

        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if s1[i - 1] == s2[j - 1]:
                    cur[j] = 1 + prev[j - 1]
                else:
                    cur[j] = max(prev[j], cur[j - 1])
            prev, cur = cur, [0] * (m + 1)

        lcs = prev[m]
        return n + m - lcs
