class Solution:
    def maxSubarrayXOR(self, arr, k):
        n = len(arr)

        curr_xor = 0

        # XOR of first k elements
        for i in range(k):
            curr_xor ^= arr[i]

        max_xor = curr_xor

        # Sliding window
        for i in range(k, n):

            # Remove outgoing element
            curr_xor ^= arr[i - k]

            # Add incoming element
            curr_xor ^= arr[i]

            max_xor = max(max_xor, curr_xor)

        return max_xor