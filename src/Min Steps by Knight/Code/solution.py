class Solution:
	def minStepToReachTarget(self, knightPos: list[int], targetPos: list[int], n: int) -> int:
		sx, sy = knightPos[0] - 1, knightPos[1] - 1
		tx, ty = targetPos[0] - 1, targetPos[1] - 1
		if sx == tx and sy == ty:
			return 0
		vis = [[False] * n for _ in range(n)]
		from collections import deque
		q = deque([(sx, sy, 0)])
		vis[sx][sy] = True
		dx = [-2, -2, -1, -1, 1, 1, 2, 2]
		dy = [-1, 1, -2, 2, -2, 2, -1, 1]
		while q:
			x, y, steps = q.popleft()
			for i in range(8):
				nx, ny = x + dx[i], y + dy[i]
				if 0 <= nx < n and 0 <= ny < n and not vis[nx][ny]:
					if nx == tx and ny == ty:
						return steps + 1
					vis[nx][ny] = True
					q.append((nx, ny, steps + 1))
		return -1