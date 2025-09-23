# Queue Reversal

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

Given a queue `q` containing integer elements, my task is to **reverse the queue**. The function should modify the same queue so that the element at the front becomes the last and vice-versa.

For example:

* Input: `q = [5, 10, 15, 20, 25]` (front is 5)
* Output: `q = [25, 20, 15, 10, 5]` (front is 25)

This is a classical data structure problem often asked in interviews and practice platforms.

## Constraints

* `1 <= q.size() <= 10^3` (typical constraint on number of elements)
* `0 <= q[i] <= 10^5` (element values are non-negative integers)
* Expected complexities on the platform: Time O(n), Auxiliary Space O(n)

> Note: constraints are small enough that a simple O(n) extra memory solution is acceptable.

## Intuition

I thought about how to flip the order of items while keeping the same queue object. The most straightforward way is to temporarily store the elements in a structure that reverses order naturally — a **stack**. If I dequeue each item and push it onto a stack, the stack will store them in reverse order. Then by popping items from the stack and enqueueing them back, the queue will become reversed.

I also noticed an alternative: recursion. If I remove the front element, recursively reverse the remaining queue, then enqueue the removed element, the queue will reverse. But recursion uses the call stack (O(n) space) just like an explicit stack.

## Approach

1. If the queue has 0 or 1 element, it's already reversed — return immediately.
2. Create an empty stack.
3. While the queue is not empty:

   * Dequeue the front element and push it onto the stack.
4. While the stack is not empty:

   * Pop the top of the stack and enqueue it back into the queue.
5. The queue is now reversed.

This uses auxiliary O(n) space and runs in O(n) time (each element is moved a constant number of times).

## Data Structures Used

* **Queue** — the input data structure we must reverse.
* **Stack** — temporary storage to reverse the order.

## Operations & Behavior Summary

* `enqueue` (push to back of queue)
* `dequeue` (remove from front of queue)
* `stack.push` (add on top)
* `stack.pop` (remove top)

The algorithm only uses standard queue/stack operations; it preserves original queue object reference (we modify it in-place by removing and adding elements).

## Complexity

* **Time Complexity:** `O(n)` — where `n` is the number of elements in the queue. Each element is dequeued once and enqueued once (and pushed/popped once on the stack).
* **Space Complexity:** `O(n)` — the stack holds up to `n` elements.

---

## Multi-language Solutions

Below are working, clean, and well-commented implementations in multiple languages. Each example includes a small driver / demo so you can run locally.

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

// Solution class with function expected by many platforms
class Solution {
  public:
    void reverseQueue(queue<int> &q) {
        if (q.empty() || q.size() == 1) return; // nothing to do

        stack<int> st;
        // Move all elements from queue into stack
        while (!q.empty()) {
            st.push(q.front());
            q.pop();
        }
        // Move them back from stack to queue (reversed)
        while (!st.empty()) {
            q.push(st.top());
            st.pop();
        }
    }
};

// Demo program (compile and run)
int main() {
    queue<int> q;
    vector<int> arr = {5, 10, 15, 20, 25};
    for (int x : arr) q.push(x);

    Solution().reverseQueue(q);

    // Print reversed queue
    while (!q.empty()) {
        cout << q.front();
        q.pop();
        if (!q.empty()) cout << " ";
    }
    cout << '\n';
    return 0;
}
```

### Java

```java
import java.util.*;

class Solution {
    public void reverseQueue(Queue<Integer> q) {
        if (q == null || q.size() <= 1) return; // nothing to do

        Stack<Integer> st = new Stack<>();
        // Dequeue all elements and push into stack
        while (!q.isEmpty()) {
            st.push(q.remove());
        }
        // Pop from stack and enqueue back to queue (reversed order)
        while (!st.isEmpty()) {
            q.add(st.pop());
        }
    }
}

// Demo Main to run locally
public class Main {
    public static void main(String[] args) {
        Queue<Integer> q = new LinkedList<>();
        int[] arr = {5, 10, 15, 20, 25};
        for (int v : arr) q.add(v);

        new Solution().reverseQueue(q);

        while (!q.isEmpty()) {
            System.out.print(q.remove());
            if (!q.isEmpty()) System.out.print(" ");
        }
        System.out.println();
    }
}
```

### JavaScript

```javascript
// Simple implementation assuming `q` is an Array where
// front is index 0 (so dequeue -> shift(), enqueue -> push())

class Solution {
    reverseQueue(q) {
        if (!q || q.length <= 1) return;
        const stack = [];
        // Dequeue all into stack
        while (q.length > 0) {
            stack.push(q.shift());
        }
        // Enqueue back from stack (reversed)
        while (stack.length > 0) {
            q.push(stack.pop());
        }
    }
}

// Demo run (Node.js)
const q = [5, 10, 15, 20, 25];
new Solution().reverseQueue(q);
console.log(q.join(' ')); // prints: 25 20 15 10 5
```

### Python3

```python3
# Using collections.deque for an efficient queue (popleft/append)
from collections import deque

class Solution:
    def reverseQueue(self, q: deque) -> None:
        # q is modified in-place
        if q is None or len(q) <= 1:
            return

        st = []
        # Dequeue all items into stack
        while q:
            st.append(q.popleft())
        # Enqueue back from stack (reversed order)
        while st:
            q.append(st.pop())

# Demo
if __name__ == '__main__':
    q = deque([5, 10, 15, 20, 25])
    Solution().reverseQueue(q)
    print(' '.join(map(str, q)))  # prints: 25 20 15 10 5
```

> Note: If the environment provides `queue.Queue`, the same logic applies using `get()`/`put()` instead of `popleft()`/`append()`.

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below I explain the C++ implementation line-by-line and then map the key lines to each other language.

### C++ (Line-by-line)

```c++
void reverseQueue(queue<int> &q) {
    if (q.empty() || q.size() == 1) return; // nothing to do

    stack<int> st;
    while (!q.empty()) {
        st.push(q.front()); // take front element and push to stack
        q.pop();            // remove it from queue
    }
    while (!st.empty()) {
        q.push(st.top()); // push the top of stack to the back of queue
        st.pop();         // remove it from stack
    }
}
```

* `if (q.empty() || q.size() == 1) return;` — Quick guard clause: zero or one element do not need reversing.
* `stack<int> st;` — Create an empty stack to reverse element order.
* First `while`: we move everything from front of queue to top of stack. The first dequeued item becomes bottom of stack.
* Second `while`: pop from stack and enqueue into queue. The top of stack (which was the original back of the queue) becomes the new front (after all operations), effectively reversing the sequence.

### Java (Mapping)

* `Stack<Integer> st = new Stack<>();` — same role as C++ `stack`.
* `q.remove()` or `q.poll()` — dequeues front; `q.add()` — enqueues to back.
* Algorithm steps are identical: move all queue -> stack, then stack -> queue.

### JavaScript (Mapping)

* Here I use an `Array` as queue. `q.shift()` is dequeue (O(n) on arrays, but acceptable for small constraints). `q.push(x)` enqueues.
* `stack.push(...)` and `stack.pop()` emulate stack behavior.

### Python (Mapping)

* `collections.deque` is preferred: `popleft()` is dequeue, `append()` is enqueue.
* `st = []` acts as stack with `append()`/`pop()`.

---

## Examples

**Example 1**

```bash
Input:  q = [5, 10, 15, 20, 25]
Output: q = [25, 20, 15, 10, 5]
```

**Example 2**

```bash
Input:  q = [1, 2, 3, 4, 5]
Output: q = [5, 4, 3, 2, 1]
```

## How to use / Run locally

**C++**

* Save the code block into `main.cpp`.
* Compile: `g++ -std=c++17 -O2 main.cpp -o main`
* Run: `./main`

**Java**

* Save to `Main.java` (the demo file uses public class `Main`).
* Compile: `javac Main.java`
* Run: `java Main`

**JavaScript**

* Save to `reverseQueue.js`.
* Run: `node reverseQueue.js`

**Python3**

* Save to `reverse_queue.py`.
* Run: `python3 reverse_queue.py`

## Notes & Optimizations

* This method uses O(n) extra space. If an explicit extra data structure is forbidden, a recursive solution can be used — but recursion consumes O(n) call stack space.
* For languages where array `shift()` is O(n) (e.g., JS arrays), if input size is large, use a deque-like structure (or implement queue using a linked list) to ensure O(1) dequeues.
* The solution is stable (preserves the elements themselves, only reverses order).

## Author

I (the repository owner) wrote this solution, explained the intuition, the approach, and added implementations in C++, Java, JavaScript, Python3, and Go. Feel free to open an issue or request another language or an in-place recursive version.
