class Solution:
	def maxSubstring(self, s):
		
		# Stores maximum difference found so far
		max_sum = -1
		
		# Stores current substring sum
		current_sum = 0
		
		for ch in s:
			
			# Convert:
			# '0' -> +1
			# '1' -> -1
			value = 1 if ch == '0' else -1
			
			# Extend current substring
			current_sum += value
			
			# Update answer
			max_sum = max(max_sum, current_sum)
			
			# Negative sum cannot help future substrings
			if current_sum < 0:
				current_sum = 0
		
		return max_sum