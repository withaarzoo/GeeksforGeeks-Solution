
class Solution:
    def maxProduct(self, arr: list[int], k: int) -> int:
        # Sort the array so I can access the smallest and largest
        # elements using two pointers.
        arr.sort()

        n = len(arr)

        # If I need only one element, the largest element gives
        # the maximum possible product.
        if k == 1:
            return arr[n - 1]

        # If all elements are non-positive and k is odd,
        # the product cannot be positive.
        # I take the k largest elements because they give
        # the maximum product in this case.
        if arr[n - 1] <= 0 and k % 2 == 1:
            product = 1

            # The last k elements are the largest elements.
            for i in range(n - k, n):
                product *= arr[i]

            return product

        left = 0       # Points to the smallest available elements.
        right = n - 1  # Points to the largest available elements.
        product = 1    # Stores the product of selected elements.

        # If k is odd, I take the largest element first.
        # This leaves an even number of elements to choose in pairs.
        if k % 2 == 1:
            product *= arr[right]
            right -= 1
            k -= 1

        # Select the remaining elements two at a time.
        while k > 0:
            # Product of the two smallest available elements.
            # Two negative numbers can create a large positive product.
            left_product = arr[left] * arr[left + 1]

            # Product of the two largest available elements.
            right_product = arr[right - 1] * arr[right]

            # Choose the pair that gives the larger product.
            if left_product > right_product:
                product *= left_product
                left += 2  # Move past the two selected left elements.
            else:
                product *= right_product
                right -= 2  # Move past the two selected right elements.

            # Two elements have been selected.
            k -= 2

        return product
