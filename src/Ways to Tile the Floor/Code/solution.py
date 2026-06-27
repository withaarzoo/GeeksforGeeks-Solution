class Solution:
	def countWays(self, n, m):
		# Mod value given in the problem
		MOD = 1000000007

		# dp[i] stores number of ways for i x m floor
		dp = [0] * (n + 1)

		# Empty floor has one valid arrangement
		dp[0] = 1

		# Build DP table
		for i in range(1, n + 1):

			# Place one horizontal tile
			dp[i] = dp[i - 1]

			# Add ways formed by placing m vertical tiles
			if i >= m:
				dp[i] = (dp[i] + dp[i - m]) % MOD

		# Return answer
		return dp[n]