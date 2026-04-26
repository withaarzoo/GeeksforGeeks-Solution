class Solution {
    public ArrayList<Integer> commonElements(int[] a, int[] b, int[] c) {
        ArrayList<Integer> ans = new ArrayList<>();
        int i = 0, j = 0, k = 0;

        while (i < a.length && j < b.length && k < c.length) {
            int x = a[i], y = b[j], z = c[k];

            // Case 1: all three are equal => common element found
            if (x == y && y == z) {
                // Avoid duplicates in the answer
                if (ans.isEmpty() || ans.get(ans.size() - 1) != x) {
                    ans.add(x);
                }
                i++;
                j++;
                k++;
            }
            // Case 2: move the pointer(s) having the smallest value
            else {
                int mn = Math.min(x, Math.min(y, z));
                if (x == mn)
                    i++;
                if (y == mn)
                    j++;
                if (z == mn)
                    k++;
            }
        }

        return ans;
    }
}