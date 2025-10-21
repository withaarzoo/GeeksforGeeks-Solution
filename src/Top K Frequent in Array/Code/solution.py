import heapq
from collections import Counter

class Solution:
	def topKFreq(self, arr, k):
		# Build frequency map
		cnt = Counter(arr)  # number -> frequency

		# Use heapq.nlargest which internally uses a heap of size k -> O(m log k)
		# key is (frequency, value) so that higher frequency and higher value are considered larger
		topk = heapq.nlargest(k, cnt.keys(), key=lambda x: (cnt[x], x))
		return topk
