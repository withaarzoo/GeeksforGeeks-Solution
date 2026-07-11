class Solution:

    # DFS returns longest distance from current cell
    def dfs(self, mat, vis, x, y, xd, yd):

        # Destination reached
        if x == xd and y == yd:
            return 0

        # Mark current cell as visited
        vis[x][y] = True

        ans = -1

        # Four possible directions
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        for dx, dy in directions:

            nx = x + dx
            ny = y + dy

            # Check whether next cell is valid
            if (
                0 <= nx < self.n and
                0 <= ny < self.m and
                mat[nx][ny] == 1 and
                not vis[nx][ny]
            ):

                cur = self.dfs(mat, vis, nx, ny, xd, yd)

                # Update answer if destination is reachable
                if cur != -1:
                    ans = max(ans, cur + 1)

        # Backtrack
        vis[x][y] = False

        return ans

    def longestPath(self, mat, xs, ys, xd, yd):

        self.n = len(mat)
        self.m = len(mat[0])

        # Source or destination is blocked
        if mat[xs][ys] == 0 or mat[xd][yd] == 0:
            return -1

        # Visited matrix
        vis = [[False] * self.m for _ in range(self.n)]

        return self.dfs(mat, vis, xs, ys, xd, yd)