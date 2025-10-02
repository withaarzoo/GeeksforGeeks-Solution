class Solution:
    # Returns all unique combinations of k numbers from 1..9 that sum to n.
    def combinationSum(self, n, k):
        res = []
        path = []

        def dfs(start, remaining, k_left):
            if k_left == 0:
                if remaining == 0:
                    res.append(path.copy())
                return
            # compute minimal and maximal possible sum for pruning
            min_sum = sum(start + t for t in range(k_left))   # start + (start+1) + ...
            max_sum = sum(9 - t for t in range(k_left))       # 9 + 8 + ...
            if remaining < min_sum or remaining > max_sum:
                return

            for num in range(start, 10):  # 1..9 inclusive
                if num > remaining:
                    break
                path.append(num)
                dfs(num + 1, remaining - num, k_left - 1)
                path.pop()

        dfs(1, n, k)
        return res
