# Minimum Absolute Difference In BST

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

You are given the root of a Binary Search Tree (BST) that contains more than one node. Your task is to find the smallest absolute difference between the values of any two different nodes in the tree.

In simple words, look at every pair of nodes, calculate the absolute difference of their values, and return the minimum among all those differences.

This is a classic DSA problem that appears in coding interviews and platforms like GeeksforGeeks and LeetCode. The key is to use the sorted nature of a Binary Search Tree instead of checking every possible pair.

## Constraints

- Number of nodes in the tree: 2 ≤ n ≤ 10^5
- Node values: 0 ≤ node.data ≤ 10^6

These limits mean any solution slower than linear time will time out on large inputs.

## Intuition

The first thing that comes to mind is that a Binary Search Tree keeps its values in sorted order when you visit the nodes using in-order traversal (left → root → right).

Because the values appear in ascending order, the smallest absolute difference must exist between two consecutive values in that sorted sequence. There is no need to compare every pair of nodes. Checking only neighboring values after sorting is enough and much faster.

This observation turns an O(n²) brute-force idea into a clean O(n) solution.

## Approach

I perform a single in-order traversal of the Binary Search Tree while keeping track of two pieces of information:

1. The value of the previously visited node.
2. The smallest difference seen so far.

While walking the tree:

- First go as far left as possible.
- When a node is visited, calculate the difference with the previous node (if one exists) and update the minimum.
- Then move to the right subtree.

At the end of the traversal the recorded minimum is the answer. This works because consecutive nodes in the in-order sequence are the closest possible candidates for the minimum absolute difference in a BST.

## Data Structures Used

- Binary Search Tree itself – the input structure that already keeps values sorted under in-order traversal.
- A few simple variables (previous value and current minimum) – no extra arrays or maps are required.
- Recursion call stack – used for the in-order traversal; its depth equals the height of the tree.

These choices keep both time and extra memory low.

## Operations & Behavior Summary

1. Start the in-order traversal from the root.
2. Recursively process the left subtree.
3. At the current node, if a previous value exists, compute the difference and keep the smaller of that difference and the global minimum.
4. Update the previous value to the current node’s data.
5. Recursively process the right subtree.
6. After the entire tree is visited, return the recorded minimum difference.

The algorithm never stores the full list of values; it only remembers the last seen value and the best difference found so far.

## Complexity

| Complexity Type   | Value   | Explanation |
|-------------------|---------|-------------|
| Time Complexity   | O(n)    | Every node is visited exactly once during the in-order traversal. |
| Space Complexity  | O(h)    | h is the height of the tree. This space is used by the recursion stack. In a balanced tree h is log n; in a skewed tree it can be n. |

No additional data structures that grow with n are allocated.

## Multi-language Solutions

### C++
```cpp
/* Binary Tree Node Structure
class Node {
public:
    int data;
    Node *left;
    Node *right;

    Node(int val) {
        data = val;
        left = right = nullptr;
    }
}; 
*/

class Solution {
  public:
    // prev stores the value of the previously visited node
    // minDiff keeps the smallest absolute difference found so far
    long long prev = -1;          // -1 means "no previous node yet"
    long long minDiff = 1e18;     // start with a huge number

    void inorder(Node* root) {
        if (!root) return;                    // base case: empty subtree

        inorder(root->left);                  // 1. finish left subtree first

        // 2. process current node
        if (prev != -1) {                     // only compute if we already saw a node
            long long diff = root->data - prev;
            if (diff < minDiff) minDiff = diff;
        }
        prev = root->data;                    // remember this node for the next one

        inorder(root->right);                 // 3. now go to right subtree
    }

    int absDiff(Node *root) {
        prev = -1;                            // reset for safety
        minDiff = 1e18;
        inorder(root);
        return (int)minDiff;
    }
};
```

### Java
```java
/* The Node structure is defined as
 class Node {
    int data;
    Node left;
    Node right;
    Node(int data){
        this.data = data;
        left = null;
        right = null;
    }
}
*/

class Solution {
    // prev stores the value of the previously visited node
    // minDiff keeps the smallest absolute difference found so far
    long prev = -1;               // -1 means "no previous node yet"
    long minDiff = Long.MAX_VALUE;

    void inorder(Node root) {
        if (root == null) return;             // base case: empty subtree

        inorder(root.left);                   // 1. finish left subtree first

        // 2. process current node
        if (prev != -1) {                     // only compute if we already saw a node
            long diff = root.data - prev;
            if (diff < minDiff) minDiff = diff;
        }
        prev = root.data;                     // remember this node for the next one

        inorder(root.right);                  // 3. now go to right subtree
    }

    public int absDiff(Node root) {
        prev = -1;                            // reset for safety
        minDiff = Long.MAX_VALUE;
        inorder(root);
        return (int)minDiff;
    }
}
```

### JavaScript
```javascript
/* Binary Tree Node Structure
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
 * @return s {number}
 */

class Solution {
    // prev stores the value of the previously visited node
    // minDiff keeps the smallest absolute difference found so far
    constructor() {
        this.prev = -1;                       // -1 means "no previous node yet"
        this.minDiff = Number.MAX_SAFE_INTEGER;
    }

    inorder(root) {
        if (!root) return;                    // base case: empty subtree

        this.inorder(root.left);              // 1. finish left subtree first

        // 2. process current node
        if (this.prev !== -1) {               // only compute if we already saw a node
            let diff = root.data - this.prev;
            if (diff < this.minDiff) this.minDiff = diff;
        }
        this.prev = root.data;                // remember this node for the next one

        this.inorder(root.right);             // 3. now go to right subtree
    }

    absDiff(root) {
        this.prev = -1;                       // reset for safety
        this.minDiff = Number.MAX_SAFE_INTEGER;
        this.inorder(root);
        return this.minDiff;
    }
}
```

### Python3
```python
'''
Binary Tree Node Structure
class Node:
    def __init__(self):
        self.data = None
        self.left = None
        self.right = None
'''
        
class Solution:
    def absDiff(self, root):
        # prev stores the value of the previously visited node
        # minDiff keeps the smallest absolute difference found so far
        self.prev = -1                        # -1 means "no previous node yet"
        self.minDiff = float('inf')

        def inorder(node):
            if not node:
                return                        # base case: empty subtree

            inorder(node.left)                # 1. finish left subtree first

            # 2. process current node
            if self.prev != -1:               # only compute if we already saw a node
                diff = node.data - self.prev
                if diff < self.minDiff:
                    self.minDiff = diff
            self.prev = node.data             # remember this node for the next one

            inorder(node.right)               # 3. now go to right subtree

        inorder(root)
        return self.minDiff
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages; only syntax differs.

I keep two variables that live outside the recursive function:
- One stores the value of the last node I visited (initially a sentinel value meaning “no previous node”).
- The other stores the smallest difference found so far (initially a very large number).

The recursive helper does a classic in-order walk:

- If the current node is null, return immediately.
- First call the helper on the left child. This guarantees all smaller values are processed before the current node.
- After returning from the left side, the current node is ready to be examined. If a previous value exists, subtract it from the current node’s value (the result is always non-negative because of the sorted order). Keep the smaller of this difference and the global minimum.
- Store the current node’s value as the new previous value so the next node can compare against it.
- Finally call the helper on the right child.

When the recursion finishes, the global minimum holds the answer. Edge cases such as a skewed tree or nodes with value 0 are handled automatically because the traversal still produces a sorted sequence and the difference calculation never assumes a particular shape.

## Examples

Example 1  
Input tree (level order): [50, 30, 70, 20, null, 60, 80]

```
        50
       /  \
     30    70
    /     /  \
  20     60   80
```

In-order sequence: 20, 30, 50, 60, 70, 80  
Consecutive differences: 10, 20, 10, 10, 10  
Minimum absolute difference: 10

Example 2  
Input tree (level order): [60, 30, 90, 10]

```
      60
     /  \
   30    90
  /
10
```

In-order sequence: 10, 30, 60, 90  
Consecutive differences: 20, 30, 30  
Minimum absolute difference: 20

Example 3  
A simple two-node tree: root = 5, left = 2  
In-order: 2, 5  
Difference: 3  
Answer: 3

## How to Use / Run Locally

C++  
1. Save the solution in a file named `main.cpp`.  
2. Compile with `g++ -std=c++17 main.cpp -o main`.  
3. Run with `./main`. You will need to add a small driver that builds the tree and calls the function.

Java  
1. Save the class in `Solution.java`.  
2. Compile with `javac Solution.java`.  
3. Run with `java Solution` after adding a main method that constructs the tree.

JavaScript  
1. Save the code in `solution.js`.  
2. Run with `node solution.js` after adding a small test harness that creates nodes and prints the result.

Python3  
1. Save the code in `solution.py`.  
2. Run with `python3 solution.py` after adding a few lines that build a sample tree and call the method.

In every language you must supply a driver that creates the Binary Search Tree nodes according to the problem’s input format.

## Notes & Optimizations

- The solution already meets the expected O(n) time and O(h) space limits.
- An iterative in-order traversal using an explicit stack can replace recursion if stack depth is a concern on very skewed trees.
- Because node values are non-negative and the sequence is sorted, a simple subtraction is enough; an absolute-value call is unnecessary.
- The same idea works for the related problem “Minimum Absolute Difference in a Sorted Array” – the BST just supplies the sorted order for free.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)