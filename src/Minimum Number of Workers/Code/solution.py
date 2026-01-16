class Solution:
    def minMen(self, arr):
        n = len(arr)
        intervals = []

        # Convert workers to intervals
        for i in range(n):
            if arr[i] == -1:
                continue

            left = max(0, i - arr[i])
            right = min(n - 1, i + arr[i])
            intervals.append((left, right))

        # Sort intervals
        intervals.sort()

        count = 0
        idx = 0
        covered_till = 0

        # Greedy coverage
        while covered_till < n:
            farthest = covered_till

            while idx < len(intervals) and intervals[idx][0] <= covered_till:
                farthest = max(farthest, intervals[idx][1] + 1)
                idx += 1

            if farthest == covered_till:
                return -1

            count += 1
            covered_till = farthest

        return count
