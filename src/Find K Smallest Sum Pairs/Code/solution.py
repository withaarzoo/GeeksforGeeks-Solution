import heapq

class Solution:
    def kSmallestPair(self, arr1, arr2, k):
        res = []
        n1, n2 = len(arr1), len(arr2)
        if n1 == 0 or n2 == 0 or k == 0:
            return res

        # min-heap of tuples (sum, i, j)
        heap = []
        limit = min(n1, k)
        for i in range(limit):
            heapq.heappush(heap, (arr1[i] + arr2[0], i, 0))

        while heap and len(res) < k:
            s, i, j = heapq.heappop(heap)
            res.append([arr1[i], arr2[j]])
            if j + 1 < n2:
                heapq.heappush(heap, (arr1[i] + arr2[j+1], i, j+1))
        return res
