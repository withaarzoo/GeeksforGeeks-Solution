def diagView(self, mat):
    n = len(mat)
    ans = []

    # Total anti-diagonals = 2*n - 1
    for d in range(2 * n - 1):

        # Valid row range for current diagonal
        row_start = max(0, d - n + 1)
        row_end = min(n - 1, d)

        # Traverse current diagonal
        for i in range(row_start, row_end + 1):
            j = d - i
            ans.append(mat[i][j])

    return ans