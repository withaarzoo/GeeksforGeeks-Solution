class Solution:
    def minimumSum(self, s: str) -> int:
        a = list(s)
        n = len(a)
        for i in range(n // 2):
            if a[i] != '?' and a[n - 1 - i] != '?' and a[i] != a[n - 1 - i]:
                return -1
            if a[i] == '?' and a[n - 1 - i] != '?':
                a[i] = a[n - 1 - i]
            elif a[i] != '?' and a[n - 1 - i] == '?':
                a[n - 1 - i] = a[i]
        i = 0
        while i < n and a[i] == '?':
            i += 1
        if i == n:
            return 0
        prev = a[i]
        ans = 0
        for j in range(i + 1, n):
            if a[j] == '?':
                a[j] = prev
            ans += abs(ord(a[j]) - ord(prev))
            prev = a[j]
        return ans