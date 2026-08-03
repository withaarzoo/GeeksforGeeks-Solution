class Solution {
    public int maxSumWithK(int[] arr, int k) {

        int n = arr.length;

        // bestEndingHere[i] stores the maximum sum subarray
        // ending exactly at index i.
        int[] bestEndingHere = new int[n];

        // Base case.
        bestEndingHere[0] = arr[0];

        // Build Kadane array.
        for (int i = 1; i < n; i++) {
            // Either start new or extend previous.
            bestEndingHere[i] = Math.max(arr[i], bestEndingHere[i - 1] + arr[i]);
        }

        // Sum of first k elements.
        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }

        // Initial answer.
        int ans = windowSum;

        // Slide the window.
        for (int i = k; i < n; i++) {

            // Remove left element.
            windowSum -= arr[i - k];

            // Add new right element.
            windowSum += arr[i];

            // Take only current window.
            ans = Math.max(ans, windowSum);

            // Extend using Kadane result.
            ans = Math.max(ans, windowSum + bestEndingHere[i - k]);
        }

        return ans;
    }
}