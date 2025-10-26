# Minimum Cost of Ropes

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

Given an array `arr[]` of rope lengths, I need to connect all ropes into one rope such that the **total cost** is minimized. The cost to connect two ropes is equal to the sum of their lengths. I can connect ropes in any order; the final goal is to find the minimum possible total cost to join them all.

Example:

* Input: `[4, 3, 2, 6]`
* Output: `29`

---

## Constraints

* `1 ≤ arr.size() ≤ 10^5`
* `1 ≤ arr[i] ≤ 10^4`
  (Constraints show `n` can be large so the solution must be efficient in time and memory.)

---

## Intuition

I thought about what increases the total cost most. Whenever I connect two ropes, their sum may get connected later again — so it’s best to keep intermediate sums as small as possible. That leads me to a greedy idea: **always connect the two smallest ropes available**. By repeating this, the contributions of large values to repeated sums are minimized. A min-heap (priority queue) lets me pick the two smallest ropes quickly each step.

---

## Approach

1. If there are 0 or 1 ropes, return 0 (no connections needed).
2. Insert all rope lengths into a min-heap.
3. While heap size > 1:

   * Pop the two smallest elements `a` and `b`.
   * Sum `s = a + b`. Add `s` to the running `total_cost`.
   * Push `s` back into the heap (the combined rope).
4. Return `total_cost` when only one rope remains.

This is greedy and optimal — connecting smallest first prevents large repeated sums later.

---

## Data Structures Used

* **Min-Heap / Priority Queue** — to repeatedly extract the two smallest rope lengths in `O(log n)` time for each operation.

---

## Operations & Behavior Summary

* `heapify(arr)` or pushing each element: build initial heap — `O(n)` or `O(n log n)` depending on method.
* `pop` twice and `push` once per merge operation — repeated `n-1` times.
* Each merge adds a combined rope back into heap until one rope remains.

---

## Complexity

* **Time Complexity:** `O(n log n)` where `n` is the number of ropes.

  * Reason: Each of the `n-1` merges involves two pops and one push (`O(log n)` each).
* **Space Complexity:** `O(n)` for the heap storing rope lengths.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    // Returns minimum cost to connect all ropes in arr
    long long minCost(vector<int>& arr) {
        if (arr.size() <= 1) return 0;          // nothing to connect

        // Min-heap: smallest at top
        priority_queue<long long, vector<long long>, greater<long long>> pq;
        for (int x : arr) pq.push(x);

        long long total = 0;
        while (pq.size() > 1) {
            long long a = pq.top(); pq.pop();
            long long b = pq.top(); pq.pop();
            long long s = a + b;
            total += s;    // cost of connecting a and b
            pq.push(s);    // push combined rope back
        }
        return total;
    }
};
```

### Java

```java
import java.util.PriorityQueue;

class Solution {
    // Returns minimum cost to connect all ropes in arr
    public static long minCost(int[] arr) {
        if (arr == null || arr.length <= 1) return 0L;
        PriorityQueue<Long> pq = new PriorityQueue<>();
        for (int x : arr) pq.add((long)x);

        long total = 0L;
        while (pq.size() > 1) {
            long a = pq.poll();
            long b = pq.poll();
            long s = a + b;
            total += s;
            pq.add(s);
        }
        return total;
    }
}
```

### JavaScript

```javascript
// Simple binary min-heap implementation
class MinHeap {
  constructor() { this.a = []; }
  size() { return this.a.length; }
  push(val) {
    this.a.push(val);
    let i = this.a.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.a[p] <= this.a[i]) break;
      [this.a[p], this.a[i]] = [this.a[i], this.a[p]];
      i = p;
    }
  }
  pop() {
    if (this.a.length === 0) return null;
    if (this.a.length === 1) return this.a.pop();
    const res = this.a[0];
    this.a[0] = this.a.pop();
    let i = 0;
    while (true) {
      const l = 2*i + 1, r = 2*i + 2;
      let smallest = i;
      if (l < this.a.length && this.a[l] < this.a[smallest]) smallest = l;
      if (r < this.a.length && this.a[r] < this.a[smallest]) smallest = r;
      if (smallest === i) break;
      [this.a[i], this.a[smallest]] = [this.a[smallest], this.a[i]];
      i = smallest;
    }
    return res;
  }
}

class Solution {
  // arr is array of numbers
  minCost(arr) {
    if (!arr || arr.length <= 1) return 0;
    const heap = new MinHeap();
    for (const x of arr) heap.push(x);
    let total = 0;
    while (heap.size() > 1) {
      const a = heap.pop();
      const b = heap.pop();
      const s = a + b;
      total += s;
      heap.push(s);
    }
    return total;
  }
}
```

### Python3

```python
import heapq

class Solution:
   def minCost(self, arr):
       # If 0 or 1 ropes, cost is 0
       if not arr or len(arr) <= 1:
           return 0

       # Convert list into a min-heap in-place
       heapq.heapify(arr)

       total = 0
       while len(arr) > 1:
           a = heapq.heappop(arr)
           b = heapq.heappop(arr)
           s = a + b
           total += s
           heapq.heappush(arr, s)

       return total
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain the shared logic as if I'm teaching a friend and showing how each code maps to the idea.

### 1. Handle trivial cases

* `if arr.size() <= 1 return 0;`
  If there are no ropes or only one rope, I don't need to connect anything so cost is `0`.

### 2. Build a min-heap (priority queue)

* **C++:** `priority_queue<long long, vector<long long>, greater<long long>> pq;`

  * This keeps smallest element at top.
* **Java:** `PriorityQueue<Long> pq = new PriorityQueue<>();`
* **Python:** `heapq.heapify(arr)` converts the list into a min-heap in-place.
* **JS:** I implemented `MinHeap` with `push` and `pop` (binary heap).

Why a min-heap? Because I need to repeatedly extract the **two smallest ropes** quickly.

### 3. Merge loop

* While heap has at least two elements:

  * Pop the two smallest values `a` and `b`.
  * `s = a + b` is the cost to connect them now.
  * Add `s` to `total`.
  * Push `s` back to heap because this combined rope may be connected again.
* Repeat until one rope remains.

This logic ensures we always combine small ropes first (greedy), keeping intermediate sums small and minimizing the final total.

### 4. Return the accumulated `total`

* `total` is of type `long` / `long long` in typed languages to avoid overflow (the total cost can grow beyond 32-bit int).

---

## Examples

1. Example 1
   Input: `[4, 3, 2, 6]`
   Process:

   * Pop 2 and 3 => sum 5 (total 5) => push 5; heap now `[4,5,6]`
   * Pop 4 and 5 => sum 9 (total 14) => push 9; heap now `[6,9]`
   * Pop 6 and 9 => sum 15 (total 29) => push 15; heap now `[15]`
     Output: `29`

2. Example 2
   Input: `[10]` => Only one rope, output `0`.

3. Example 3
   Input: `[4, 2, 7, 6, 9]`
   Output: `62` (see original problem example trace)

---

## How to use / Run locally

### C++

* Compile: `g++ -std=c++17 -O2 solution.cpp -o solution`
* Run: `./solution` (if you add a `main` to read input and call `minCost`)

### Java

* Save as `Solution.java` (with a `main` wrapper that calls `minCost`)
* Compile: `javac Solution.java`
* Run: `java Solution`

### JavaScript (Node)

* Save file `solution.js` and include a small runner to read input and call `new Solution().minCost([...])`.
* Run: `node solution.js`

### Python3

* Save as `solution.py` with a `main` / test block:

```python
if __name__ == "__main__":
    arr = [4,3,2,6]
    print(Solution().minCost(arr))  # prints 29
```

* Run: `python3 solution.py`

---

## Notes & Optimizations

* Using a built-in priority queue (C++ `priority_queue` with comparator, Java `PriorityQueue`, Python `heapq`) yields efficient `O(log n)` operations. For JavaScript, I implemented a binary heap because JS lacks a native priority queue.
* Use `long` / `long long` for accumulated total to prevent overflow when `n` and `arr[i]` are large.
* Memory is minimal: we only store the heap (no extra arrays).
* This greedy strategy is provably optimal via an exchange argument: at any step, combining the two smallest cannot make an optimal solution worse and ensures minimal future additions.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
