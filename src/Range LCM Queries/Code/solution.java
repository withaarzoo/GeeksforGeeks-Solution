class Solution {

    // Segment tree array
    long[] seg;

    // Function to calculate GCD
    long gcd(long a, long b) {
        while (b != 0) {
            long temp = a % b;
            a = b;
            b = temp;
        }
        return a;
    }

    // Function to calculate LCM
    long lcm(long a, long b) {
        return (a / gcd(a, b)) * b;
    }

    // Build segment tree
    void build(int idx, int low, int high, int[] arr) {

        // Leaf node
        if (low == high) {
            seg[idx] = arr[low];
            return;
        }

        int mid = (low + high) / 2;

        build(2 * idx + 1, low, mid, arr);
        build(2 * idx + 2, mid + 1, high, arr);

        // Store LCM
        seg[idx] = lcm(seg[2 * idx + 1], seg[2 * idx + 2]);
    }

    // Update function
    void update(int idx, int low, int high, int pos, int val) {

        if (low == high) {
            seg[idx] = val;
            return;
        }

        int mid = (low + high) / 2;

        if (pos <= mid)
            update(2 * idx + 1, low, mid, pos, val);
        else
            update(2 * idx + 2, mid + 1, high, pos, val);

        // Recalculate node
        seg[idx] = lcm(seg[2 * idx + 1], seg[2 * idx + 2]);
    }

    // Range query
    long query(int idx, int low, int high, int l, int r) {

        // Outside range
        if (high < l || low > r)
            return 1;

        // Inside range
        if (low >= l && high <= r)
            return seg[idx];

        int mid = (low + high) / 2;

        long left = query(2 * idx + 1, low, mid, l, r);
        long right = query(2 * idx + 2, mid + 1, high, l, r);

        return lcm(left, right);
    }

    public ArrayList<Long> RangeLCMQuery(int[] arr, int[][] queries) {

        int n = arr.length;

        seg = new long[4 * n];

        // Build tree
        build(0, 0, n - 1, arr);

        ArrayList<Long> ans = new ArrayList<>();

        // Process queries
        for (int[] q : queries) {

            // Update query
            if (q[0] == 1) {
                update(0, 0, n - 1, q[1], q[2]);
            }

            // Range query
            else {
                ans.add(query(0, 0, n - 1, q[1], q[2]));
            }
        }

        return ans;
    }
}