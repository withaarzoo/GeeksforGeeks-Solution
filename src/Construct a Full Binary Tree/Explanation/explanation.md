# Construct a Full Binary Tree | Full Binary Tree Construction from Preorder and Mirror Preorder Traversals

## Table of Contents

- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations & Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
  - [C++](#c)
  - [Java](#java)
  - [JavaScript](#javascript)
  - [Python3](#python3)
- [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

---

## Problem Summary

In this problem, we are given two arrays containing unique values.

- The first array represents the **preorder traversal** of a full binary tree.
- The second array represents the **preorder traversal of the mirror** of that same tree.

The goal is to reconstruct the original full binary tree and return its root.

Unlike a normal binary tree, a **full binary tree** guarantees that every node has either exactly two children or no children at all. This special property makes it possible to uniquely reconstruct the tree using these two traversals.

This problem is a great exercise for understanding binary tree construction, recursion, preorder traversal, mirror trees, and efficient use of hash maps.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Number of nodes | `1 ≤ n ≤ 10^5` |
| Node value | `0 ≤ value ≤ 10^9` |
| All values | Unique |

---

## Intuition

My first observation was that constructing a normal binary tree using only preorder traversal is impossible because multiple trees can generate the same traversal.

The key difference here is that the tree is **full**.

Since every internal node always has exactly two children, the structure becomes much less ambiguous.

I also noticed something interesting about the traversals.

- In the original preorder traversal, the node immediately after the root is always the left child.
- In the mirror preorder traversal, the node immediately after the root is always the right child.

Once I know where those child nodes appear inside the opposite traversal, I can figure out how many nodes belong to each subtree.

To make these lookups fast, I store the index of every value using hash maps.

---

## Approach

I solve the problem recursively.

First, I create two hash maps.

- One stores the position of every value in the preorder traversal.
- The second stores the position of every value in the mirror preorder traversal.

For every recursive call:

1. The first node of the current preorder range becomes the root.
2. If only one node exists, I return it immediately because it is a leaf.
3. Otherwise, the next preorder element is the left child.
4. The next mirror preorder element is the right child.
5. Using the stored indices, I calculate how many nodes belong to the left subtree.
6. I split both traversals into left and right parts.
7. I recursively build the left subtree.
8. I recursively build the right subtree.
9. Finally, I attach both subtrees to the current root.

Since every node is processed only once, the solution is very efficient.

---

## Data Structures Used

| Data Structure | Purpose |
| --------------- | --------- |
| Hash Map | Stores the index of every value in both traversals for O(1) lookup |
| Recursion | Builds each subtree naturally from the traversal ranges |
| Binary Tree Nodes | Stores the reconstructed full binary tree |

---

## Operations & Behavior Summary

The algorithm works in the following order:

1. Read both preorder arrays.
2. Store every node's index inside two hash maps.
3. Start building the tree from the entire traversal range.
4. Create the current root.
5. Stop immediately if it is a leaf node.
6. Find the left child and right child.
7. Compute the size of the left subtree.
8. Split both traversal ranges.
9. Recursively construct the left subtree.
10. Recursively construct the right subtree.
11. Return the completed subtree.
12. Continue until every node has been constructed exactly once.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | **O(n)** | Every node is visited exactly once, and every hash map lookup takes constant time. |
| Space Complexity | **O(n)** | Extra space is used for the hash maps and the recursive call stack. |

---

## Multi-language Solutions

### C++

```cpp
/* Structure of Binary Tree Node
class Node {
public:
    int data;
    Node *left;
    Node *right;

    Node(int val) {
        data = val;
        left = right = nullptr;
    }
};*/

class Solution {
    unordered_map<int, int> prePos, mirrorPos;

    // Recursively builds the tree using current ranges
    Node* build(vector<int>& pre, vector<int>& mirror,
                int ps, int pe, int ms, int me) {

        // No nodes left
        if (ps > pe) return nullptr;

        // Create current root
        Node* root = new Node(pre[ps]);

        // Leaf node
        if (ps == pe) return root;

        // Next preorder element is left child
        int leftRoot = pre[ps + 1];

        // Next mirror preorder element is right child
        int rightRoot = mirror[ms + 1];

        // Position of right child in preorder
        int rightPos = prePos[rightRoot];

        // Number of nodes in left subtree
        int leftSize = rightPos - (ps + 1);

        // Build left subtree
        root->left = build(pre, mirror,
                           ps + 1, ps + leftSize,
                           mirrorPos[leftRoot], me);

        // Build right subtree
        root->right = build(pre, mirror,
                            ps + leftSize + 1, pe,
                            ms + 1, mirrorPos[rightRoot]);

        return root;
    }

public:
    Node *constructBinaryTree(vector<int> &pre, vector<int> &preMirror) {

        int n = pre.size();

        // Store index of every value in preorder
        for (int i = 0; i < n; i++)
            prePos[pre[i]] = i;

        // Store index of every value in mirror preorder
        for (int i = 0; i < n; i++)
            mirrorPos[preMirror[i]] = i;

        // Build the complete tree
        return build(pre, preMirror, 0, n - 1, 0, n - 1);
    }
};
```

### Java

```java
/* Structure of Binary Tree Node
class Node {
    int data;
    Node left, right;

    Node(int val) {
        data = val;
        left = right = null;
    }
} */

import java.util.*;

class Solution {

    HashMap<Integer, Integer> prePos = new HashMap<>();
    HashMap<Integer, Integer> mirrorPos = new HashMap<>();

    // Recursively constructs the tree
    private Node build(int[] pre, int[] mirror,
                       int ps, int pe, int ms, int me) {

        // Empty range
        if (ps > pe) return null;

        // Create current root
        Node root = new Node(pre[ps]);

        // Leaf node
        if (ps == pe) return root;

        // Left child in preorder
        int leftRoot = pre[ps + 1];

        // Right child in mirror preorder
        int rightRoot = mirror[ms + 1];

        // Position of right subtree root
        int rightPos = prePos.get(rightRoot);

        // Size of left subtree
        int leftSize = rightPos - (ps + 1);

        // Build left subtree
        root.left = build(pre, mirror,
                ps + 1, ps + leftSize,
                mirrorPos.get(leftRoot), me);

        // Build right subtree
        root.right = build(pre, mirror,
                ps + leftSize + 1, pe,
                ms + 1, mirrorPos.get(rightRoot));

        return root;
    }

    public Node constructBinaryTree(int[] pre, int[] preMirror) {

        int n = pre.length;

        // Store preorder indices
        for (int i = 0; i < n; i++)
            prePos.put(pre[i], i);

        // Store mirror preorder indices
        for (int i = 0; i < n; i++)
            mirrorPos.put(preMirror[i], i);

        // Construct and return the tree
        return build(pre, preMirror, 0, n - 1, 0, n - 1);
    }
}
```

### JavaScript

```javascript
/* Structure of Binary Tree Node
class Node
{
    constructor(val){
        this.data = val;
        this.left = null;
        this.right = null;
    }
} */

class Solution {

    constructBinaryTree(pre, preMirror) {

        // Store positions of every value
        const prePos = new Map();
        const mirrorPos = new Map();

        for (let i = 0; i < pre.length; i++)
            prePos.set(pre[i], i);

        for (let i = 0; i < preMirror.length; i++)
            mirrorPos.set(preMirror[i], i);

        // Recursive helper
        const build = (ps, pe, ms, me) => {

            // Empty range
            if (ps > pe) return null;

            // Create current root
            const root = new Node(pre[ps]);

            // Leaf node
            if (ps === pe) return root;

            // Left child in preorder
            const leftRoot = pre[ps + 1];

            // Right child in mirror preorder
            const rightRoot = preMirror[ms + 1];

            // Position of right subtree root
            const rightPos = prePos.get(rightRoot);

            // Left subtree size
            const leftSize = rightPos - (ps + 1);

            // Build left subtree
            root.left = build(
                ps + 1,
                ps + leftSize,
                mirrorPos.get(leftRoot),
                me
            );

            // Build right subtree
            root.right = build(
                ps + leftSize + 1,
                pe,
                ms + 1,
                mirrorPos.get(rightRoot)
            );

            return root;
        };

        // Build the complete tree
        return build(0, pre.length - 1, 0, preMirror.length - 1);
    }
}
```

### Python3

```python
''' Structure of Binary Tree Node
class Node:
    def __init__(self, val):
        self.data = val
        self.right = None
        self.left = None
'''

class Solution:

    def constructBinaryTree(self, pre, preMirror):

        # Store index of every value in preorder
        pre_pos = {value: i for i, value in enumerate(pre)}

        # Store index of every value in mirror preorder
        mirror_pos = {value: i for i, value in enumerate(preMirror)}

        # Recursive function to build the tree
        def build(ps, pe, ms, me):

            # Empty range
            if ps > pe:
                return None

            # Create current root
            root = Node(pre[ps])

            # Leaf node
            if ps == pe:
                return root

            # Left child in preorder
            left_root = pre[ps + 1]

            # Right child in mirror preorder
            right_root = preMirror[ms + 1]

            # Position of right subtree root
            right_pos = pre_pos[right_root]

            # Size of left subtree
            left_size = right_pos - (ps + 1)

            # Build left subtree
            root.left = build(
                ps + 1,
                ps + left_size,
                mirror_pos[left_root],
                me
            )

            # Build right subtree
            root.right = build(
                ps + left_size + 1,
                pe,
                ms + 1,
                mirror_pos[right_root]
            )

            return root

        # Return the constructed tree
        return build(0, len(pre) - 1, 0, len(preMirror) - 1)
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in every language.

The only difference is the syntax used for recursion, hash maps, and creating tree nodes.

The solution starts by storing the index of every node in both traversals.

This allows every lookup to happen in constant time instead of searching through the array repeatedly.

Next, the recursive function receives the current range of the preorder traversal and the current range of the mirror preorder traversal.

The first node of the preorder range always becomes the root because preorder traversal always visits the root first.

If the current range contains only one node, recursion stops immediately because that node is a leaf.

Otherwise, the algorithm identifies:

- the left child from the preorder traversal
- the right child from the mirror preorder traversal

Using the stored indices, it calculates how many nodes belong to the left subtree.

Once the subtree size is known, both traversals can be divided into left and right portions.

The left subtree is constructed recursively.

After that, the right subtree is constructed in the same way.

Both returned subtrees are attached to the current root.

Finally, the completed subtree is returned to its parent.

Since every recursive call constructs one node, each node is processed exactly one time.

This is what allows the algorithm to achieve linear time complexity.

---

## Examples

### Example 1

**Input**

```text
pre = [0,1,2]

preMirror = [0,2,1]
```

**Output**

```text
[0,1,2]
```

**Trace**

- Root = 0
- Left child = 1
- Right child = 2
- Both children are leaf nodes
- Construction finishes

---

### Example 2

**Input**

```text
pre = [1,2,4,5,3,6,7]

preMirror = [1,3,7,6,2,5,4]
```

**Output**

```text
[1,2,4,5,3,6,7]
```

**Trace**

- Root = 1
- Left subtree starts with 2
- Right subtree starts with 3
- Recursively build subtree rooted at 2
- Recursively build subtree rooted at 3
- Continue until every leaf node is created

---

### Example 3

**Input**

```text
pre = [10]

preMirror = [10]
```

**Output**

```text
[10]
```

**Trace**

Only one node exists.

It becomes the root and the recursion stops immediately.

---

## How to Use / Run Locally

### C++

Compile

```bash
g++ main.cpp -o main
```

Run

```bash
./main
```

---

### Java

Compile

```bash
javac Main.java
```

Run

```bash
java Main
```

---

### JavaScript

Run using Node.js

```bash
node main.js
```

---

### Python3

Run

```bash
python main.py
```

or

```bash
python3 main.py
```

---

## Notes & Optimizations

- This solution works only because the tree is guaranteed to be a full binary tree.
- Without this property, preorder and mirror preorder traversals are not enough to reconstruct a unique binary tree.
- Using hash maps avoids repeated linear searches and improves the overall complexity from O(n²) to O(n).
- Every node is created exactly once, making the algorithm efficient even for the maximum input size.
- Recursion keeps the implementation clean and closely matches the recursive structure of binary trees.
- The same algorithm works across C++, Java, JavaScript, and Python because it depends only on recursion and constant-time index lookups.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
