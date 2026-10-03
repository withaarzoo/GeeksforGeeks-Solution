class Solution:
    def formCoils(self, n: int) -> list[list[int]]:
        size = 4 * n
        m = 8 * n * n
        coil1 = [0] * m
        x = y = 0
        coil1[0] = 1
        idx = 1
        dirs = [(1,0),(0,1),(-1,0),(0,-1)]
        d = 0
        steps = size - 1
        for _ in range(steps):
            if idx >= m:
                break
            x += dirs[d][0]
            y += dirs[d][1]
            coil1[idx] = x * size + y + 1
            idx += 1
        d = (d + 1) % 4
        for k in range(size - 2, 0, -2):
            for _ in range(2):
                for _ in range(k):
                    if idx >= m:
                        break
                    x += dirs[d][0]
                    y += dirs[d][1]
                    coil1[idx] = x * size + y + 1
                    idx += 1
                d = (d + 1) % 4
        total = size * size
        coil2 = [total + 1 - v for v in coil1]
        return [coil1, coil2]