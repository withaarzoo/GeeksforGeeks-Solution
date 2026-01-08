class Solution:
    def atMost(self, arr, k):
        left = 0
        odd_count = 0
        result = 0

        for right in range(len(arr)):
            if arr[right] % 2 == 1:
                odd_count += 1

            while odd_count > k:
                if arr[left] % 2 == 1:
                    odd_count -= 1
                left += 1

            result += (right - left + 1)

        return result

    def countSubarrays(self, arr, k):
        return self.atMost(arr, k) - self.atMost(arr, k - 1)
