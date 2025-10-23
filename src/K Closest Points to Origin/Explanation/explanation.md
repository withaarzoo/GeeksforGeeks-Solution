# K Closest Points to Origin — README

---

## Problem Title

**K Closest Points to Origin**

---

## Table of Contents

* [Problem Summary](#problem-summary)
* [Constraints](#constraints)
* [Intuition](#intuition)
* [Approach](#approach)
* [Data Structures Used](#data-structures-used)
* [Operations & Behavior Summary](#operations--behavior-summary)
* [Complexity](#complexity)
* [Multi-language Solutions](#multi-language-solutions)

  * [C++](#c)
  * [Java](#java)
  * [JavaScript](#javascript)
  * [Python3](#python3)
  * [Go](#go)
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3, Go)](#step-by-step-detailed-explanation-c-java-javascript-python3-go)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given an integer `k` and an array of points `points[][]` where each point is represented as `points[i] = [xi, yi]` on the X-Y plane. Return the `k` closest points to the origin `(0, 0)`.

Distance used is Euclidean distance. However, we compare squared distances to avoid expensive square-roots.

---

## Constraints

* `1 ≤ k ≤ points.size() ≤ 10^5`
* `-3 * 10^4 ≤ xi, yi ≤ 3 * 10^4`
* Result can be returned in any order.
* Test cases guarantee a unique answer when required by driver code.

---

## Intuition

I thought about this like: I don't need the actual distance value (the square root). If I compare squared distances `x*x + y*y`, that is enough. I only want `k` smallest distances among `n` points. If `k` is much smaller than `n`, it is wasteful to sort the whole array. So I chose to maintain a **max-heap of size `k`**: the top stores the farthest among the current `k`. When I see a point closer than that, I replace it. This keeps memory down to `O(k)` and runs in `O(n log k)` time.

---

## Approach

1. Iterate through all points.
2. For each point compute squared distance `d = x*x + y*y`.
3. Maintain a **max-heap** keyed by `d`. Each heap entry stores the pair `(d, point)`.
4. If heap size < `k`, push `(d, point)`.
5. Else compare `d` with heap top:

   * If `d` is smaller than heap top's key, pop top and push current.
   * Otherwise do nothing (current point is not among `k` closest).
6. After processing all points, extract heap contents — these are the `k` closest points.
7. (Optional) If sorted order is required, sort the `k` results by distance (`O(k log k)`).

---

## Data Structures Used

* **Max-heap** / Priority Queue (size limited to `k`).
* Arrays / slices to store points and results.
* No additional large arrays; output stores `k` points.

---

## Operations & Behavior Summary

* `computeDistance(point)`: O(1) — compute `x*x + y*y`.
* `heapPush` / `heapPop`: O(log k) each.
* For each of `n` points we do at most one push and possibly one pop, so overall `O(n log k)`.
* Memory: heap stores at most `k` elements — `O(k)`.

---

## Complexity

* **Time Complexity:** `O(n log k)`

  * `n` is number of points.
  * Each heap operation costs `O(log k)` and we perform at most `n` pushes/pops.
* **Space Complexity:** `O(k)`

  * Extra space for the heap and the output (k points). No extra `O(n)` storage.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        // max-heap of pair<dist, index> so top is the farthest among current k
        priority_queue<pair<long long,int>> pq; // dist, idx

        for (int i = 0; i < (int)points.size(); ++i) {
            long long x = points[i][0], y = points[i][1];
            long long dist = x*x + y*y; // squared distance
            pq.push({dist, i});
            if ((int)pq.size() > k) pq.pop(); // keep only k closest
        }

        vector<vector<int>> ans;
        ans.reserve(k);
        while (!pq.empty()) {
            ans.push_back(points[pq.top().second]);
            pq.pop();
        }
        return ans; // order arbitrary
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public ArrayList<ArrayList<Integer>> kClosest(int[][] points, int k) {
        // max-heap by squared distance. store int[] {dist, x, y}
        PriorityQueue<int[]> pq = new PriorityQueue<>(new Comparator<int[]>() {
            public int compare(int[] a, int[] b) {
                return Integer.compare(b[0], a[0]); // descending by dist
            }
        });

        for (int[] p : points) {
            int x = p[0], y = p[1];
            long dLong = 1L*x*x + 1L*y*y;
            int dist = (int)dLong; // safe within constraints
            pq.offer(new int[]{dist, x, y});
            if (pq.size() > k) pq.poll();
        }

        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            ArrayList<Integer> list = new ArrayList<>();
            list.add(cur[1]); // x
            list.add(cur[2]); // y
            res.add(list);
        }
        return res; // order arbitrary
    }
}
```

### JavaScript

```javascript
/**
 * Max-heap implemented manually; keep at most k elements.
 * Each node: {dist: Number, point: [x,y]}
 */

class Solution {
    _dist2(pt) { return pt[0]*pt[0] + pt[1]*pt[1]; }

    _heapPush(heap, node) {
        heap.push(node);
        let i = heap.length - 1;
        while (i > 0) {
            let p = Math.floor((i-1)/2);
            if (heap[p].dist >= heap[i].dist) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    }

    _heapPop(heap) {
        if (heap.length === 0) return null;
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            while (true) {
                let l = 2*i + 1, r = 2*i + 2, largest = i;
                if (l < heap.length && heap[l].dist > heap[largest].dist) largest = l;
                if (r < heap.length && heap[r].dist > heap[largest].dist) largest = r;
                if (largest === i) break;
                [heap[i], heap[largest]] = [heap[largest], heap[i]];
                i = largest;
            }
        }
        return top;
    }

    kClosest(points, k) {
        const heap = [];
        for (let p of points) {
            const d = this._dist2(p);
            this._heapPush(heap, {dist: d, point: p});
            if (heap.length > k) this._heapPop(heap);
        }
        const res = [];
        while (heap.length > 0) res.push(this._heapPop(heap).point);
        return res;
    }
}
```

### Python3

```python3
import heapq

class Solution:
    def kClosest(self, points, k):
        # Use max-heap via negative distances (heapq is min-heap)
        heap = []
        for x, y in points:
            dist = x*x + y*y
            if len(heap) < k:
                heapq.heappush(heap, (-dist, x, y))
            else:
                # If current is closer than farthest (-heap[0][0] is farthest dist)
                if dist < -heap[0][0]:
                    heapq.heappushpop(heap, (-dist, x, y))

        result = []
        while heap:
            _, x, y = heapq.heappop(heap)
            result.append([x, y])
        return result  # order arbitrary
```

### Go

```go
package main

import (
 "container/heap"
)

// Pair holds squared distance and point coords
type Pair struct {
 dist int64
 x, y int
}

// MaxHeap implements heap.Interface (max-heap by dist)
type MaxHeap []Pair

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i].dist > h[j].dist } // reverse for max-heap
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(Pair)) }
func (h *MaxHeap) Pop() interface{} {
 old := *h
 n := len(old)
 x := old[n-1]
 *h = old[:n-1]
 return x
}

// kClosest returns k closest points to origin
func kClosest(points [][]int, k int) [][]int {
 h := &MaxHeap{}
 heap.Init(h)

 for _, p := range points {
  x, y := p[0], p[1]
  dist := int64(x)*int64(x) + int64(y)*int64(y)
  heap.Push(h, Pair{dist: dist, x: x, y: y})
  if h.Len() > k {
   heap.Pop(h) // remove farthest
  }
 }

 res := make([][]int, 0, h.Len())
 for h.Len() > 0 {
  p := heap.Pop(h).(Pair)
  res = append(res, []int{p.x, p.y})
 }
 return res
}
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3, Go)

I'll explain the algorithm generally, then highlight the important lines in each language. The logic is the same across languages.

### General idea (my voice)

I thought: I only need the `k` smallest distances. Keeping a fixed-size max-heap of the closest points seen so far is efficient. For each point I compute `x*x + y*y` (squared distance). If the heap hasn't reached `k`, I push it. If the heap is full and this point is closer than the heap's maximum (the current farthest of the `k`), I remove the farthest and insert this new point. After processing all points, the heap contains exactly the `k` closest points.

---

### C++ — important lines explained

```c++
// Using a priority_queue of pair<long long,int>
priority_queue<pair<long long,int>> pq;
```

* `pq` stores `(dist, index)`. Default `priority_queue` keeps largest `dist` on top.

```c++
long long dist = x*x + y*y;
pq.push({dist, i});
if ((int)pq.size() > k) pq.pop();
```

* For each point compute squared distance. Insert into heap. If size > `k`, pop largest — this ensures heap only contains `k` closest.

```c++
while (!pq.empty()) {
    ans.push_back(points[pq.top().second]);
    pq.pop();
}
```

* Extract answers. Order is arbitrary.

---

### Java — important lines explained

```java
PriorityQueue<int[]> pq = new PriorityQueue<>(new Comparator<int[]>() {
    public int compare(int[] a, int[] b) {
        return Integer.compare(b[0], a[0]); // keep largest dist on top
    }
});
```

* Custom comparator to create max-heap based on `dist`.

```java
int dist = (int)(1L*x*x + 1L*y*y);
pq.offer(new int[]{dist, x, y});
if (pq.size() > k) pq.poll();
```

* Compute squared distance (use `long` arithmetic then cast). Keep heap size `k`.

```java
while (!pq.isEmpty()) {
    int[] cur = pq.poll();
    // cur[1], cur[2] are x,y
}
```

* Extract results.

---

### JavaScript — important lines explained

I implemented a manual max-heap because JS doesn't have a built-in priority queue.

```javascript
_heapPush(heap, node) { ... }  // bubble up by comparing node.dist
_heapPop(heap) { ... }         // pop root and sift down
```

* `dist = x*x + y*y` and push `{dist, point}` to heap. Keep size ≤ `k`.

```javascript
if (heap.length > k) this._heapPop(heap);
```

* If heap grows, remove the farthest.

---

### Python3 — important lines explained

```python
# Use negative distance for max-heap behavior with heapq
if len(heap) < k:
    heapq.heappush(heap, (-dist, x, y))
else:
    if dist < -heap[0][0]:
        heapq.heappushpop(heap, (-dist, x, y))
```

* Use `(-dist, x, y)` so the smallest negative (i.e. largest positive) is at top — simulates a max-heap.
* `heappushpop` is efficient (push then pop) when replacement needed.

---

### Go — important lines explained

```go
type MaxHeap []Pair
func (h MaxHeap) Less(i, j int) bool { return h[i].dist > h[j].dist } // max-heap
```

* Use `container/heap` with `Less` reversed to create max-heap.

```go
heap.Push(h, Pair{dist: dist, x: x, y: y})
if h.Len() > k {
    heap.Pop(h)
}
```

* Same push/pop logic.

---

## Examples

**Example 1**

```
Input: k = 2, points = [[1,3],[-2,2],[5,8],[0,1]]
Output: [[-2,2],[0,1]]
Explanation: squared distances = [10,8,89,1]. Two smallest are 1 and 8.
```

**Example 2**

```
Input: k = 1, points = [[2,4],[-1,-1],[0,0]]
Output: [[0,0]]
Explanation: squared distances = [20,2,0]. smallest is 0.
```

---

## How to use / Run locally

* **C++**

  * Compile and run with your favorite method. E.g.

    ```bash
    g++ -std=c++17 solution.cpp -O2 -o sol
    ./sol
    ```

  * Integrate the `Solution` class into your driver code / main as required.

* **Java**

  * Add `Solution` class to a `.java` file and call `kClosest` from `main`.
  * Compile & run:

    ```bash
    javac Solution.java
    java Solution
    ```

* **JavaScript**

  * Use Node.js. Put code in `solution.js`, create a driver to call `new Solution().kClosest(points, k)`.

    ```bash
    node solution.js
    ```

* **Python3**

  * Place code in `solution.py` and call the method from a driver:

    ```bash
    python3 solution.py
    ```

* **Go**

  * Place `kClosest` function in a `.go` file, call it from `main`.

    ```bash
    go run main.go
    ```

---

## Notes & Optimizations

* I use squared distances to avoid `sqrt`.
* Heap solution gives `O(n log k)` which is ideal when `k << n`.
* If you need the `k` points **sorted by increasing distance**, sort the final `k` elements by distance: add `O(k log k)`.
* There is a Quickselect (selection) approach that achieves average-case `O(n)` time and `O(1)` extra space (in-place), but it is more complex and less stable; I can provide that if you want.
* Use `long` / `int64` when squaring coordinates to avoid overflow in languages where `int` is 32-bit — with constraints here `xi^2 + yi^2` fits in 64-bit.

---

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
