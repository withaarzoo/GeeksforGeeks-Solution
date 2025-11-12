class Solution {
    public boolean wildCard(String txt, String pat) {
        int n = txt.length();
        int m = pat.length();
        boolean[] prev = new boolean[m + 1];
        boolean[] cur = new boolean[m + 1];
        prev[0] = true;

        // empty text vs pattern prefix
        for (int j = 1; j <= m; ++j) {
            if (pat.charAt(j - 1) == '*')
                prev[j] = prev[j - 1];
            else
                prev[j] = false;
        }

        for (int i = 1; i <= n; ++i) {
            cur[0] = false;
            for (int j = 1; j <= m; ++j) {
                char pc = pat.charAt(j - 1);
                if (pc == '*') {
                    cur[j] = cur[j - 1] || prev[j];
                } else if (pc == '?' || pc == txt.charAt(i - 1)) {
                    cur[j] = prev[j - 1];
                } else {
                    cur[j] = false;
                }
            }
            // copy cur -> prev (swap references)
            boolean[] tmp = prev;
            prev = cur;
            cur = tmp;
        }

        return prev[m];
    }
}
