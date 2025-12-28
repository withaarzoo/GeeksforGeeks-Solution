class Solution:
    def canMake(self, ranks, n, time):
        donuts = 0

        for r in ranks:
            curr_time = 0
            k = 0

            while True:
                curr_time += r * (k + 1)
                if curr_time > time:
                    break
                k += 1

            donuts += k
            if donuts >= n:
                return True

        return False

    def minTime(self, ranks, n):
        min_rank = min(ranks)
        low = 0
        high = min_rank * n * (n + 1) // 2
        ans = high

        while low <= high:
            mid = (low + high) // 2

            if self.canMake(ranks, n, mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans
