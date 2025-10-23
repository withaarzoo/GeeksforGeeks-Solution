import heapq

class Solution:
    def kClosest(self, points, k):
        # Use a max-heap simulated by pushing negative squared distances
        # Python heapq is a min-heap; we store (-dist, x, y).
        heap = []
        for x, y in points:
            dist = x*x + y*y
            # push negative to mimic max-heap
            if len(heap) < k:
                heapq.heappush(heap, (-dist, x, y))
            else:
                # if current point is closer than farthest in heap, replace
                if dist < -heap[0][0]:
                    heapq.heappushpop(heap, (-dist, x, y))
        # Extract points from heap
        result = []
        while heap:
            _, x, y = heapq.heappop(heap)
            result.append([x, y])
        return result  # order arbitrary
