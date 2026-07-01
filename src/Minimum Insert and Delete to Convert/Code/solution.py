from bisect import bisect_left

class Solution:
    def minInsAndDel(self, a, b):
        # Store the index of every value in b
        pos = {}
        for i, val in enumerate(b):
            pos[val] = i

        # Store mapped indices of common elements
        mapped = []
        for val in a:
            if val in pos:
                mapped.append(pos[val])

        # List used for LIS
        lis = []

        for idx in mapped:
            # Find the correct position using binary search
            p = bisect_left(lis, idx)

            if p == len(lis):
                # Extend the LIS
                lis.append(idx)
            else:
                # Replace to keep the smallest possible tail
                lis[p] = idx

        # Remaining elements need insertion or deletion
        return (len(a) - len(lis)) + (len(b) - len(lis))