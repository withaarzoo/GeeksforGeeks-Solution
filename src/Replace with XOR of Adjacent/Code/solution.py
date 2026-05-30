class Solution:
    def replaceElements(self, arr):
        n = len(arr)

        # Temporary array to store updated values
        temp = [0] * n

        # First element
        temp[0] = arr[0] ^ arr[1]

        # Last element
        temp[n - 1] = arr[n - 2] ^ arr[n - 1]

        # Middle elements
        for i in range(1, n - 1):
            temp[i] = arr[i - 1] ^ arr[i + 1]

        # Copy result back into original array
        for i in range(n):
            arr[i] = temp[i]