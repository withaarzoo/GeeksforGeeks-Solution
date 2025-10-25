# Minimum Steps to Halve Sum

A clean, professional README for the GeeksforGeeks problem **Minimum Steps to Halve Sum** — includes problem summary, intuition, approach, complexity, multi-language solutions (C++, Java, JavaScript, Python3), step-by-step explanations, examples, run instructions, and notes/optimizations.

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

Given an array of positive integers `arr`, in one operation you can choose any element and replace it with half of its value (i.e., `x -> x/2`). The value becomes a floating number if required. Return the **minimum number of operations** required to reduce the sum of the array to **at most half** of its original sum.

I want to reduce the total sum fast; halving the largest element gives the largest immediate drop, so I always pick the current largest element to halve.

---

## Constraints

* Number of elements: `1 <= n <= 10^5` (typical GfG constraints)
* Element value: values are positive integers (can be large).
* Repeated halving creates fractional values; use floating types to keep precision.
* Expect many operations in worst case; must be efficient in selecting the current largest element (use a max-heap / priority queue).

---

## Intuition

I thought about which numbers reduce the total sum the fastest. Halving a larger number reduces the sum more than halving a smaller number. So, I always want to pick the largest available number, halve it, and repeat until the sum is at most half of the original. A max-heap (priority queue) lets me always fetch and update the largest element in `O(log n)` time per operation.

---

## Approach

1. Compute the original sum `S`. My target is `S / 2`.
2. Put every array element into a max-heap (store as floating/double so fractional halves are preserved).
3. While the current sum `currSum` is greater than `S / 2`:

   * Pop the largest element `x` from the heap.
   * Compute `half = x / 2.0`.
   * Decrease `currSum` by `(x - half)`.
   * Push `half` back into the heap.
   * Increment `operations` by 1.
4. Return `operations`.

This greedy choice is optimal: halving the largest element yields the largest immediate decrease in the total sum per operation.

---

## Data Structures Used

* **Max-heap / Priority Queue** — to fetch the current largest element quickly.

  * C++: `priority_queue<double>`
  * Java: `PriorityQueue<Double>` with `Collections.reverseOrder()`
  * JavaScript: custom `MaxHeap` class (because JS lacks a built-in heap)
  * Python3: `heapq` with negative values to simulate a max-heap

---

## Operations & Behavior Summary

* Build heap: push all elements — O(n log n) if push individually, but can be O(n) with heapify (language dependent).
* Each operation (pop + push) is `O(log n)`.
* Stop when running sum ≤ initial sum / 2.
* Return the count of halving operations performed.

---

## Complexity

* **Time Complexity:**

  * Let `n` = number of elements, `m` = number of halving operations performed until the sum is halved.
  * Building the heap: O(n) — practical implementations vary (O(n) if heapify available, or O(n log n) if pushing),
  * Each operation: O(log n).
  * Total: **O((n + m) log n)** (commonly expressed as O(m log n) when heap is already built).
  * Note: `m` depends on values; often `m` is much smaller than `n * constant`, but in worst case it can be large.
* **Space Complexity:**

  * **O(n)** for the heap (storing n elements in memory).

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    // Returns minimum number of operations to reduce sum to at most half.
    int minOperations(vector<int>& arr) {
        // Priority queue (max-heap) storing doubles
        priority_queue<double> pq;
        double sum = 0.0;
        for (int v : arr) {
            pq.push((double)v);
            sum += v;
        }
        double target = sum / 2.0;
        int ops = 0;
        while (sum > target) {
            double top = pq.top();
            pq.pop();
            double half = top / 2.0;
            sum -= (top - half);
            pq.push(half);
            ++ops;
        }
        return ops;
    }
};

// Example usage (not required in GfG):
// int main() {
//     Solution s;
//     vector<int> arr = {5, 19, 8, 1};
//     cout << s.minOperations(arr) << endl; // expected output: 3
// }
```

---

### Java

```java
import java.util.PriorityQueue;
import java.util.Collections;

class Solution {
    public int minOperations(int[] arr) {
        PriorityQueue<Double> pq = new PriorityQueue<>(Collections.reverseOrder());
        double sum = 0.0;
        for (int v : arr) {
            pq.add((double) v);
            sum += v;
        }
        double target = sum / 2.0;
        int ops = 0;
        while (sum > target) {
            double top = pq.poll();
            double half = top / 2.0;
            sum -= (top - half);
            pq.add(half);
            ops++;
        }
        return ops;
    }

    // Example main for local testing:
    // public static void main(String[] args) {
    //     Solution s = new Solution();
    //     int[] arr = {5, 19, 8, 1};
    //     System.out.println(s.minOperations(arr)); // expected: 3
    // }
}
```

---

### JavaScript

```javascript
// Simple MaxHeap implementation and solution
class MaxHeap {
  constructor() { this.data = []; }
  size() { return this.data.length; }
  swap(i, j) { const t = this.data[i]; this.data[i] = this.data[j]; this.data[j] = t; }
  push(val) {
    this.data.push(val);
    let i = this.data.length - 1;
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.data[p] >= this.data[i]) break;
      this.swap(p, i);
      i = p;
    }
  }
  pop() {
    if (this.data.length === 0) return null;
    const max = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      let i = 0, n = this.data.length;
      while (true) {
        let l = 2 * i + 1, r = 2 * i + 2, largest = i;
        if (l < n && this.data[l] > this.data[largest]) largest = l;
        if (r < n && this.data[r] > this.data[largest]) largest = r;
        if (largest === i) break;
        this.swap(i, largest);
        i = largest;
      }
    }
    return max;
  }
  peek() { return this.data.length ? this.data[0] : null; }
}

class Solution {
  minoperations(arr) {
    const heap = new MaxHeap();
    let sum = 0.0;
    for (const v of arr) {
      heap.push(v * 1.0);
      sum += v;
    }
    const target = sum / 2.0;
    let ops = 0;
    while (sum > target) {
      const top = heap.pop();
      const half = top / 2.0;
      sum -= (top - half);
      heap.push(half);
      ops += 1;
    }
    return ops;
  }
}

// Example usage:
// const s = new Solution();
// console.log(s.minoperations([5, 19, 8, 1])); // expected: 3
```

---

### Python3

```python
import heapq

class Solution:
  def minOperations(self, arr):
    # Use negative values to simulate max-heap with heapq
    max_heap = []
    total = 0.0
    for v in arr:
      total += v
      heapq.heappush(max_heap, -float(v))
    target = total / 2.0
    ops = 0
    while total > target:
      top = -heapq.heappop(max_heap)  # largest value
      half = top / 2.0
      total -= (top - half)
      heapq.heappush(max_heap, -half)
      ops += 1
    return ops

# Example:
# s = Solution()
# print(s.minOperations([5, 19, 8, 1]))  # expected: 3
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below I explain the main logic and how it maps to code. I’ll keep it simple — I’d explain it to a friend.

### 1. Compute initial sum and build heap

* I compute the sum of all elements to know the starting total (`sum` / `total`).
* I put each element into a **max-heap**. In Python I push `-v` to use `heapq` as a max-heap. In Java I create a `PriorityQueue` with reverse ordering; in C++ I use `priority_queue<double>`. In JavaScript I implemented a small `MaxHeap` class.

Why? Because I want to quickly get the largest element every time.

### 2. Define the stopping target

* `target = sum / 2.0`. I stop when `currentSum <= target`. This is the problem requirement.

### 3. Repeatedly halve the largest element

* While `currentSum > target`:

  * Pop the largest element `top`.
  * Compute `half = top / 2.0`.
  * The sum decreases by `(top - half)`. So `currentSum -= (top - half)`.
  * Push `half` back into the heap — it may still be among the largest in future steps.
  * Increment `ops` (the count of operations).

This greedy step is repeated until the sum is halved.

### 4. Return the count

* When the loop finishes, `ops` is the minimum number of operations.

---

## Examples

**Example 1**

* Input: `arr = [5, 19, 8, 1]`
* Initial sum = 33, target = 16.5
* Operations (one possible sequence):

  1. Halve 19 → 9.5 (sum becomes 23.5)
  2. Halve 9.5 → 4.75 (sum becomes 18.75)
  3. Halve 8 → 4   (sum becomes 14.75) → now ≤ 16.5 so stop
* Output: `3`

**Example 2**

* Input: `arr = [10,10]`
* sum = 20, target = 10
* Halve one 10 → 5, sum becomes 15 (1 op)
* Halve the other 10 → 5, sum becomes 10 (2 ops)
* Output: `2`

---

## How to use / Run locally

### C++

1. Save the C++ code to `solution.cpp`.
2. Compile:
   `g++ -std=c++17 -O2 solution.cpp -o solution`
3. Run (if you added a `main`):
   `./solution`

### Java

1. Save code to `Solution.java`.
2. Compile:
   `javac Solution.java`
3. Run (if `main` provided):
   `java Solution`

### JavaScript (Node.js)

1. Save file to `solution.js`.
2. Run:
   `node solution.js` (ensure you added a test harness or `console.log` example at the bottom).

### Python3

1. Save code to `solution.py`.
2. Run:
   `python3 solution.py` (ensure you added a test harness or example invocation at the bottom).

---

## Notes & Optimizations

* **Precision**: I used `double` / `float` to preserve fractional values after halving. This avoids losing precision when repeatedly halving odd integers.
* **Heap build**: If your language supports `heapify` in O(n), use it to build the heap faster. In Python you can call `heapq.heapify()` on a list — but since we need a max-heap (we use negatives), you can prepare the list of negatives and `heapq.heapify` it.
* **Edge cases**: If `arr` contains very large values, the number of operations could be high; using `double` is still safe for typical constraints, but keep an eye on floating-point precision for extremely deep halving sequences.
* **Alternative micro-optimization**: If the problem allowed integer-only operations (and rounding or truncation rules were given), alternative strategies may exist. But for the standard GfG version, the described greedy with heap is the accepted solution.
* **Why greedy is optimal**: Each operation reduces the sum by `(top - top/2) = top/2`. Halving the largest `top` yields the largest immediate reduction; no sequence of halving smaller numbers can beat one operation on the current largest.

---

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
