import heapq

class Solution:
    def nearlySorted(self, arr, k):
        n = len(arr)
        if n <= 1 or k <= 0:
            return  # already sorted or no displacement

        # min-heap with first k+1 elements
        heap = []
        for i in range(min(n, k + 1)):
            heapq.heappush(heap, arr[i])

        idx = 0
        # for remaining elements, push next and pop smallest to arr
        for i in range(k + 1, n):
            arr[idx] = heapq.heappop(heap)
            idx += 1
            heapq.heappush(heap, arr[i])

        # empty remaining heap
        while heap:
            arr[idx] = heapq.heappop(heap)
            idx += 1
