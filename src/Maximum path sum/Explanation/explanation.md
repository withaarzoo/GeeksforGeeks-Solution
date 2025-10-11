# Maximum Path Sum

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

Given the `root` of a binary tree, find the **maximum path sum**. A path may start and end at any node in the tree. The path must contain at least one node. The path sum is the sum of node values along the chosen path.

Example of what a path could be:

* A single node
* A path going down one branch
* A path that goes through a node using left and right child (left → node → right)

---

## Constraints

* `1 ≤ number of nodes ≤ 10^3`
* `-10^4 ≤ node->data ≤ 10^4`

(These constraints guide our complexity choices and show sums fit in 32-bit integers.)

---

## Intuition

I thought about the tree from the bottom up. For any node, the best path *through* that node could include the node itself plus the best downward contribution from its left child and the best downward contribution from its right child. But when passing a contribution to the node's parent, I can only choose one path (left or right) — not both.

So I decided:

* do a DFS (post-order),
* compute how much contribution each node can give to its parent (a single downward path),
* while at each node update a global best with `node.val + leftContribution + rightContribution`.

I also realized that if a child contributes a negative value, it's better to ignore it (treat as `0`).

---

## Approach

1. Do a DFS that returns the best *single-sided downward* contribution for a node (value the parent can add).
2. For each node:

   * compute `left = max(0, dfs(left))`
   * compute `right = max(0, dfs(right))`
   * `current = node.val + left + right` is the best path that uses this node as the top.
   * update `globalMax = max(globalMax, current)`
   * return `node.val + max(left, right)` to the parent.
3. After DFS ends, `globalMax` holds the maximum path sum anywhere in the tree.

---

## Data Structures Used

* Binary tree `Node` (with `data`, `left`, and `right`)
* Recursion (call stack) for DFS
* A single scalar `globalMax` to hold the best path sum seen so far

---

## Operations & Behavior Summary

* We perform a single post-order DFS.
* At each node:

  * ignore negative child sums (`max(0, childSum)`)
  * compute the best "through-node" path and update the global maximum
  * return the best single-sided path to the parent
* Handles negative-valued nodes correctly (returns the maximum single node if all negative)

---

## Complexity

* **Time Complexity:** `O(n)` — every node is visited exactly once during DFS. Here `n` = number of nodes.
* **Space Complexity:** `O(h)` — recursion stack depth equals tree height `h`. Worst-case (skewed tree) `h = n` → `O(n)`. Balanced tree → `O(log n)`.

---

## Multi-language Solutions

### C++

```c++
/*
Node definition:
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

class Node {
public:
    int data;
    Node *left;
    Node *right;
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};

class Solution {
private:
    // helper returns maximum downward path sum from node (value parent can take)
    int helper(Node* node, int &globalMax) {
        if (!node) return 0;

        // contributions from children; ignore negative sums
        int left = max(0, helper(node->left, globalMax));
        int right = max(0, helper(node->right, globalMax));

        // best path that passes through this node
        int current = node->data + left + right;
        globalMax = max(globalMax, current);

        // return the best contribution to parent (single side)
        return node->data + max(left, right);
    }

public:
    int findMaxSum(Node *root) {
        if (!root) return 0;
        int globalMax = INT_MIN;
        helper(root, globalMax);
        return globalMax;
    }
};

// Example driver (builds the tree from the README example)
int main() {
    Node* root = new Node(10);
    root->left = new Node(2);
    root->right = new Node(10);
    root->left->left = new Node(20);
    root->left->right = new Node(1);
    root->right->right = new Node(-25);
    root->right->right->left = new Node(3);
    root->right->right->right = new Node(4);

    Solution sol;
    cout << "Max path sum: " << sol.findMaxSum(root) << "\n"; // expected 42
    return 0;
}
```

---

### Java

```java
/*
Node definition:
class Node {
    int data;
    Node left, right;
    Node(int d) { data = d; left = right = null; }
}
*/

class Node {
    int data;
    Node left, right;
    Node(int d) { data = d; left = right = null; }
}

class Solution {
    private int globalMax;

    private int dfs(Node node) {
        if (node == null) return 0;

        int left = Math.max(0, dfs(node.left));
        int right = Math.max(0, dfs(node.right));

        int current = node.data + left + right;
        globalMax = Math.max(globalMax, current);

        return node.data + Math.max(left, right);
    }

    int findMaxSum(Node root) {
        if (root == null) return 0;
        globalMax = Integer.MIN_VALUE;
        dfs(root);
        return globalMax;
    }
}

// Example driver
public class Main {
    public static void main(String[] args) {
        Node root = new Node(10);
        root.left = new Node(2);
        root.right = new Node(10);
        root.left.left = new Node(20);
        root.left.right = new Node(1);
        root.right.right = new Node(-25);
        root.right.right.left = new Node(3);
        root.right.right.right = new Node(4);

        Solution s = new Solution();
        System.out.println("Max path sum: " + s.findMaxSum(root)); // expected 42
    }
}
```

---

### JavaScript

```javascript
/**
 * Node class
 */
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Solution {
    findMaxSum(root) {
        if (!root) return 0;
        let globalMax = Number.MIN_SAFE_INTEGER;

        function dfs(node) {
            if (!node) return 0;
            let left = Math.max(0, dfs(node.left));
            let right = Math.max(0, dfs(node.right));

            const current = node.data + left + right;
            globalMax = Math.max(globalMax, current);

            return node.data + Math.max(left, right);
        }

        dfs(root);
        return globalMax;
    }
}

// Example driver
const root = new Node(10);
root.left = new Node(2);
root.right = new Node(10);
root.left.left = new Node(20);
root.left.right = new Node(1);
root.right.right = new Node(-25);
root.right.right.left = new Node(3);
root.right.right.right = new Node(4);

const sol = new Solution();
console.log("Max path sum:", sol.findMaxSum(root)); // expected 42
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
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None

class Solution:
    def findMaxSum(self, root):
        if root is None:
            return 0

        self.global_max = -10**18

        def dfs(node):
            if node is None:
                return 0

            left = max(0, dfs(node.left))
            right = max(0, dfs(node.right))

            current = node.data + left + right
            if current > self.global_max:
                self.global_max = current

            return node.data + max(left, right)

        dfs(root)
        return self.global_max

# Example driver
if __name__ == "__main__":
    root = Node(10)
    root.left = Node(2)
    root.right = Node(10)
    root.left.left = Node(20)
    root.left.right = Node(1)
    root.right.right = Node(-25)
    root.right.right.left = Node(3)
    root.right.right.right = Node(4)

    sol = Solution()
    print("Max path sum:", sol.findMaxSum(root))  # expected 42
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### Common idea (applies to all implementations)

1. I use a DFS (post-order) so children are processed before the parent.
2. At each node:

   * I compute `left = max(0, dfs(left))` — I ignore negative contributions (they decrease sum).
   * I compute `right = max(0, dfs(right))`.
   * `current = node.value + left + right` is the best path that *uses* this node as the turning point (could be max).
   * I update a global variable `globalMax` with `current` if larger.
   * I `return node.value + max(left, right)` — this is the best single path going upward to the parent.
3. The DFS root-call ensures `globalMax` receives the maximum path sum found anywhere.

### C++ notes

* `helper(node, globalMax)` returns an `int` representing the best contribution the node can give to its parent.
* We use `int globalMax = INT_MIN` so negative-only trees are handled properly.
* `max(0, helper(...))` avoids adding negative paths.

### Java notes

* `dfs(node)` same role as C++ helper.
* `globalMax` is an instance variable; initialized to `Integer.MIN_VALUE`.

### JavaScript notes

* `dfs` is a nested function that closes over `globalMax` variable.
* Uses `Number.MIN_SAFE_INTEGER` as a very small initial value.

### Python notes

* `self.global_max` stores the best found.
* I used `-10**18` for a sufficiently small initial value; with constraints this is safe.

---

## Examples

**Example 1**

```
Input tree (visual):
      10
     /  \
    2    10
   / \     \
 20   1    -25
           /  \
          3    4

Output: 42
Reason: The max path is 20 -> 2 -> 10 -> 10 = 42
```

**Example 2**

```
Input tree:
      -17
      /  \
    11    4
   /  \    \
 20   -2   10

Output: 31
Reason: 20 -> 11 -> 0? -> 0? Actually best path is 20 + 11 = 31 (depending on tree shape).
```

(These examples match the problem statement illustrations.)

---

## How to use / Run locally

### C++

1. Save code to `max_path.cpp`.
2. Compile and run:

```bash
g++ -std=c++17 -O2 -o max_path max_path.cpp
./max_path
```

### Java

1. Save code to `Main.java`.
2. Compile and run:

```bash
javac Main.java
java Main
```

### JavaScript (Node.js)

1. Save code to `main.js`.
2. Run:

```bash
node main.js
```

### Python3

1. Save code to `main.py`.
2. Run:

```bash
python3 main.py
```

---

## Notes & Optimizations

* The central trick is ignoring negative contributions with `max(0, childSum)`. This prevents reducing the overall path sum by choosing a negative tail.
* We only use a single global variable for the answer and recurse once, so memory overhead is minimal besides recursion stack.
* If recursion depth concerns exist (very deep trees), consider converting DFS to iterative with an explicit stack; but the post-order logic and propagating the computed child contributions become more involved.
* For given constraints (n ≤ 1000) recursion is safe in most environments. If using languages with small recursion limits (e.g., Python), increase recursion limit or rewrite iteratively.

---

## Author

[Md. Aarzoo Islam](https://bento.me/withaarzoo)
