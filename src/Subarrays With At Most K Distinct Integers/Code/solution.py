class Solution:
    def countAtMostK(self, arr, k):
        if k == 0:
            return 0

        freq = {}
        left = 0
        ans = 0

        for right in range(len(arr)):
            # Add element to frequency map
            freq[arr[right]] = freq.get(arr[right], 0) + 1

            # Shrink window if distinct count exceeds k
            while len(freq) > k:
                freq[arr[left]] -= 1
                if freq[arr[left]] == 0:
                    del freq[arr[left]]
                left += 1

            # Count valid subarrays ending at right
            ans += right - left + 1

        return ans
