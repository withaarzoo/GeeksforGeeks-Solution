class Solution {
    public String lexiString(String s) {
        String doubled = s + s;
        int n = doubled.length();
        int[] f = new int[n];
        java.util.Arrays.fill(f, -1);
        int k = 0;
        for (int j = 1; j < n; j++) {
            char sj = doubled.charAt(j);
            int i = f[j - k - 1];
            while (i != -1 && sj != doubled.charAt(k + i + 1)) {
                if (sj < doubled.charAt(k + i + 1)) {
                    k = j - i - 1;
                }
                i = f[i];
            }
            if (sj != doubled.charAt(k + i + 1)) {
                if (sj < doubled.charAt(k)) {
                    k = j;
                }
                f[j - k] = -1;
            } else {
                f[j - k] = i + 1;
            }
        }
        return doubled.substring(k, k + s.length());
    }
}