class Solution {
    public int largestArea(int n, int m, int k, int[][] arr) {
        // I need space for k blocked positions and two extra boundaries.
        int[] rows = new int[k + 2];
        int[] cols = new int[k + 2];

        // Position 0 acts as the boundary before the grid starts.
        rows[0] = 0;
        cols[0] = 0;

        // I store every blocked row and column separately.
        for (int i = 0; i < k; i++) {
            rows[i + 1] = arr[i][0];
            cols[i + 1] = arr[i][1];
        }

        // These positions act as boundaries just after the grid ends.
        rows[k + 1] = n + 1;
        cols[k + 1] = m + 1;

        // Sorting puts all blocked positions in increasing order.
        Arrays.sort(rows);
        Arrays.sort(cols);

        int maxRows = 0;
        int maxCols = 0;

        // I check every gap between consecutive blocked rows.
        for (int i = 1; i < rows.length; i++) {
            int freeRows = rows[i] - rows[i - 1] - 1;
            maxRows = Math.max(maxRows, freeRows);
        }

        // I check every gap between consecutive blocked columns.
        for (int i = 1; i < cols.length; i++) {
            int freeCols = cols[i] - cols[i - 1] - 1;
            maxCols = Math.max(maxCols, freeCols);
        }

        // Multiplying the two largest gaps gives the largest free area.
        return maxRows * maxCols;
    }
}