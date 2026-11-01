class Solution {
    public int maximumSubarray(int[] arr) {
        int n = arr.length;
        int noSq = arr[0];
        int withSq = arr[0] * arr[0];
        int ans = Math.max(noSq, withSq);
        for (int i = 1; i < n; i++) {
            int cur = arr[i];
            int sq = cur * cur;
            int newNo = Math.max(cur, noSq + cur);
            int newWith = Math.max(sq, Math.max(noSq + sq, withSq + cur));
            noSq = newNo;
            withSq = newWith;
            ans = Math.max(ans, Math.max(noSq, withSq));
        }
        return ans;
    }
}