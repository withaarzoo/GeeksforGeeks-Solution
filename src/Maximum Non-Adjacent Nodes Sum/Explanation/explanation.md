# Maximum Non-Adjacent Nodes Sum

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

Given the `root` of a binary tree with integer values, select a subset of nodes such that the sum of their values is maximized, with the restriction that no two selected nodes are directly connected (i.e., if a node is included, neither its parent nor its children can be included).

Return the maximum possible sum.

## Constraints

* Number of nodes `n`: `1 ≤ n ≤ 10^4` (typical limits on GeeksforGeeks)
* Node value: `1 ≤ node.data ≤ 10^5` (values are non-negative integers in many problem variants; code works with negatives too if present)

## Intuition

I thought about the problem like this: for every node I either **take** it or **not take** it. If I take a node, I cannot take its immediate children. If I don't take a node, then for each child I can decide independently whether to take it or not. For each node I can compute two values:

* `take` — best sum when I include this node,
* `notTake` — best sum when I don't include this node.

Compute these two values with a single postorder traversal (bottom-up) and the final answer is `max(take, notTake)` at the root.

## Approach

1. Create a helper (dfs) that returns two values `(take, notTake)` for each node.
2. If node is `null`, return `(0, 0)`.
3. Recursively compute `(lTake, lNotTake)` and `(rTake, rNotTake)` for the left and right children.
4. `take = node.data + lNotTake + rNotTake` — because if I take the current node, I cannot take its immediate children.
5. `notTake = max(lTake, lNotTake) + max(rTake, rNotTake)` — because if I don't take the current node, I pick the best for each child independently.
6. The answer is `max(take, notTake)` for the root.

## Data Structures Used

* Binary Tree nodes (class `Node` with `data`, `left`, `right`).
* Recursion (function call stack) for postorder traversal.

## Operations & Behavior Summary

* One postorder traversal of the tree computing two values per node.
* For each node, constant-time operations combining child results.
* Final answer computed by taking the maximum of the two values from the root.

## Complexity

* **Time Complexity:** `O(n)` — each node is visited exactly once, and constant work is done per node. Here `n` is the number of nodes in the tree.
* **Space Complexity:** `O(h)` — recursion stack space where `h` is the height of the tree. Worst-case (skewed tree) `h = n`; best/average for balanced tree `h = O(log n)`.

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
        left = nullptr;
        right = nullptr;
    }
};
*/

class Solution {
  private:
    // returns pair {take, notTake}
    pair<long long, long long> dfs(Node* root) {
        if (!root) return {0LL, 0LL};
        auto left = dfs(root->left);
        auto right = dfs(root->right);

        // If we take this node, we cannot take immediate children
        long long take = root->data + left.second + right.second;
        // If we don't take this node, children can be either taken or not
        long long notTake = max(left.first, left.second) + max(right.first, right.second);

        return {take, notTake};
    }
  public:
    int getMaxSum(Node *root) {
        auto res = dfs(root);
        long long ans = max(res.first, res.second);
        return (int)ans; // cast for signature; values fit constraints
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

    Node(int data)
    {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
*/

class Solution {
    // helper to hold pair values
    private static class Pair {
        long take;    // best when taking this node
        long notTake; // best when not taking this node
        Pair(long t, long nt) { take = t; notTake = nt; }
    }

    private Pair dfs(Node root) {
        if (root == null) return new Pair(0L, 0L);
        Pair L = dfs(root.left);
        Pair R = dfs(root.right);

        long take = root.data + L.notTake + R.notTake;
        long notTake = Math.max(L.take, L.notTake) + Math.max(R.take, R.notTake);
        return new Pair(take, notTake);
    }

    public int getMaxSum(Node root) {
        Pair ans = dfs(root);
        long res = Math.max(ans.take, ans.notTake);
        return (int)res; // cast to int to match required return type
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {Node} root
 * @returns {number}
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
    // returns [take, notTake]
    dfs(root) {
        if (root === null) return [0, 0];
        const left = this.dfs(root.left);
        const right = this.dfs(root.right);

        // take current -> can't take children
        const take = root.data + left[1] + right[1];
        // don't take current -> children can be taken or not taken
        const notTake = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        return [take, notTake];
    }

    getMaxSum(root) {
        const res = this.dfs(root);
        return Math.max(res[0], res[1]);
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
    def dfs(self, root):
        """
        Returns a tuple (take, notTake)
        take: max sum if we include this node
        notTake: max sum if we don't include this node
        """
        if root is None:
            return (0, 0)
        l_take, l_not = self.dfs(root.left)
        r_take, r_not = self.dfs(root.right)

        # If we take this node, we can't take its children
        take = root.data + l_not + r_not
        # If we don't take this node, we can choose best for each child
        notTake = max(l_take, l_not) + max(r_take, r_not)
        return (take, notTake)

    def getMaxSum(self, root):
        take, notTake = self.dfs(root)
        return max(take, notTake)
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

This section walks through the important code blocks and explains why they are correct.

1. **Helper function / dfs**

   * Purpose: compute two values for each node: `take` (best sum if we include the node) and `notTake` (best if we don't).
   * Base case: when node is `null`, both values are `0`.

2. **Recursive calls**

   * We call the helper on both children to get their `(take, notTake)` values.

3. **Compute `take`**

   * Formula: `node.data + left.notTake + right.notTake`.
   * Reason: including the current node forbids including its immediate children, so for each child we must use the child's `notTake` value.

4. **Compute `notTake`**

   * Formula: `max(left.take, left.notTake) + max(right.take, right.notTake)`.
   * Reason: if we skip the current node, each child can be either taken or not taken; choose the best for each.

5. **Return and final answer**

   * The helper returns the pair `(take, notTake)`.
   * For the root, the maximum achievable sum is `max(take, notTake)`.

6. **Why this is optimal**

   * This is dynamic programming on a tree (tree DP). For each node we aggregate optimal results from its children under both decisions (take/notTake). Since subproblems (children) are independent once the parent's decision is fixed, this forms a correct DP.

7. **Edge cases**

   * Empty tree: returns 0.
   * Single node: returns the node's value.
   * Negative values: algorithm still works assuming nodes could be negative; `max` and sums handle that correctly.

---

## Examples

Input tree (level order): `[11, 1, 2]`

* Output: `11`
* Explanation: taking root `11` and skipping children yields 11 which is more than taking children (1 + 2 = 3).

Input tree (level order): `[1, 2, 3, 4, null, 5, 6]`

* Output: `16`
* Explanation: choose nodes `1, 4, 5, 6` (or combination giving same sum) producing total 16.

## How to use / Run locally

* Implement the `Node` class provided in the code block for your language.
* Instantiate a tree (manually or from level-order input parsing utility).
* Create an instance of `Solution` and call `getMaxSum(root)`.

Quick Python example to test locally:

```python
# build nodes
root = Node(11)
root.left = Node(1)
root.right = Node(2)
sol = Solution()
print(sol.getMaxSum(root))  # should print 11
```

For C++/Java/JS, put the code into your project, compile/run and call `getMaxSum` from `main` or test harness accordingly.

## Notes & Optimizations

* The approach uses O(n) time and O(h) recursion space. You can convert recursion to an explicit stack for iterative postorder if you want to avoid recursion limits in extremely deep trees.
* Values were typed as `long long`/`long` inside helper calculations to avoid overflow when summing many node values; final return is cast to `int` if platform signature expects it.
* If nodes can have very large values or negative values, ensure your language integer type can handle sums.

## Author

[Md. Aarzoo Islam](https://bento.me/withaarzoo) (as the problem solver / explanation writer)
