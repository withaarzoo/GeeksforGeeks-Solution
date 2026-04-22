class Solution {
    public ArrayList<Integer> findMean(int[] arr, int[][] queries) {
        int n = arr.length;

        // Prefix sum array
        long[] prefix = new long[n + 1];

        // Build prefix sum
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + arr[i];
        }

        ArrayList<Integer> ans = new ArrayList<>();

        // Process each query
        for (int[] q : queries) {
            int l = q[0];
            int r = q[1];

            // Sum of subarray [l...r]
            long sum = prefix[r + 1] - prefix[l];

            // Length of range
            int len = r - l + 1;

            // Floor mean
            ans.add((int) (sum / len));
        }

        return ans;
    }
}