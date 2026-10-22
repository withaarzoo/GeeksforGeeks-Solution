class Solution {
    public int minimumSum(String s) {
        char[] a = s.toCharArray();
        int n = a.length;
        for (int i = 0; i < n / 2; i++) {
            if (a[i] != '?' && a[n - 1 - i] != '?' && a[i] != a[n - 1 - i])
                return -1;
            if (a[i] == '?' && a[n - 1 - i] != '?')
                a[i] = a[n - 1 - i];
            else if (a[i] != '?' && a[n - 1 - i] == '?')
                a[n - 1 - i] = a[i];
        }
        int i = 0;
        while (i < n && a[i] == '?') i++;
        if (i == n) return 0;
        char prev = a[i];
        int ans = 0;
        for (int j = i + 1; j < n; j++) {
            if (a[j] == '?') a[j] = prev;
            ans += Math.abs(a[j] - prev);
            prev = a[j];
        }
        return ans;
    }
}