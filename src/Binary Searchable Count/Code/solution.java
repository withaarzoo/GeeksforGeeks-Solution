class Solution {
    public int binarySearchable(int[] arr) {
        // I keep the answer in a field-like array so the nested helper can update it.
        int[] count = new int[1];

        // I start the recursive walk with the full index range and no value limits.
        dfs(arr, 0, arr.length - 1, Long.MIN_VALUE / 4, Long.MAX_VALUE / 4, count);

        return count[0];
    }

    private void dfs(int[] arr, int l, int r, long low, long high, int[] count) {
        // An empty segment means the binary-search path ends here.
        if (l > r)
            return;

        // The middle position is the same one binary search would inspect first.
        int mid = l + (r - l) / 2;
        long val = arr[mid];

        // If the value stays inside the allowed range, this index is searchable.
        if (val > low && val < high) {
            count[0]++;
        }

        // The left side must stay below the current value, so I tighten the upper
        // bound.
        dfs(arr, l, mid - 1, low, Math.min(high, val), count);

        // The right side must stay above the current value, so I tighten the lower
        // bound.
        dfs(arr, mid + 1, r, Math.max(low, val), high, count);
    }
};