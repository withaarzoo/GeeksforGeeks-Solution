class Solution {
    public int beautySum(String s) {
        int n = s.length();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            int[] freq = new int[26];
            for (int j = i; j < n; j++) {
                freq[s.charAt(j) - 'a']++;
                int mx = 0, mn = n + 1;
                for (int k = 0; k < 26; k++) {
                    if (freq[k] > 0) {
                        mx = Math.max(mx, freq[k]);
                        mn = Math.min(mn, freq[k]);
                    }
                }
                ans += mx - mn;
            }
        }
        return ans;
    }
}