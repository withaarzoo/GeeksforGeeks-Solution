class Solution:
    def isProduct(self, arr, target):

        # Set to store visited elements
        seen = set()

        # Traverse every number
        for num in arr:

            # Handle zero separately
            if num == 0:

                # If target is zero and
                # there is any previous number
                if target == 0 and len(seen) > 0:
                    return True

                # Store zero
                seen.add(num)
                continue

            # If target is not divisible by current number,
            # then this number cannot form a valid pair
            if target % num != 0:
                seen.add(num)
                continue

            # Required partner value
            needed = target // num

            # If partner already exists,
            # pair found
            if needed in seen:
                return True

            # Store current number
            seen.add(num)

        # No valid pair found
        return False