class Solution:
    def countBSTs(self, arr):
        """
        I compute Catalan numbers up to n, map each value to its sorted index (left size),
        then result for each element = catalan[left] * catalan[right].
        """
        n = len(arr)
        ans = [0] * n
        if n == 0:
            return ans

        # 1) Catalan DP
        catalan = [0] * (n + 1)
        catalan[0] = 1
        for i in range(1, n + 1):
            s = 0
            for j in range(i):
                s += catalan[j] * catalan[i - 1 - j]
            catalan[i] = s

        # 2) rank mapping via sorted copy
        sorted_arr = sorted(arr)
        rank = {val: idx for idx, val in enumerate(sorted_arr)}

        # 3) compute answers
        for i, v in enumerate(arr):
            left = rank[v]
            right = n - 1 - left
            ans[i] = catalan[left] * catalan[right]
        return ans
