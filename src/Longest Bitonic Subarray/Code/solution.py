class Solution:
	def bitonic(self, arr):

		n = len(arr)

		# Stores length of non-decreasing subarray ending at each index
		inc = [1] * n

		# Build increasing lengths
		for i in range(1, n):
			if arr[i] >= arr[i - 1]:
				inc[i] = inc[i - 1] + 1

		# Stores length of non-increasing subarray starting at each index
		dec = [1] * n

		# Build decreasing lengths
		for i in range(n - 2, -1, -1):
			if arr[i] >= arr[i + 1]:
				dec[i] = dec[i + 1] + 1

		ans = 1

		# Try every index as the peak
		for i in range(n):
			ans = max(ans, inc[i] + dec[i] - 1)

		return ans