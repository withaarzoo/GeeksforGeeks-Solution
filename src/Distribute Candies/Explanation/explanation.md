# Problem Title

Distribute Candies (Make every node have exactly one candy)

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

You are given the root of a binary tree with `n` nodes. Each node contains some number of candies. The total number of candies across all nodes equals `n` (so a final configuration where each node has exactly one candy is always possible). In one move you can move a single candy between two adjacent nodes (parent-child). The goal is to compute the **minimum number of moves** required so that every node ends up with exactly one candy.

This is the same conceptually as the common problem "Distribute Coins in Binary Tree".

## Constraints

* `1 <= n <= 3 * 10^3` (number of nodes)
* `0 <= Node->data <= n`
* The sum of all `Node->data` equals `n`

## Intuition

I thought about the problem from the bottom up. For any node, the children may either have extra candies or need candies. If a subtree has surplus candies it should send them up (towards the parent); if it has deficit it should receive candies from the parent. So for each subtree I compute a **balance**: how many candies the subtree will send to its parent (positive) or request from its parent (negative) after the subtree is internally fixed so every node inside it has exactly one candy.

While computing balances I count the number of candies that must cross each edge. Each unit of balance crossing an edge represents exactly one move. Summing the absolute flows across all edges yields the minimal number of moves.

## Approach

1. I use a **post-order traversal** (left, right, root). This ensures we know the children's needs before we decide the parent's net balance.
2. For each node:

   * Recursively compute `left_balance` and `right_balance` for left and right children.
   * The moves required for this node to fix its children are `abs(left_balance) + abs(right_balance)` because each unit must move across the respective child edge.
   * The subtree `balance` returned to parent = `node.data + left_balance + right_balance - 1` (the `-1` is because this node must keep exactly one candy).
3. Keep a global accumulator `moves` and return the subtree balance up the recursion.

This is a single traversal algorithm (O(n)) with only recursion stack extra space.

## Data Structures Used

* Binary tree node structure with fields: `data`, `left`, `right`.
* Simple recursion stack — no additional data structures required except a scalar accumulator for moves.

## Operations & Behavior Summary

* `dfs(node)` (post-order) returns the net `balance` of the subtree rooted at `node`.
* During `dfs`, update a global `moves` variable by adding `abs(left_balance) + abs(right_balance)`.
* After traversal, `moves` holds the minimum number of single-candy moves required.

## Complexity

* **Time Complexity:** `O(n)` — I visit each node exactly once. `n` is the number of nodes in the tree.
* **Space Complexity:** `O(h)` — recursion stack of height `h` (worst-case `O(n)` for skewed tree, `O(log n)` for balanced tree). No other significant extra memory is used.

---

## Multi-language Solutions

Below are clean, production-ready solutions for the problem in C++, Java, JavaScript and Python3. Each solution follows the same post-order logic and uses a global accumulator for moves.

### C++

```c++
/*
class Node {
public:
    int data;
    Node* left;
    Node* right;

    Node(int x) {
        data = x;
        left = right = nullptr;
    }
};
*/

#include <bits/stdc++.h>
using namespace std;

class Solution {
private:
    long long moves = 0; // accumulator for total moves

    // returns balance of subtree: positive -> extra candies to send up,
    // negative -> needs candies from parent
    int dfs(Node* node) {
        if (!node) return 0;
        int lb = dfs(node->left);
        int rb = dfs(node->right);

        moves += llabs((long long)lb) + llabs((long long)rb);

        int balance = node->data + lb + rb - 1; // keep one candy at this node
        return balance;
    }

public:
    int distCandy(Node* root) {
        moves = 0;
        dfs(root);
        return (int)moves;
    }
};
```

### Java

```java
/*
class Node {
    int data;
    Node left;
    Node right;
    Node(int data) {
        this.data = data;
        left = null;
        right = null;
    }
}
*/

class Solution {
    private long moves = 0; // accumulate total moves

    // helper returns the balance for the subtree rooted at node
    private int dfs(Node node) {
        if (node == null) return 0;
        int leftBal = dfs(node.left);
        int rightBal = dfs(node.right);

        moves += Math.abs(leftBal) + Math.abs(rightBal); // moves to/from children

        int balance = node.data + leftBal + rightBal - 1; // after each node keeps 1 candy
        return balance;
    }

    public int distCandy(Node root) {
        moves = 0;
        dfs(root);
        return (int)moves;
    }
}
```

### JavaScript

```javascript
/**
 * @param {Node} root
 * @return {number}
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
    constructor() {
        this.moves = 0;
    }

    // post-order DFS returns subtree balance
    dfs(node) {
        if (node === null) return 0;
        const leftBal = this.dfs(node.left);
        const rightBal = this.dfs(node.right);

        this.moves += Math.abs(leftBal) + Math.abs(rightBal);

        const balance = node.data + leftBal + rightBal - 1;
        return balance;
    }

    distCandy(root) {
        this.moves = 0;
        this.dfs(root);
        return this.moves;
    }
}
```

### Python3

```python3
'''
class Node:
    def __init__(self, val):
        self.data = val
        self.right = None
        self.left = None
'''

class Solution:
    def __init__(self):
        self.moves = 0

    def _dfs(self, node):
        # returns balance of subtree
        if node is None:
            return 0
        left_bal = self._dfs(node.left)
        right_bal = self._dfs(node.right)

        # each unit of left_bal/right_bal must be moved across the edge
        self.moves += abs(left_bal) + abs(right_bal)

        # subtree balance after each node keeps exactly one candy
        balance = node.data + left_bal + right_bal - 1
        return balance

    def distCandy(self, root):
        self.moves = 0
        self._dfs(root)
        return self.moves
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Here I walk through the reasoning and each important code block in simple steps.

1. **Start recursion:** I initialize `moves = 0` and call `dfs(root)` or `_dfs(root)`.

2. **Base case:** If the node is `null`, I return `0` because an empty subtree has no candies and no nodes.

3. **Recursive calls:** For a non-null node I call recursion on the left and right children first:

   * `leftBal = dfs(node.left)`
   * `rightBal = dfs(node.right)`

   These calls return how many candies the left/right subtree will send to the current node (positive) or need from it (negative) after fixing their internals.

4. **Count moves for child edges:** I add `abs(leftBal) + abs(rightBal)` to `moves`. Each unit of balance must travel across the corresponding edge once.

5. **Compute current balance:** I compute `balance = node.data + leftBal + rightBal - 1`.

   * `node.data` is candies at this node.
   * `leftBal` and `rightBal` are net candies from subtrees.
   * `-1` because this node needs one candy for itself.
     This `balance` is the net candies this subtree will pass up to its parent (positive) or request (negative).

6. **Return balance to parent:** The parent will use this returned balance to compute its own moves and balance.

7. **Final answer:** After recursion completes at the root, `moves` holds the minimum number of single-candy moves required.

## Examples

**Example 1:**
Input tree values (level-order): `[5, 0, 0, N, N, 0, 0]` (root has 5 candies, others 0)

* Output: `6`
* Brief explanation: many candies flow from root to leaves. Our algorithm will compute balances and accumulate `6` total moves.

**Example 2:**
Input tree values (level-order): `[2, 0, 0, N, N, 3, 0]`

* Output: `4`

(These match the sample cases in the problem statement.)

## How to use / Run locally

1. Clone or create a repository and add this `README.md`.
2. Implement the provided solution in your language of choice and compile/run as usual.

   * **C++**: compile with `g++ -std=c++17 -O2 -o solution solution.cpp` and run `./solution` (make sure you wire up input and tree construction).
   * **Java**: compile `javac Solution.java` and run `java Solution` (implement `main` and tree creation as needed).
   * **JavaScript (Node.js)**: run with `node solution.js` after implementing tree creation.
   * **Python3**: run `python3 solution.py` (implement tree creation and call `distCandy`).
3. For testing, write helper functions to construct the binary tree from arrays or manual node links.

## Notes & Optimizations

* The algorithm is already optimal in time (`O(n)`) and uses only recursion stack extra space.
* If recursion depth is a concern for very deep/skewed trees, consider converting the post-order recursion to iterative traversal using an explicit stack.
* Using `long long` (C++) or `long` (Java) for the `moves` accumulator is safe against overflow although for given constraints `n <= 3000` a 32-bit int is enough. Still, it is a good habit for accumulation variables.
* The algorithm counts flows across edges exactly once, guaranteeing minimality.

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
