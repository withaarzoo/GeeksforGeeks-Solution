class Solution:
    def getCount (self, s, k):
        cnt = [0] * 26
        n = len(s)
        for i in range(n):
            if i == 0 or s[i] != s[i - 1]:
                cnt[ord(s[i]) - ord('a')] += 1
        ans = 0
        for i in range(26):
            if cnt[i] == k:
                ans += 1
        return ans