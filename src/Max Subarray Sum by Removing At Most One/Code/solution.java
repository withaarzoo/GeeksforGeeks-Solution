class Solution {
    public int maxSumSubarray(int[] arr) {

        // Maximum subarray ending here without deletion
        int keep = arr[0];

        // Maximum subarray ending here after one deletion
        int remove = 0;

        // Final answer
        int ans = arr[0];

        // Process each remaining element
        for (int i = 1; i < arr.length; i++) {

            // Either remove current element or continue previous removed subarray
            remove = Math.max(keep, remove + arr[i]);

            // Normal Kadane transition
            keep = Math.max(arr[i], keep + arr[i]);

            // Update answer
            ans = Math.max(ans, Math.max(keep, remove));
        }

        return ans;
    }
}