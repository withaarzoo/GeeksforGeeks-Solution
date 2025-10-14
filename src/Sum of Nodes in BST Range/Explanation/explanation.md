# Problem Title

**Sum of Nodes in BST Range**

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

Given the root of a **Binary Search Tree (BST)** and two integers `l` and `r`, find the **sum of all node values** that lie between `l` and `r` (inclusive).

Input: BST root node, integers `l` and `r`.
Output: Integer sum of nodes whose values `val` satisfy `l <= val <= r`.

Example: For BST with nodes [22, 12, 30, 8, 20] and range `l = 10`, `r = 22`, the nodes in range are `{12, 20, 22}` so sum = `54`.

---

## Constraints

* `0 ≤ number of nodes ≤ 10^4`
* `0 ≤ node->data ≤ 10^4`
* `0 ≤ l ≤ r ≤ 10^4`

---

## Intuition

I thought about how a BST is organized: every node's left subtree contains smaller values and right subtree contains larger values. So if a node's value is less than `l`, then its entire left subtree is automatically out of range and can be skipped. Similarly, if a node's value is greater than `r`, its entire right subtree can be skipped. Using this pruning, I only visit nodes that might be inside the range, making the algorithm efficient.

---

## Approach

1. If the current node is `null`, return `0`.
2. If `node.data < l`, skip the left subtree and recurse into the right subtree.
3. If `node.data > r`, skip the right subtree and recurse into the left subtree.
4. Otherwise (`l <= node.data <= r`), include `node.data` in the sum and recurse into both left and right children.
5. Use recursion (or an explicit stack) — recursion depth is bounded by the tree height.

This leverages the BST invariant to prune whole subtrees that cannot contain in-range values.

---

## Data Structures Used

* Binary Tree Node (with `.data`, `.left`, `.right`)
* Recursion stack (call stack) — no additional data structures required

---

## Operations & Behavior Summary

* Visit nodes selectively based on comparison with `l` and `r`.
* Skip entire left subtree when node value < `l`.
* Skip entire right subtree when node value > `r`.
* Sum node values when they fall inside the inclusive range.

---

## Complexity

* **Time Complexity:**

  * Typical/practical: `O(h + k)` where `h` is tree height and `k` is number of nodes inside the range. (We pay `h` to go down to relevant parts and `k` to count included nodes.)
  * Worst case: `O(n)` when the tree degenerates to a chain or the range covers almost all nodes. (`n` = number of nodes)
* **Space Complexity:**

  * `O(h)` for recursion stack (or explicit stack if iterative). Worst-case `h = n` for skewed tree.

---

## Multi-language Solutions

> Each language contains a minimal helper for building a tree from a level-order array (use `N` / `null` to represent missing children) and a `nodeSum` function that computes the required sum. The `nodeSum` implementation is optimized using BST pruning.

---

### C++

```c++
/*
To compile:
g++ -std=c++17 -O2 -o bst_range_sum bst_range_sum.cpp
./bst_range_sum
*/

#include <bits/stdc++.h>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int val): data(val), left(nullptr), right(nullptr) {}
};

// Build tree from level-order vector where -1 indicates null (for testing)
Node* buildTree(const vector<int>& vals) {
    if (vals.empty() || vals[0] == -1) return nullptr;
    Node* root = new Node(vals[0]);
    queue<Node*> q;
    q.push(root);
    int i = 1, n = vals.size();
    while (!q.empty() && i < n) {
        Node* cur = q.front(); q.pop();
        if (i < n && vals[i] != -1) {
            cur->left = new Node(vals[i]);
            q.push(cur->left);
        }
        ++i;
        if (i < n && vals[i] != -1) {
            cur->right = new Node(vals[i]);
            q.push(cur->right);
        }
        ++i;
    }
    return root;
}

class Solution {
  public:
    int nodeSum(Node* root, int l, int r) {
        if (root == nullptr) return 0;
        if (root->data < l) return nodeSum(root->right, l, r);   // skip left subtree
        if (root->data > r) return nodeSum(root->left, l, r);    // skip right subtree
        // root in range
        return root->data + nodeSum(root->left, l, r) + nodeSum(root->right, l, r);
    }
};

int main() {
    // Example: [22, 12, 30, 8, 20] -> use -1 for missing nodes if needed
    vector<int> vals = {22, 12, 30, 8, 20};
    Node* root = buildTree(vals);
    Solution sol;
    cout << sol.nodeSum(root, 10, 22) << "\n"; // expected 54
    return 0;
}
```

---

### Java

```java
/*
To compile:
javac BSTRangesum.java
java BSTRangesum
*/

import java.util.*;

class Node {
    int data;
    Node left, right;
    Node(int val) { data = val; left = right = null; }
}

public class BSTRangesum {

    // Build tree from level-order where -1 represents null
    public static Node buildTree(int[] vals) {
        if (vals.length == 0 || vals[0] == -1) return null;
        Node root = new Node(vals[0]);
        Queue<Node> q = new LinkedList<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < vals.length) {
            Node cur = q.poll();
            if (i < vals.length && vals[i] != -1) {
                cur.left = new Node(vals[i]);
                q.add(cur.left);
            }
            i++;
            if (i < vals.length && vals[i] != -1) {
                cur.right = new Node(vals[i]);
                q.add(cur.right);
            }
            i++;
        }
        return root;
    }

    public static int nodeSum(Node root, int l, int r) {
        if (root == null) return 0;
        if (root.data < l) return nodeSum(root.right, l, r);
        if (root.data > r) return nodeSum(root.left, l, r);
        return root.data + nodeSum(root.left, l, r) + nodeSum(root.right, l, r);
    }

    public static void main(String[] args) {
        int[] vals = {22, 12, 30, 8, 20};
        Node root = buildTree(vals);
        System.out.println(nodeSum(root, 10, 22)); // expected 54
    }
}
```

---

### JavaScript (Node.js)

```javascript
/*
To run:
node bst_range_sum.js
*/

class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}

// Build tree from level-order array where null indicates missing node
function buildTree(vals) {
    if (!vals.length || vals[0] === null) return null;
    let root = new Node(vals[0]);
    let q = [root];
    let i = 1;
    while (q.length && i < vals.length) {
        let cur = q.shift();
        if (i < vals.length && vals[i] !== null) {
            cur.left = new Node(vals[i]);
            q.push(cur.left);
        }
        i++;
        if (i < vals.length && vals[i] !== null) {
            cur.right = new Node(vals[i]);
            q.push(cur.right);
        }
        i++;
    }
    return root;
}

class Solution {
    nodeSum(root, l, r) {
        if (root === null) return 0;
        if (root.data < l) return this.nodeSum(root.right, l, r);
        if (root.data > r) return this.nodeSum(root.left, l, r);
        return root.data + this.nodeSum(root.left, l, r) + this.nodeSum(root.right, l, r);
    }
}

// Example
const vals = [22, 12, 30, 8, 20];
const root = buildTree(vals);
const sol = new Solution();
console.log(sol.nodeSum(root, 10, 22)); // expected 54
```

---

### Python3

```python
"""
To run:
python3 bst_range_sum.py
"""

from collections import deque

class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None

# Build tree from level-order list where None indicates null
def build_tree(vals):
    if not vals or vals[0] is None:
        return None
    root = Node(vals[0])
    q = deque([root])
    i = 1
    while q and i < len(vals):
        cur = q.popleft()
        if i < len(vals) and vals[i] is not None:
            cur.left = Node(vals[i])
            q.append(cur.left)
        i += 1
        if i < len(vals) and vals[i] is not None:
            cur.right = Node(vals[i])
            q.append(cur.right)
        i += 1
    return root

class Solution:
    def nodeSum(self, root, l, r):
        if root is None:
            return 0
        if root.data < l:
            return self.nodeSum(root.right, l, r)
        if root.data > r:
            return self.nodeSum(root.left, l, r)
        return root.data + self.nodeSum(root.left, l, r) + self.nodeSum(root.right, l, r)

# Example
if __name__ == "__main__":
    vals = [22, 12, 30, 8, 20]
    root = build_tree(vals)
    sol = Solution()
    print(sol.nodeSum(root, 10, 22))  # expected 54
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll walk through the algorithm using the Python implementation, but the same logic applies to all languages.

1. **Base case**
   `if root is None: return 0`

   * If I reach a null node, there is nothing to add. Return 0.

2. **Prune left subtree when root.data < l**
   `if root.data < l: return nodeSum(root.right, l, r)`

   * Since it's a BST, every value in the left subtree is less than `root.data`. If `root.data` is already less than `l`, then everything left is `< l` too. So I skip the left child entirely and check the right subtree.

3. **Prune right subtree when root.data > r**
   `if root.data > r: return nodeSum(root.left, l, r)`

   * Symmetric logic: if the current node is greater than `r`, all values in the right subtree are > `root.data` and hence > `r`. I skip the right subtree.

4. **Include current node and visit both children when in range**
   `return root.data + nodeSum(root.left, l, r) + nodeSum(root.right, l, r)`

   * The node value is inside `[l, r]`, so I add it and recursively compute sum from both sides. Note each recursive call will again prune where possible.

5. **Termination and correctness**

   * Every branch ends at `None` or gets pruned. We only add node values that meet the inclusive range condition. The BST property ensures pruning is safe and correct.

6. **Example trace (quick)**
   For root 22, `l=10`, `r=22`: 22 is inside → add 22.
   Recurse left (12) and right (30). For 12 (inside) add 12 and recurse further etc. For 30 (>22) we prune right subtree and only recurse left — but left of 30 may be null, so it returns 0.

---

## Examples

Input tree (level-order): `[22, 12, 30, 8, 20]`, `l = 10`, `r = 22`

* Nodes in range: `{12, 20, 22}`
* Output: `54`

Input tree (level-order): `[8, 5, 11, 3, 6, null, 20]`, `l = 11`, `r = 15`

* Nodes in range: `{11}`
* Output: `11`

---

## How to use / Run locally

**C++**

1. Save file `bst_range_sum.cpp`.
2. `g++ -std=c++17 -O2 -o bst_range_sum bst_range_sum.cpp`
3. `./bst_range_sum`

**Java**

1. Save file `BSTRangesum.java`.
2. `javac BSTRangesum.java`
3. `java BSTRangesum`

**JavaScript (Node.js)**

1. Save file `bst_range_sum.js`.
2. `node bst_range_sum.js`

**Python3**

1. Save file `bst_range_sum.py`.
2. `python3 bst_range_sum.py`

Note: Provided sample drivers build a small tree for demonstration. For larger or custom inputs, adapt the `buildTree`/`build_tree` helper or replace the driver with code that reads input.

---

## Notes & Optimizations

* I used recursion because it leads to simpler code and directly expresses the pruning logic. If the tree height might exceed recursion limits (e.g., very deep skewed trees in Python), consider an iterative DFS using an explicit stack to avoid recursion depth issues.
* In balanced BSTs and narrow ranges, pruning reduces work significantly — we only visit nodes that could possibly lie inside the range.
* Memory overhead is only the recursion stack (or an explicit stack if iterative).
* If the tree is immutable and multiple queries (different ranges) need to be answered, consider augmenting nodes with subtree sums and using a more complex range-sum query structure (but that changes the problem to dynamic queries).

---

## Author

[Md. Aarzoo Islam](https://bento.me/withaarzoo)
