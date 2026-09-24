class Solution {
    public int maxStackHeight(int[] r, int[] h) {
        int n = r.length;
        int[][] discs = new int[n][2];
        for(int i = 0; i < n; i++) {
            discs[i][0] = r[i];
            discs[i][1] = h[i];
        }
        Arrays.sort(discs, (a, b) -> {
            if(a[0] != b[0]) return Integer.compare(a[0], b[0]);
            return Integer.compare(b[1], a[1]);
        });
        int MAXH = 1001;
        int[] bit = new int[MAXH + 2];
        int ans = 0;
        for(int[] d : discs) {
            int ht = d[1];
            int best = query(bit, ht - 1);
            int cur = best + ht;
            ans = Math.max(ans, cur);
            update(bit, ht, cur, MAXH);
        }
        return ans;
    }
    private void update(int[] bit, int idx, int val, int MAXH) {
        for(; idx <= MAXH; idx += idx & -idx) bit[idx] = Math.max(bit[idx], val);
    }
    private int query(int[] bit, int idx) {
        int res = 0;
        for(; idx > 0; idx -= idx & -idx) res = Math.max(res, bit[idx]);
        return res;
    }
}