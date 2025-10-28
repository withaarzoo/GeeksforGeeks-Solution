from collections import deque

class Solution:
	def nearest(self, grid):
		m = len(grid)
		if m == 0:
			return []
		n = len(grid[0])

		dist = [[-1] * n for _ in range(m)]
		q = deque()

		# Initialize all 1s with distance 0 and add them to queue
		for i in range(m):
			for j in range(n):
				if grid[i][j] == 1:
					dist[i][j] = 0
					q.append((i, j))

		# 4-directional moves
		dirs = [(-1,0), (1,0), (0,-1), (0,1)]

		# BFS
		while q:
			r, c = q.popleft()
			for dr, dc in dirs:
				nr, nc = r + dr, c + dc
				if 0 <= nr < m and 0 <= nc < n and dist[nr][nc] == -1:
					dist[nr][nc] = dist[r][c] + 1
					q.append((nr, nc))

		return dist
