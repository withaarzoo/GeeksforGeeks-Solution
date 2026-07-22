from bisect import bisect_left

class Solution:
    def minDeletions(self, arr):

        # Stores the smallest possible ending values
        # of increasing subsequences.
        lis = []

        # Process every element.
        for num in arr:

            # If the number extends the sequence,
            # append it.
            if not lis or num > lis[-1]:
                lis.append(num)
            else:
                # Find the first value greater than
                # or equal to the current number.
                idx = bisect_left(lis, num)

                # Replace it with the current number.
                lis[idx] = num

        # Elements outside LIS must be deleted.
        return len(arr) - len(lis)