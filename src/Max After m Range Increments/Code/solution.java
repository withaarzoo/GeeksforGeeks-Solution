class Solution {
    public int findMax(int n, int[] a, int[] b, int[] k) {

        // Difference array for efficient range updates
        long[] diff = new long[n + 1];

        // Process every operation
        for (int i = 0; i < a.length; i++) {

            // Increment starts here
            diff[a[i]] += k[i];

            // Increment stops after b[i]
            if (b[i] + 1 < n)
                diff[b[i] + 1] -= k[i];
        }

        long current = 0;
        long maximum = 0;

        // Convert difference array into actual values
        for (int i = 0; i < n; i++) {

            // Prefix sum gives the current element
            current += diff[i];

            // Store the largest value
            maximum = Math.max(maximum, current);
        }

        return (int) maximum;
    }
}