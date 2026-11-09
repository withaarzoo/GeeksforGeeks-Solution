class Solution {
    int getCount(String s, int k) {
        int[] cnt = new int[26];
        int n = s.length();
        for (int i = 0; i < n; i++) {
            if (i == 0 || s.charAt(i) != s.charAt(i - 1)) {
                cnt[s.charAt(i) - 'a']++;
            }
        }
        int ans = 0;
        for (int i = 0; i < 26; i++) {
            if (cnt[i] == k) ans++;
        }
        return ans;
    }
}