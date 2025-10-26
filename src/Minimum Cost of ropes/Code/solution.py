import heapq

class Solution:
   def minCost(self, arr):
       # If 0 or 1 ropes, no cost
       if not arr or len(arr) <= 1:
           return 0
       
       # create a min-heap from arr
       heapq.heapify(arr)
       
       total = 0
       # combine until single rope remains
       while len(arr) > 1:
           a = heapq.heappop(arr)
           b = heapq.heappop(arr)
           s = a + b
           total += s
           heapq.heappush(arr, s)
       
       return total
