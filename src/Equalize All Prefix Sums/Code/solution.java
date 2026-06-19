class Solution {
    public ArrayList<Integer> optimalArray(int[] arr) {

        int n = arr.length;

        // Prefix sums for fast range sum queries
        long[] pref = new long[n + 1];

        for (int i = 0; i < n; i++) {
            pref[i + 1] = pref[i] + arr[i];
        }

        ArrayList<Integer> ans = new ArrayList<>();

        for (int i = 0; i < n; i++) {

            // Median index of current prefix
            int mid = i / 2;

            long median = arr[mid];

            // Cost for left side
            long leftCost = median * (mid + 1L) - pref[mid + 1];

            // Cost for right side
            long rightCost = (pref[i + 1] - pref[mid + 1]) -
                    median * (i - mid);

            ans.add((int) (leftCost + rightCost));
        }

        return ans;
    }
}