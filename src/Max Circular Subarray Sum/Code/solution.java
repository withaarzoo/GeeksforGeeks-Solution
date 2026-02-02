class Solution {
    public int maxCircularSum(int arr[]) {
        if (arr == null || arr.length == 0)
            return 0;

        long total = arr[0];
        long maxEnding = arr[0], maxSoFar = arr[0];
        long minEnding = arr[0], minSoFar = arr[0];

        for (int i = 1; i < arr.length; i++) {
            int x = arr[i];
            // max Kadane
            maxEnding = Math.max(x, maxEnding + x);
            maxSoFar = Math.max(maxSoFar, maxEnding);

            // min Kadane
            minEnding = Math.min(x, minEnding + x);
            minSoFar = Math.min(minSoFar, minEnding);

            total += x;
        }

        // all negative case
        if (maxSoFar < 0)
            return (int) maxSoFar;

        long wrapMax = total - minSoFar;
        return (int) Math.max(maxSoFar, wrapMax);
    }
}
