class Solution:
	def maxSumIS(self, arr):
		# arr: list[int]
		n = len(arr)
		if n == 0:
			return 0
		# dp[i] = max sum of strictly increasing subsequence ending at i
		dp = [0] * n
		ans = 0
		for i in range(n):
			dp[i] = arr[i]  # subsequence containing only arr[i]
			for j in range(i):
				if arr[j] < arr[i]:
					# we can extend subsequence ending at j by arr[i]
					if dp[j] + arr[i] > dp[i]:
						dp[i] = dp[j] + arr[i]
			if dp[i] > ans:
				ans = dp[i]
		return ans
