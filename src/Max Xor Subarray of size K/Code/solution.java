class Solution {
    public int maxSubarrayXOR(int[] arr, int k) {
        int n = arr.length;

        int currXor = 0;

        // XOR of first k elements
        for(int i = 0; i < k; i++) {
            currXor ^= arr[i];
        }

        int maxXor = currXor;

        // Slide the window
        for(int i = k; i < n; i++) {

            // Remove outgoing element
            currXor ^= arr[i - k];

            // Add incoming element
            currXor ^= arr[i];

            maxXor = Math.max(maxXor, currXor);
        }

        return maxXor;
    }
}