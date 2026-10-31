class Solution {
    public int maxPackages(int[] arr, int totalTime) {
        int n = arr.length;
        int k = Math.min(n, totalTime);
        if (k == 0)
            return 0;

        long sum = 0;
        for (int i = 0; i < k; i++)
            sum += arr[i];
        long ans = sum;

        for (int i = k; i < n; i++) {
            sum += arr[i] - arr[i - k];
            ans = Math.max(ans, sum);
        }
        return (int) ans;
    }
}