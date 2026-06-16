class Solution {
    public ArrayList<Integer> constructList(int[][] queries) {

        // Stores XOR of all future type-1 queries
        int xr = 0;

        // Stores final values
        ArrayList<Integer> ans = new ArrayList<>();

        // Traverse from right to left
        for (int i = queries.length - 1; i >= 0; i--) {

            // XOR query
            if (queries[i][0] == 1) {
                xr ^= queries[i][1];
            } else {
                // Final value of inserted element
                ans.add(queries[i][1] ^ xr);
            }
        }

        // Initial 0 after all XOR operations
        ans.add(xr);

        // Sort as required
        Collections.sort(ans);

        return ans;
    }
}