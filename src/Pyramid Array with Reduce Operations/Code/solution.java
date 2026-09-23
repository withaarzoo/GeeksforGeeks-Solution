class Solution {
    public int formPyramid(int[] arr) {
        int n = arr.length;
        long total = 0;
        for (int x : arr) total += x;
        if (n <= 2) return (int)(total - 1);
        int[] left = new int[n];
        int[] right = new int[n];
        left[0] = 1;
        for (int i = 1; i < n; i++)
            left[i] = Math.min(left[i - 1] + 1, arr[i]);
        right[n - 1] = 1;
        for (int i = n - 2; i >= 0; i--)
            right[i] = Math.min(right[i + 1] + 1, arr[i]);
        long maxX = 0;
        for (int i = 0; i < n; i++)
            maxX = Math.max(maxX, Math.min(left[i], right[i]));
        return (int)(total - maxX * maxX);
    }
};