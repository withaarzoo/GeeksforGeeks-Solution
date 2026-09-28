class Solution {
    int[] tree;
    int n;

    int gcd(int a, int b) {
        while (b != 0) {
            int t = b;
            b = a % b;
            a = t;
        }
        return a;
    }

    void build(int[] arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
            return;
        }
        int mid = (start + end) / 2;
        build(arr, 2 * node, start, mid);
        build(arr, 2 * node + 1, mid + 1, end);
        tree[node] = gcd(tree[2 * node], tree[2 * node + 1]);
    }

    void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
            return;
        }
        int mid = (start + end) / 2;
        if (idx <= mid)
            update(2 * node, start, mid, idx, val);
        else
            update(2 * node + 1, mid + 1, end, idx, val);
        tree[node] = gcd(tree[2 * node], tree[2 * node + 1]);
    }

    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l)
            return 0;
        if (l <= start && end <= r)
            return tree[node];
        int mid = (start + end) / 2;
        int left = query(2 * node, start, mid, l, r);
        int right = query(2 * node + 1, mid + 1, end, l, r);
        return gcd(left, right);
    }

    public ArrayList<Integer> processQueries(int[] arr, int[][] queries) {
        n = arr.length;
        tree = new int[4 * n];
        build(arr, 1, 0, n - 1);
        ArrayList<Integer> ans = new ArrayList<>();
        for (int[] q : queries) {
            if (q[0] == 0) {
                ans.add(query(1, 0, n - 1, q[1], q[2]));
            } else {
                update(1, 0, n - 1, q[1], q[2]);
            }
        }
        return ans;
    }
}