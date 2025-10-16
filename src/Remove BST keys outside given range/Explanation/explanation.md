# Remove BST keys outside given range

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

Given the root of a Binary Search Tree (BST) and two integers `l` and `r`, remove all nodes whose values lie outside the inclusive range `[l, r]`. The resulting tree must still be a valid BST. Return the new root after removals.

In short: trim a BST to only keep keys within `[l, r]`.

## Constraints

* `1 ≤ number of nodes ≤ 10^4` (typical constraint)
* Node values fit in the language's integer type.
* `l ≤ r`
* The input tree is a BST (left < node < right).

## Intuition

I thought about how a BST organizes values: every node's left subtree contains smaller values and the right subtree contains larger values. So:

* If a node's value is less than `l`, then its left subtree (all smaller) is certainly out of range — I can discard it and only consider the right subtree.
* If a node's value is greater than `r`, then its right subtree (all larger) is out of range — I can discard it and only consider the left subtree.
* If a node's value is within `[l, r]`, I keep the node and recursively process both children.

This gives a straightforward recursive algorithm that visits each node at most once and preserves BST properties.

## Approach

1. Use recursion to traverse the tree.
2. For a given node:

   * If node is `null`, return `null`.
   * If `node.data < l`, discard the node and its left subtree, then return `removekeys(node.right, l, r)`.
   * If `node.data > r`, discard the node and its right subtree, then return `removekeys(node.left, l, r)`.
   * Otherwise node is in range: set `node.left = removekeys(node.left, l, r)` and `node.right = removekeys(node.right, l, r)`, then return `node`.
3. This trims out-of-range nodes while keeping the structure and ordering of the remaining BST intact.

## Data Structures Used

* Binary Tree node structure (Node) with `data`, `left`, and `right` pointers/references.
* Recursion stack (no extra heap data structures).

## Operations & Behavior Summary

* Recursion drives trimming.
* Discard entire subtrees when the root value proves they are all out of range (uses BST property).
* Re-link trimmed subtrees back to parents when node stays in range.
* Each node processed only once.

## Complexity

* **Time Complexity:** `O(n)` where `n` is the number of nodes in the tree. Each node is visited at most once.
* **Space Complexity:** `O(h)` where `h` is the tree height (recursion stack). Worst-case `h = n` (skewed tree) → `O(n)`. Best case balanced tree `h = O(log n)`.

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

class Solution {
  public:
    Node* removekeys(Node* root, int l, int r) {
        if (root == nullptr) return nullptr;

        // If current node is smaller than range, discard left subtree
        if (root->data < l) {
            return removekeys(root->right, l, r);
        }

        // If current node is greater than range, discard right subtree
        if (root->data > r) {
            return removekeys(root->left, l, r);
        }

        // Node is in range: recursively fix left and right subtrees
        root->left = removekeys(root->left, l, r);
        root->right = removekeys(root->right, l, r);
        return root;
    }
};
```

---

### Java

```java
/*
class Node {
    int data;
    Node left;
    Node right;
    Node(int data){
        this.data = data;
        left=null;
        right=null;
    }
}
*/

class Solution {
    Node removekeys(Node root, int l, int r) {
        if (root == null) return null;

        // If value is less than l, ignore left subtree and process right subtree
        if (root.data < l) {
            return removekeys(root.right, l, r);
        }

        // If value is greater than r, ignore right subtree and process left subtree
        if (root.data > r) {
            return removekeys(root.left, l, r);
        }

        // Node is within range, recursively trim left and right
        root.left = removekeys(root.left, l, r);
        root.right = removekeys(root.right, l, r);
        return root;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {Node} root
 * @param {number} l
 * @param {number} r
 * @return {Node}
 */

/*
class Node {
    constructor(x){
        this.data=x;
        this.left=null;
        this.right=null;
    }
}
*/

class Solution {
    removekeys(root, l, r) {
        if (root === null) return null;

        // If node value is less than l -> left subtree all too small
        if (root.data < l) {
            return this.removekeys(root.right, l, r);
        }

        // If node value is greater than r -> right subtree all too large
        if (root.data > r) {
            return this.removekeys(root.left, l, r);
        }

        // Node is within range -> keep it and process children
        root.left = this.removekeys(root.left, l, r);
        root.right = this.removekeys(root.right, l, r);
        return root;
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
    def removekeys(self, root, l, r):
        # Base case
        if root is None:
            return None

        # If node value < l, discard left subtree and process right subtree
        if root.data < l:
            return self.removekeys(root.right, l, r)

        # If node value > r, discard right subtree and process left subtree
        if root.data > r:
            return self.removekeys(root.left, l, r)

        # Node is within range: recursively fix both children
        root.left = self.removekeys(root.left, l, r)
        root.right = self.removekeys(root.right, l, r)
        return root
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll walk through the algorithm using the Python version lines and explain the corresponding idea — the other languages follow the same logic with language-specific syntax.

1. **Base case:**

   ```python
   if root is None:
       return None
   ```

   * If there's no node, there's nothing to process. Return `None`.

2. **Node value < l:**

   ```python
   if root.data < l:
       return self.removekeys(root.right, l, r)
   ```

   * Because of BST properties, every value in `root.left` is `< root.data < l`. So the whole left subtree is out-of-range and can be discarded.
   * The correct tree that may remain must come from the right subtree only — so we recursively trim the right subtree and return it as the replacement for the current node.

3. **Node value > r:**

   ```python
   if root.data > r:
       return self.removekeys(root.left, l, r)
   ```

   * Similarly, if the node is too large, all values in `root.right` are even larger and out-of-range.
   * We discard the right subtree and recursively process the left subtree. The returned left subtree replaces the current node.

4. **Node inside `[l, r]`:**

   ```python
   root.left = self.removekeys(root.left, l, r)
   root.right = self.removekeys(root.right, l, r)
   return root
   ```

   * The node is valid. We keep it, but we must still ensure both left and right children are trimmed correctly.
   * Recursively assign trimmed subtrees back to the node and return the node.

5. **Why this maintains BST property:**

   * When replacing a node with one of its children (after trimming), the returned subtree's nodes are known to lie on the correct side of the ancestor due to BST order; thus ordering remains valid.
   * When we keep a node and reattach trimmed children, both subtrees contain values within `[l, r]` and remain ordered.

6. **Edge cases handled:**

   * All nodes removed → function eventually returns `None`.
   * Single node → either returned as-is or removed depending on `[l, r]`.
   * Skewed trees → recursion depth equals number of nodes; check environment recursion limits if necessary (or translate to iterative approach).

---

## Examples

1. **Example 1**

   * Input BST (in-order): `[-13, -8, 6, 13, 14, 15]`, range `[-10, 13]`.
   * Output BST (in-order): `[-8, 6, 13]`
   * Explanation: Nodes `-13`, `14`, `15` removed.

2. **Example 2**

   * Input BST (in-order): `[-8, 2, 3, 4, 7, 8, 10, 14, 15, 16]`, range `[2, 6]`.
   * Output BST (in-order): `[2, 3, 4]` (structure: 4 -> left 2 -> right 3)
   * Explanation: Nodes outside `[2,6]` removed and remaining nodes form a valid BST.

---

## How to use / Run locally

### C++

* Place the `Node` and `Solution` classes into your project.
* Build with a standard C++ compiler (g++ / clang++).
* Example:

  ```bash
  g++ -std=c++17 -O2 -o trim_bst trim_bst.cpp
  ./trim_bst
  ```

### Java

* Put `Node` and `Solution` classes in `.java` files (same package or default package).
* Compile and run:

  ```bash
  javac Solution.java
  java Solution
  ```

### JavaScript (Node.js)

* Save JS code to `trim_bst.js` and use Node to run (you will need a driver to build the BST and call `removekeys`).

  ```bash
  node trim_bst.js
  ```

### Python3

* Save the code to `trim_bst.py` and create a small driver to build a `Node` tree and call `Solution().removekeys(root, l, r)`.

  ```bash
  python3 trim_bst.py
  ```

(Driver code is straightforward: create nodes, link them, then call the method and print in-order traversal to verify results.)

---

## Notes & Optimizations

* This recursive solution is already optimal in time (`O(n)`) and uses only recursion stack additional memory (`O(h)`).
* If recursion depth is a concern for very skewed trees (e.g., `n = 10^4`), increase recursion limit (Python) or convert to an iterative approach with an explicit stack.
* No extra memory (like arrays or hash maps) is necessary — we trim in-place.
* The algorithm relies heavily on the BST property; it does not apply to arbitrary binary trees.

---

## Author

[Md. Aarzoo Islam](https://bento.me/withaarzoo)
