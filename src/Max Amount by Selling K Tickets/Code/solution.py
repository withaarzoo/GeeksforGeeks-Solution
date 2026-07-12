import heapq

class Solution:
    def maxAmount(self, arr, k):

        # Modulo value
        MOD = 1000000007

        # Python has a min heap, so I store negative values
        heap = []

        # Insert every seller into the heap
        for x in arr:
            if x > 0:
                heapq.heappush(heap, -x)

        ans = 0

        # Sell at most k tickets
        while k > 0 and heap:

            # Get seller with maximum tickets
            cur = -heapq.heappop(heap)

            # Add current ticket price
            ans = (ans + cur) % MOD

            # One ticket has been sold
            cur -= 1

            # Insert back if tickets remain
            if cur > 0:
                heapq.heappush(heap, -cur)

            k -= 1

        return ans