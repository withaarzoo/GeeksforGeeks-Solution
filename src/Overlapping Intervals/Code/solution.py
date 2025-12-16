class Solution:
    def mergeOverlap(self, arr):
        if not arr:
            return []

        # Step 1: Sort intervals by start
        arr.sort(key=lambda x: x[0])

        result = []
        start, end = arr[0]

        # Step 2: Traverse intervals
        for i in range(1, len(arr)):
            if arr[i][0] <= end:
                end = max(end, arr[i][1])
            else:
                result.append([start, end])
                start, end = arr[i]

        # Step 3: Add last interval
        result.append([start, end])

        return result
