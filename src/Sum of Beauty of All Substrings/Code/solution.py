class Solution:
    def beautySum(self, s: str) -> int:
        n = len(s)
        ans = 0
        for i in range(n):
            freq = [0] * 26
            for j in range(i, n):
                freq[ord(s[j]) - ord('a')] += 1
                mx = 0
                mn = n + 1
                for k in range(26):
                    if freq[k] > 0:
                        mx = max(mx, freq[k])
                        mn = min(mn, freq[k])
                ans += mx - mn
        return ans