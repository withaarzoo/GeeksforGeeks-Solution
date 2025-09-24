# Design MinMax Queue

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

Design a `SpecialQueue` data structure that behaves like a normal FIFO queue but also supports retrieving the **minimum** and **maximum** element in the queue in **O(1)** time per operation. The `SpecialQueue` should implement these operations:

* `enqueue(x)`: Insert element `x` at the rear of the queue.
* `dequeue()`: Remove the element from the front of the queue.
* `getFront()`: Return the front element without removing it.
* `getMin()`: Return the minimum element currently in the queue in `O(1)` time.
* `getMax()`: Return the maximum element currently in the queue in `O(1)` time.

We must implement the above operations efficiently and handle up to `10^5` queries.

---

## Constraints

* Number of operations (queries) `q` satisfies: `1 ≤ q ≤ 10^5`
* Values stored in the queue are non-negative and `≤ 10^9` (fits in 32-bit signed int)
* All queries are guaranteed to be valid by the judge/driver (but code should handle empty-checks gracefully)

---

## Intuition

I thought: a normal queue gives `O(1)` enqueue and dequeue for front/rear but it can't give `getMin()` or `getMax()` fast. To return min and max in `O(1)` I can maintain two extra monotonic double-ended queues (deques):

* `minDeque`: keeps candidate minima in **non-decreasing** order so the current minimum is at the front.
* `maxDeque`: keeps candidate maxima in **non-increasing** order so the current maximum is at the front.

When I enqueue a value `x`, I remove from the back of `minDeque` any values greater than `x` (they will never be the minimum while `x` is present). Symmetrically, remove from the back of `maxDeque` any values smaller than `x`. When I dequeue, if the removed value equals the front of either deque, I pop that front.

Because each element is pushed and popped at most once in each deque, every operation is amortized `O(1)`.

---

## Approach

1. Use a normal FIFO queue to store all elements in order.
2. Maintain two additional deques:

   * `minDeque` (monotonic increasing) for fast `getMin()`.
   * `maxDeque` (monotonic decreasing) for fast `getMax()`.
3. `enqueue(x)`:

   * Push `x` to the main queue.
   * While `minDeque.back() > x`, pop back from `minDeque`, then push `x` into `minDeque`.
   * While `maxDeque.back() < x`, pop back from `maxDeque`, then push `x` into `maxDeque`.
4. `dequeue()`:

   * Pop from the main queue to get value `v`.
   * If `minDeque.front() == v`, `minDeque.popFront()`.
   * If `maxDeque.front() == v`, `maxDeque.popFront()`.
5. `getFront()`, `getMin()`, `getMax()` are returned from the main queue/fronts of the deques respectively.

This guarantees amortized `O(1)` time per operation.

---

## Data Structures Used

* `Queue` / `deque` for the main FIFO behavior.
* Two `deque`s (double-ended queues) for maintaining monotonic sequences:

  * `minDeque` (increasing)
  * `maxDeque` (decreasing)

All languages use standard or custom deque implementations where appropriate.

---

## Operations & Behavior Summary

* `enqueue(x)` — adds `x` to the rear. Updates `minDeque` and `maxDeque` by removing dominated elements from the back.
* `dequeue()` — removes front `v` from the main queue and removes `v` from the front of `minDeque` / `maxDeque` if present.
* `getFront()` — returns the main queue's front element (or sentinel if empty).
* `getMin()` — returns `minDeque.front()` (or sentinel if empty).
* `getMax()` — returns `maxDeque.front()` (or sentinel if empty).

Edge cases: empty queue — implementation returns `-1` for `getFront/getMin/getMax` (you can change to exceptions based on judge requirements).

---

## Complexity

* **Time Complexity:** Each operation (`enqueue`, `dequeue`, `getFront`, `getMin`, `getMax`) is **O(1)** amortized. Each element is inserted/removed at most once from each deque.
* **Space Complexity:** **O(n)** where `n` is the number of elements currently in the queue (plus small overhead for pointers). We store each element in the main queue and possibly in deques.

---

## Multi-language Solutions

Below are ready-to-use implementations. Each implementation follows the same logic: one main queue and two monotonic deques.

---

### C++

```c++
// C++ implementation: SpecialQueue with O(1) amortized ops
#include <bits/stdc++.h>
using namespace std;

class SpecialQueue {
public:
    queue<int> q;         // main FIFO queue
    deque<int> minD;      // monotonic increasing deque for minima
    deque<int> maxD;      // monotonic decreasing deque for maxima

    SpecialQueue() {}

    // Insert element x at rear
    void enqueue(int x) {
        q.push(x);
        // maintain minD (increasing)
        while (!minD.empty() && minD.back() > x) minD.pop_back();
        minD.push_back(x);
        // maintain maxD (decreasing)
        while (!maxD.empty() && maxD.back() < x) maxD.pop_back();
        maxD.push_back(x);
    }

    // Remove element from front
    void dequeue() {
        if (q.empty()) return;
        int v = q.front(); q.pop();
        if (!minD.empty() && minD.front() == v) minD.pop_front();
        if (!maxD.empty() && maxD.front() == v) maxD.pop_front();
    }

    // Get front element
    int getFront() {
        return q.empty() ? -1 : q.front();
    }

    // Get minimum element
    int getMin() {
        return minD.empty() ? -1 : minD.front();
    }

    // Get maximum element
    int getMax() {
        return maxD.empty() ? -1 : maxD.front();
    }
};

// Simple test harness
int main() {
    SpecialQueue sq;
    sq.enqueue(4);
    sq.enqueue(2);
    cout << "Front: " << sq.getFront() << "\n"; // 4
    cout << "Min: " << sq.getMin() << "\n";   // 2
    cout << "Max: " << sq.getMax() << "\n";   // 4
    sq.dequeue();
    cout << "After dequeue -> Front: " << sq.getFront() << " Min: " << sq.getMin() << " Max: " << sq.getMax() << "\n";
    return 0;
}
```

---

### Java

```java
// Java implementation: SpecialQueue
import java.util.*;

public class SpecialQueue {
    private Queue<Integer> q;        // main queue
    private Deque<Integer> minD;     // increasing deque
    private Deque<Integer> maxD;     // decreasing deque

    public SpecialQueue() {
        q = new LinkedList<>();
        minD = new ArrayDeque<>();
        maxD = new ArrayDeque<>();
    }

    public void enqueue(int x) {
        q.offer(x);
        while (!minD.isEmpty() && minD.peekLast() > x) minD.pollLast();
        minD.offerLast(x);
        while (!maxD.isEmpty() && maxD.peekLast() < x) maxD.pollLast();
        maxD.offerLast(x);
    }

    public void dequeue() {
        if (q.isEmpty()) return;
        int v = q.poll();
        if (!minD.isEmpty() && minD.peekFirst() == v) minD.pollFirst();
        if (!maxD.isEmpty() && maxD.peekFirst() == v) maxD.pollFirst();
    }

    public int getFront() {
        return q.isEmpty() ? -1 : q.peek();
    }

    public int getMin() {
        return minD.isEmpty() ? -1 : minD.peekFirst();
    }

    public int getMax() {
        return maxD.isEmpty() ? -1 : maxD.peekFirst();
    }

    // Example usage
    public static void main(String[] args) {
        SpecialQueue sq = new SpecialQueue();
        sq.enqueue(3);
        sq.enqueue(5);
        System.out.println("Front: " + sq.getFront()); // 3
        System.out.println("Min: " + sq.getMin());     // 3
        System.out.println("Max: " + sq.getMax());     // 5
        sq.dequeue();
        System.out.println("After dequeue -> Front: " + sq.getFront());
    }
}
```

---

### JavaScript

```javascript
// JavaScript implementation optimized for large q (Node.js friendly)
// Efficient Deque with head/tail pointers (O(1) amortized ops)
class Deque {
  constructor() {
    this.arr = [];
    this.head = 0;
    this.tail = 0;
  }
  pushBack(x) { this.arr[this.tail++] = x; }
  popBack() { if (!this.isEmpty()) this.tail--; }
  front() { return this.isEmpty() ? undefined : this.arr[this.head]; }
  back() { return this.isEmpty() ? undefined : this.arr[this.tail - 1]; }
  popFront() { if (!this.isEmpty()) this.head++; }
  isEmpty() { return this.head >= this.tail; }
  size() { return this.tail - this.head; }
}

class SpecialQueue {
  constructor() {
    this.q = new Deque();
    this.minD = new Deque();
    this.maxD = new Deque();
  }

  enqueue(x) {
    this.q.pushBack(x);

    while (!this.minD.isEmpty() && this.minD.back() > x) this.minD.popBack();
    this.minD.pushBack(x);

    while (!this.maxD.isEmpty() && this.maxD.back() < x) this.maxD.popBack();
    this.maxD.pushBack(x);
  }

  dequeue() {
    if (this.q.isEmpty()) return;
    const v = this.q.front();
    this.q.popFront();
    if (!this.minD.isEmpty() && this.minD.front() === v) this.minD.popFront();
    if (!this.maxD.isEmpty() && this.maxD.front() === v) this.maxD.popFront();
  }

  getFront() { return this.q.isEmpty() ? -1 : this.q.front(); }
  getMin() { return this.minD.isEmpty() ? -1 : this.minD.front(); }
  getMax() { return this.maxD.isEmpty() ? -1 : this.maxD.front(); }
}

// Example usage:
// const sq = new SpecialQueue();
// sq.enqueue(4); sq.enqueue(2);
// console.log(sq.getFront(), sq.getMin(), sq.getMax());
// sq.dequeue();
// console.log(sq.getFront(), sq.getMin(), sq.getMax());
```

---

### Python3

```python3
# Python3 implementation using collections.deque
from collections import deque

class SpecialQueue:
    def __init__(self):
        self.q = deque()      # main queue
        self.minD = deque()   # increasing deque
        self.maxD = deque()   # decreasing deque

    def enqueue(self, x: int) -> None:
        self.q.append(x)
        while self.minD and self.minD[-1] > x:
            self.minD.pop()
        self.minD.append(x)
        while self.maxD and self.maxD[-1] < x:
            self.maxD.pop()
        self.maxD.append(x)

    def dequeue(self) -> None:
        if not self.q:
            return
        v = self.q.popleft()
        if self.minD and self.minD[0] == v:
            self.minD.popleft()
        if self.maxD and self.maxD[0] == v:
            self.maxD.popleft()

    def getFront(self) -> int:
        return self.q[0] if self.q else -1

    def getMin(self) -> int:
        return self.minD[0] if self.minD else -1

    def getMax(self) -> int:
        return self.maxD[0] if self.maxD else -1

# Example usage:
# sq = SpecialQueue();
# sq.enqueue(4); sq.enqueue(1)
# print(sq.getFront(), sq.getMin(), sq.getMax())
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain the important logic using a step-by-step breakdown. The code in each language follows the same idea, so I focus on the core algorithm and point out the equivalent code lines.

1. **Main queue** — This stores all values in FIFO order. In code:

   * C++: `queue<int> q;`
   * Java: `Queue<Integer> q = new LinkedList<>();`
   * JS: `this.q = new Deque();` (custom Deque with head/tail)
   * Python: `self.q = deque()`

2. **minDeque / maxDeque** — Two double-ended queues store candidate minima and maxima:

   * `minDeque` keeps values in non-decreasing order.
   * `maxDeque` keeps values in non-increasing order.

   Example (Python): `self.minD = deque()` and `self.maxD = deque()`.

3. **enqueue(x)** — steps executed in all languages:

   * Append `x` to the main queue.
   * While `minDeque` has items and `minDeque.back() > x`, pop from back. Then push `x` to `minDeque`.
   * While `maxDeque` has items and `maxDeque.back() < x`, pop from back. Then push `x` to `maxDeque`.

   This keeps both deques monotonic and ensures the front of each deque is the current min/max.

4. **dequeue()** — steps:

   * Pop the front from the main queue, call it `v`.
   * If `minDeque.front() == v`, pop it from `minDeque`.
   * If `maxDeque.front() == v`, pop it from `maxDeque`.

   If `v` was previously removed from the back of a deque during some enqueue (because a newer value dominated it), it will no longer be in the deque and no action is needed.

5. **getFront/getMin/getMax** — simply read the front of the main queue or respective deque. Return sentinel (e.g. `-1`) if empty.

Why this is O(1) amortized: each element is appended once and removed once from each data structure (main queue and possibly each deque). Removing dominated elements in `enqueue` causes each element to be popped at most once.

---

## Examples

**Example 1**

```bash
Operations:
enqueue(4)
enqueue(2)
getFront() -> 4
getMin()   -> 2
getMax()   -> 4
dequeue()
getFront() -> 2
getMin()   -> 2
getMax()   -> 2
```

**Example 2 (from GeeksforGeeks sample):**
Input sequence (query types):

```bash
q = 6
queries = [[1,4], [1,2], [3], [4], [2], [5]]
```

Meaning:

* `1 x` -> enqueue(x)
* `2` -> dequeue()
* `3` -> getFront()
* `4` -> getMin()
* `5` -> getMax()

Expected printed outputs for `getFront/getMin/getMax` calls: e.g., `[4,2,2]` (follow sample explanation).

---

## How to use / Run locally

### C++

1. Save file as `special_queue.cpp`.
2. Compile: `g++ -std=c++17 special_queue.cpp -O2 -o special_queue`
3. Run: `./special_queue`

### Java

1. Save file as `SpecialQueue.java`.
2. Compile: `javac SpecialQueue.java`
3. Run: `java SpecialQueue`

### JavaScript (Node.js)

1. Save file as `specialQueue.js`.
2. Run: `node specialQueue.js`.

### Python3

1. Save file as `special_queue.py`.
2. Run: `python3 special_queue.py`.

For judge-style input (like a list of queries), you can extend the example harness to parse input lines and call operations accordingly.

---

## Notes & Optimizations

* I used `-1` as a sentinel return for `getFront/getMin/getMax` on empty queues. Change this behavior to throwing exceptions or returning `null`/`None` depending on contest requirements.
* The JavaScript implementation uses a lightweight custom `Deque` (head/tail indices) to avoid `Array.shift()` or repeated `slice()` which would cause TLE for large inputs.
* For languages with built-in `deque` (C++ `std::deque`, Python `collections.deque`, Java `ArrayDeque`) prefer them for clarity and performance.
* The solution handles duplicates: equal values are stored multiple times in deques as needed. When the front value is dequeued, we remove only one occurrence from the front of the corresponding deques.

---

## Author

Author: [Aarzoo](https://bento.me/withaarzoo)
