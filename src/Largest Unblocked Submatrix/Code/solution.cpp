class Solution {
  public:
    int largestArea(int n, int m, int k, vector<vector<int>> &arr) {
        // I store blocked row and column positions separately.
        vector<int> rows;
        vector<int> cols;

        // These imaginary boundaries help me handle the grid edges
        // exactly like normal gaps between blocked positions.
        rows.push_back(0);
        cols.push_back(0);

        // I collect the blocked row and column from every blocked cell.
        for (int i = 0; i < k; i++) {
            rows.push_back(arr[i][0]);
            cols.push_back(arr[i][1]);
        }

        // These boundaries represent positions just outside the grid.
        rows.push_back(n + 1);
        cols.push_back(m + 1);

        // After sorting, consecutive values define one continuous free gap.
        sort(rows.begin(), rows.end());
        sort(cols.begin(), cols.end());

        int maxRows = 0;
        int maxCols = 0;

        // I find the largest number of free rows between two blocked positions.
        for (int i = 1; i < rows.size(); i++) {
            int freeRows = rows[i] - rows[i - 1] - 1;
            maxRows = max(maxRows, freeRows);
        }

        // I find the largest number of free columns in the same way.
        for (int i = 1; i < cols.size(); i++) {
            int freeCols = cols[i] - cols[i - 1] - 1;
            maxCols = max(maxCols, freeCols);
        }

        // The largest rectangle uses the widest free row gap
        // together with the widest free column gap.
        return maxRows * maxCols;
    }
};