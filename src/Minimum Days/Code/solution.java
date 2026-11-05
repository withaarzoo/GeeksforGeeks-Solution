class Solution {
    public int getMinimumDays(String s, int[] p) {
        int n = s.length();
        int[] day = new int[n];
        for (int i = 0; i < n; i++) {
            day[p[i]] = i + 1;
        }
        int ans = 0;
        for (int i = 0; i < n - 1; i++) {
            if (s.charAt(i) == s.charAt(i + 1)) {
                ans = Math.max(ans, Math.min(day[i], day[i + 1]));
            }
        }
        return ans;
    }
}