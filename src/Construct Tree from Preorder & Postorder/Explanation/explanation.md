# Construct Tree from Preorder & Postorder

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

Given two arrays `pre[]` and `post[]` that represent the preorder and postorder traversals of a **full binary tree** (every node has either 0 or 2 children). Construct and return the root of the binary tree.

Important facts:

* In preorder, the first element is the root of the tree/subtree.
* In postorder, the last element is the root of the tree/subtree.
* Because the tree is *full*, the next element after root in preorder (if subtree is not a leaf) is the root of the left subtree. Using its position in postorder we can determine the left subtree size and split arrays.

---

## Constraints

* `1 ≤ number of nodes ≤ 10^3` (typical)
* Values in `pre` and `post` are unique and within reasonable integer limits.
* Because it's a *full* binary tree, the structure is reconstructible by this method.

---

## Intuition

I thought about how preorder and postorder list nodes. In preorder the root comes first; in postorder the root comes last. Since the tree is full, whenever a node is not a leaf it has both left and right children. So after I take the root from preorder, the next value in preorder must be the root of the left subtree. If I find that left-root value in the postorder array, I can compute how many nodes are in the left subtree. That size lets me split `pre` and `post` into left and right subtree ranges and recurse. To make the lookup fast I store value → index from `post` in a hash map.

---

## Approach

1. If `pre` is empty return `null`.
2. Build a map `pos` from node value → index in `post[]` for O(1) lookup.
3. Use recursion with indices: `build(preL, preR, postL, postR)` which constructs the subtree for those array ranges.
4. `root = pre[preL]`. If `preL == preR` return `root` (leaf).
5. `leftRootVal = pre[preL + 1]` — the value of left subtree root. Find its index in `post` → `idx`.
6. `leftSize = idx - postL + 1` — number of nodes in left subtree.
7. Recurse for left and right:

   * left: `pre[preL+1 .. preL+leftSize]`, `post[postL .. idx]`
   * right: `pre[preL+leftSize+1 .. preR]`, `post[idx+1 .. postR-1]`
8. Attach children and return root.

Because map lookups are O(1) and every node is processed once, the runtime is linear.

---

## Data Structures Used

* Arrays (`pre`, `post`) — input.
* Hash map (`value -> index in post`) for O(1) lookup.
* Recursion stack to build subtrees.

---

## Operations & Behavior Summary

* Input: `pre` and `post` arrays (same size `n`).
* Output: Root node of the reconstructed full binary tree.
* Behavior:

  * Throws no exceptions in normal valid inputs.
  * Assumes uniqueness of node values and that the tree is full.

---

## Complexity

* **Time Complexity:** `O(n)` — where `n` is number of nodes. Each node is created once and we do constant work per node (index arithmetic + map lookup).
* **Space Complexity:** `O(n)` — extra space for the hashmap plus recursion stack (`O(h)`), worst-case `O(n)` for skewed recursion.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

struct Node {
    int data;
    Node *left;
    Node *right;
    Node(int x) : data(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    Node* constructTree(vector<int> &pre, vector<int> &post) {
        int n = pre.size();
        if (n == 0) return nullptr;
        unordered_map<int,int> pos;
        for (int i = 0; i < n; ++i) pos[post[i]] = i;

        function<Node*(int,int,int,int)> build = [&](int preL, int preR, int postL, int postR) -> Node* {
            if (preL > preR || postL > postR) return nullptr;
            Node* root = new Node(pre[preL]);
            if (preL == preR) return root; // leaf
            int leftRootVal = pre[preL + 1];
            int idx = pos[leftRootVal];
            int leftSize = idx - postL + 1;
            root->left  = build(preL + 1, preL + leftSize, postL, idx);
            root->right = build(preL + leftSize + 1, preR, idx + 1, postR - 1);
            return root;
        };

        return build(0, n - 1, 0, n - 1);
    }
};
```

---

### Java

```java
import java.util.*;

class Node {
    int data;
    Node left, right;
    Node(int val) { data = val; left = right = null; }
}

class Solution {
    public Node constructTree(int[] pre, int[] post) {
        int n = pre.length;
        if (n == 0) return null;
        Map<Integer,Integer> pos = new HashMap<>();
        for (int i = 0; i < n; ++i) pos.put(post[i], i);
        return build(pre, post, 0, n - 1, 0, n - 1, pos);
    }

    private Node build(int[] pre, int[] post, int preL, int preR, int postL, int postR, Map<Integer,Integer> pos) {
        if (preL > preR || postL > postR) return null;
        Node root = new Node(pre[preL]);
        if (preL == preR) return root; // leaf
        int leftRootVal = pre[preL + 1];
        int idx = pos.get(leftRootVal);
        int leftSize = idx - postL + 1;
        root.left  = build(pre, post, preL + 1, preL + leftSize, postL, idx, pos);
        root.right = build(pre, post, preL + leftSize + 1, preR, idx + 1, postR - 1, pos);
        return root;
    }
}
```

---

### JavaScript

```javascript
// Node class
class Node {
    constructor(x) {
        this.data = x;
        this.left = null;
        this.right = null;
    }
}

class Solution {
    constructTree(pre, post) {
        const n = pre.length;
        if (n === 0) return null;
        const pos = new Map();
        for (let i = 0; i < n; ++i) pos.set(post[i], i);

        const build = (preL, preR, postL, postR) => {
            if (preL > preR || postL > postR) return null;
            const root = new Node(pre[preL]);
            if (preL === preR) return root;
            const leftRootVal = pre[preL + 1];
            const idx = pos.get(leftRootVal);
            const leftSize = idx - postL + 1;
            root.left = build(preL + 1, preL + leftSize, postL, idx);
            root.right = build(preL + leftSize + 1, preR, idx + 1, postR - 1);
            return root;
        };

        return build(0, n - 1, 0, n - 1);
    }
}

// Example usage:
// const s = new Solution();
// const root = s.constructTree([1,2,4,8,9,5,3,6,7], [8,9,4,5,2,6,7,3,1]);
```

---

### Python3

```python
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None

class Solution:
    def constructTree(self, pre, post):
        n = len(pre)
        if n == 0:
            return None
        pos = {val: i for i, val in enumerate(post)}  # value -> index in post

        def build(preL, preR, postL, postR):
            if preL > preR or postL > postR:
                return None
            root = Node(pre[preL])
            if preL == preR:
                return root  # leaf node
            leftRootVal = pre[preL + 1]
            idx = pos[leftRootVal]
            leftSize = idx - postL + 1
            root.left = build(preL + 1, preL + leftSize, postL, idx)
            root.right = build(preL + leftSize + 1, preR, idx + 1, postR - 1)
            return root

        return build(0, n - 1, 0, n - 1)
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below I explain the important lines and logic; I’ll keep it simple and language-agnostic, then point out language specifics.

### Core idea (language-agnostic short)

* `root = pre[preL]` → root of the current subtree.
* If the subtree has size 1 (`preL == preR`), it's a leaf; return it.
* `leftRootVal = pre[preL + 1]` → immediate next element in preorder is left subtree's root (because the tree is full).
* Look up `leftRootVal` in `post` (via map) to get `idx`.
* `leftSize = idx - postL + 1` calculates how many nodes are in left subtree.
* Split ranges using `leftSize`, recurse for left and right, attach to root.

### Python (line-by-line key parts)

```python
pos = {val: i for i, val in enumerate(post)}
```

* Build a hash map for O(1) lookup from value → index in postorder.

```python
root = Node(pre[preL])
```

* Root is the first element of the current preorder segment.

```python
if preL == preR:
    return root
```

* If there's only one element, it's a leaf.

```python
leftRootVal = pre[preL + 1]
idx = pos[leftRootVal]
leftSize = idx - postL + 1
```

* Find where the left-root sits in postorder to compute left subtree size.

```python
root.left = build(preL + 1, preL + leftSize, postL, idx)
root.right = build(preL + leftSize + 1, preR, idx + 1, postR - 1)
```

* Recursively build left and right subtrees using computed ranges.

### C++ / Java specifics

* Use `unordered_map<int,int>` (C++) or `HashMap<Integer,Integer>` (Java) for the `pos` map.
* Use recursion with `function` lambda (C++) or a private helper method (Java).
* Memory allocation for nodes uses `new`.

### JavaScript specifics

* Use `Map` for `pos`.
* The recursion is identical; Node is a simple JS class.

---

## Examples

1. Example 1

   * Input:

     * `pre = [1, 2, 4, 8, 9, 5, 3, 6, 7]`
     * `post = [8, 9, 4, 5, 2, 6, 7, 3, 1]`
   * Reconstructed tree (level-order): `[1, 2, 3, 4, 5, 6, 7, 8, 9]`

2. Example 2

   * Input:

     * `pre = [1, 2, 4, 5, 3, 6, 7]`
     * `post = [4, 5, 2, 6, 7, 3, 1]`
   * Reconstructed tree (level-order): `[1, 2, 3, 4, 5, 6, 7]`

> Note: The examples above show the tree nodes in level-order to illustrate structure. The main function returns the root node.

---

## How to use / Run locally

**Repository structure (suggested)**

```
/ConstructTreePrePost
  ├─ README.md
  ├─ cpp/
  │   └─ solution.cpp
  ├─ java/
  │   └─ Solution.java
  ├─ js/
  │   └─ solution.js
  └─ py/
      └─ solution.py
```

**C++**

```bash
g++ -std=c++17 -O2 cpp/solution.cpp -o solution
./solution
```

**Java**

```bash
# inside java/ directory
javac Solution.java
java Solution
```

**JavaScript**

```bash
# Node.js
node js/solution.js
```

**Python**

```bash
python3 py/solution.py
```

(Each file should include a small `main` / driver that reads sample arrays and prints traversal/level-order to verify correctness.)

---

## Notes & Optimizations

* The map of postorder indices is crucial to reach `O(n)` time — avoid repeated linear searches in `post` (which would be `O(n^2)`).
* Recursion depth: For degenerate (skewed) inputs recursion depth can reach `O(n)`. If `n` can be large and recursion depth is a problem, consider converting to an iterative stack-based build or increase recursion limits (Python).
* This solution relies on the tree being **full**. For non-full trees, preorder + postorder alone may not uniquely determine structure.
* Memory: We use `O(n)` extra memory for the map and potentially `O(n)` recursion stack.

---

## Author

[Md. Aarzoo Islam](https://bento.me/withaarzoo)
