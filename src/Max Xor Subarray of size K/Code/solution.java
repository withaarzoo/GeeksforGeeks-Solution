class Solution {
    public int maxSubarrayXOR(int[] arr, int k) {
        int n = arr.length;

        int currXor = 0;

        // XOR of first window
        for (int i = 0; i < k; i++) {
            currXor ^= arr[i];
        }

        int maxXor = currXor;

        // Slide the window
        for (int i = k; i < n; i++) {
            currXor ^= arr[i - k]; // remove left
            currXor ^= arr[i]; // add right
            maxXor = Math.max(maxXor, currXor);
        }

        return maxXor;
    }
}
