# Postorder Traversal

> Return the postorder traversal (left → right → root) of a binary tree.

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

Given the `root` of a binary tree, return its **postorder traversal** — that means visit the left child (entire subtree), then the right child (entire subtree), and finally the node itself.

The result should be an array/list of node values in that order.

---

## Constraints

* `1 ≤ number of nodes ≤ 3 * 10^4`
* `0 ≤ node->data ≤ 10^5`
* Expected to run in linear time relative to number of nodes.

---

## Intuition

I thought about how recursion naturally follows postorder: call left, then right, then process current node. But recursion uses the program call stack, and for very deep trees it may cause stack overflow. So I tried to simulate recursion using an explicit stack. To ensure we visit nodes in left->right->root order with one stack, I kept a `lastVisited` pointer which tells me whether the right subtree of a node has already been processed. That way I know when it is safe to output a node.

---

## Approach

1. If `root` is `null`, return an empty list.
2. Use one explicit stack to simulate recursion.
3. Push nodes while going to the leftmost node.
4. When you cannot go left, look at the top of stack (peek):

   * If it has a right child that hasn't been visited yet, move to the right child to process it.
   * Otherwise, you can visit (output) the node and pop it from the stack.
5. Repeat until both the stack is empty and the current pointer is `null`.

This simulates recursive postorder using O(h) extra space where `h` is the tree height.

---

## Data Structures Used

* **Stack** — to maintain nodes along the current path (explicit simulation of call stack).
* **List / Array** — to collect the output in postorder.

---

## Operations & Behavior Summary

* Push nodes while traversing left children.
* When left is exhausted, peek the stack and either:

  * Traverse the right child (if exists and not yet visited), or
  * Visit (append) the peek node and pop it.
* Repeat until no nodes remain.

This ensures each node is visited exactly once and pushed/popped at most once.

---

## Complexity

* **Time Complexity:** `O(n)` — where `n` is the number of nodes in the tree. Each node is pushed and popped at most once and visited once.
* **Space Complexity:** `O(h)` — where `h` is the height of the tree (the stack holds at most one root-to-leaf path). In worst case of a skewed tree, `h = n`, so `O(n)` worst-case space. Average/balanced case: `O(log n)`.

---

## Multi-language Solutions

### C++

```c++
/*
class Node {
  public:
    int data;
    Node* left;
    Node* right;

    Node(int val) {
        data = val;
        left = NULL;
        right = NULL;
    }
};
*/

#include <vector>
#include <stack>

class Solution {
  public:
    std::vector<int> postOrder(Node* root) {
        std::vector<int> result;
        if (!root) return result;

        std::stack<Node*> st;
        Node* curr = root;
        Node* lastVisited = nullptr; // keeps track of last visited node

        while (curr != nullptr || !st.empty()) {
            if (curr != nullptr) {
                st.push(curr);
                curr = curr->left;
            } else {
                Node* peekNode = st.top();
                if (peekNode->right != nullptr && lastVisited != peekNode->right) {
                    // right child exists and not processed yet
                    curr = peekNode->right;
                } else {
                    // either no right child or right already processed
                    result.push_back(peekNode->data);
                    lastVisited = peekNode;
                    st.pop();
                }
            }
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
    Node left, right;
    Node(int val){
        data = val;
        left = right = null;
    }
}
*/

import java.util.ArrayList;
import java.util.Stack;

class Solution {
    public ArrayList<Integer> postOrder(Node root) {
        ArrayList<Integer> result = new ArrayList<>();
        if (root == null) return result;

        Stack<Node> st = new Stack<>();
        Node curr = root;
        Node lastVisited = null;

        while (curr != null || !st.isEmpty()) {
            if (curr != null) {
                st.push(curr);
                curr = curr.left;
            } else {
                Node peekNode = st.peek();
                if (peekNode.right != null && lastVisited != peekNode.right) {
                    curr = peekNode.right;
                } else {
                    result.add(peekNode.data);
                    lastVisited = peekNode;
                    st.pop();
                }
            }
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
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
*/

class Solution {
    postOrder(root) {
        const result = [];
        if (!root) return result;

        const st = []; // stack as array
        let curr = root;
        let lastVisited = null;

        while (curr !== null || st.length > 0) {
            if (curr !== null) {
                st.push(curr);
                curr = curr.left;
            } else {
                const peekNode = st[st.length - 1];
                if (peekNode.right !== null && lastVisited !== peekNode.right) {
                    curr = peekNode.right;
                } else {
                    result.push(peekNode.data);
                    lastVisited = peekNode;
                    st.pop();
                }
            }
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

class Solution:
    def postOrder(self, root):
        result = []
        if root is None:
            return result

        stack = []
        curr = root
        lastVisited = None

        while curr is not None or stack:
            if curr is not None:
                stack.append(curr)
                curr = curr.left
            else:
                peekNode = stack[-1]
                if peekNode.right is not None and lastVisited is not peekNode.right:
                    curr = peekNode.right
                else:
                    result.append(peekNode.data)
                    lastVisited = peekNode
                    stack.pop()
        return result
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain the single-stack iterative method. The pattern is the same in all four implementations; only syntax differs.

### Common idea (one-stack iterative)

1. Initialize an empty `result` list. If `root` is `null`, return `result`.
2. Create an empty stack and set `curr = root`, `lastVisited = null`.
3. Loop while `curr` is not `null` or stack is not empty:

   * If `curr` is not `null`, push it onto the stack and move to its left child (`curr = curr.left`). This simulates recursion into the left subtree.
   * Otherwise, `curr` is `null` and there's a node to consider at the top of stack:

     * Let `peek` be the top node of the stack.
     * If `peek` has a right child and `lastVisited` is not that right child, we still need to process right subtree, so set `curr = peek.right`.
     * Else, right subtree is already processed (or doesn't exist), so we can safely visit `peek`: append its value to `result`, set `lastVisited = peek`, and pop the stack.
4. After the loop ends, `result` contains nodes in left → right → root order.

### Line-by-line reasoning (example mapping to code)

* `if (root == null) return result;` — nothing to do if the tree is empty.
* `stack.push(curr)` / `stack.append(curr)` — record the node before going left.
* `curr = curr.left` — always try to finish left subtree first.
* `peek = stack.peek()` — inspect the node which we're ready to finish after its children.
* `if (peek.right != null && lastVisited != peek.right) curr = peek.right` — we must visit the right subtree first.
* `else { result.add(peek.val); lastVisited = peek; stack.pop(); }` — visit the node after both children are done.

Because each node enters the stack once and leaves once, we achieve a linear runtime.

---

## Examples

1. Input: `root = [19, 10, 8, 11, 13]` (visual tree from the problem)

   * Output: `[11, 13, 10, 8, 19]`
   * Explanation: Visit left subtree of 19 → (10), left of 10 → 11 (leaf), back to 10, right of 10 → 13, then 10, back to 19, right of 19 → 8, then 19.

2. Input: `root = [11, 15, N, 7]` (a skewed left-ish tree)

   * Output: `[7, 15, 11]`

---

## How to use / Run locally

These examples assume you create a small driver to build the `Node` tree and call the shown `postOrder` function. Below are typical commands for each language.

### C++

1. Put the `Node` class, `Solution` class, and a `main()` driver in `Postorder.cpp`.
2. Compile and run:

```bash
g++ -std=c++17 Postorder.cpp -o postorder
./postorder
```

### Java

1. Put `Node` class and `Solution` into `Solution.java` and a `Main` class with `public static void main` to build the tree and print result.
2. Compile and run:

```bash
javac Solution.java Main.java
java Main
```

### JavaScript (Node.js)

1. Put the code into `solution.js` and add a small driver that constructs `Node` objects and calls `new Solution().postOrder(root)`.
2. Run:

```bash
node solution.js
```

### Python3

1. Put `Node` and `Solution` in `solution.py` and add a `if __name__ == "__main__":` block to build the tree and call `Solution().postOrder(root)`.
2. Run:

```bash
python3 solution.py
```

---

## Notes & Optimizations

* **Recursive version** is simpler to write and reads naturally (left, right, root):

```python
def postorder(node):
    if not node: return []
    return postorder(node.left) + postorder(node.right) + [node.data]
```

But recursion uses the system call stack which can overflow on deep trees.

* **Two-stack iterative variant**: push nodes to stack1, pop & push children, then pop stack2 to get postorder. That method is easy but uses `O(n)` extra space.

* **Single-stack iterative method (used here)**: uses `O(h)` extra space, where `h` is tree height — better for memory if tree is balanced.

* **Morris postorder traversal** exists (threaded binary tree) and achieves `O(1)` extra space (excluding output) but is more complex and mutates tree pointers temporarily.

* For extremely deep trees, prefer iterative single-stack or Morris (if allowed) to avoid recursion limits.

---

## Author

[Md. Aarzoo Islam](https://bento.me/withaarzoo)
