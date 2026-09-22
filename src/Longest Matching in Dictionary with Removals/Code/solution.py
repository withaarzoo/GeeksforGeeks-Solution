class Solution:
    def findLongestWord(self, s: str, d: list) -> str:
        pos = [[] for _ in range(26)]
        for i, c in enumerate(s):
            pos[ord(c) - 97].append(i)
        ans = ""
        for w in d:
            last = -1
            ok = True
            for c in w:
                p = pos[ord(c) - 97]
                lo, hi = 0, len(p)
                while lo < hi:
                    mid = (lo + hi) // 2
                    if p[mid] <= last:
                        lo = mid + 1
                    else:
                        hi = mid
                if lo == len(p):
                    ok = False
                    break
                last = p[lo]
            if ok:
                if len(w) > len(ans) or (len(w) == len(ans) and w < ans):
                    ans = w
        return ans