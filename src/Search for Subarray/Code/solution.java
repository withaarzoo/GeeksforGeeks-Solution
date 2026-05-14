class Solution {

    // Function to build LPS array
    private int[] buildLPS(int[] b) {

        int m = b.length;

        // LPS array
        int[] lps = new int[m];

        // Length of previous longest prefix suffix
        int len = 0;

        int i = 1;

        while (i < m) {

            // Matching elements
            if (b[i] == b[len]) {

                len++;

                lps[i] = len;

                i++;
            } else {

                // Try smaller prefix
                if (len != 0) {
                    len = lps[len - 1];
                } else {

                    lps[i] = 0;

                    i++;
                }
            }
        }

        return lps;
    }

    public ArrayList<Integer> search(int[] a, int[] b) {

        int n = a.length;
        int m = b.length;

        // Build LPS array
        int[] lps = buildLPS(b);

        // Store result
        ArrayList<Integer> ans = new ArrayList<>();

        int i = 0;
        int j = 0;

        while (i < n) {

            // Elements match
            if (a[i] == b[j]) {
                i++;
                j++;
            }

            // Full pattern matched
            if (j == m) {

                ans.add(i - m);

                // Continue searching
                j = lps[j - 1];
            }

            // Mismatch
            else if (i < n && a[i] != b[j]) {

                if (j != 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }

        return ans;
    }
}