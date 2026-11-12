# Closest in BST - GeeksforGeeks Solution

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

## Problem Summary

You are given the root of a Binary Search Tree (BST) and an integer k. Your task is to find the node whose value is closest to k and return the minimum absolute difference between k and that node’s value.

In simple words, walk through the BST and figure out which node’s value is nearest to the given number k. Then report how far that node is from k (the absolute difference).

Input is the root of the BST and the integer k.  
Output is a single integer — the smallest absolute difference found.

This is a classic Binary Search Tree problem that appears frequently in coding interviews and on platforms like GeeksforGeeks.

## Constraints

- 1 ≤ size of binary tree, k ≤ 10^5
- 0 ≤ Node.data ≤ 10^5

These limits mean a full tree traversal would be too slow in the worst case, so any solution must stay close to the height of the tree.

## Intuition

The first thing I noticed is that we do not need to look at every node. A Binary Search Tree already keeps values ordered: everything on the left is smaller, everything on the right is larger.

If I simply follow the same path I would take while searching for k, I will pass by the floor and the ceil of k. Those two candidates are the only ones that can give the minimum absolute difference. So I only need to keep track of the smallest difference I see while walking that single path.

That observation immediately cuts the work from O(n) down to O(h), where h is the height of the tree.

## Approach

I keep a variable that stores the best (smallest) difference found so far and initialize it to a large number.

I start at the root and move down the tree:

1. At every node I calculate the absolute difference between the node’s value and k and update the best difference if the new one is smaller.
2. If the current node’s value is exactly equal to k, the difference is zero and I can stop immediately.
3. If k is smaller than the current node, I go left; otherwise I go right.

When I finally fall off the tree (reach a null), I simply return the best difference I recorded. Because every step follows the BST property, the path I walked already contains the closest possible value.

## Data Structures Used

- Binary Search Tree nodes only.  
  Each node holds an integer value plus left and right child pointers.  
  No extra arrays, maps, or queues are required. The algorithm works directly on the given tree structure and uses only a few scalar variables.

## Operations & Behavior Summary

- Initialize a variable `ans` to a large value (bigger than any possible difference under the given constraints).
- While the current node is not null:
  - Update `ans` with the absolute difference between the current node’s data and k.
  - If the current value equals k, return 0 at once.
  - Move left if k is smaller, otherwise move right.
- When the loop ends, return the final value of `ans`.

That is the entire algorithm in plain English.

## Complexity

| Type              | Complexity | Explanation                                                                 |
|-------------------|------------|-----------------------------------------------------------------------------|
| Time Complexity   | O(h)       | h is the height of the BST. In the worst case (skewed tree) h becomes n, but on average it is much smaller. |
| Space Complexity  | O(1)       | Only a handful of variables are used. No recursion stack or extra data structures are needed. |

## Multi-language Solutions

### C++
```cpp
/* Structure of a Binary Search Tree node
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
  public:
    int minDiff(Node *root, int k) {
        int ans = 1e9;
        while (root) {
            ans = min(ans, abs(root->data - k));
            if (root->data == k) return 0;
            if (k < root->data) root = root->left;
            else root = root->right;
        }
        return ans;
    }
};
```

### Java
```java
/* Structure of a Binary Search Tree node
class Node {
    int data;
    Node left, right;

    public Node(int val) {
        data = val;
        left = right = null;
    }
}
*/

class Solution {
    public int minDiff(Node root, int k) {
        int ans = Integer.MAX_VALUE;
        while (root != null) {
            ans = Math.min(ans, Math.abs(root.data - k));
            if (root.data == k) return 0;
            if (k < root.data) root = root.left;
            else root = root.right;
        }
        return ans;
    }
}
```

### JavaScript
```javascript
/* Structure of a Binary Search Tree node
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}
*/

/**
 * @param {Node} root
 * @param {number} k
 * @return {number}
 */

class Solution {
    minDiff(root, k) {
        let ans = 1e9;
        while (root) {
            ans = Math.min(ans, Math.abs(root.data - k));
            if (root.data === k) return 0;
            if (k < root.data) root = root.left;
            else root = root.right;
        }
        return ans;
    }
}
```

### Python3
```python
'''
Structure of a Binary Search Tree node
class Node:
    def __init__(self, val):
        self.data = val
        self.right = self.left = None
        
'''

class Solution:
    def minDiff(self, root: 'Node', k: int) -> int:
        ans = float('inf')
        while root:
            ans = min(ans, abs(root.data - k))
            if root.data == k:
                return 0
            if k < root.data:
                root = root.left
            else:
                root = root.right
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical in all four languages; only the syntax changes.

I declare a variable that will hold the smallest difference seen so far and set it to a very large number. This guarantees that the first real difference I calculate will replace it.

I then enter a loop that continues as long as the current node pointer (or reference) is not null. Inside the loop three things happen:

- I compute the absolute difference between the current node’s value and k and keep the smaller of that value and the previous best.
- I check whether the current value is exactly k. If it is, the answer is zero and there is no point continuing.
- I decide the next direction using the classic BST rule: go left when k is smaller, go right when k is larger.

Because a Binary Search Tree never places a smaller value on the right or a larger value on the left, every node I visit is a legitimate candidate for the closest value. When the pointer finally becomes null I have finished the only path that matters, so I return the best difference collected along the way.

Edge cases are handled naturally:
- If the tree contains only one node, the loop runs once and returns the absolute difference of that single value.
- If k is smaller than every node or larger than every node, the path simply walks to the leftmost or rightmost leaf and the difference to that extreme value is returned.
- If an exact match exists, the early return of zero fires as soon as that node is reached.

No language-specific tricks are required; the same three steps work in C++, Java, JavaScript, and Python.

## Examples

**Example 1**

Input: root = [10, 2, 11, 1, 5, N, N, N, N, 3, 6, N, 4], k = 13  

The search path is 10 → 11.  
Differences: |10-13| = 3, |11-13| = 2.  
Minimum is 2.

**Example 2**

Input: root = [8, 1, 9, N, 4, N, 10, 3], k = 9  

The path reaches the node with value 9 immediately.  
Difference is 0, so the answer is 0.

**Example 3**

Input: a single-node tree with value 5, k = 3  

Only one comparison is made: |5-3| = 2.  
Answer is 2.

## How to Use / Run Locally

1. Copy the empty code block for the language you want.
2. Paste the complete solution (including the Node class definition if the platform does not already provide it).
3. Compile and run:

- **C++**  
  `g++ -std=c++17 solution.cpp -o solution && ./solution`

- **Java**  
  `javac Solution.java && java Solution`

- **JavaScript**  
  `node solution.js`

- **Python3**  
  `python3 solution.py`

Most online judges (GeeksforGeeks, LeetCode, etc.) already supply the Node class, so you only need to implement the `minDiff` method.

## Notes & Optimizations

- The iterative version uses constant extra space. A recursive version would also be correct but would consume O(h) stack space.
- Because the constraints allow node values up to 10^5, a 32-bit integer is safe for the difference.
- If the tree is guaranteed to be balanced, the practical running time becomes O(log n), which is excellent for interview settings.
- An alternative approach is to find both the floor and the ceil of k in two separate passes and then take the minimum of the two differences. The single-pass method shown here is shorter and equally efficient.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
