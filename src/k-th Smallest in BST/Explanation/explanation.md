# k-th Smallest in BST

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

Given the `root` of a Binary Search Tree (BST) and an integer `k`, find the k-th smallest element in the BST. If there is no k-th smallest element (i.e., `k` > number of nodes), return `-1`.

Example:

* Input: `root = [20, 8, 22, 4, 12, N, N, N, 10, 14]`, `k = 3` → Output: `10`
* Input: `root = [2, 1, 3]`, `k = 5` → Output: `-1`

---

## Constraints

* `1 ≤ number of nodes`
* `k ≤ 10^4` (but practically limited by tree size)
* `1 ≤ node->data ≤ 10^4`

---

## Intuition

I thought about how a BST's in-order traversal yields nodes in ascending order (left → node → right). So if I traverse the BST in in-order, the k-th visited node will be the k-th smallest. To avoid recursion depth issues and to stop early once I find the k-th node, I use an **iterative in-order traversal with a stack**. This visits nodes in sorted order and only uses O(h) extra space where `h` is the tree height.

---

## Approach

1. Initialize an empty stack and set a pointer `curr` to `root`.
2. While `curr` is not null or stack is not empty:

   * Push `curr` and all its left descendants onto the stack (reach the leftmost node).
   * Pop the top node — this node is the next smallest.
   * Decrement `k`. If `k == 0`, return this node's value.
   * Set `curr` to the popped node's right child and continue.
3. If finished without finding `k` nodes, return `-1`.

This approach stops as soon as the k-th smallest is found, saving unnecessary work.

---

## Data Structures Used

* Stack (explicit) to emulate recursion and perform iterative in-order traversal.
* No extra arrays or hash maps are needed.

---

## Operations & Behavior Summary

* Push left nodes to stack to reach smallest unvisited values.
* Pop one node at a time to "visit" nodes in ascending order.
* Count visits until k-th visited node is reached.
* Return `-1` if `k` exceeds total nodes.

---

## Complexity

* **Time Complexity:** O(h + k) average — `h` = tree height, `k` = given k.

  * We descend at most `h` nodes to reach the leftmost path initially, then visit up to `k` nodes (pop operations) until the k-th is found.
  * Worst-case (skewed tree or `k ≈ n`): O(n), where `n` is number of nodes.
* **Space Complexity:** O(h) for the stack (height of tree). Worst-case O(n) for skewed trees.

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
        left = right = NULL;
    }
};
*/

#include <stack>

class Solution {
  public:
    int kthSmallest(Node *root, int k) {
        std::stack<Node*> st;
        Node* curr = root;

        while (curr != nullptr || !st.empty()) {
            // push all left children
            while (curr != nullptr) {
                st.push(curr);
                curr = curr->left;
            }

            // visit node
            curr = st.top();
            st.pop();
            k--;
            if (k == 0) return curr->data;

            // proceed to right subtree
            curr = curr->right;
        }

        // k is larger than number of nodes
        return -1;
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

    public Node(int d)
    {
        data = d;
        left = right = null;
    }
}
*/

import java.util.Stack;

class Solution {
    public int kthSmallest(Node root, int k) {
        Stack<Node> st = new Stack<>();
        Node curr = root;

        while (curr != null || !st.isEmpty()) {
            while (curr != null) {
                st.push(curr);
                curr = curr.left;
            }

            curr = st.pop();
            k--;
            if (k == 0) return curr.data;

            curr = curr.right;
        }

        return -1;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {Node} root
 * @param {number} k
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
    kthSmallest(root, k) {
        const st = [];
        let curr = root;

        while (curr !== null || st.length > 0) {
            while (curr !== null) {
                st.push(curr);
                curr = curr.left;
            }

            curr = st.pop();
            k--;
            if (k === 0) return curr.data;

            curr = curr.right;
        }

        return -1;
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
    def kthSmallest(self, root, k): 
        stack = []
        curr = root

        while curr is not None or stack:
            while curr is not None:
                stack.append(curr)
                curr = curr.left

            curr = stack.pop()
            k -= 1
            if k == 0:
                return curr.data

            curr = curr.right

        return -1
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain using the Python variant line-by-line and mention the same conceptual steps apply to other languages.

1. `stack = []` / `std::stack<Node*> st;` / `Stack<Node> st = new Stack<>();` / `const st = [];`

   * I create an empty stack to keep nodes whose left subtree I've started to explore but haven't finished visiting the node itself and right subtree.

2. `curr = root`

   * I start traversal from the root.

3. `while curr is not None or stack:`

   * Continue while there's a current node to process or there are saved nodes on the stack waiting to be visited.

4. `while curr is not None: stack.append(curr); curr = curr.left`

   * I push `curr` and move left repeatedly to reach the leftmost node. This ensures I visit nodes in ascending order (all left nodes first).

5. `curr = stack.pop()`

   * Pop the node that has no unvisited left child. This node is the next smallest.

6. `k -= 1; if k == 0: return curr.data`

   * I count visits; when the visit count equals `k`, I return the value immediately.

7. `curr = curr.right`

   * After visiting the node, I switch to its right subtree to continue the in-order traversal sequence.

8. `return -1`

   * If I finish and `k` wasn't reached, I return `-1` per the problem.

**Same logic in all languages:** the stack operations (`push` / `append`, `pop`), moving left to push path, popping to visit, decrementing `k`, and moving to right child are identical. The only differences are syntax and stack implementation details.

---

## Examples

1. Example 1:

   * Tree:

     ```
         20
        /  \
       8    22
      / \
     4  12
        / \
       10 14
     ```
   * `k = 3` → In-order: `4, 8, 10, 12, 14, 20, 22` → 3rd = `10` → Output: `10`

2. Example 2:

   * Tree: `[2, 1, 3]`
   * `k = 5` → Only 3 nodes → Output: `-1`

---

## How to use / Run locally

### C++

* Put the solution in a `.cpp` file and integrate with your testing harness / tree builder.
* Compile: `g++ -std=c++17 solution.cpp -O2 -o solution`
* Run: `./solution` (depends on how you provide input / build tree manually)

### Java

* Save the class in `Solution.java` alongside your `Node` class or within the same file.
* Compile: `javac Solution.java`
* Run: `java Solution` (depending on main method / test harness)

### JavaScript (Node.js)

* Save code in `solution.js` and create a driver to build the tree and call `new Solution().kthSmallest(root, k)`.
* Run: `node solution.js`

### Python3

* Save code in `solution.py` and create a driver to build the tree and call `Solution().kthSmallest(root, k)`.
* Run: `python3 solution.py`

> Note: The code snippets provide only the `Solution` logic. You need to add a small driver or helper to construct the BST from an array or input format and then call the function to test.

---

## Notes & Optimizations

* I used iterative in-order traversal to avoid recursion depth issues (stack depth limited to `h`).
* Early stopping: the algorithm returns immediately when the k-th element is found — this often reduces work when `k` is small.
* If multiple queries for different `k` values will be made on the same static BST, you can:

  * Precompute an in-order list of values (O(n) time + O(n) space) and answer each query in O(1).
  * Augment each node with a `subtree_size` field (size of left subtree). Then you can find the k-th element in O(h) time deterministically using the sizes.
* This implementation is optimal in practice for single-query scenarios with minimal extra memory.

---

## Author

[Md. Aarzoo Islam](https://bento.me/withaarzoo)
