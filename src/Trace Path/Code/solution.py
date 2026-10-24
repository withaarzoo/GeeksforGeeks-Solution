class Solution:
    def isPossible(self, n: int, m: int, s: str) -> bool:
        minR = maxR = minC = maxC = 0
        r = c = 0
        for ch in s:
            if ch == 'L':
                c -= 1
            elif ch == 'R':
                c += 1
            elif ch == 'D':
                r -= 1
            elif ch == 'U':
                r += 1
            minR = min(minR, r)
            maxR = max(maxR, r)
            minC = min(minC, c)
            maxC = max(maxC, c)
        return (maxR - minR < n) and (maxC - minC < m)