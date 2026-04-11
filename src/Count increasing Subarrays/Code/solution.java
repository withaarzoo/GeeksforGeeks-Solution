class Solution {
    public int countIncreasing(int[] arr) {
        int n = arr.length;

        // Final answer
        int ans = 0;

        // Current increasing segment length
        int len = 1;

        for (int i = 1; i < n; i++) {

            // Continue increasing segment
            if (arr[i] > arr[i - 1]) {
                len++;

                // Add new subarrays ending at current index
                ans += (len - 1);
            } else {
                // Reset if sequence breaks
                len = 1;
            }
        }

        return ans;
    }
}