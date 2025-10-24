import heapq

class Solution:

    def isPossible(self, arr, k):
        # If input may not be sorted, sort it. GfG often gives sorted but sorting is safe.
        arr.sort()

        # pq stores tuples (value, length) and heapq is a min-heap by tuple order.
        pq = []

        i, n = 0, len(arr)
        while i < n:
            if not pq:
                heapq.heappush(pq, (arr[i], 1))
                i += 1
            else:
                val, length = pq[0]
                if arr[i] == val:
                    # same value -> start new subsequence
                    heapq.heappush(pq, (arr[i], 1))
                    i += 1
                elif arr[i] == val + 1:
                    # extend shortest subsequence ending with val
                    heapq.heappop(pq)
                    heapq.heappush(pq, (arr[i], length + 1))
                    i += 1
                else:
                    # arr[i] > val + 1, so top subsequence cannot be extended anymore
                    if length < k:
                        return False
                    heapq.heappop(pq)

        # ensure all remaining subsequences meet length >= k
        while pq:
            if pq[0][1] < k:
                return False
            heapq.heappop(pq)
        return True
