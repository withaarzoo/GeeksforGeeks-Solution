import heapq

class Solution:
    def kthLargest(self, arr, n):
        # Python's heapq is a min-heap by default — exactly what I need
        min_heap = []
        result = []
        k = n  # in this GFG signature, n is actually k (the rank)
        
        # Re-reading the problem: the function takes arr and k
        # GFG python signature uses 'n' as second param but it means k
        # I'll treat the second argument as k throughout
        
        for num in arr:
            heapq.heappush(min_heap, num)  # push new element into min-heap
            
            # if heap has more than k elements, evict the smallest
            # we only want the k largest elements to remain
            if len(min_heap) > k:
                heapq.heappop(min_heap)
            
            # not yet k elements in stream, kth largest is undefined
            if len(min_heap) < k:
                result.append(-1)
            else:
                # the top of the min-heap among k largest = kth largest
                result.append(min_heap[0])
        
        return result