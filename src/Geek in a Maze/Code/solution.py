from collections import deque


class Solution:
    def numberOfCells(self, r: int, c: int, u: int, d: int, mat: list[list[int]]) -> int:
        # Store the maze dimensions.
        n = len(mat)
        m = len(mat[0])

        # Geek cannot start from a blocked cell.
        if mat[r][c] == '#':
            return 0

        # INF marks cells that have not been reached.
        INF = float('inf')

        # dist[i][j] stores the minimum upward moves needed to reach (i, j).
        dist = [[INF] * m for _ in range(n)]

        # deque supports O(1) insertion at both the front and back.
        dq = deque()

        # The starting cell needs zero upward moves.
        dist[r][c] = 0
        dq.appendleft((r, c))

        # Direction arrays for up, down, left, and right.
        dr = [-1, 1, 0, 0]
        dc = [0, 0, -1, 1]

        # Run 0-1 BFS until every useful state is processed.
        while dq:
            # Take the next cell from the front.
            x, y = dq.popleft()

            # Try all four adjacent positions.
            for direction in range(4):
                nx = x + dr[direction]
                ny = y + dc[direction]

                # Skip positions outside the maze.
                if nx < 0 or nx >= n or ny < 0 or ny >= m:
                    continue

                # Geek cannot enter an obstacle.
                if mat[nx][ny] == '#':
                    continue

                # Moving upward costs 1; every other move costs 0.
                cost = 1 if direction == 0 else 0

                # Update only when this path uses fewer upward moves.
                if dist[x][y] + cost < dist[nx][ny]:
                    dist[nx][ny] = dist[x][y] + cost

                    # Process zero-cost moves first.
                    if cost == 0:
                        dq.appendleft((nx, ny))
                    else:
                        # Process upward moves after zero-cost moves.
                        dq.append((nx, ny))

        # Store the total number of cells Geek can visit.
        answer = 0

        # Check every cell after calculating minimum upward moves.
        for i in range(n):
            for j in range(m):
                # Ignore obstacles and unreachable cells.
                if mat[i][j] == '#' or dist[i][j] == INF:
                    continue

                # Get the minimum upward moves required.
                up_moves = dist[i][j]

                # Calculate downward moves using the final row difference.
                down_moves = up_moves + (i - r)

                # Count the cell only if both movement limits are valid.
                if up_moves <= u and down_moves <= d:
                    answer += 1

        # Return the total number of reachable empty cells.
        return answer