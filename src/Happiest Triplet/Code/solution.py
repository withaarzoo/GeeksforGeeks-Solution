class Solution:
    def smallestDiff(self, a, b, c):
        a.sort()
        b.sort()
        c.sort()

        i = j = k = 0
        bestDiff = float('inf')
        bestSum = float('inf')
        ans = []

        while i < len(a) and j < len(b) and k < len(c):
            x, y, z = a[i], b[j], c[k]

            mx = max(x, y, z)
            mn = min(x, y, z)

            diff = mx - mn
            s = x + y + z

            if diff < bestDiff or (diff == bestDiff and s < bestSum):
                bestDiff = diff
                bestSum = s
                ans = [x, y, z]

            if mn == x:
                i += 1
            elif mn == y:
                j += 1
            else:
                k += 1

        return sorted(ans, reverse=True)
