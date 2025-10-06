class Solution:
    def knightTour(self, n):
        # Return an n x n list of lists with step indices,
        # or [[-1]] if impossible.
        if n == 1:
            return [[0]]
        if n > 1 and n < 5:
            return [[-1]]

        board = [[-1] * n for _ in range(n)]
        dr = [2,1,-1,-2,-2,-1,1,2]
        dc = [1,2,2,1,-1,-2,-2,-1]

        def degree(r, c):
            cnt = 0
            for k in range(8):
                nr, nc = r + dr[k], c + dc[k]
                if 0 <= nr < n and 0 <= nc < n and board[nr][nc] == -1:
                    cnt += 1
            return cnt

        def dfs(r, c, step):
            if step == n * n:
                return True
            moves = []
            for k in range(8):
                nr, nc = r + dr[k], c + dc[k]
                if 0 <= nr < n and 0 <= nc < n and board[nr][nc] == -1:
                    moves.append((degree(nr, nc), nr, nc))
            moves.sort()  # sort by degree ASC (Warnsdorff)
            for _, nr, nc in moves:
                board[nr][nc] = step
                if dfs(nr, nc, step + 1):
                    return True
                board[nr][nc] = -1
            return False

        board[0][0] = 0
        if dfs(0, 0, 1):
            return board
        return [[-1]]
