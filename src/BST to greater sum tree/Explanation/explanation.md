# BST to Greater Sum Tree

> Convert a Binary Search Tree (BST) so that each node’s value is replaced by the **sum of all nodes greater than that node**.

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

Given the `root` of a BST with **unique node values**, transform it into a **greater sum tree** where each node’s value is replaced by the sum of all nodes strictly greater than that node (i.e., exclude the node’s original value).

Example:

* Input: BST with values `[11, 2, 29, 1, 7, 15, 40, 35]` (structure as BST)
* Output: Each node value replaced by sum of greater nodes.

---

## Constraints

* `1 ≤ node->data ≤ 3*10^4` (value constraints)
* `1 ≤ number of nodes ≤ 3*10^4`
* Values are unique (BST property assumed)
* Be mindful of recursion depth for very skewed trees

---

## Intuition

I thought about the BST property: every node’s right subtree contains values greater than the node and left subtree contains smaller values. If I traverse nodes **from largest to smallest**, i.e., do a **reverse in-order traversal** (right → node → left), I will encounter nodes in descending order. While traversing, I can keep a running sum (`acc`) of nodes visited so far; at the moment I visit a node, `acc` equals the sum of nodes greater than it. So I can overwrite the node with `acc`, then add the node’s original value to `acc` and continue.

---

## Approach

1. Do a reverse in-order traversal (right → node → left).
2. Maintain an accumulator variable `acc` initialized to 0.
3. On visiting a node:

   * store original `val = node.data`,
   * set `node.data = acc` (sum of greater nodes),
   * update `acc += val`.
4. Continue traversal to left subtree.
5. This modifies tree in-place, visiting each node exactly once.

---

## Data Structures Used

* Binary Tree Node structure (each node has `data`, `left`, `right`).
* Recursion stack (or explicit stack if iterative approach chosen).

---

## Operations & Behavior Summary

* `transformTree(root)` — in-place transforms the BST into the greater-sum tree.
* Uses reverse in-order traversal ensuring nodes are processed from largest to smallest so accumulator always holds sum of greater nodes.
* No auxiliary arrays or maps required.

---

## Complexity

* **Time Complexity:** `O(n)` — each of the `n` nodes is visited exactly once.
* **Space Complexity:** `O(h)` — recursion stack depth equals tree height `h`. Worst-case skewed tree gives `h = n`. Best-case balanced tree gives `h = log n`. No extra data structures used aside from the recursion stack.

---

## Multi-language Solutions

> All four implementations follow the same logic. I used a 64-bit accumulator for safety when summing many node values.

---

### C++

```c++
/*
class Node {
  public:
    int data;
    Node* left;
    Node* right;

    Node(int value) {
        data = value;
        left = nullptr;
        right = nullptr;
    }
};
*/

class Solution {
  private:
    long long acc = 0; // accumulator holds sum of visited (greater) nodes

    void dfs(Node* node) {
        if (!node) return;
        // visit right subtree first (greater values)
        dfs(node->right);

        // replace current node with sum of greater nodes
        int val = node->data;     // store original
        node->data = (int) acc;   // set to sum of greater nodes (acc)

        // include original value into accumulator for subsequent (smaller) nodes
        acc += val;

        // visit left subtree (smaller values)
        dfs(node->left);
    }

  public:
    void transformTree(Node *root) {
        acc = 0;
        dfs(root);
    }
};
```

---

### Java

```java
/*
class Node{
    int data;
    Node left;
    Node right;
    Node(int data){
        this.data = data;
        left=null;
        right=null;
    }
} */

class Solution {
    private static long acc = 0;

    private static void dfs(Node node) {
        if (node == null) return;

        // right subtree first
        dfs(node.right);

        // replace node's value with accumulator (sum of greater nodes)
        int val = node.data;
        node.data = (int) acc;
        acc += val;

        // left subtree
        dfs(node.left);
    }

    public static void transformTree(Node root) {
        acc = 0;
        dfs(root);
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {Node} root
 * @return {void}
 */

/*
class Node
{
    constructor(x){
        this.data=x;
        this.left=null;
        this.right=null;
    }
}
*/

class Solution {
    transformTree(root) {
        let acc = 0; // accumulator for sum of greater nodes

        function dfs(node) {
            if (node === null) return;

            // traverse right first (greater nodes)
            dfs(node.right);

            // replace value with sum of greater nodes
            const original = node.data;
            node.data = acc;

            // include this node's original value for smaller nodes
            acc += original;

            // traverse left subtree
            dfs(node.left);
        }

        dfs(root);
    }
}
```

---

### Python3

```python
'''
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
'''

class Solution:
    def transformTree(self, root):
        acc = 0  # accumulator

        def dfs(node):
            nonlocal acc
            if not node:
                return

            # right subtree first (greater nodes)
            dfs(node.right)

            # replace node.data with sum of greater nodes
            original = node.data
            node.data = acc

            # add the original to acc for smaller nodes
            acc += original

            # left subtree
            dfs(node.left)

        dfs(root)
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain with an easy-to-follow step-by-step mapping to the code above. The logic is identical across the four languages.

1. **Goal:** For each node `X`, set `X.data = sum of all nodes with value > X.data`.

2. **Key idea:** Reverse in-order traversal yields nodes in **descending** order (largest → smallest). If I keep a running `acc` of all node values I've already visited, at the moment I reach a node `X`, `acc` equals the sum of all nodes greater than `X`. So `node.data = acc`. After setting it, include `X`’s original value into `acc` so smaller nodes (visited later) include this value.

3. **Initialize `acc = 0`.**

4. **dfs(node):**

   * if `node == null` / `None`, return (base case).
   * `dfs(node.right)` → recursively process all nodes greater than `node`.
   * `val = node.data` → store original value.
   * `node.data = acc` → replace node value with sum of greater nodes.
   * `acc += val` → include node’s original value in accumulator.
   * `dfs(node.left)` → process smaller nodes.

5. **Call** `dfs(root)` from `transformTree(root)` with `acc` reset to `0`.

6. **Why it works:** When visiting `node`, all nodes in its right subtree (which are greater) have been visited and their values added to `acc`. So `acc` equals sum of greater nodes. Left subtree nodes are smaller, and will be processed after this node.

7. **Edge cases:**

   * Single node: `acc` is 0, so leaf becomes 0.
   * Skewed tree: recursion depth equals `n` (be mindful of language recursion limits).
   * Large sums: accumulator uses 64-bit (`long long` / `long`) in C++/Java to avoid overflow during accumulation. Final assignment back to `int` is assumed safe within problem limits.

---

## Examples

### Example 1

Input BST (inlevel order):
`[11, 2, 29, 1, 7, 15, 40, N, N, N, N, 35, N]`
After transform, nodes are replaced with sums of greater nodes.

### Example 2

Input BST: `[2, 1, 6, N, N, 3, 7]`
Output transformed tree: each node replaced with the sum of greater nodes.

(Visual diagrams can be added to your README or repo examples folder for clarity.)

---

## How to use / Run locally

### C++

1. Put your `Node` class, construct the tree, include `Solution` class.
2. Compile:

```bash
g++ -std=c++17 -O2 -o bst_greater bst_greater.cpp
./bst_greater
```

### Java

1. Place `Node` and `Solution` classes in files (e.g., `Solution.java`). Make a `Main` that constructs the tree and calls `Solution.transformTree(root)`.
2. Compile & run:

```bash
javac Solution.java Main.java
java Main
```

### JavaScript (Node)

1. Create `bst_greater.js` containing `Node`, tree builder, and `Solution` class.
2. Run:

```bash
node bst_greater.js
```

### Python3

1. Create `bst_greater.py` with `Node` and `Solution`.
2. Run:

```bash
python3 bst_greater.py
```

> For all languages: construct sample tree in your `main`/`if __name__ == "__main__":` section, call the `transformTree` method, then print tree (in-order or level-order) to verify.

---

## Notes & Optimizations

* **Recursion vs Iteration:** The recursive approach is simple and clear. For extremely deep (skewed) trees risking recursion limit, use an iterative reverse in-order with an explicit stack (space `O(h)` still) or use Morris traversal adaptation for reverse in-order to achieve `O(1)` extra space (complex to implement and more error-prone).
* **Accumulator type:** Use 64-bit accumulator to avoid overflow when summing many nodes (e.g., `long long` in C++ / `long` in Java). Problem constraints may allow 32-bit but safety is better.
* **In-place transformation:** The algorithm overwrites node values in-place — no extra arrays required.
* **Testing:** Test on balanced, skewed, and small edge cases (single node, two nodes) and verify by level-order printing.

---

## Author

[Md. Aarzoo Islam](https://bento.me/withaarzoo)
