class Solution {

    private boolean canMake(int[] arr, int n, int k, int w, long target) {
        long[] diff = new long[n + 1];
        long currAdd = 0;
        long operations = 0;

        for (int i = 0; i < n; i++) {
            currAdd += diff[i];
            long currentHeight = arr[i] + currAdd;

            if (currentHeight < target) {
                long need = target - currentHeight;
                operations += need;
                if (operations > k)
                    return false;

                currAdd += need;
                if (i + w < n)
                    diff[i + w] -= need;
            }
        }
        return true;
    }

    public int maxMinHeight(int[] arr, int k, int w) {
        int n = arr.length;
        int minVal = Integer.MAX_VALUE;
        for (int val : arr)
            minVal = Math.min(minVal, val);

        long low = minVal;
        long high = minVal + k;
        long ans = minVal;

        while (low <= high) {
            long mid = (low + high) / 2;

            if (canMake(arr, n, k, w, mid)) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return (int) ans;
    }
}
