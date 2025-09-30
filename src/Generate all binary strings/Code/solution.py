class Solution:
    def binstr(self, n):
        total = 1 << n           # 2^n
        ans = []
        for mask in range(total):
            # build list of chars for speed, then join
            s = ['0'] * n
            for j in range(n):
                # if j-th bit set, put '1' at right position
                if (mask >> j) & 1:
                    s[n - 1 - j] = '1'
            ans.append(''.join(s))
        return ans
