class Solution:
    def kBitFlips(self, arr, k):
        n = len(arr)
        flips = 0  # parity: 0 (even) or 1 (odd)
        ans = 0

        for i in range(n):
            # If a flip started at i-k, its effect ends now.
            if i >= k and arr[i - k] > 1:
                flips ^= 1

            # effective bit: original bit XOR parity of active flips
            bit = (arr[i] & 1) ^ flips
            if bit == 0:
                # need to flip the window starting at i
                if i + k > n:
                    return -1
                ans += 1
                flips ^= 1       # start new flip
                arr[i] += 2      # mark start of flip

        return ans
