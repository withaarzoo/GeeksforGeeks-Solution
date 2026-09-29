# Min Steps by Knight | Minimum Knight Moves on Chessboard using BFS

## Table of Contents
- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations & Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
  - [C++](#c)
  - [Java](#java)
  - [JavaScript](#javascript)
  - [Python3](#python3)
- [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

## Problem Summary

You are given an n by n chessboard. A knight starts at position knightPos and needs to reach targetPos. Your task is to find the minimum number of moves the knight needs to reach the target.

A knight always moves in an L-shape: two steps in one direction and then one step perpendicular, or one step in one direction and then two steps perpendicular. From any cell (x, y) the possible moves are (x ± 2, y ± 1) and (x ± 1, y ± 2).

Positions are given using 1-based indexing. The function should return the smallest number of knight moves required.

This is a classic shortest-path problem on a grid and is commonly asked in coding interviews and on platforms like GeeksforGeeks under the name “Min Steps by Knight”.

## Constraints

- 1 ≤ n ≤ 1000
- knightPos and targetPos each contain exactly 2 integers
- 1 ≤ knightPos[i], targetPos[i] ≤ n

## Intuition

The first thing that comes to mind is that every move of the knight has the same cost. When all edges have equal weight, the fastest way to find the shortest path is Breadth-First Search (BFS).

If I model every square of the board as a node and every valid knight move as an edge, then BFS will visit cells level by level. The first time the target cell is reached, that level number is exactly the minimum number of moves.

Because the board can be as large as 1000 × 1000, I also need to make sure I never visit the same cell twice; otherwise the search would explode.

## Approach

1. Convert the given 1-based positions to 0-based so they work cleanly with arrays.
2. If the start and target are the same cell, return 0 immediately.
3. Create a 2-D visited matrix of size n × n and mark the starting cell as visited.
4. Put the starting cell into a queue together with step count 0.
5. While the queue is not empty:
   - Take the front cell and its current step count.
   - Try all eight possible knight moves.
   - For each new position, check that it lies inside the board and has not been visited yet.
   - If the new position is the target, return current steps + 1.
   - Otherwise mark it visited and push it into the queue with the increased step count.
6. If the queue empties without finding the target, return -1 (this case does not occur on a normal empty board).

This BFS approach guarantees the minimum knight moves because it explores the board in increasing order of distance from the start.

## Data Structures Used

- Queue – stores cells that still need to be processed along with the number of moves taken to reach them. BFS needs a FIFO structure, so a queue is the natural choice.
- 2-D Boolean visited matrix – prevents revisiting the same cell and keeps the time complexity linear in the number of cells.
- Two small arrays (or lists) of size 8 – hold the eight possible knight move offsets. They make the code short and easy to read.

## Operations & Behavior Summary

- Convert positions from 1-based to 0-based.
- Early exit when start equals target.
- Initialize visited matrix and enqueue the start cell with 0 steps.
- Repeatedly dequeue a cell.
- Generate all eight possible next positions.
- Skip any position that is outside the board or already visited.
- If a generated position matches the target, return the recorded steps plus one.
- Otherwise mark the new cell visited and enqueue it with steps + 1.
- Continue until the queue is empty.

The algorithm never explores a cell more than once and always processes cells in order of increasing distance, so the first time the target appears is the optimal answer.

## Complexity

| Complexity       | Value   | Explanation                                                                 |
|------------------|---------|-----------------------------------------------------------------------------|
| Time Complexity  | O(n²)   | In the worst case every cell on the n × n board is visited exactly once. Each cell generates a constant number of moves. |
| Space Complexity | O(n²)   | The visited matrix needs n² space. The queue can also hold up to O(n²) cells in the worst case. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int minStepToReachTarget(vector<int>& knightPos, vector<int>& targetPos, int n) {
        int sx = knightPos[0] - 1, sy = knightPos[1] - 1;
        int tx = targetPos[0] - 1, ty = targetPos[1] - 1;
        if (sx == tx && sy == ty) return 0;
        vector<vector<bool>> vis(n, vector<bool>(n, false));
        queue<pair<pair<int,int>,int>> q;
        q.push({{sx, sy}, 0});
        vis[sx][sy] = true;
        int dx[] = {-2, -2, -1, -1, 1, 1, 2, 2};
        int dy[] = {-1, 1, -2, 2, -2, 2, -1, 1};
        while (!q.empty()) {
            auto cur = q.front(); q.pop();
            int x = cur.first.first, y = cur.first.second, steps = cur.second;
            for (int i = 0; i < 8; i++) {
                int nx = x + dx[i], ny = y + dy[i];
                if (nx >= 0 && nx < n && ny >= 0 && ny < n && !vis[nx][ny]) {
                    if (nx == tx && ny == ty) return steps + 1;
                    vis[nx][ny] = true;
                    q.push({{nx, ny}, steps + 1});
                }
            }
        }
        return -1;
    }
};
```

### Java
```java
class Solution {
    public int minStepToReachTarget(int knightPos[], int targetPos[], int n) {
        int sx = knightPos[0] - 1, sy = knightPos[1] - 1;
        int tx = targetPos[0] - 1, ty = targetPos[1] - 1;
        if (sx == tx && sy == ty) return 0;
        boolean[][] vis = new boolean[n][n];
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{sx, sy, 0});
        vis[sx][sy] = true;
        int[] dx = {-2, -2, -1, -1, 1, 1, 2, 2};
        int[] dy = {-1, 1, -2, 2, -2, 2, -1, 1};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int x = cur[0], y = cur[1], steps = cur[2];
            for (int i = 0; i < 8; i++) {
                int nx = x + dx[i], ny = y + dy[i];
                if (nx >= 0 && nx < n && ny >= 0 && ny < n && !vis[nx][ny]) {
                    if (nx == tx && ny == ty) return steps + 1;
                    vis[nx][ny] = true;
                    q.offer(new int[]{nx, ny, steps + 1});
                }
            }
        }
        return -1;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} knightPos
 * @param {number[]} targetPos
 * @param {number} n
 * @returns {number}
 */

class Solution {
    minStepToReachTarget(knightPos, targetPos, n) {
        let sx = knightPos[0] - 1, sy = knightPos[1] - 1;
        let tx = targetPos[0] - 1, ty = targetPos[1] - 1;
        if (sx === tx && sy === ty) return 0;
        let vis = Array.from({length: n}, () => Array(n).fill(false));
        let q = [[sx, sy, 0]];
        vis[sx][sy] = true;
        let dx = [-2, -2, -1, -1, 1, 1, 2, 2];
        let dy = [-1, 1, -2, 2, -2, 2, -1, 1];
        while (q.length > 0) {
            let [x, y, steps] = q.shift();
            for (let i = 0; i < 8; i++) {
                let nx = x + dx[i], ny = y + dy[i];
                if (nx >= 0 && nx < n && ny >= 0 && ny < n && !vis[nx][ny]) {
                    if (nx === tx && ny === ty) return steps + 1;
                    vis[nx][ny] = true;
                    q.push([nx, ny, steps + 1]);
                }
            }
        }
        return -1;
    }
}
```

### Python3
```python
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
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four implementations follow the same logic; only the syntax differs.

First the 1-based coordinates are turned into 0-based coordinates. This makes array indexing simple and consistent across languages.

A quick check is performed: if the knight is already sitting on the target, zero moves are needed and the function returns immediately.

A 2-D visited structure is created (vector of vectors in C++, 2-D boolean array in Java, 2-D array in JavaScript, list of lists in Python). Every cell starts as unvisited.

The starting cell is pushed into the queue together with step count 0 and is marked visited right away. Marking it before enqueueing avoids any accidental re-processing.

The eight knight offsets are stored in two fixed-size arrays. For every cell taken from the queue the code loops over these eight offsets, calculates the new coordinates, and checks three conditions:

- the new row is between 0 and n-1
- the new column is between 0 and n-1
- the cell has never been visited

If all three conditions hold and the new cell is the target, the function returns the current steps plus one. That is the minimum number of moves because BFS explores level by level.

If the new cell is valid but not the target, it is marked visited and pushed into the queue with the increased step count.

Because a cell is marked visited the moment it is discovered, the same cell is never enqueued twice. This keeps both time and space under control even when n is 1000.

The four languages differ only in how the queue and the 2-D array are declared; the control flow and the reasoning stay identical.

## Examples

Example 1  
Input: n = 3, knightPos = [3, 3], targetPos = [1, 2]  
Output: 1  

The knight stands at (3,3). One of its eight possible moves lands directly on (1,2). BFS discovers this move at distance 1 and returns immediately.

Example 2  
Input: n = 6, knightPos = [1, 3], targetPos = [5, 1]  
Output: 2  

Start at (1,3). From there the knight can reach (3,2) in one move. From (3,2) it can reach (5,1) in the next move. BFS finds this path of length 2 before any longer path, so the answer is 2.

Example 3  
Input: n = 1, knightPos = [1, 1], targetPos = [1, 1]  
Output: 0  

Start and target are the same cell, so the early-exit check returns 0 without running BFS.

## How to Use / Run Locally

C++  
1. Save the code in a file named `main.cpp`.  
2. Compile: `g++ -o main main.cpp`  
3. Run: `./main`  
You will need a small driver that reads n, knightPos and targetPos and prints the returned value.

Java  
1. Save the code inside a class file `Solution.java`.  
2. Compile: `javac Solution.java`  
3. Run with a driver class that creates a Solution object and calls the method.

JavaScript  
1. Save the code in `solution.js`.  
2. Run with Node: `node solution.js`  
Add a few console.log statements that call the method with sample inputs.

Python3  
1. Save the code in `solution.py`.  
2. Run: `python3 solution.py`  
Create a Solution object and print the result of a few test calls.

In every language you can also paste the class into an online judge or IDE that already supplies the driver code.

## Notes & Optimizations

- When start equals target the answer is always 0; the early check avoids unnecessary work.
- On boards smaller than 3 × 3 some positions are unreachable, but the given constraints guarantee n is large enough for a knight to move freely.
- A bidirectional BFS (searching from both start and target at the same time) can reduce the practical running time on large boards, but ordinary BFS is already optimal in asymptotic complexity and is simpler to implement.
- Using a set instead of a 2-D boolean matrix works correctly but is slower and uses more memory; the matrix is the better choice for dense grids.
- The same idea can be applied to any piece that moves with fixed offsets (for example a limited king or a fairy chess piece).

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)