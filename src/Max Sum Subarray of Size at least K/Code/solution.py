class Solution:
    def maxSumWithK(self, arr: list[int], k: int) -> int:

        n = len(arr)

        # bestEndingHere[i] stores the maximum sum
        # of a subarray ending exactly at index i.
        bestEndingHere = [0] * n

        # Base case.
        bestEndingHere[0] = arr[0]

        # Build Kadane array.
        for i in range(1, n):
            # Either start a new subarray
            # or extend the previous one.
            bestEndingHere[i] = max(
                arr[i],
                bestEndingHere[i - 1] + arr[i]
            )

        # Sum of first window of size k.
        windowSum = sum(arr[:k])

        # Initial answer.
        ans = windowSum

        # Slide the window.
        for i in range(k, n):

            # Remove left element.
            windowSum -= arr[i - k]

            # Add new right element.
            windowSum += arr[i]

            # Window alone.
            ans = max(ans, windowSum)

            # Window + best extension.
            ans = max(ans, windowSum + bestEndingHere[i - k])

        return ans