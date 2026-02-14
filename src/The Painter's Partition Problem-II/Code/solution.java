class Solution {

    private boolean isPossible(int[] arr, int k, long maxTime) {
        long currentSum = 0;
        int painters = 1;

        for (int i = 0; i < arr.length; i++) {

            if (arr[i] > maxTime)
                return false;

            if (currentSum + arr[i] <= maxTime) {
                currentSum += arr[i];
            } else {
                painters++;
                currentSum = arr[i];
            }
        }

        return painters <= k;
    }

    public int minTime(int[] arr, int k) {

        long low = 0, high = 0;

        for (int x : arr) {
            low = Math.max(low, x);
            high += x;
        }

        long ans = high;

        while (low <= high) {
            long mid = low + (high - low) / 2;

            if (isPossible(arr, k, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return (int) ans;
    }
}
