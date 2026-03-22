# Problem Title

Rotten Oranges

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions
* Step-by-step Detailed Explanation
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

## Problem Summary

Given a 2D grid where each cell can have values:

* 0: Empty cell
* 1: Fresh orange
* 2: Rotten orange

Every minute, a rotten orange spreads rot to its adjacent fresh oranges (up, down, left, right).

The goal is to find the minimum time required so that all oranges become rotten. If it is not possible, return -1.

## Constraints

* 1 ≤ rows, cols ≤ 500
* Each cell contains 0, 1, or 2

## Intuition

I noticed that the rot spreads level by level from all rotten oranges at the same time. This is similar to a Breadth First Search (BFS).

So I thought of treating all rotten oranges as starting points and spreading the rot simultaneously. Each level of BFS represents one unit of time.

## Approach

1. Traverse the grid.
2. Store all rotten oranges in a queue.
3. Count total fresh oranges.
4. Perform BFS from all rotten oranges.
5. For each level (minute):

   * Spread rot to adjacent fresh oranges.
   * Decrease fresh count.
6. If all fresh oranges are rotten, return time.
7. Otherwise, return -1.

## Data Structures Used

* Queue (for BFS traversal)
* Grid (input matrix)

## Operations & Behavior Summary

* Multi-source BFS is used.
* Each BFS level represents 1 minute.
* Rot spreads in 4 directions.
* Fresh oranges are converted to rotten.

## Complexity

* Time Complexity: O(n × m)
* Space Complexity: O(n × m)

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    int orangesRot(vector<vector<int>>& mat) {
        int n = mat.size(), m = mat[0].size();
        queue<pair<int,int>> q;
        int fresh = 0;

        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(mat[i][j]==2) q.push({i,j});
                if(mat[i][j]==1) fresh++;
            }
        }

        vector<int> dx = {-1,1,0,0};
        vector<int> dy = {0,0,-1,1};

        int time = 0;

        while(!q.empty() && fresh>0){
            int size = q.size();
            time++;
            while(size--){
                auto [x,y] = q.front(); q.pop();
                for(int d=0;d<4;d++){
                    int nx = x + dx[d];
                    int ny = y + dy[d];
                    if(nx>=0 && ny>=0 && nx<n && ny<m && mat[nx][ny]==1){
                        mat[nx][ny]=2;
                        q.push({nx,ny});
                        fresh--;
                    }
                }
            }
        }
        return fresh==0 ? time : -1;
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public int orangesRot(int[][] mat) {
        int n = mat.length, m = mat[0].length;
        Queue<int[]> q = new LinkedList<>();
        int fresh = 0;

        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(mat[i][j]==2) q.offer(new int[]{i,j});
                if(mat[i][j]==1) fresh++;
            }
        }

        int[] dx = {-1,1,0,0};
        int[] dy = {0,0,-1,1};
        int time = 0;

        while(!q.isEmpty() && fresh>0){
            int size = q.size();
            time++;
            while(size--){
                int[] cur = q.poll();
                int x = cur[0], y = cur[1];
                for(int d=0;d<4;d++){
                    int nx = x + dx[d];
                    int ny = y + dy[d];
                    if(nx>=0 && ny>=0 && nx<n && ny<m && mat[nx][ny]==1){
                        mat[nx][ny]=2;
                        q.offer(new int[]{nx,ny});
                        fresh--;
                    }
                }
            }
        }
        return fresh==0 ? time : -1;
    }
}
```

### JavaScript

```javascript
class Solution {
    orangesRot(mat) {
        let n = mat.length, m = mat[0].length;
        let q = [];
        let fresh = 0;

        for(let i=0;i<n;i++){
            for(let j=0;j<m;j++){
                if(mat[i][j]===2) q.push([i,j]);
                if(mat[i][j]===1) fresh++;
            }
        }

        let dirs = [[-1,0],[1,0],[0,-1],[0,1]];
        let time = 0;

        while(q.length && fresh>0){
            let size = q.length;
            time++;
            while(size--){
                let [x,y] = q.shift();
                for(let [dx,dy] of dirs){
                    let nx = x+dx, ny = y+dy;
                    if(nx>=0 && ny>=0 && nx<n && ny<m && mat[nx][ny]===1){
                        mat[nx][ny]=2;
                        q.push([nx,ny]);
                        fresh--;
                    }
                }
            }
        }
        return fresh===0 ? time : -1;
    }
}
```

### Python3

```python
from collections import deque

class Solution:
    def orangesRot(self, mat):
        n, m = len(mat), len(mat[0])
        q = deque()
        fresh = 0

        for i in range(n):
            for j in range(m):
                if mat[i][j] == 2:
                    q.append((i,j))
                elif mat[i][j] == 1:
                    fresh += 1

        directions = [(-1,0),(1,0),(0,-1),(0,1)]
        time = 0

        while q and fresh > 0:
            for _ in range(len(q)):
                x, y = q.popleft()
                for dx, dy in directions:
                    nx, ny = x+dx, y+dy
                    if 0 <= nx < n and 0 <= ny < m and mat[nx][ny] == 1:
                        mat[nx][ny] = 2
                        q.append((nx,ny))
                        fresh -= 1
            time += 1

        return time if fresh == 0 else -1
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Initialize queue and count fresh oranges.
2. Push all rotten oranges into queue.
3. Start BFS traversal.
4. For each level, increase time.
5. Spread rot to adjacent cells.
6. Convert fresh to rotten and decrease count.
7. Repeat until queue is empty or no fresh remains.
8. Return result based on fresh count.

## Examples

Input:
[[2,1,0,2,1],[1,0,1,2,1],[1,0,0,2,1]]
Output: 2

Input:
[[2,1,0,2,1],[0,0,1,2,1],[1,0,0,2,1]]
Output: -1

## How to use / Run locally

* Copy the code into your preferred language environment.
* Compile and run using standard compiler/interpreter.
* Provide input matrix and call the function.

## Notes & Optimizations

* Multi-source BFS ensures optimal time.
* Avoid repeated visits by marking cells immediately.
* Queue ensures level-order traversal.

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
