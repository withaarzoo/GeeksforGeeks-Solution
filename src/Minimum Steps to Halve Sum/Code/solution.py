import heapq

class Solution:
  def minOperations(self, arr):
    # Python heapq is a min-heap — use negatives to simulate max-heap
    max_heap = []
    total = 0.0
    for v in arr:
      total += v
      heapq.heappush(max_heap, -float(v))  # push negative for max-heap
    target = total / 2.0
    ops = 0
    while total > target:
      top = -heapq.heappop(max_heap)  # largest value
      half = top / 2.0
      total -= (top - half)  # reduce total by the halved amount
      heapq.heappush(max_heap, -half)
      ops += 1
    return ops

# Example usage:
# s = Solution()
# print(s.minOperations([5, 19, 8, 1]))
