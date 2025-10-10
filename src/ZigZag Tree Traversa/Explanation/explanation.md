# ZigZag Tree Traversal

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

Given the `root` of a binary tree, return the zig-zag (also called spiral or alternating) level order traversal of its nodes' values.

In zig-zag traversal, I traverse nodes from **left → right** for odd-numbered levels (1, 3, ...) and **right → left** for even-numbered levels (2, 4, ...).

I must return a single list containing the node values in the order they were visited.

## Constraints

* `1 <= number of nodes <= 10^5`
* `1 <= node->data <= 10^5`
* Tree can be skewed or balanced.

These constraints mean my solution must be linear time and use space proportional to the tree size in the worst case.

---

## Intuition

I thought about the normal level-order traversal (BFS) because zig-zag is simply level-order but with alternating directions per level. If I process the tree level by level, I can collect nodes for each level and insert them into a temporary container in either left→right or right→left order. After processing a level I append its values to the final result and flip the direction for the next level.

This leads to a simple, clear solution that visits each node exactly once.

---

## Approach

1. If `root` is `null`, return an empty list.
2. Use a queue to perform BFS level-by-level.
3. For each level:

   * Read the number of nodes at that level (`levelSize = queue.size()`).
   * Use a small temporary container sized to `levelSize` (e.g., a `deque` or fixed-size array).
   * For each node in the level, pop it from the queue and write its value into the temporary container at the correct position depending on current direction. Then enqueue the node's children.
   * After finishing the level, append temporary container contents to the answer and toggle the direction.
4. Continue until the queue is empty, then return the result.

I prefer `deque` (or a LinkedList / array with index mapping) because it allows O(1) additions at both ends or direct indexed writes, avoiding costly shifts.

---

## Data Structures Used

* **Queue** (BFS): to process nodes level by level.
* **Deque / LinkedList / Fixed-size array** (temporary per-level storage): to place values in left→right or right→left order quickly.
* **Result list/array**: to store final traversal.

---

## Operations & Behavior Summary

* Enqueue root.
* While queue not empty:

  * Record `levelSize`.
  * Use a per-level container of size `levelSize`.
  * For `i` in `0..levelSize-1`:

    * Dequeue node.
    * If `leftToRight`: write at index `i` (append). Otherwise write at index `levelSize-1-i` (reverse position).
    * Enqueue left child if exists, then right child if exists.
  * Append per-level container to result and flip `leftToRight`.

This ensures stable O(1) writes per node and O(1) queue operations per node.

---

## Complexity

* **Time Complexity:** O(n) — I visit every node exactly once. (`n` = number of nodes)
* **Space Complexity:** O(n) — In the worst case the queue + result + per-level container together store O(n) elements (skewed or full last level).

---

## Multi-language Solutions

### C++

```c++
/*
class Node {
    public:
    int data;
    Node *left;
    Node *right;

    Node(int val) {
        data = val;
        left = right = NULL;
    }
};
*/

#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    vector<int> zigZagTraversal(Node* root) {
        vector<int> result;
        if (!root) return result;

        queue<Node*> q;
        q.push(root);
        bool leftToRight = true;

        while (!q.empty()) {
            int levelSize = q.size();
            deque<int> levelVals; // efficient add at both ends

            for (int i = 0; i < levelSize; ++i) {
                Node* node = q.front();
                q.pop();

                if (leftToRight) levelVals.push_back(node->data);
                else levelVals.push_front(node->data);

                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }

            for (int v : levelVals) result.push_back(v);
            leftToRight = !leftToRight;
        }

        return result;
    }
};
```

---

### Java

```java
/*
class Node {
    int data;
    Node left,right;
    Node(int d)
    {
        data=d;
        left=right=null;
    }
}
*/

import java.util.*;

class Solution {
    ArrayList<Integer> zigZagTraversal(Node root) {
        ArrayList<Integer> result = new ArrayList<>();
        if (root == null) return result;

        Queue<Node> q = new LinkedList<>();
        q.add(root);
        boolean leftToRight = true;

        while (!q.isEmpty()) {
            int levelSize = q.size();
            LinkedList<Integer> levelVals = new LinkedList<>(); // addFirst/addLast

            for (int i = 0; i < levelSize; i++) {
                Node node = q.poll();

                if (leftToRight) levelVals.addLast(node.data);
                else levelVals.addFirst(node.data);

                if (node.left != null) q.add(node.left);
                if (node.right != null) q.add(node.right);
            }

            result.addAll(levelVals);
            leftToRight = !leftToRight;
        }

        return result;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {Node} root
 * @returns {number[]}
 */

/*
class Node{
    constructor(val){
        this.data = val;
        this.left = null;
        this.right = null;
    }
}
*/

class Solution {
    zigZagTraversal(root) {
        const result = [];
        if (root == null) return result;

        // Use array as a queue with a front pointer to avoid costly shifts
        const queue = [root];
        let front = 0;
        let leftToRight = true;

        while (front < queue.length) {
            const levelSize = queue.length - front;
            const levelVals = new Array(levelSize);

            for (let i = 0; i < levelSize; ++i) {
                const node = queue[front++];
                const pos = leftToRight ? i : (levelSize - 1 - i);
                levelVals[pos] = node.data;

                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }

            for (const v of levelVals) result.push(v);
            leftToRight = !leftToRight;
        }

        return result;
    }
}
```

---

### Python3

```python3
'''
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
'''

from collections import deque

class Solution:
    def zigZagTraversal(self, root):
        result = []
        if not root:
            return result

        q = deque([root])
        leftToRight = True

        while q:
            level_size = len(q)
            level_vals = deque()  # appendleft is O(1)

            for _ in range(level_size):
                node = q.popleft()

                if leftToRight:
                    level_vals.append(node.data)
                else:
                    level_vals.appendleft(node.data)

                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)

            result.extend(level_vals)
            leftToRight = not leftToRight

        return result
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below I explain the important blocks and logic used in the solutions. The same idea is implemented in each language; differences are only in language-specific containers.

### Shared logical steps (what I do in every language)

1. **Empty tree check**: If `root` is null, return an empty list.
2. **BFS queue**: I push the root into a queue and loop while queue not empty.
3. **Level size**: For each iteration, I take `levelSize = size of queue` — these nodes form the current level.
4. **Per-level container**: I prepare a per-level container sized to `levelSize`. I either use a `deque` (C++/Python), `LinkedList` (Java), or fixed-size array (JS) to place values in constant time into left→right or right→left positions.
5. **Process nodes**: For each node in level:

   * Pop it from the queue.
   * Insert its value into the per-level container at the correct position depending on `leftToRight`.
   * Add children (left then right) into the queue for next level.
6. **Append & toggle**: Append the per-level container to `result` and flip `leftToRight`.

### Why `deque` or indexed writes?

* `deque` in C++/Python supports O(1) `push_front` and `push_back`, so reversing order is cheap.
* Java's `LinkedList` gives `addFirst`/`addLast` which are O(1).
* In JavaScript I avoid `.shift()` on arrays (O(n)) by using a `front` pointer and a fixed-length `levelVals` array and writing by index.

### Example walk-through (brief)

For the tree `[1,2,3,4,5,6,7]`:

* Level 1: queue `[1]`, leftToRight `true` → level `[1]`
* Level 2: queue `[2,3]`, leftToRight `false` → take nodes in queue order but write to positions reversed → level `[3,2]`
* Level 3: queue `[4,5,6,7]`, leftToRight `true` → level `[4,5,6,7]`
* Final result: `[1,3,2,4,5,6,7]`.

---

## Examples

**Example 1**

* Input (level-order): `[1, 2, 3, 4, 5, 6, 7]`
* Tree (visual):

```
    1
   / \
  2   3
 / \ / \
4  5 6  7
```

* Output: `[1, 3, 2, 4, 5, 6, 7]`

**Example 2**

* Input (level-order): `[7, 9, 7, 8, 8, 6, N, 10, 9]` (N = null)
* Output: `[7, 7, 9, 8, 8, 6, 9, 10]`

---

## How to use / Run locally

**C++**

1. Place your `Node` definition and `main()` driver in a `.cpp` file and include the `Solution` class above.
2. Compile: `g++ -std=c++17 ZigZag.cpp -o ZigZag`
3. Run: `./ZigZag`

**Java**

1. Put the `Node` and `Solution` classes in `.java` files (or one file) and add a `main` to create a tree and print results.
2. Compile: `javac ZigZag.java`
3. Run: `java ZigZag`

**JavaScript (Node.js)**

1. Add code in a `.js` file and create a driver to build nodes and call `zigZagTraversal`.
2. Run: `node ZigZag.js`

**Python3**

1. Add driver code that constructs the tree and calls `Solution().zigZagTraversal(root)`.
2. Run: `python3 zigzag.py`

---

## Notes & Optimizations

* I use `deque`/`LinkedList`/indexed writes to keep per-node operations O(1).
* Alternative approach: two stacks — push children into one stack in left/right order and pop from the other — also works and gives O(n) time and O(n) space.
* For extremely memory-constrained environments you could try to write in-place if the data structure allowed it, but for classic binary tree nodes this is not typical.
* This solution is robust up to `10^5` nodes (watch recursion depth: we do BFS so recursion isn't used).

---

## Author

* [Aarzoo Islam](https://bento.me/withaarzoo)
