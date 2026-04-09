class Solution {
    ArrayList<Integer> intersection(int[] a, int[] b) {
        ArrayList<Integer> ans = new ArrayList<>();

        int i = 0, j = 0;
        int n = a.length, m = b.length;

        while (i < n && j < m) {

            // If current element in a is smaller
            if (a[i] < b[j]) {
                i++;
            }

            // If current element in b is smaller
            else if (a[i] > b[j]) {
                j++;
            }

            // If both elements are equal
            else {
                ans.add(a[i]);

                int current = a[i];

                // Skip duplicates in array a
                while (i < n && a[i] == current) {
                    i++;
                }

                // Skip duplicates in array b
                while (j < m && b[j] == current) {
                    j++;
                }
            }
        }

        return ans;
    }
}