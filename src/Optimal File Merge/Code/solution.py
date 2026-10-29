class Solution:
    def minComputation(self, files):
        import heapq
        heap = files[:]
        heapq.heapify(heap)
        cost = 0
        while len(heap) > 1:
            a = heapq.heappop(heap)
            b = heapq.heappop(heap)
            s = a + b
            cost += s
            heapq.heappush(heap, s)
        return cost