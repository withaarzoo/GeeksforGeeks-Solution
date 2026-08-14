class Solution:
    def isPossible(self, arr, s, x):
        # Store the useful generated numbers so I can process
        # them later from largest to smallest.
        nums = [s]

        # sum is the total of all numbers currently on the paper.
        total = s

        # Generate the sequence using every value from arr.
        for a in arr:
            # The next number is the current total plus arr[i].
            next_num = total + a

            # If this number is greater than x, every later number
            # will also be greater than x, so I can stop generating.
            if next_num > x:
                break

            # Keep this number because it can be part of the subset.
            nums.append(next_num)

            # Add it to the total for generating the next number.
            total += next_num

        # remaining is the part of x that I still need to form.
        remaining = x

        # Process the generated numbers from largest to smallest.
        for num in reversed(nums):
            # If the current number fits, take it.
            # This greedy choice works because every number is greater
            # than the sum of all numbers before it.
            if num <= remaining:
                remaining -= num

            # If nothing remains, x has been formed.
            if remaining == 0:
                return True

        # The target could not be formed using the generated numbers.
        return False