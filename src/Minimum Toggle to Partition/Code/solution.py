class Solution:
    def minToggle(self, arr):

        # Count total zeros in array
        rightZeros = 0

        for num in arr:
            if num == 0:
                rightZeros += 1

        # Initial answer
        ans = rightZeros

        # Count ones on left side
        leftOnes = 0

        # Traverse array
        for num in arr:

            # Remove zero from right side
            if num == 0:
                rightZeros -= 1

            # Add one to left side
            else:
                leftOnes += 1

            # Update minimum answer
            ans = min(ans, leftOnes + rightZeros)

        return ans