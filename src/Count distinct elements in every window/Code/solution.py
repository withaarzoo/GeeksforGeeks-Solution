class Solution:
    def countDistinct(self, arr, k):
        freq = {}
        result = []

        # First window
        for i in range(k):
            freq[arr[i]] = freq.get(arr[i], 0) + 1

        result.append(len(freq))

        # Sliding window
        for i in range(k, len(arr)):
            out = arr[i - k]
            freq[out] -= 1
            if freq[out] == 0:
                del freq[out]

            freq[arr[i]] = freq.get(arr[i], 0) + 1
            result.append(len(freq))

        return result
