class Solution:
   
    # Count how many triplets have a sum <= target.
    def countLessEqual(self, arr: list[int], target: int) -> int:
        n = len(arr)  # Store the number of elements in the array.
        count = 0  # Store the number of valid triplets.

        # Fix the first element of the triplet one by one.
        for i in range(n - 2):
            left = i + 1  # Start the second element just after i.
            right = n - 1  # Start the third element at the end.

            # Move the two pointers until they cross.
            while left < right:
                # Calculate the sum of the current three elements.
                total = arr[i] + arr[left] + arr[right]

                if total <= target:
                    # Because the array is sorted, every index from left to right - 1
                    # also forms a valid triplet with arr[i] and arr[right].
                    count += right - left

                    # Move left forward to check larger second elements.
                    left += 1
                else:
                    # The sum is too large, so move right backward
                    # to make the sum smaller.
                    right -= 1

        return count  # Return the number of triplets with sum <= target.

    def countTriplets(self, arr: list[int], l: int, r: int) -> int:
        # Sort the array so the two-pointer technique can be used.
        arr.sort()

        # Count sums <= r and subtract sums <= l - 1.
        result = self.countLessEqual(arr, r) - self.countLessEqual(arr, l - 1)

        # Return the number of triplets whose sum is inside [l, r].
        return result