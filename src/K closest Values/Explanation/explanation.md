# K Closest Values

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

Given the root of a Binary Search Tree (BST), a `target` value and an integer `k`, find the `k` values in the BST that are closest to the `target`.

* If two values have the same absolute difference to `target`, choose the **smaller** value.
* The target may or may not be present in the tree.
* The result may be returned in any order (unless you specifically want sorted order).

---

## Constraints

* `1 ≤ number of nodes` (n)
* `k ≤ 10^4` (practically `k ≤ n`)
* Node values and `target` are integers within reasonable bounds (e.g., `≤ 10^4` as in some versions), but implementation works for any int range.

---

## Intuition

I thought about how an in-order traversal of a BST yields sorted node values. If I had the whole sorted list I could easily pick the closest `k` values. But building the whole list uses `O(n)` memory and time. Instead, I realised I can **simulate two iterators** on the BST:

* a **predecessor** iterator that yields values ≤ `target` in descending order, and
* a **successor** iterator that yields values > `target` in ascending order.

By initializing both iterators (as stacks of nodes along root-to-leaf paths) I can repeatedly pick whichever top of the stacks is closer to `target` (tie-break: pick predecessor because it's smaller). This avoids scanning the entire tree when `k` is small.

---

## Approach

1. Initialize two stacks:

   * `pred` — nodes that are candidates ≤ `target` (so popping gives the next largest ≤ target).
   * `succ` — nodes that are candidates > `target` (popping gives the next smallest > target).
2. To build `pred`, from root go down: if node.val ≤ target, push it and go right; else go left.
3. To build `succ`, from root go down: if node.val > target, push it and go left; else go right.
4. To get the next predecessor: pop top of `pred`, then move into its left child and push all right descendants.
5. To get the next successor: pop top of `succ`, then move into its right child and push all left descendants.
6. Repeat `k` times: if one stack is empty, take from the other; else compare distances and pick the closer (tie → predecessor).
7. Collect and return results.

This yields `O(h + k)` time and `O(h)` space where `h` is the tree height.

---

## Data Structures Used

* **Stack (explicit)** — to simulate controlled in-order traversal from both sides (predecessor and successor).
* **Array / Vector / List** — to store the final `k` results.

---

## Operations & Behavior Summary

* `initPred(root, target)` — pushes nodes forming path to candidates ≤ target.
* `initSucc(root, target)` — pushes nodes forming path to candidates > target.
* `getNextPred()` — returns next predecessor (largest remaining ≤ target).
* `getNextSucc()` — returns next successor (smallest remaining > target).
* Main loop picks between `getNextPred()` and `getNextSucc()` `k` times using distance comparison and tie-break rules.

---

## Complexity

* **Time Complexity:** `O(h + k)` where:

  * `h` = height of BST (path costs to initialize stacks),
  * `k` = number of values requested.
    Each node is pushed/popped at most once across both stacks, so amortized work per returned value is O(1).
* **Space Complexity:** `O(h)` for the two stacks (the extra array for results is `O(k)`).

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
#include <cmath>
using namespace std;

class Solution {
  private:
    void initPred(Node* root, int target, stack<Node*>& st) {
        while (root) {
            if (root->data <= target) { st.push(root); root = root->right; }
            else root = root->left;
        }
    }
    void initSucc(Node* root, int target, stack<Node*>& st) {
        while (root) {
            if (root->data > target) { st.push(root); root = root->left; }
            else root = root->right;
        }
    }
    int getNextPred(stack<Node*>& st) {
        Node* node = st.top(); st.pop();
        int val = node->data;
        node = node->left;
        while (node) { st.push(node); node = node->right; }
        return val;
    }
    int getNextSucc(stack<Node*>& st) {
        Node* node = st.top(); st.pop();
        int val = node->data;
        node = node->right;
        while (node) { st.push(node); node = node->left; }
        return val;
    }

  public:
    vector<int> getKClosest(Node* root, int target, int k) {
        vector<int> res;
        if (!root || k <= 0) return res;
        stack<Node*> pred, succ;
        initPred(root, target, pred);
        initSucc(root, target, succ);

        while (k-- > 0) {
            if (pred.empty() && succ.empty()) break;
            else if (pred.empty()) res.push_back(getNextSucc(succ));
            else if (succ.empty()) res.push_back(getNextPred(pred));
            else {
                int pval = pred.top()->data, sval = succ.top()->data;
                int pdiff = abs(pval - target), sdiff = abs(sval - target);
                if (pdiff <= sdiff) res.push_back(getNextPred(pred));
                else res.push_back(getNextSucc(succ));
            }
        }
        return res;
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

    Node(int data) {
        this.data = data;
        left = null;
        right = null;
    }
}
*/

import java.util.*;

class Solution {
    private void initPred(Node root, int target, Deque<Node> st) {
        while (root != null) {
            if (root.data <= target) { st.push(root); root = root.right; }
            else root = root.left;
        }
    }
    private void initSucc(Node root, int target, Deque<Node> st) {
        while (root != null) {
            if (root.data > target) { st.push(root); root = root.left; }
            else root = root.right;
        }
    }
    private int getNextPred(Deque<Node> st) {
        Node node = st.pop();
        int val = node.data;
        node = node.left;
        while (node != null) { st.push(node); node = node.right; }
        return val;
    }
    private int getNextSucc(Deque<Node> st) {
        Node node = st.pop();
        int val = node.data;
        node = node.right;
        while (node != null) { st.push(node); node = node.left; }
        return val;
    }

    public ArrayList<Integer> getKClosest(Node root, int target, int k) {
        ArrayList<Integer> res = new ArrayList<>();
        if (root == null || k <= 0) return res;
        Deque<Node> pred = new ArrayDeque<>(), succ = new ArrayDeque<>();
        initPred(root, target, pred);
        initSucc(root, target, succ);

        while (k-- > 0) {
            if (pred.isEmpty() && succ.isEmpty()) break;
            else if (pred.isEmpty()) res.add(getNextSucc(succ));
            else if (succ.isEmpty()) res.add(getNextPred(pred));
            else {
                int pval = pred.peek().data, sval = succ.peek().data;
                int pdiff = Math.abs(pval - target), sdiff = Math.abs(sval - target);
                if (pdiff <= sdiff) res.add(getNextPred(pred));
                else res.add(getNextSucc(succ));
            }
        }
        return res;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {Node} root
 * @param {number} target
 * @param {number} k
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
    initPred(root, target, st) {
        while (root) {
            if (root.data <= target) { st.push(root); root = root.right; }
            else root = root.left;
        }
    }
    initSucc(root, target, st) {
        while (root) {
            if (root.data > target) { st.push(root); root = root.left; }
            else root = root.right;
        }
    }
    getNextPred(st) {
        const node = st.pop();
        const val = node.data;
        let cur = node.left;
        while (cur) { st.push(cur); cur = cur.right; }
        return val;
    }
    getNextSucc(st) {
        const node = st.pop();
        const val = node.data;
        let cur = node.right;
        while (cur) { st.push(cur); cur = cur.left; }
        return val;
    }

    getKClosest(root, target, k) {
        const res = [];
        if (!root || k <= 0) return res;
        const pred = [], succ = [];
        this.initPred(root, target, pred);
        this.initSucc(root, target, succ);

        while (k-- > 0) {
            if (pred.length === 0 && succ.length === 0) break;
            else if (pred.length === 0) res.push(this.getNextSucc(succ));
            else if (succ.length === 0) res.push(this.getNextPred(pred));
            else {
                const pval = pred[pred.length - 1].data;
                const sval = succ[succ.length - 1].data;
                const pdiff = Math.abs(pval - target);
                const sdiff = Math.abs(sval - target);
                if (pdiff <= sdiff) res.push(this.getNextPred(pred)); // tie -> pred (smaller)
                else res.push(this.getNextSucc(succ));
            }
        }
        return res;
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
    def init_pred(self, root, target, st):
        while root:
            if root.data <= target:
                st.append(root)
                root = root.right
            else:
                root = root.left

    def init_succ(self, root, target, st):
        while root:
            if root.data > target:
                st.append(root)
                root = root.left
            else:
                root = root.right

    def get_next_pred(self, st):
        node = st.pop()
        val = node.data
        node = node.left
        while node:
            st.append(node)
            node = node.right
        return val

    def get_next_succ(self, st):
        node = st.pop()
        val = node.data
        node = node.right
        while node:
            st.append(node)
            node = node.left
        return val

    def getKClosest(self, root, target, k):
        res = []
        if not root or k <= 0:
            return res
        pred, succ = [], []
        self.init_pred(root, target, pred)
        self.init_succ(root, target, succ)

        while k > 0:
            if not pred and not succ:
                break
            elif not pred:
                res.append(self.get_next_succ(succ))
            elif not succ:
                res.append(self.get_next_pred(pred))
            else:
                pval = pred[-1].data
                sval = succ[-1].data
                pdiff = abs(pval - target)
                sdiff = abs(sval - target)
                if pdiff <= sdiff:
                    res.append(self.get_next_pred(pred))
                else:
                    res.append(self.get_next_succ(succ))
            k -= 1
        return res
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below I explain the algorithm using the **Python** code (same logic applies to other languages). I’ll go line-by-line for the important parts so it’s easy to follow.

1. `def init_pred(self, root, target, st):`

   * Purpose: prepare the `pred` stack so that `pred[-1]` (top) is the largest value ≤ `target` we have seen along the path.
2. `while root:`

   * Walk down the tree from the root.
3. `if root.data <= target: st.append(root); root = root.right`

   * If current node ≤ target, push it to the `pred` stack because it could be a candidate predecessor. Then, to find larger candidates that are still ≤ target, go to the right child.
4. `else: root = root.left`

   * If current node > target, move left because all nodes on right will be even larger.
5. `def init_succ(self, root, target, st):`

   * Purpose: prepare the `succ` stack so that `succ[-1]` is the smallest value > `target` we have seen along the path.
6. `if root.data > target: st.append(root); root = root.left`

   * If node > target, push it and go left to find smaller nodes that are still > target.
7. `def get_next_pred(self, st):`

   * Pop the top node (current predecessor) and then traverse its left subtree to push the path of right children — these will be the subsequent predecessors.
8. `node = st.pop(); val = node.data; node = node.left`

   * We return `val`. For further predecessors we need the rightmost node in this node's left subtree.
9. `while node: st.append(node); node = node.right`

   * Push nodes along right children (rightmost path) because they are next largest candidates ≤ target.
10. `def get_next_succ(self, st):` — mirror logic of predecessor:

    * Pop the smallest successor, then traverse its right subtree and push all left descendants (leftmost path) — they are next successors.
11. `self.init_pred(root, target, pred)` and `self.init_succ(root, target, succ)`

    * Prepare both iterators before we start selecting the closest `k`.
12. `while k > 0:`

    * Each iteration choose the closest between the current top of `pred` and `succ`.
13. `if not pred: res.append(self.get_next_succ(succ))`

    * If predecessor empty, we must take successor.
14. `elif not succ: res.append(self.get_next_pred(pred))`

    * If successor empty, take predecessor.
15. `else:` — both non-empty:

    * `pval = pred[-1].data; sval = succ[-1].data` — inspect candidates without popping.
    * `pdiff = abs(pval - target); sdiff = abs(sval - target)`
    * `if pdiff <= sdiff: res.append(self.get_next_pred(pred))` — if tie, pick predecessor (smaller value).
    * `else: res.append(self.get_next_succ(succ))`
16. Repeat until `k` values collected.

This method ensures every node is pushed and popped at most once across both stacks, giving amortized efficiency.

---

## Examples

Example 1:

* Input: root = `[20, 8, 22, 4, 12, N, N, N, 10, 14]` (BST as pictured), `target = 17`, `k = 3`
* Output: `[14, 20, 12]` (one valid order; the problem allows any order — tie-break rule chooses smaller when distances equal)

Example 2:

* Input: root = `[5, 4, 8, 1]`, `target = 5`, `k = 2`
* Output: `[5, 4]`

---

## How to use / Run locally

### Python

1. Put the `Node` class and `Solution` class into a file `kclosest.py`.
2. Build a BST manually or write a helper to parse a level-order array.
3. Instantiate `Solution()` and call `getKClosest(root, target, k)`.
4. Example:

```python
# build tree manually...
sol = Solution()
print(sol.getKClosest(root, 17, 3))
```

### C++

1. Add node definitions and include the `Solution` class in a `.cpp` file.
2. Build the tree and call `Solution().getKClosest(root, target, k)`.
3. Compile with `g++ -std=c++17 file.cpp` and run.

### Java

1. Put classes in a `.java` file. Ensure `Node` and `Solution` classes are accessible.
2. Build a `main` to construct the tree and call `getKClosest`.

### JavaScript

1. Use Node.js or a browser environment.
2. Create tree nodes, instantiate `Solution`, and call `getKClosest`.

(These steps assume a basic knowledge of how to create trees in the chosen language. If you want, I can provide quick helper functions to build a BST from a list for each language.)

---

## Notes & Optimizations

* This algorithm is ideal when `k` is small relative to `n` because we avoid visiting the entire tree.
* Worst-case when `k ≈ n` the algorithm degenerates to `O(n)` as expected (we'll visit nearly all nodes).
* If you want the result sorted ascending after collection, simply sort the result (`O(k log k)`).
* If the BST is balanced, `h = O(log n)` making the initialization cheap. For skewed trees `h = O(n)`.
* The tie-break requirement (choose smaller when distances equal) is implemented by preferring the predecessor on ties (`pdiff <= sdiff`).

---

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
