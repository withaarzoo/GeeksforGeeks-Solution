# Nearly Sorted — README

**Problem Title:** Nearly Sorted

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
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

We are given an array `arr` of length `n` such that each element is at most `k` positions away from its correct (sorted) position. The task is to sort the array efficiently using this property.

In other words: every element that belongs to index `i` in the sorted array is guaranteed to be present somewhere between indices `i-k` and `i+k` in the current array.

Goal: produce a sorted array (in-place) as efficiently as possible.

---

## Constraints

* `1 <= n <= 10^6` (typical upper bound; depends on environment)
* `0 <= k < n`
* Array elements are comparable (e.g., integers).
* Memory is constrained: prefer `O(k)` extra space over `O(n)` if possible.

---

## Intuition

I thought: since each element is at most `k` away from its sorted position, for placing the smallest element at index `0` I only need to look at the first `k+1` elements. Similarly, for index `1` the correct element will be among the next `k+1` candidates, and so on. So if I always pick the smallest from a sliding window of size `k+1`, I can place elements in correct order. A min-heap (priority queue) gives me the smallest element quickly and maintains the sliding window of candidates.

---

## Approach

1. Build a min-heap with the first `k+1` elements (or entire array if `n <= k+1`).
2. Iterate `i` from `0` to `n-1`:

   * Pop the smallest element from the heap and set `arr[i] = popped_value`.
   * If there are still elements not yet added to the heap (beyond the initial window), push the next array element into the heap so that the heap always holds up to `k+1` candidates.
3. After processing all input elements, pop and place any remaining heap elements into the array.

This works because the element that should go into position `i` must be within the next `k+1` elements at the time we process `i`.

---

## Data Structures Used

* **Min-Heap** (priority queue) — stores at most `k+1` elements at any time.
* In JavaScript, a small `MinHeap` class (binary heap) is provided since JS has no built-in heap.

---

## Operations & Behavior Summary

* **Push (heap insert)**: `O(log k)` — insert next candidate into heap.
* **Pop (heap extract-min)**: `O(log k)` — get smallest candidate for current index.
* Each array element is pushed and popped exactly once, so the main loop is `O(n log k)`.

---

## Complexity

* **Time Complexity:** `O(n log k)`

  * `n` = number of array elements.
  * Each element is inserted and removed exactly once. Heap size ≤ `k+1`, so heap ops cost `O(log k)`.

* **Space Complexity:** `O(k)` extra space (heap stores at most `k+1` elements). Sorting in-place except heap.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    // Sorts the nearly sorted array in-place.
    void nearlySorted(vector<int>& arr, int k) {
        int n = arr.size();
        if (n <= 1 || k <= 0) return; // nothing to do

        // Min-heap (priority_queue with greater comparator)
        priority_queue<int, vector<int>, greater<int>> pq;

        // Push first k+1 elements (or all elements if n <= k+1)
        for (int i = 0; i < n && i <= k; ++i) pq.push(arr[i]);

        int index = 0;
        // For remaining elements: pop smallest and push next element
        for (int i = k + 1; i < n; ++i) {
            arr[index++] = pq.top();
            pq.pop();
            pq.push(arr[i]);
        }

        // Empty remaining elements from heap
        while (!pq.empty()) {
            arr[index++] = pq.top();
            pq.pop();
        }
    }
};
```

### Java

```java
import java.util.PriorityQueue;

class Solution {
    // Sorts the nearly sorted array in-place.
    public void nearlySorted(int[] arr, int k) {
        int n = arr.length;
        if (n <= 1 || k <= 0) return;

        PriorityQueue<Integer> pq = new PriorityQueue<>(); // min-heap

        // add first k+1 elements (or all if smaller)
        for (int i = 0; i < n && i <= k; ++i) pq.add(arr[i]);

        int idx = 0;
        for (int i = k + 1; i < n; ++i) {
            arr[idx++] = pq.poll();
            pq.add(arr[i]);
        }

        // place remaining elements
        while (!pq.isEmpty()) {
            arr[idx++] = pq.poll();
        }
    }
}
```

### JavaScript

```javascript
/**
 * MinHeap implementation for numbers (binary heap).
 */
class MinHeap {
    constructor() { this.data = []; }
    size() { return this.data.length; }
    peek() { return this.data[0]; }
    swap(i, j) { [this.data[i], this.data[j]] = [this.data[j], this.data[i]]; }

    push(val) {
        this.data.push(val);
        let i = this.data.length - 1;
        while (i > 0) {
            let p = Math.floor((i - 1) / 2);
            if (this.data[p] <= this.data[i]) break;
            this.swap(p, i);
            i = p;
        }
    }

    pop() {
        if (this.data.length === 0) return undefined;
        const ret = this.data[0];
        const last = this.data.pop();
        if (this.data.length > 0) {
            this.data[0] = last;
            let i = 0;
            while (true) {
                let l = 2 * i + 1, r = 2 * i + 2, smallest = i;
                if (l < this.data.length && this.data[l] < this.data[smallest]) smallest = l;
                if (r < this.data.length && this.data[r] < this.data[smallest]) smallest = r;
                if (smallest === i) break;
                this.swap(i, smallest);
                i = smallest;
            }
        }
        return ret;
    }
}

class Solution {
    // Sorts arr in-place assuming each element is at most k away from correct position.
    nearlySorted(arr, k) {
        const n = arr.length;
        if (n <= 1 || k <= 0) return;

        const heap = new MinHeap();
        // add first k+1 elements
        for (let i = 0; i < n && i <= k; ++i) heap.push(arr[i]);

        let idx = 0;
        for (let i = k + 1; i < n; ++i) {
            arr[idx++] = heap.pop();
            heap.push(arr[i]);
        }
        while (heap.size() > 0) arr[idx++] = heap.pop();
    }
}
```

### Python3

```python
import heapq

class Solution:
    def nearlySorted(self, arr, k):
        n = len(arr)
        if n <= 1 or k <= 0:
            return

        # Build heap with first k+1 elements (or all)
        heap = []
        for i in range(min(n, k + 1)):
            heapq.heappush(heap, arr[i])

        idx = 0
        # Process remaining elements
        for i in range(k + 1, n):
            arr[idx] = heapq.heappop(heap)
            idx += 1
            heapq.heappush(heap, arr[i])

        # Empty remaining elements
        while heap:
            arr[idx] = heapq.heappop(heap)
            idx += 1
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain key blocks and the logic in plain words as if I'm teaching a friend.

### 1) Top-level check

* `if (n <= 1 || k <= 0) return;`
  If the array is empty, has one element, or `k` is 0, the array is already sorted or no element can move — do nothing.

### 2) Build initial heap (first `k+1` elements)

* Reason: the smallest element that belongs to index `0` is somewhere among `arr[0..k]`. So we push all these into the min-heap.
* C++: `for (int i = 0; i < n && i <= k; ++i) pq.push(arr[i]);`
* Java: `for (int i = 0; i < n && i <= k; ++i) pq.add(arr[i]);`
* Python: `for i in range(min(n, k+1)): heappush(heap, arr[i])`
* JS: push using `heap.push(arr[i])` into our `MinHeap`.

### 3) Sliding the window: place minimum and add next

* For `i = k+1` to `n-1`:

  * Pop the smallest from heap and place it at `arr[index]` (this is the correct element for `index`).
  * Push `arr[i]` into the heap to keep the candidate window size `k+1`.
* This keeps the invariant: before filling `arr[index]`, the heap contains all elements that could belong to this position.

### 4) Flush remaining heap

* After the loop, the heap still contains at most `k+1` items which are the largest remaining elements in sorted order. Pop them one by one and fill the array.

### 5) Why this is correct?

* For each position `i`, the element that should be there is within `i..i+k` in the original array. Because we maintain a heap of those candidates, the pop gives the correct element. Repeating this for all `i` sorts the array.

---

## Examples

**Example 1**

* Input: `arr = [6, 5, 3, 2, 8, 10, 9], k = 3`
* Process (high level): heap starts with `[6,5,3,2]` → pop 2 to position 0 → push 8 → pop 3 to position 1 → push 10 → ...
* Output: `[2, 3, 5, 6, 8, 9, 10]`

**Example 2**

* Input: `arr = [3, 1, 4, 2], k = 2`
* Output: `[1, 2, 3, 4]`

---

## How to use / Run locally

### C++

1. Save the class and a `main` that constructs an instance of `Solution`, an array and `k`, and calls `nearlySorted`.
2. Example `main`:

```c++
int main() {
    vector<int> arr = {6,5,3,2,8,10,9};
    int k = 3;
    Solution s;
    s.nearlySorted(arr, k);
    for (int x : arr) cout << x << " ";
    cout << "\n";
    return 0;
}
```

3. Compile & run:

```bash
g++ -std=c++17 -O2 nearly_sorted.cpp -o nearly_sorted
./nearly_sorted
```

### Java

1. Put `Solution` in `Solution.java`, add a `main` that creates array and calls `nearlySorted`.
2. Example `main`:

```java
public class SolutionMain {
    public static void main(String[] args) {
        int[] arr = {6,5,3,2,8,10,9};
        new Solution().nearlySorted(arr, 3);
        for (int x : arr) System.out.print(x + " ");
        System.out.println();
    }
}
```

3. Compile & run:

```bash
javac Solution.java SolutionMain.java
java SolutionMain
```

### JavaScript (Node.js)

1. Save the JS code in `nearly_sorted.js`. Add invocation at the bottom:

```javascript
const arr = [6,5,3,2,8,10,9];
new Solution().nearlySorted(arr, 3);
console.log(arr);
```

2. Run:

```bash
node nearly_sorted.js
```

### Python3

1. Save the `Solution` class in `nearly_sorted.py`. Add invocation:

```python
if __name__ == "__main__":
    arr = [6,5,3,2,8,10,9]
    Solution().nearlySorted(arr, 3)
    print(arr)
```

2. Run:

```bash
python3 nearly_sorted.py
```

---

## Notes & Optimizations

* If `k` is large (≥ `n`), the algorithm effectively becomes `O(n log n)` since heap size ≈ `n`. In that case, a regular sort may be equally efficient or simpler.
* The heap solution minimizes extra space to `O(k)`. If memory is not constrained and `k` is large, simply calling built-in sort may be simpler.
* The solution is in-place with respect to the array (we overwrite array positions) — the auxiliary structure is only the heap.
* For non-numeric types, ensure the comparator used by the heap supports the desired order.
* If stable ordering is required (for equal elements), some priority queues may not retain original relative order — to make it stable attach original indices as tie-breakers when pushing to the heap.

---

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
