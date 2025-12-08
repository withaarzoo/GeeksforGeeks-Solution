class Solution:
    def matrixChainOrder(self, arr):
        n = len(arr)
        N = n - 1  # number of matrices
        
        # dp[i][j] = minimum cost from matrix i to j (1-based)
        dp = [[0] * (N + 1) for _ in range(N + 1)]
        # split[i][j] = best split index k
        split = [[0] * (N + 1) for _ in range(N + 1)]
        
        # len is the chain length
        for length in range(2, N + 1):
            for i in range(1, N - length + 2):
                j = i + length - 1
                dp[i][j] = float('inf')
                best_k = i
                for k in range(i, j):
                    cost = (dp[i][k] + dp[k+1][j] +
                            arr[i-1] * arr[k] * arr[j])
                    if cost < dp[i][j]:
                        dp[i][j] = cost
                        best_k = k
                split[i][j] = best_k
        
        # recursive function to build the answer string
        def build(i, j):
            if i == j:
                # convert 1-based index to letter
                return chr(ord('A') + i - 1)
            k = split[i][j]
            left = build(i, k)
            right = build(k + 1, j)
            return "(" + left + right + ")"
        
        return build(1, N)
