# Interleave the First Half of the Queue with Second Half

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

I am given a queue of **even size**.
My task is to rearrange the queue by **interleaving the first half with the second half**, while keeping the **relative order** of elements the same.

Interleaving means:

* Take one element from the first half
* Then one element from the second half
* Repeat until all elements are placed back into the queue

---

## Constraints

* 1 ≤ size of queue ≤ 10³
* 1 ≤ value of each element ≤ 10⁵
* Queue size is always **even**

---

## Intuition

When I looked at the problem, the first thing I noticed was that the queue size is even.
That immediately told me I can split the queue into **two equal halves**.

But since a queue allows access only from the **front**, I knew I needed some extra space to safely store the first half.

So my idea was simple:

* Store the first half in a temporary queue
* Keep the second half in the original queue
* Then interleave both queues step by step

This approach keeps the logic clean and avoids confusion.

---

## Approach

1. Find the size of the queue.
2. Create an extra queue to store the first half.
3. Move the first `n/2` elements into the extra queue.
4. The remaining elements in the original queue become the second half.
5. Start interleaving:

   * Take one element from the first half
   * Take one element from the second half
   * Push both back into the original queue
6. Repeat until the first half becomes empty.

---

## Data Structures Used

* Queue (main queue)
* Queue (temporary queue for first half)

---

## Operations & Behavior Summary

* Dequeue from the front
* Enqueue at the rear
* Preserve original order
* Interleave elements alternately

---

## Complexity

**Time Complexity:** O(n)

* Each element is moved a constant number of times

**Space Complexity:** O(n)

* Extra queue is used to store half of the elements

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    void rearrangeQueue(queue<int> &q) {
        int n = q.size();
        queue<int> firstHalf;

        for (int i = 0; i < n / 2; i++) {
            firstHalf.push(q.front());
            q.pop();
        }

        while (!firstHalf.empty()) {
            q.push(firstHalf.front());
            firstHalf.pop();

            q.push(q.front());
            q.pop();
        }
    }
};
```

---

### Java

```java
class Solution {
    public void rearrangeQueue(Queue<Integer> q) {
        int n = q.size();
        Queue<Integer> firstHalf = new LinkedList<>();

        for (int i = 0; i < n / 2; i++) {
            firstHalf.add(q.poll());
        }

        while (!firstHalf.isEmpty()) {
            q.add(firstHalf.poll());
            q.add(q.poll());
        }
    }
}
```

---

### JavaScript

```javascript
class Solution {
    rearrangeQueue(q) {
        let n = q.len();
        let firstHalf = new Queue();

        for (let i = 0; i < n / 2; i++) {
            firstHalf.enqueue(q.peek());
            q.dequeue();
        }

        while (!firstHalf.isEmpty()) {
            q.enqueue(firstHalf.peek());
            firstHalf.dequeue();

            q.enqueue(q.peek());
            q.dequeue();
        }
    }
}
```

---

### Python3

```python
class Solution:
    def rearrangeQueue(self, q):
        n = len(q)
        first_half = []

        for _ in range(n // 2):
            first_half.append(q.pop(0))

        for i in range(n // 2):
            q.append(first_half[i])
            q.append(q.pop(0))
```

---

## Step-by-step Detailed Explanation

1. I first calculate the size of the queue.
2. I remove the first half and store it safely.
3. The remaining elements automatically become the second half.
4. I then push one element from the first half.
5. Immediately after, I push one element from the second half.
6. I repeat this until all elements are placed correctly.
7. The final queue becomes fully interleaved.

---

## Examples

**Input:**
`[2, 4, 3, 1]`

**Process:**
First half → `[2, 4]`
Second half → `[3, 1]`

**Output:**
`[2, 3, 4, 1]`

---

## How to use / Run locally

1. Copy the code for your preferred language.
2. Paste it into your local compiler or IDE.
3. Create a queue with even number of elements.
4. Call the `rearrangeQueue` function.
5. Print the queue to see the result.

---

## Notes & Optimizations

* This solution is optimal for clarity and correctness.
* Using a stack-based approach is possible but harder to understand.
* The current approach is interview-friendly and safe.
* Works efficiently within given constraints.

---

## Author

**Md Aarzoo Islam**
🔗 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
