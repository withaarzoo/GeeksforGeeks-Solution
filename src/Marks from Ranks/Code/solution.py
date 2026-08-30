class Solution:

    def getMarks(self, l, r, rank):
        # Store the number of valid marks up to each interval.
        n = len(l)
        prefix = [0] * n

        # Build prefix sums of interval sizes.
        for i in range(n):
            # Calculate how many consecutive marks this interval contains.
            count = r[i] - l[i] + 1

            # Add the current interval size to all previous interval sizes.
            prefix[i] = count + (prefix[i - 1] if i > 0 else 0)

        # Store the mark corresponding to every requested rank.
        answer = []

        # Process every rank query independently.
        for current_rank in rank:
            # Start binary search over the prefix sum array.
            left = 0
            right = n - 1

            # Find the first index whose prefix value is at least current_rank.
            while left < right:
                # Find the middle interval.
                mid = left + (right - left) // 2

                # The required rank belongs to this interval or an earlier one.
                if prefix[mid] >= current_rank:
                    right = mid
                else:
                    # The required rank must belong to a later interval.
                    left = mid + 1

            # left is now the interval containing current_rank.
            index = left

            # Count how many valid marks appear before the found interval.
            marks_before = prefix[index - 1] if index > 0 else 0

            # Calculate the zero-based position inside the current interval.
            offset = current_rank - marks_before - 1

            # Move offset positions from the interval's starting mark.
            answer.append(l[index] + offset)

        # Return all marks in the same order as the input rank queries.
        return answer