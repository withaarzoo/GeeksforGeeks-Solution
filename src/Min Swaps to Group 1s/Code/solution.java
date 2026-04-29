class Solution {
    public int minSwaps(int[] arr) {
        int n = arr.length;

        // Count total 1s
        int k = 0;
        for (int x : arr) {
            if (x == 1)
                k++;
        }

        if (k == 0)
            return -1;

        int ones = 0;

        // First window
        for (int i = 0; i < k; i++) {
            if (arr[i] == 1)
                ones++;
        }

        int maxOnes = ones;

        // Sliding window
        for (int i = k; i < n; i++) {
            if (arr[i] == 1)
                ones++;
            if (arr[i - k] == 1)
                ones--;

            maxOnes = Math.max(maxOnes, ones);
        }

        return k - maxOnes;
    }
}