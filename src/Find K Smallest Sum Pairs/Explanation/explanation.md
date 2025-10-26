# Find K Smallest Sum Pairs

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
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given two integer arrays `arr1[]` and `arr2[]` sorted in ascending order and an integer `k`, return the `k` pairs `(arr1[i], arr2[j])` with the smallest sums. Each pair should be returned as a 2-element list/array. You can return pairs in any order; the driver will check correctness by comparing sums.

---

## Constraints

* `1 ≤ arr1.size(), arr2.size() ≤ 5 * 10^4` (practical limits — in worst cases the algorithm must avoid O(n1 * n2))
* `1 ≤ arr1[i], arr2[j] ≤ 10^9`
* `1 ≤ k ≤ 10^3` (k may be much smaller than n1*n2)
* Both input arrays are sorted in ascending order.

---

## Intuition

I noticed both arrays are already sorted. For a fixed `i`, the sequence of sums `arr1[i] + arr2[0], arr1[i] + arr2[1], arr1[i] + arr2[2], ...` is sorted (non-decreasing) because `arr2` is sorted. That lets me treat each `i` as a sorted list of candidate sums. If I merge these `n1` sorted lists using a min-heap and only expand the smallest candidate as needed, I can get the `k` smallest pairs without generating all `n1 * n2` sums.

---

## Approach

1. Handle edge cases: if either array is empty or `k == 0`, return an empty result.
2. Use a min-heap (priority queue) where each entry stores `(sum, i, j)` corresponding to `arr1[i] + arr2[j]`.
3. Initialize the heap with the first element of each row: `(arr1[i] + arr2[0], i, 0)` for `i = 0 .. min(n1-1, k-1)`. We only need up to `k` rows.
4. Pop the smallest sum from the heap and add `(arr1[i], arr2[j])` to the answer.
5. When popping `(i, j)`, if `j + 1 < n2`, push `(arr1[i] + arr2[j+1], i, j+1)` into the heap — this extends that `i`-row to the next `arr2` element.
6. Repeat steps 4–5 until you collected `k` pairs or the heap is empty.

---

## Data Structures Used

* **Min-Heap (Priority Queue):** stores candidate pairs `(sum, i, j)`. Keeps retrieval of the smallest candidate O(log h) where `h` is heap size.
* **Result list/array:** stores up to `k` pairs.

---

## Operations & Behavior Summary

* Initialize heap with up to `min(n1, k)` nodes from `arr1[*] + arr2[0]`.
* Each extracted node yields one output pair and may push its next neighbor `(i, j+1)`.
* The heap size is bounded by `min(n1, k)` because we push at most one element per `i` at a time and we only start `min(n1,k)` rows.

---

## Complexity

* **Time Complexity:** `O(k log min(n1, k))`

  * `n1 = len(arr1), n2 = len(arr2)`. We perform at most `k` pops and up to `k` pushes. Heap operations cost `O(log heap_size)`, and `heap_size ≤ min(n1, k)`.
* **Space Complexity:** `O(min(n1, k))` (heap) + `O(k)` (output).

  * We never store all `n1*n2` sums.

---

## Multi-language Solutions

Below are efficient, well-commented implementations in C++, Java, JavaScript, and Python3.

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

/*
 Find k pairs with smallest sums from two sorted arrays.
 Returns vector of pairs: each pair is {arr1[i], arr2[j]}.
 Time: O(k log min(n1, k)), Space: O(min(n1,k))
*/
class Solution {
  public:
    vector<vector<int>> kSmallestPair(vector<int> &arr1, vector<int> &arr2, int k) {
        vector<vector<int>> res;
        int n1 = arr1.size(), n2 = arr2.size();
        if (n1 == 0 || n2 == 0 || k == 0) return res;

        // Min-heap storing tuples (sum, i, j)
        using T = tuple<long long,int,int>;
        priority_queue<T, vector<T>, greater<T>> pq;

        // Only need first min(n1, k) rows
        int limit = min(n1, k);
        for (int i = 0; i < limit; ++i) {
            pq.emplace((long long)arr1[i] + arr2[0], i, 0);
        }

        while (!pq.empty() && (int)res.size() < k) {
            auto [sum, i, j] = pq.top(); pq.pop();
            res.push_back({arr1[i], arr2[j]});
            if (j + 1 < n2) {
                pq.emplace((long long)arr1[i] + arr2[j+1], i, j+1);
            }
        }
        return res;
    }
};
```

---

### Java

```java
import java.util.*;

/*
 Find k pairs with smallest sums from two sorted arrays.
 Returns ArrayList of ArrayList<Integer>, each inner list is size 2: [arr1[i], arr2[j]]
 Time: O(k log min(n1, k)), Space: O(min(n1,k))
*/
class Solution {
    public ArrayList<ArrayList<Integer>> kSmallestPair(int[] arr1, int[] arr2, int k) {
        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        int n1 = arr1.length, n2 = arr2.length;
        if (n1 == 0 || n2 == 0 || k == 0) return res;

        // Node holds (sum, i, j)
        class Node {
            long sum; int i, j;
            Node(long s, int a, int b) { sum = s; i = a; j = b; }
        }

        PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingLong(n -> n.sum));
        int limit = Math.min(n1, k);

        for (int i = 0; i < limit; ++i) {
            pq.offer(new Node((long)arr1[i] + arr2[0], i, 0));
        }

        while (!pq.isEmpty() && res.size() < k) {
            Node cur = pq.poll();
            ArrayList<Integer> pair = new ArrayList<>();
            pair.add(arr1[cur.i]);
            pair.add(arr2[cur.j]);
            res.add(pair);
            if (cur.j + 1 < n2) {
                pq.offer(new Node((long)arr1[cur.i] + arr2[cur.j + 1], cur.i, cur.j + 1));
            }
        }
        return res;
    }
}
```

---

### JavaScript

```javascript
/*
 Find k pairs with smallest sums from two sorted arrays.
 Returns array of pairs: [[a,b], ...]
 Time: O(k log min(n1, k)), Space: O(min(n1,k))
*/
class Solution {
    kSmallestPair(arr1, arr2, k) {
        const res = [];
        const n1 = arr1.length, n2 = arr2.length;
        if (n1 === 0 || n2 === 0 || k === 0) return res;

        // Minimal binary heap implementation storing [sum, i, j]
        class MinHeap {
            constructor() { this.data = []; }
            size() { return this.data.length; }
            push(item) {
                this.data.push(item);
                let i = this.data.length - 1;
                while (i > 0) {
                    let p = Math.floor((i - 1) / 2);
                    if (this.data[p][0] <= this.data[i][0]) break;
                    [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
                    i = p;
                }
            }
            pop() {
                if (!this.data.length) return null;
                const ans = this.data[0];
                const last = this.data.pop();
                if (this.data.length) {
                    this.data[0] = last;
                    let i = 0;
                    while (true) {
                        let l = 2*i + 1, r = 2*i + 2, smallest = i;
                        if (l < this.data.length && this.data[l][0] < this.data[smallest][0]) smallest = l;
                        if (r < this.data.length && this.data[r][0] < this.data[smallest][0]) smallest = r;
                        if (smallest === i) break;
                        [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
                        i = smallest;
                    }
                }
                return ans;
            }
        }

        const heap = new MinHeap();
        const limit = Math.min(n1, k);
        for (let i = 0; i < limit; ++i) {
            heap.push([arr1[i] + arr2[0], i, 0]);
        }

        while (heap.size() && res.length < k) {
            const [sum, i, j] = heap.pop();
            res.push([arr1[i], arr2[j]]);
            if (j + 1 < n2) {
                heap.push([arr1[i] + arr2[j+1], i, j+1]);
            }
        }
        return res;
    }
}
```

---

### Python3

```python
import heapq

class Solution:
    def kSmallestPair(self, arr1, arr2, k):
        """
        Return list of pairs [a,b] with smallest sums.
        Time: O(k log min(n1,k)), Space: O(min(n1,k))
        """
        res = []
        n1, n2 = len(arr1), len(arr2)
        if n1 == 0 or n2 == 0 or k == 0:
            return res

        heap = []
        limit = min(n1, k)
        for i in range(limit):
            heapq.heappush(heap, (arr1[i] + arr2[0], i, 0))

        while heap and len(res) < k:
            s, i, j = heapq.heappop(heap)
            res.append([arr1[i], arr2[j]])
            if j + 1 < n2:
                heapq.heappush(heap, (arr1[i] + arr2[j+1], i, j+1))
        return res
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I’ll explain the algorithm and the important lines in each version. The logic is the same across languages; only syntax differs.

### 1. Edge-case handling

* If either array is empty or `k == 0`, return `[]` (or appropriate empty container).

  * Why: There are no valid pairs.

### 2. Heap initialization

* I push `(arr1[i] + arr2[0], i, 0)` into the min-heap for `i = 0..min(n1-1, k-1)`.

  * Reason: For each `i`, the smallest possible pair that uses `arr1[i]` is with `arr2[0]`. Starting with `min(n1,k)` rows is enough because we will extract at most `k` pairs; there is no need to initialize more rows than `k`.

### 3. Main loop — pop and extend

* While result size < `k` and heap not empty:

  1. Pop `(sum, i, j)` — this is the globally smallest available pair.
  2. Append `[arr1[i], arr2[j]]` to the result.
  3. If `j + 1 < n2`, push `(arr1[i] + arr2[j+1], i, j+1)` — the next candidate using the same `arr1[i]`.

  * Reason: Since `arr2` is sorted, the next smallest pair that includes `arr1[i]` must be with the next element of `arr2`.

### 4. Termination

* Stop after `k` pairs are collected or when no more pairs can be produced (heap empty).

  * Correctness follows from the fact I'm effectively merging `n1` sorted streams: for each `i`, the stream is `arr1[i] + arr2[0], arr1[i] + arr2[1], ...`. Merging via a heap yields the global order of smallest sums.

---

## Examples

1. Example 1:

   * Input: `arr1 = [1, 7, 11]`, `arr2 = [2, 4, 6]`, `k = 3`
   * Output (one valid answer): `[[1,2], [1,4], [1,6]]`
   * Explanation: smallest sums are 3, 5, 7.

2. Example 2:

   * Input: `arr1 = [1, 3]`, `arr2 = [2, 4]`, `k = 2`
   * Output (one valid answer): `[[1,2], [3,2]]`
   * Explanation: all pairs are [1,2],[1,4],[3,2],[3,4]; smallest sums: 3,5.

---

## How to use / Run locally

### C++

1. Put the `Solution` class into a `.cpp` file and add a `main()` driver that reads inputs and calls `kSmallestPair`.
2. Compile with: `g++ -std=c++17 -O2 -o kpairs solution.cpp`
3. Run: `./kpairs`

### Java

1. Save `Solution` in `Solution.java` with a `main` method that reads input and calls `kSmallestPair`.
2. Compile: `javac Solution.java`
3. Run: `java Solution`

### JavaScript (Node.js)

1. Save the class in `solution.js` and add a small driver that instantiates `Solution` and calls `kSmallestPair`.
2. Run: `node solution.js`

### Python3

1. Save the solution in `solution.py` and add a `if __name__ == "__main__":` block to read input and test the function.
2. Run: `python3 solution.py`

---

## Notes & Optimizations

* The key optimization is **never enumerating all n1 * n2 pairs**. We expand only the pairs that could be in the `k` smallest using a priority queue.
* Initializing only `min(n1, k)` rows reduces memory and time overhead.
* If `k` is very large (close to `n1*n2`) then this algorithm will naturally approach enumerating many pairs; but within typical contest constraints (k small relative to arrays), this approach is optimal.
* For extremely large input sizes and very small memory budgets, consider streaming results or using specialized external memory structures — but that is rarely required in typical contest problems.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
