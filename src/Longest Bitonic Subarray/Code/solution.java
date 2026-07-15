class Solution {
    public int bitonic(int[] arr) {

        int n = arr.length;

        // Stores length of non-decreasing subarray ending at each index
        int[] inc = new int[n];

        for (int i = 0; i < n; i++)
            inc[i] = 1;

        // Build increasing lengths
        for (int i = 1; i < n; i++) {
            if (arr[i] >= arr[i - 1])
                inc[i] = inc[i - 1] + 1;
        }

        // Stores length of non-increasing subarray starting at each index
        int[] dec = new int[n];

        for (int i = 0; i < n; i++)
            dec[i] = 1;

        // Build decreasing lengths
        for (int i = n - 2; i >= 0; i--) {
            if (arr[i] >= arr[i + 1])
                dec[i] = dec[i + 1] + 1;
        }

        int ans = 1;

        // Calculate the best bitonic length
        for (int i = 0; i < n; i++) {
            ans = Math.max(ans, inc[i] + dec[i] - 1);
        }

        return ans;
    }
}