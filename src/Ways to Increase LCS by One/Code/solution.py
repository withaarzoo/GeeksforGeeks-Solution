class Solution:
    def waysToIncreaseLCSBy1(self, s1, s2):

        n = len(s1)
        m = len(s2)

        # pref[i][j] = LCS of prefixes
        pref = [[0] * (m + 1) for _ in range(n + 1)]

        # Build prefix DP
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if s1[i - 1] == s2[j - 1]:
                    pref[i][j] = pref[i - 1][j - 1] + 1
                else:
                    pref[i][j] = max(pref[i - 1][j], pref[i][j - 1])

        lcs = pref[n][m]

        # suff[i][j] = LCS of suffixes
        suff = [[0] * (m + 1) for _ in range(n + 1)]

        # Build suffix DP
        for i in range(n - 1, -1, -1):
            for j in range(m - 1, -1, -1):
                if s1[i] == s2[j]:
                    suff[i][j] = suff[i + 1][j + 1] + 1
                else:
                    suff[i][j] = max(suff[i + 1][j], suff[i][j + 1])

        ans = 0

        # Try every insertion position
        for pos in range(n + 1):

            # Try every lowercase character
            for ch in map(chr, range(ord('a'), ord('z') + 1)):

                ok = False

                # Check every matching occurrence in s2
                for j in range(m):

                    if s2[j] != ch:
                        continue

                    if pref[pos][j] + 1 + suff[pos][j + 1] == lcs + 1:
                        ok = True
                        break

                # Count this character once for this position
                if ok:
                    ans += 1

        return ans