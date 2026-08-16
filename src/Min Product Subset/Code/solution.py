class Solution:
    def minProd(self, arr):
        negative_count = 0              # Stores how many negative elements I have.
        smallest_positive = float('inf') # Stores the smallest positive element.
        smallest_abs_negative = float('inf') # Stores the smallest absolute negative value.
        product = 1                     # Stores the product of all non-zero elements.
        has_zero = False                # Tells me whether the array contains zero.

        for x in arr:
            if x == 0:
                has_zero = True         # Zero can be the answer when no negative exists.
                continue                # Zero is not included in a negative product.

            product *= x                 # I initially multiply every non-zero element.

            if x < 0:
                negative_count += 1     # Count this negative element.
                smallest_abs_negative = min(
                    smallest_abs_negative, -x
                )                       # Find the negative with the smallest absolute value.
            else:
                smallest_positive = min(
                    smallest_positive, x
                )                       # Track the smallest positive value.

        if negative_count == 0:
            if has_zero:
                return 0                # With no negative, zero is smaller than all positives.

            return smallest_positive    # Only positive values exist, so the smallest one is best.

        if negative_count % 2 == 0:
            product //= -smallest_abs_negative
            # An even number of negatives gives a positive product.
            # I remove the negative with the smallest absolute value to leave an odd count.

        return product                   # The resulting product is the minimum possible product.