class Solution:
    def largestArea(self, n, m, k, arr):
        # I add an imaginary boundary before the first row and column.
        rows = [0]
        cols = [0]

        # I collect blocked row and column positions separately.
        for i in range(k):
            rows.append(arr[i][0])
            cols.append(arr[i][1])

        # I add imaginary boundaries just outside the grid.
        rows.append(n + 1)
        cols.append(m + 1)

        # Sorting lets me examine continuous gaps between blocked positions.
        rows.sort()
        cols.sort()

        max_rows = 0
        max_cols = 0

        # I find the largest continuous group of free rows.
        for i in range(1, len(rows)):
            free_rows = rows[i] - rows[i - 1] - 1
            max_rows = max(max_rows, free_rows)

        # I find the largest continuous group of free columns.
        for i in range(1, len(cols)):
            free_cols = cols[i] - cols[i - 1] - 1
            max_cols = max(max_cols, free_cols)

        # Their product is the largest continuous unblocked area.
        return max_rows * max_cols