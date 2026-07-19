class Solution {
    public ArrayList<Boolean> processQueries(int[] arr, int[][] queries) {

        int n = arr.length;

        // up[i] = farthest index reachable while remaining non-decreasing
        int[] up = new int[n];

        // down[i] = farthest index reachable while remaining non-increasing
        int[] down = new int[n];

        // Base case for the last element
        up[n - 1] = n - 1;

        // Build non-decreasing reach array
        for (int i = n - 2; i >= 0; i--) {
            if (arr[i] <= arr[i + 1])
                up[i] = up[i + 1];
            else
                up[i] = i;
        }

        // Base case for the last element
        down[n - 1] = n - 1;

        // Build non-increasing reach array
        for (int i = n - 2; i >= 0; i--) {
            if (arr[i] >= arr[i + 1])
                down[i] = down[i + 1];
            else
                down[i] = i;
        }

        ArrayList<Boolean> ans = new ArrayList<>();

        // Process every query
        for (int[] q : queries) {

            int l = q[0];
            int r = q[1];

            // End of increasing part
            int peak = up[l];

            // If increasing part already reaches r
            if (peak >= r)
                ans.add(true);

            // Otherwise decreasing part must cover the rest
            else
                ans.add(down[peak] >= r);
        }

        return ans;
    }
}