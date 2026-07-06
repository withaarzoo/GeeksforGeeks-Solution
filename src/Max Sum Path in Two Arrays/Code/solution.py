class Solution:
    def maxPathSum(self, a, b):
        # i moves through a, while j moves through b.
        i = 0
        j = 0

        # These store the sums between two common elements.
        sumA = 0
        sumB = 0

        # This stores the best total path sum.
        answer = 0

        # I compare both arrays until one of them ends.
        while i < len(a) and j < len(b):
            if a[i] < b[j]:
                # This value belongs only to the current path in a.
                sumA += a[i]
                i += 1

            elif a[i] > b[j]:
                # This value belongs only to the current path in b.
                sumB += b[j]
                j += 1

            else:
                # At a common element, I choose the better previous path.
                answer += max(sumA, sumB)

                # The common element must be counted only once.
                answer += a[i]

                # A new segment starts after this common element.
                sumA = 0
                sumB = 0

                # Both pointers move because the common value was processed.
                i += 1
                j += 1

        # If a still has elements, they belong to its final segment.
        while i < len(a):
            sumA += a[i]
            i += 1

        # If b still has elements, they belong to its final segment.
        while j < len(b):
            sumB += b[j]
            j += 1

        # I finish by choosing the better remaining path.
        answer += max(sumA, sumB)

        return answer