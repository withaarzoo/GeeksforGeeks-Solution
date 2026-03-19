# Largest BST

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions
* Step-by-step Detailed Explanation
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

## Problem Summary

Given a binary tree, I need to find the size of the largest subtree that is also a Binary Search Tree (BST).

A subtree is a BST if:

* All nodes in the left subtree are smaller than the root
* All nodes in the right subtree are greater than the root
* No duplicate values exist

The size of a subtree is the number of nodes it contains.

## Constraints

* 1 ≤ number of nodes ≤ 10^5
* 1 ≤ node value ≤ 10^5

## Intuition

At first, I thought of checking every subtree separately, but that would be too slow (O(n^2)).

Then I realized I can gather information while traversing the tree only once.

For every node, I keep track of:

* Minimum value in subtree
* Maximum value in subtree
* Size of subtree
* Whether the subtree is a BST

This allows me to decide efficiently if the current subtree is a BST.

## Approach

I use Postorder Traversal (Left → Right → Root).

Steps:

1. Recursively get information from left and right subtrees
2. Check BST condition:
   left.max < root.data < right.min
3. If true:

   * Current subtree is BST
   * Size = left.size + right.size + 1
4. Else:

   * Not BST
   * Return max size from left or right subtree

## Data Structures Used

* Recursion stack
* Custom structure (or tuple/object) to store:

  * size
  * min value
  * max value
  * isBST flag

## Operations & Behavior Summary

* Traverse tree once
* Combine results bottom-up
* Maintain subtree properties at each node
* Track largest BST size during traversal

## Complexity

* Time Complexity: O(n)

  * Each node is visited exactly once
* Space Complexity: O(h)

  * h = height of tree (recursion stack)

## Multi-language Solutions

### C++

```cpp
class Info {
public:
    int size, minVal, maxVal;
    bool isBST;

    Info(int s, int minV, int maxV, bool bst) {
        size = s;
        minVal = minV;
        maxVal = maxV;
        isBST = bst;
    }
};

class Solution {
public:
    Info solve(Node* root) {
        if (!root)
            return Info(0, INT_MAX, INT_MIN, true);

        Info left = solve(root->left);
        Info right = solve(root->right);

        if (left.isBST && right.isBST &&
            root->data > left.maxVal &&
            root->data < right.minVal) {

            return Info(
                left.size + right.size + 1,
                min(root->data, left.minVal),
                max(root->data, right.maxVal),
                true
            );
        }

        return Info(
            max(left.size, right.size),
            INT_MIN,
            INT_MAX,
            false
        );
    }

    int largestBst(Node *root) {
        return solve(root).size;
    }
};
```

### Java

```java
class Info {
    int size, min, max;
    boolean isBST;

    Info(int s, int min, int max, boolean bst) {
        this.size = s;
        this.min = min;
        this.max = max;
        this.isBST = bst;
    }
}

class Solution {
    static Info solve(Node root) {
        if (root == null)
            return new Info(0, Integer.MAX_VALUE, Integer.MIN_VALUE, true);

        Info left = solve(root.left);
        Info right = solve(root.right);

        if (left.isBST && right.isBST &&
            root.data > left.max &&
            root.data < right.min) {

            return new Info(
                left.size + right.size + 1,
                Math.min(root.data, left.min),
                Math.max(root.data, right.max),
                true
            );
        }

        return new Info(
            Math.max(left.size, right.size),
            Integer.MIN_VALUE,
            Integer.MAX_VALUE,
            false
        );
    }

    static int largestBst(Node root) {
        return solve(root).size;
    }
}
```

### JavaScript

```javascript
class Solution {
    largestBst(root) {
        function solve(node) {
            if (!node) {
                return {
                    size: 0,
                    min: Infinity,
                    max: -Infinity,
                    isBST: true
                };
            }

            let left = solve(node.left);
            let right = solve(node.right);

            if (left.isBST && right.isBST &&
                node.key > left.max &&
                node.key < right.min) {

                return {
                    size: left.size + right.size + 1,
                    min: Math.min(node.key, left.min),
                    max: Math.max(node.key, right.max),
                    isBST: true
                };
            }

            return {
                size: Math.max(left.size, right.size),
                min: -Infinity,
                max: Infinity,
                isBST: false
            };
        }

        return solve(root).size;
    }
}
```

### Python3

```python
class Solution:
    def largestBst(self, root):

        def solve(node):
            if not node:
                return (0, float('inf'), float('-inf'), True)

            left = solve(node.left)
            right = solve(node.right)

            if (left[3] and right[3] and
                node.data > left[2] and
                node.data < right[1]):

                return (
                    left[0] + right[0] + 1,
                    min(node.data, left[1]),
                    max(node.data, right[2]),
                    True
                )

            return (
                max(left[0], right[0]),
                float('-inf'),
                float('inf'),
                False
            )

        return solve(root)[0]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Base Case:
   If node is null, return:
   size = 0, min = +infinity, max = -infinity, isBST = true

2. Recursive Calls:
   Get left and right subtree information

3. Check BST Condition:
   left.max < node.data < right.min

4. If Valid BST:

   * Combine sizes
   * Update min and max
   * Mark as BST

5. If Not BST:

   * Take maximum size from left or right
   * Mark as not BST

6. Final Answer:
   Return size from root

## Examples

Input:
[5, 2, 4, 1, 3]
Output:
3

Input:
[6, 7, 3, null, 2, 2, 4]
Output:
3

## How to use / Run locally

1. Copy the code into your preferred language file
2. Create the binary tree structure
3. Call the function largestBst(root)
4. Print the result

## Notes & Optimizations

* Avoid repeated BST checks
* Use bottom-up approach
* Store min and max to validate BST quickly
* Ensures optimal O(n) performance

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
