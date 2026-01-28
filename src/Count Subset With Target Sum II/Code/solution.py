class Solution:
    def countSubset(self, arr, k):
        n = len(arr)
        mid = n // 2

        left = arr[:mid]
        right = arr[mid:]

        leftSums = []
        rightSums = []

        # Left subset sums
        for mask in range(1 << len(left)):
            s = 0
            for i in range(len(left)):
                if mask & (1 << i):
                    s += left[i]
            leftSums.append(s)

        # Right subset sums
        for mask in range(1 << len(right)):
            s = 0
            for i in range(len(right)):
                if mask & (1 << i):
                    s += right[i]
            rightSums.append(s)

        from collections import Counter
        freq = Counter(rightSums)

        count = 0
        for s in leftSums:
            count += freq[k - s]

        return count
