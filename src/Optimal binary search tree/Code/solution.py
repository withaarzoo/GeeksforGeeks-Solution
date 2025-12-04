class Solution:
    def minCost(self, keys, freq):
        n = len(keys)
        if n == 0:
            return 0
        
        # dp[i][j] = minimum cost of optimal BST using keys[i..j]
        dp = [[0] * n for _ in range(n)]
        
        # prefixFreq[k] = sum of freq[0..k-1]
        prefixFreq = [0] * (n + 1)
        for i in range(n):
            prefixFreq[i + 1] = prefixFreq[i] + freq[i]
        
        def range_sum(i, j):
            """Return sum of freq[i..j] in O(1)."""
            return prefixFreq[j + 1] - prefixFreq[i]
        
        # Base case: single key
        for i in range(n):
            dp[i][i] = freq[i]
        
        # length from 2 to n
        for length in range(2, n + 1):
            for i in range(0, n - length + 1):
                j = i + length - 1
                dp[i][j] = float('inf')
                
                sumFreq = range_sum(i, j)
                
                # Try every key as root
                for r in range(i, j + 1):
                    left = dp[i][r - 1] if r > i else 0
                    right = dp[r + 1][j] if r < j else 0
                    cost = left + right + sumFreq
                    if cost < dp[i][j]:
                        dp[i][j] = cost
        
        return dp[0][n - 1]
