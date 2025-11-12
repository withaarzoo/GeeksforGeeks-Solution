class Solution:
    def wildCard(self, txt, pat):
        n = len(txt)
        m = len(pat)
        prev = [False] * (m + 1)
        cur = [False] * (m + 1)
        prev[0] = True  # empty text matches empty pattern

        # empty text vs pattern: true only if pattern prefix is all '*'
        for j in range(1, m + 1):
            prev[j] = prev[j-1] and (pat[j-1] == '*')

        for i in range(1, n + 1):
            cur[0] = False  # non-empty text cannot match empty pattern
            for j in range(1, m + 1):
                pch = pat[j-1]
                if pch == '*':
                    # '*' matches empty (cur[j-1]) or matches one more char (prev[j])
                    cur[j] = cur[j-1] or prev[j]
                elif pch == '?' or pch == txt[i-1]:
                    cur[j] = prev[j-1]
                else:
                    cur[j] = False
            # prepare for next i
            prev, cur = cur, prev  # swap references to reuse lists

        return prev[m]
