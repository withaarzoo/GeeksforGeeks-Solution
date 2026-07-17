class Solution {
    public int maxDiffSubArrays(int[] arr) {
        int n = arr.length;

        // Arrays to store best maximum/minimum sums.
        int[] leftMax = new int[n];
        int[] leftMin = new int[n];
        int[] rightMax = new int[n];
        int[] rightMin = new int[n];

        // Kadane for maximum subarray from left.
        int curr = arr[0];
        leftMax[0] = arr[0];

        for (int i = 1; i < n; i++) {
            // Extend previous subarray or start new one.
            curr = Math.max(arr[i], curr + arr[i]);

            // Best maximum till this index.
            leftMax[i] = Math.max(leftMax[i - 1], curr);
        }

        // Kadane for minimum subarray from left.
        curr = arr[0];
        leftMin[0] = arr[0];

        for (int i = 1; i < n; i++) {
            curr = Math.min(arr[i], curr + arr[i]);
            leftMin[i] = Math.min(leftMin[i - 1], curr);
        }

        // Kadane for maximum subarray from right.
        curr = arr[n - 1];
        rightMax[n - 1] = arr[n - 1];

        for (int i = n - 2; i >= 0; i--) {
            curr = Math.max(arr[i], curr + arr[i]);
            rightMax[i] = Math.max(rightMax[i + 1], curr);
        }

        // Kadane for minimum subarray from right.
        curr = arr[n - 1];
        rightMin[n - 1] = arr[n - 1];

        for (int i = n - 2; i >= 0; i--) {
            curr = Math.min(arr[i], curr + arr[i]);
            rightMin[i] = Math.min(rightMin[i + 1], curr);
        }

        int ans = 0;

        // Check every possible split.
        for (int i = 0; i < n - 1; i++) {
            ans = Math.max(ans, Math.abs(leftMax[i] - rightMin[i + 1]));
            ans = Math.max(ans, Math.abs(leftMin[i] - rightMax[i + 1]));
        }

        return ans;
    }
}