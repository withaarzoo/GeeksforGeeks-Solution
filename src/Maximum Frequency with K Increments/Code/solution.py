class Solution:
    def maxFrequency(self, arr, k):
        arr.sort()
        sum_ = 0
        left = 0
        ans = 1
        for right in range(len(arr)):
            sum_ += arr[right]
            while arr[right] * (right - left + 1) - sum_ > k:
                sum_ -= arr[left]
                left += 1
            ans = max(ans, right - left + 1)
        return ans