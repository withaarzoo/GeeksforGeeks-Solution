class Solution {
    public int findMinDiff(ArrayList<Integer> arr, int m) {

        int n = arr.size();

        if (m == 0 || n == 0 || m > n)
            return 0;

        // Step 1: Sort the array
        Collections.sort(arr);

        int minDiff = Integer.MAX_VALUE;

        // Step 2: Sliding window
        for (int i = 0; i <= n - m; i++) {
            int diff = arr.get(i + m - 1) - arr.get(i);
            minDiff = Math.min(minDiff, diff);
        }

        return minDiff;
    }
}
