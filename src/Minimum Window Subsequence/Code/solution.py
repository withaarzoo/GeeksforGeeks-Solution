class Solution:
    def minWindow(self, s1, s2):
        n, m = len(s1), len(s2)
        min_len = float('inf')
        start = -1

        for i in range(n):
            if s1[i] != s2[0]:
                continue

            p1, p2 = i, 0

            # Forward scan
            while p1 < n and p2 < m:
                if s1[p1] == s2[p2]:
                    p2 += 1
                p1 += 1

            if p2 == m:
                end = p1 - 1

                # Backward shrink
                p2 = m - 1
                while p2 >= 0:
                    if s1[end] == s2[p2]:
                        p2 -= 1
                    end -= 1
                end += 1

                if p1 - end < min_len:
                    min_len = p1 - end
                    start = end

        return "" if start == -1 else s1[start:start + min_len]
