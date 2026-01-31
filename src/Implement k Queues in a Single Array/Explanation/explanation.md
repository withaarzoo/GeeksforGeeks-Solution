# Implement k Queues in a Single Array

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions

  * C++
  * Java
  * JavaScript
  * Python3
  * Go
* Step-by-step Detailed Explanation
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

I am given two integers `n` and `k`.

My task is to implement **k independent queues using only one array of size `n`**.

Each queue should support:

* `enqueue(x, i)` → insert `x` into queue `i`
* `dequeue(i)` → remove and return front element of queue `i`
* `isEmpty(i)` → check if queue `i` is empty
* `isFull()` → check if the array is completely full

The main challenge is **efficient space usage**, because all queues must share the same array.

---

## Constraints

* 1 ≤ q ≤ 10⁵
* 1 ≤ k ≤ n ≤ 10⁵
* 0 ≤ values ≤ 10⁹

---

## Intuition

When I first saw this problem, I realized one thing quickly:

If I divide the array into fixed parts for each queue, a lot of space will be wasted.

So I thought:

* What if all queues **share the same array dynamically**?
* What if I simulate **linked list behavior inside the array**?

That idea led me to:

* Maintain a **free list** of available indexes
* Track **front and rear** for each queue
* Reuse space after dequeue

This way, no space is wasted and every operation runs in constant time.

---

## Approach

I solved this problem using **array-based linked list simulation**.

Step-by-step:

1. Create an array `arr[n]` to store values.
2. Create a `next[n]` array to store next index (like pointers).
3. Create `front[k]` and `rear[k]` for each queue.
4. Maintain a variable `freeSpot` to track the first free index.
5. On enqueue:

   * Take index from `freeSpot`
   * Insert element
   * Update links
6. On dequeue:

   * Remove front element
   * Add that index back to free list

All operations work in **O(1)** time.

---

## Data Structures Used

* Array `arr[]` → stores elements
* Array `next[]` → simulates linked list
* Array `front[]` → front of each queue
* Array `rear[]` → rear of each queue
* Integer `freeSpot` → manages free indexes

---

## Operations & Behavior Summary

| Operation | Behavior                                 |
| --------- | ---------------------------------------- |
| enqueue   | Insert element into selected queue       |
| dequeue   | Remove front element from selected queue |
| isEmpty   | Checks if a queue is empty               |
| isFull    | Checks if array has no free space        |

---

## Complexity

**Time Complexity:**

* `enqueue`, `dequeue`, `isEmpty`, `isFull` → **O(1)**

**Space Complexity:**

* **O(n + k)**

  * `n` for array storage
  * `k` for queue fronts and rears

---

## Multi-language Solutions

---

### C++

```cpp
class kQueues {
    int *arr, *front, *rear, *next;
    int freeSpot, n, k;

public:
    kQueues(int n, int k) {
        this->n = n;
        this->k = k;

        arr = new int[n];
        next = new int[n];
        front = new int[k];
        rear = new int[k];

        for (int i = 0; i < k; i++)
            front[i] = rear[i] = -1;

        for (int i = 0; i < n - 1; i++)
            next[i] = i + 1;

        next[n - 1] = -1;
        freeSpot = 0;
    }

    void enqueue(int x, int i) {
        if (freeSpot == -1) return;

        int index = freeSpot;
        freeSpot = next[index];

        if (front[i] == -1)
            front[i] = index;
        else
            next[rear[i]] = index;

        next[index] = -1;
        rear[i] = index;
        arr[index] = x;
    }

    int dequeue(int i) {
        if (front[i] == -1) return -1;

        int index = front[i];
        front[i] = next[index];

        next[index] = freeSpot;
        freeSpot = index;

        return arr[index];
    }

    bool isEmpty(int i) {
        return front[i] == -1;
    }

    bool isFull() {
        return freeSpot == -1;
    }
};
```

---

### Java

```java
class kQueues {
    int[] arr, next, front, rear;
    int freeSpot;

    kQueues(int n, int k) {
        arr = new int[n];
        next = new int[n];
        front = new int[k];
        rear = new int[k];

        for (int i = 0; i < k; i++)
            front[i] = rear[i] = -1;

        for (int i = 0; i < n - 1; i++)
            next[i] = i + 1;

        next[n - 1] = -1;
        freeSpot = 0;
    }

    void enqueue(int x, int i) {
        if (freeSpot == -1) return;

        int index = freeSpot;
        freeSpot = next[index];

        if (front[i] == -1)
            front[i] = index;
        else
            next[rear[i]] = index;

        next[index] = -1;
        rear[i] = index;
        arr[index] = x;
    }

    int dequeue(int i) {
        if (front[i] == -1) return -1;

        int index = front[i];
        front[i] = next[index];

        next[index] = freeSpot;
        freeSpot = index;

        return arr[index];
    }

    boolean isEmpty(int i) {
        return front[i] == -1;
    }

    boolean isFull() {
        return freeSpot == -1;
    }
}
```

---

### JavaScript

```javascript
class kQueues {
    constructor(n, k) {
        this.arr = new Array(n);
        this.next = new Array(n);
        this.front = new Array(k).fill(-1);
        this.rear = new Array(k).fill(-1);

        for (let i = 0; i < n - 1; i++)
            this.next[i] = i + 1;

        this.next[n - 1] = -1;
        this.freeSpot = 0;
    }

    enqueue(x, i) {
        if (this.freeSpot === -1) return;

        let index = this.freeSpot;
        this.freeSpot = this.next[index];

        if (this.front[i] === -1)
            this.front[i] = index;
        else
            this.next[this.rear[i]] = index;

        this.next[index] = -1;
        this.rear[i] = index;
        this.arr[index] = x;
    }

    dequeue(i) {
        if (this.front[i] === -1) return -1;

        let index = this.front[i];
        this.front[i] = this.next[index];

        this.next[index] = this.freeSpot;
        this.freeSpot = index;

        return this.arr[index];
    }

    isEmpty(i) {
        return this.front[i] === -1;
    }

    isFull() {
        return this.freeSpot === -1;
    }
}
```

---

### Python3

```python
class kQueues:
    def __init__(self, n, k):
        self.arr = [0] * n
        self.next = list(range(1, n)) + [-1]
        self.front = [-1] * k
        self.rear = [-1] * k
        self.freeSpot = 0

    def enqueue(self, x, i):
        if self.freeSpot == -1:
            return

        index = self.freeSpot
        self.freeSpot = self.next[index]

        if self.front[i] == -1:
            self.front[i] = index
        else:
            self.next[self.rear[i]] = index

        self.next[index] = -1
        self.rear[i] = index
        self.arr[index] = x

    def dequeue(self, i):
        if self.front[i] == -1:
            return -1

        index = self.front[i]
        self.front[i] = self.next[index]

        self.next[index] = self.freeSpot
        self.freeSpot = index

        return self.arr[index]

    def isEmpty(self, i):
        return self.front[i] == -1

    def isFull(self):
        return self.freeSpot == -1
```

---

### Go

```go
type KQueues struct {
 arr, next, front, rear []int
 freeSpot               int
}

func Constructor(n int, k int) KQueues {
 arr := make([]int, n)
 next := make([]int, n)
 front := make([]int, k)
 rear := make([]int, k)

 for i := 0; i < k; i++ {
  front[i], rear[i] = -1, -1
 }

 for i := 0; i < n-1; i++ {
  next[i] = i + 1
 }
 next[n-1] = -1

 return KQueues{arr, next, front, rear, 0}
}
```

---

## Step-by-step Detailed Explanation

* `freeSpot` always tells me where I can insert next
* `next[]` connects elements like a linked list
* When I dequeue, I recycle the index back to free list
* This avoids memory waste
* Every operation is constant time

---

## Examples

**Input**

```bash
n = 4, k = 2
enqueue(5,0)
enqueue(3,0)
enqueue(1,1)
dequeue(0)
isEmpty(1)
isFull()
```

**Output**

```bash
5 false true
```

---

## How to use / Run locally

1. Copy the code in your preferred language
2. Create an object of `kQueues`
3. Call operations based on input queries
4. Print results for dequeue, isEmpty, isFull

---

## Notes & Optimizations

* No space wastage
* Best possible solution
* Interview favorite problem
* Works well for large inputs

---

## Author

* **Md Aarzoo Islam**
  👉 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
