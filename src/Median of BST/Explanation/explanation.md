# Median of BST

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

You are given the root of a Binary Search Tree (BST). Find the median of the BST.

Let the nodes of the BST, when written in ascending order (inorder traversal), be: V1, V2, V3, ..., Vn, where `n` is the total number of nodes.

* If number of nodes is even: return `V(n/2)` (the n/2-th value in the sorted order).
* If number of nodes is odd: return `V((n+1)/2)` (the middle value).

I need to produce an efficient solution that is time optimal and uses minimal extra space.

---

## Constraints

* `1 ≤ number of nodes ≤ 10^5`
* `1 ≤ node.data ≤ 10^5`
* Tree fits in memory but recursion depth might be large, so avoid recursion for O(1) extra space.

---

## Intuition

I thought about how a BST's inorder traversal gives nodes in sorted order. So the median is just the k-th element of the inorder sequence:

* if `n` is odd → k = (n+1)/2
* if `n` is even → k = n/2

Storing all values in an array would solve this easily but uses O(n) extra space. I wanted O(1) extra space. So I used **Morris inorder traversal**, which visits nodes in inorder without recursion and without an explicit stack by temporarily creating and removing threads (links) inside the tree.

I do two passes:

1. Morris traversal to count nodes `n`.
2. Morris traversal to find the `k`-th visited node and return its value.

---

## Approach

1. If `root` is `null`, return 0 (or handle as needed).
2. Count nodes using Morris traversal:

   * Traverse tree; when we visit a node in inorder order, increment a count.
3. Compute `k`:

   * `k = (n + 1) / 2` if `n` odd
   * `k = n / 2` if `n` even (1-based)
4. Do another Morris traversal:

   * Maintain a visited counter `cnt`.
   * When `cnt == k` return the current node's value.
5. Restore all temporary threads while traversing to keep tree unchanged.

This gives O(n) time and O(1) extra space.

---

## Data Structures Used

* Binary tree nodes (`Node`) with `data`, `left`, and `right`.
* No extra arrays, stacks, or recursion (uses constant extra variables only).
* Morris traversal temporarily modifies `right` pointers of predecessors, but restores them.

---

## Operations & Behavior Summary

* `countNodes(root)` — performs Morris inorder traversal to count nodes (visits each node once).
* `getKth(root, k)` — performs Morris inorder traversal, returns value of the k-th visited node.
* `findMedian(root)` — uses the two functions above to return median value according to the problem rule.

---

## Complexity

* **Time Complexity:** O(n), where `n` is the number of nodes in the BST. I perform at most two Morris traversals, each O(n).
* **Space Complexity:** O(1) extra space (no stack, no recursion, only a few pointers and counters). Morris traversal temporarily modifies tree pointers but restores them.

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
        left = right = nullptr;
    }
};
*/

class Solution {
  private:
    // Count nodes using Morris inorder traversal (O(1) space)
    int countNodes(Node* root) {
        int count = 0;
        Node* curr = root;
        while (curr) {
            if (!curr->left) {
                ++count;               // visit node
                curr = curr->right;
            } else {
                Node* pred = curr->left;
                while (pred->right && pred->right != curr)
                    pred = pred->right;
                if (!pred->right) {
                    pred->right = curr; // make temporary thread
                    curr = curr->left;
                } else {
                    pred->right = nullptr; // remove thread
                    ++count;               // visit node
                    curr = curr->right;
                }
            }
        }
        return count;
    }

    // Find k-th visited node's value using Morris inorder traversal
    int getKth(Node* root, int k) {
        int cnt = 0;
        Node* curr = root;
        while (curr) {
            if (!curr->left) {
                ++cnt;
                if (cnt == k) return curr->data;
                curr = curr->right;
            } else {
                Node* pred = curr->left;
                while (pred->right && pred->right != curr)
                    pred = pred->right;
                if (!pred->right) {
                    pred->right = curr;
                    curr = curr->left;
                } else {
                    pred->right = nullptr;
                    ++cnt;
                    if (cnt == k) return curr->data;
                    curr = curr->right;
                }
            }
        }
        return 0; // fallback if not found
    }

  public:
    int findMedian(Node* root) {
        if (!root) return 0;
        int n = countNodes(root);
        int k = (n % 2 == 1) ? (n + 1) / 2 : (n / 2);
        return getKth(root, k);
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

class Solution {
    // Morris traversal to count nodes
    private int countNodes(Node root) {
        int count = 0;
        Node curr = root;
        while (curr != null) {
            if (curr.left == null) {
                count++;             // visit
                curr = curr.right;
            } else {
                Node pred = curr.left;
                while (pred.right != null && pred.right != curr)
                    pred = pred.right;
                if (pred.right == null) {
                    pred.right = curr; // create thread
                    curr = curr.left;
                } else {
                    pred.right = null; // remove thread
                    count++;           // visit
                    curr = curr.right;
                }
            }
        }
        return count;
    }

    // Morris traversal to find k-th visited node
    private int getKth(Node root, int k) {
        int cnt = 0;
        Node curr = root;
        while (curr != null) {
            if (curr.left == null) {
                cnt++;
                if (cnt == k) return curr.data;
                curr = curr.right;
            } else {
                Node pred = curr.left;
                while (pred.right != null && pred.right != curr)
                    pred = pred.right;
                if (pred.right == null) {
                    pred.right = curr;
                    curr = curr.left;
                } else {
                    pred.right = null;
                    cnt++;
                    if (cnt == k) return curr.data;
                    curr = curr.right;
                }
            }
        }
        return 0; // fallback
    }

    public int findMedian(Node root) {
        if (root == null) return 0;
        int n = countNodes(root);
        int k = (n % 2 == 1) ? (n + 1) / 2 : (n / 2);
        return getKth(root, k);
    }
}
```

---

### JavaScript

```javascript
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

/**
 * @param {Node} root
 * @return {number}
 */
class Solution {
    // Count nodes with Morris traversal
    countNodes(root) {
        let count = 0;
        let curr = root;
        while (curr !== null) {
            if (curr.left === null) {
                count++; // visit
                curr = curr.right;
            } else {
                let pred = curr.left;
                while (pred.right !== null && pred.right !== curr) pred = pred.right;
                if (pred.right === null) {
                    pred.right = curr; // thread
                    curr = curr.left;
                } else {
                    pred.right = null; // remove thread
                    count++; // visit
                    curr = curr.right;
                }
            }
        }
        return count;
    }

    // Get k-th visited node via Morris traversal
    getKth(root, k) {
        let cnt = 0;
        let curr = root;
        while (curr !== null) {
            if (curr.left === null) {
                cnt++;
                if (cnt === k) return curr.data;
                curr = curr.right;
            } else {
                let pred = curr.left;
                while (pred.right !== null && pred.right !== curr) pred = pred.right;
                if (pred.right === null) {
                    pred.right = curr;
                    curr = curr.left;
                } else {
                    pred.right = null;
                    cnt++;
                    if (cnt === k) return curr.data;
                    curr = curr.right;
                }
            }
        }
        return 0;
    }

    findMedian(root) {
        if (root == null) return 0;
        const n = this.countNodes(root);
        const k = (n % 2 === 1) ? Math.floor((n + 1) / 2) : Math.floor(n / 2);
        return this.getKth(root, k);
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
    def countNodes(self, root):
        # Morris inorder count
        count = 0
        curr = root
        while curr:
            if curr.left is None:
                count += 1   # visit
                curr = curr.right
            else:
                pred = curr.left
                while pred.right and pred.right is not curr:
                    pred = pred.right
                if pred.right is None:
                    pred.right = curr  # make thread
                    curr = curr.left
                else:
                    pred.right = None  # remove thread
                    count += 1         # visit
                    curr = curr.right
        return count

    def getKth(self, root, k):
        # Morris inorder find k-th visited node's value
        cnt = 0
        curr = root
        while curr:
            if curr.left is None:
                cnt += 1
                if cnt == k:
                    return curr.data
                curr = curr.right
            else:
                pred = curr.left
                while pred.right and pred.right is not curr:
                    pred = pred.right
                if pred.right is None:
                    pred.right = curr
                    curr = curr.left
                else:
                    pred.right = None
                    cnt += 1
                    if cnt == k:
                        return curr.data
                    curr = curr.right
        return 0

    def findMedian(self, root):
        if root is None:
            return 0
        n = self.countNodes(root)
        k = (n + 1) // 2 if n % 2 == 1 else n // 2
        return self.getKth(root, k)
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll walk through important parts of the C++/Java/JS/Python solutions in small steps — same logic applies to all languages.

1. **Morris Traversal Concept**

   * Normally inorder traversal needs recursion or stack.
   * Morris traversal uses tree pointers to create temporary "threads" to predecessor nodes so we can return after finishing left subtree without stack/recursion.
   * For a node `curr`:

     * If `curr.left == null`:

       * We "visit" `curr` (the next node in inorder).
       * Move `curr = curr.right`.
     * Else:

       * Find predecessor `pred` (rightmost node in `curr.left` subtree).
       * If `pred.right == null`:

         * Set `pred.right = curr` (thread), then `curr = curr.left`.
       * Else (thread exists):

         * Set `pred.right = null` (remove thread), visit `curr`, then `curr = curr.right`.

2. **Counting Nodes (countNodes)**

   * Initialize `count = 0`, `curr = root`.
   * Do Morris traversal. Each time we "visit" a node in inorder, increment `count`.
   * After traversal, `count` = total nodes `n`.

3. **Compute Target Index `k`**

   * If `n` odd: `k = (n + 1) / 2` (1-based index).
   * If `n` even: `k = n / 2` (as problem instructs).

4. **Find k-th Node (getKth)**

   * Initialize `cnt = 0`, `curr = root`.
   * Do Morris traversal. Each time we "visit" a node increment `cnt`.
   * When `cnt == k`, return `curr.data`.
   * Traversal removes temporary threads, leaving tree unchanged.

5. **Edge Cases**

   * Empty tree returns 0 as default here (you could throw or return None/null if preferred).
   * Single node returns that node's value.
   * Very large depth works because we don't use recursion.

---

## Examples

1. Input BST (level order): `[20, 8, 22, 4, 12, N, N, N, 10, 14]`
   Inorder: `4, 8, 10, 12, 14, 20, 22` (n=7 odd) → median is `(7+1)/2 = 4`th value = **12**.

2. Input BST (level order): `[5, 4, 8, 1]`
   Inorder: `1, 4, 5, 8` (n=4 even) → median is `4/2 = 2`nd value = **4**.

---

## How to use / Run locally

* Create a `Node` struct/class for your language with `data`, `left`, `right`.
* Create the BST by linking nodes accordingly.
* Instantiate `Solution` and call `findMedian(root)` (or `findMedian` method for Python/JS).
* Example (Python quick usage):

```python
# build BST
root = Node(20)
root.left = Node(8)
root.right = Node(22)
root.left.left = Node(4)
root.left.right = Node(12)
root.left.right.left = Node(10)
root.left.right.right = Node(14)

sol = Solution()
print(sol.findMedian(root))  # prints 12
```

For C++/Java/JS, construct nodes and call the provided methods similarly.

---

## Notes & Optimizations

* Morris traversal is chosen intentionally for O(1) space. It temporarily modifies the `right` pointers of predecessors but restores them before moving on, so the tree remains unchanged after function returns.
* Two passes are necessary because we must know `n` before we can identify the k-th position. Both passes are linear, so the total time is O(n).
* If the problem instead required the average of two middle elements when even, then the `getKth` function could be adapted to fetch both `n/2` and `n/2 + 1` values and return average. Here the problem explicitly asks for `V(n/2)` when even.
* If allowed to use O(n) extra space, we could store inorder traversal in an array and pick the required index; that is simpler but uses extra memory for large BSTs.

---

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
