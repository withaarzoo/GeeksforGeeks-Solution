class Solution:
    def countCoordinates(self, mat):
        # Store the number of rows and columns.
        n = len(mat)
        m = len(mat[0])

        # These matrices store which towers can reach each station.
        reachP = [[False] * m for _ in range(n)]
        reachQ = [[False] * m for _ in range(n)]

        # These four pairs represent down, up, right, and left movement.
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        # This function runs reverse DFS from all boundary cells of one station.
        def dfs(sources, visited):
            # I use a list as a stack to avoid recursion depth problems.
            stack = []

            # Add every source cell once.
            for r, c in sources:
                if not visited[r][c]:
                    visited[r][c] = True
                    stack.append((r, c))

            # Process every cell that can reach this station.
            while stack:
                r, c = stack.pop()

                # Check all four neighbouring cells.
                for dr, dc in directions:
                    nr = r + dr
                    nc = c + dc

                    # Skip coordinates outside the matrix.
                    if nr < 0 or nr >= n or nc < 0 or nc >= m:
                        continue

                    # Skip cells already found for this station.
                    if visited[nr][nc]:
                        continue

                    # In reverse, I can move only to an equal or higher tower.
                    if mat[nr][nc] < mat[r][c]:
                        continue

                    # This tower can also reach the same station.
                    visited[nr][nc] = True
                    stack.append((nr, nc))

        # Collect the top row and left column for Station P.
        sourcesP = []
        for j in range(m):
            sourcesP.append((0, j))
        for i in range(n):
            sourcesP.append((i, 0))

        # Collect the bottom row and right column for Station Q.
        sourcesQ = []
        for j in range(m):
            sourcesQ.append((n - 1, j))
        for i in range(n):
            sourcesQ.append((i, m - 1))

        # Find all towers that can reach each station.
        dfs(sourcesP, reachP)
        dfs(sourcesQ, reachQ)

        # Count towers that can reach both stations.
        answer = 0
        for i in range(n):
            for j in range(m):
                if reachP[i][j] and reachQ[i][j]:
                    answer += 1

        return answer