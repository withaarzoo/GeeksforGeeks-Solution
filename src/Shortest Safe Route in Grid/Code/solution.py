
from collections import deque

class Solution:
    def shortestPath(self, mat: list[list[int]]) -> int:
        n = len(mat)                              # Number of rows.
        m = len(mat[0])                           # Number of columns.

        unsafe = [[False] * m for _ in range(n)]
        # unsafe[r][c] tells me whether this cell cannot be used.

        directions = [
            (-1, 0),                              # Up.
            (1, 0),                               # Down.
            (0, -1),                              # Left.
            (0, 1)                                # Right.
        ]

        # I first mark every landmine and its four direct neighbors as unsafe.
        for r in range(n):
            for c in range(m):
                if mat[r][c] == 0:
                    unsafe[r][c] = True
                    # The landmine itself is unsafe.

                    for dr, dc in directions:
                        nr = r + dr
                        nc = c + dc
                        # Calculate one neighboring position.

                        if 0 <= nr < n and 0 <= nc < m:
                            unsafe[nr][nc] = True
                            # A direct neighbor of a landmine is also unsafe.

        visited = [[False] * m for _ in range(n)]
        # visited prevents processing the same cell more than once.

        q = deque()
        # Each queue item stores row, column, and route length.

        # Every safe cell in the first column can be a starting point.
        # I start with length 1 because the starting cell is part of the route.
        for r in range(n):
            if mat[r][0] == 1 and not unsafe[r][0]:
                q.append((r, 0, 1))
                # The first cell contributes one to the route length.

                visited[r][0] = True
                # Mark immediately so it cannot be inserted again.

        # BFS explores smaller route lengths before larger ones.
        while q:
            r, c, dist = q.popleft()
            # Get the next cell and its current route length.

            if c == m - 1:
                return dist
                # The first cell reached in the last column gives the shortest route.

            # Try all four possible movements.
            for dr, dc in directions:
                nr = r + dr
                nc = c + dc
                # Calculate the next cell.

                if (
                    0 <= nr < n and
                    0 <= nc < m and
                    mat[nr][nc] == 1 and
                    not unsafe[nr][nc] and
                    not visited[nr][nc]
                ):
                    visited[nr][nc] = True
                    # Mark before adding to avoid duplicate queue entries.

                    q.append((nr, nc, dist + 1))
                    # The new cell adds one to the route length.

        return -1
        # No safe route could reach the rightmost column.