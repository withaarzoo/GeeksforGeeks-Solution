# Max Path Sum Between Two Leaves

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

You are given the root of a binary tree. Every node holds an integer. The task is to find the maximum sum of the values on any path that starts at one leaf and ends at another leaf.  

If the tree has fewer than two leaves, the answer is -1.  

Input is the root pointer of the binary tree. Output is a single integer: the largest leaf-to-leaf path sum, or -1 when no such path exists.

## Constraints

- 0 ≤ size of binary tree ≤ 10⁴
- -10³ ≤ node.data ≤ 10³

## Intuition

The first thing that stands out is that a valid path must begin and end at leaves. Any path between two leaves has a single highest node that is the lowest common ancestor of those two leaves.  

If I can compute, for every node, the best sum that can be obtained by going downward to a leaf on its left side and on its right side, then adding those two sums plus the node itself gives a candidate answer. Keeping the largest of all such candidates solves the problem in one pass.

## Approach

I perform a post-order traversal of the tree.  

For each node I first ask the left subtree and the right subtree for the maximum path sum that ends at a leaf.  

When both children exist I add the two returned values together with the current node’s value and update a global maximum if the result is larger.  

I then return to the parent the better of the two downward sums plus the current node’s value (or simply the existing side if one child is missing).  

A leaf returns its own value. After the whole tree has been processed, if the global maximum was never updated I return -1, otherwise I return that maximum.

## Data Structures Used

- Binary tree nodes – the input structure itself.
- Recursion call stack – used to perform the post-order traversal and to keep the downward sums for each subtree. No extra arrays, maps or queues are required.

## Operations & Behavior Summary

1. Initialise a variable that will hold the best path sum found so far (set to the smallest possible integer).
2. Call a helper on the root.
3. In the helper:
   - If the node is null, return 0.
   - If the node is a leaf, return its data.
   - Recursively obtain the best leaf-path sum from the left child and from the right child.
   - If both children exist, compute left + right + node.data and update the global answer.
   - Return the larger of the two sides plus node.data (or the only existing side).
4. After the helper finishes, if the global answer is still the initial tiny value return -1, otherwise return the answer.

## Complexity

| Complexity       | Value | Explanation |
|------------------|-------|-------------|
| Time Complexity  | O(n)  | Every node is visited exactly once. n is the number of nodes in the tree. |
| Space Complexity | O(h)  | Only the recursion stack is used. h is the height of the tree; in the worst case of a skewed tree this becomes O(n). |

## Multi-language Solutions

### C++
```cpp
/* Node Structure
class Node {
    int data;
    Node left;
    Node right;
    Node(int data) {
        this.data = data;
        left = nullptr;
        right = nullptr;
    }
}
*/
class Solution {
  public:
    int maxPathSum(Node *root) {
        int res = INT_MIN;
        helper(root, res);
        return res == INT_MIN ? -1 : res;
    }
    
  private:
    int helper(Node* node, int& res) {
        if (!node) return 0;
        if (!node->left && !node->right) return node->data;
        
        int left = helper(node->left, res);
        int right = helper(node->right, res);
        
        if (node->left && node->right) {
            res = max(res, left + right + node->data);
            return max(left, right) + node->data;
        }
        return (node->left ? left : right) + node->data;
    }
};
```

### Java
```java
/* Node Structure
class Node
{
    int data;
    Node left, right;
    Node(int item)
    {
        data = item;
        left = right = null;
    }
} */
class Solution {
    public int maxPathSum(Node root) {
        int[] res = {Integer.MIN_VALUE};
        helper(root, res);
        return res[0] == Integer.MIN_VALUE ? -1 : res[0];
    }
    
    private int helper(Node node, int[] res) {
        if (node == null) return 0;
        if (node.left == null && node.right == null) return node.data;
        
        int left = helper(node.left, res);
        int right = helper(node.right, res);
        
        if (node.left != null && node.right != null) {
            res[0] = Math.max(res[0], left + right + node.data);
            return Math.max(left, right) + node.data;
        }
        return (node.left != null ? left : right) + node.data;
    }
}
```

### JavaScript
```javascript
/*
class Node
{
    constructor(x){
        this.key=x;
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
    maxPathSum(root) {
        let res = -Infinity;
        const helper = (node) => {
            if (!node) return 0;
            if (!node.left && !node.right) return node.key;
            
            let left = helper(node.left);
            let right = helper(node.right);
            
            if (node.left && node.right) {
                res = Math.max(res, left + right + node.key);
                return Math.max(left, right) + node.key;
            }
            return (node.left ? left : right) + node.key;
        };
        helper(root);
        return res === -Infinity ? -1 : res;
    }
}
```

### Python3
```python
'''
# Node Class:
class Node:
    def _init_(self,val):
        self.data = val
        self.left = None
        self.right = None
        '''
class Solution:        
    def maxPathSum(self, root):
        self.res = float('-inf')
        def helper(node):
            if not node:
                return 0
            if not node.left and not node.right:
                return node.data
            left = helper(node.left)
            right = helper(node.right)
            if node.left and node.right:
                self.res = max(self.res, left + right + node.data)
                return max(left, right) + node.data
            return (left if node.left else right) + node.data
        helper(root)
        return -1 if self.res == float('-inf') else self.res
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages; only the syntax for references, null checks and integer limits differs.

I start by creating a variable that will store the maximum path sum seen so far. I initialise it to the smallest integer the language provides so that any real path will replace it.

The helper function does all the work. It receives a node and returns the largest sum of a path that starts at that node and ends at a leaf somewhere below it.

First the two base cases are handled. A null node returns 0 (this value is ignored when the other child is also null). A leaf simply returns its own data because that is the only possible path sum from a leaf.

For every other node the helper first obtains the best downward sums from the left child and from the right child by recursive calls. After those calls finish I already know the two numbers I need.

The critical check follows: if the current node really has both a left child and a right child, the path that travels down the left side, through the current node and down the right side is a genuine leaf-to-leaf path. I add the three values and keep the larger of this sum and the previous global answer.

Finally the helper must return a value to its own parent. The parent can continue the path in only one direction, so I return the better of the two sides plus the current node’s value. When one child is missing I simply take the existing side.

When the entire recursion finishes, the global variable either holds the maximum leaf-to-leaf sum or it is still the initial tiny value. In the latter case the tree never produced a path with two leaves, so the function returns -1.

Edge cases such as an empty tree, a single-node tree, or a tree with only one leaf are automatically covered because the global answer stays at its initial value and the final check returns -1.

## Examples

**Example 1**  
Input: root = [3, 4, 5, -10, 4, N, N]  

The leaves are -10, 4 and 5.  
Possible path sums:  
-10 → 4 → 3 → 5 = 2  
-10 → 4 → 4 = -2  
4 → 4 → 3 → 5 = 16  

The algorithm records 16 at the root and returns 16.

**Example 2**  
Input: root = [-15, 5, 6, -8, 1, 3, 9, 2, -3, N, N, N, N, 0, N, N, N, N, 4, -1, N, N, 10]  

One of the leaf-to-leaf paths is 3 → 6 → 9 → 0 → -1 → 10 = 27.  
The algorithm discovers this sum while processing the node that has both children contributing to the path and returns 27.

**Example 3**  
Input: root = [3, 4, 1, -10, 4, N, N]  

Leaves are -10, 4 and 1.  
The path 4 → 4 → 3 → 1 gives 12, which is the maximum returned by the algorithm.

## How to Use / Run Locally

**C++**  
1. Save the code in a file named `main.cpp`.  
2. Compile: `g++ -o main main.cpp`  
3. Run: `./main`  
(You will need to add a small driver that builds the tree and calls the solution function.)

**Java**  
1. Save the code in a file named `Solution.java`.  
2. Compile: `javac Solution.java`  
3. Run: `java Solution`  
(Add a main method that constructs the tree and prints the result.)

**JavaScript**  
1. Save the code in a file named `solution.js`.  
2. Run with Node: `node solution.js`  
(Add a few lines that create the tree nodes and call the method.)

**Python3**  
1. Save the code in a file named `solution.py`.  
2. Run: `python3 solution.py`  
(Add a short driver that builds the tree and prints the returned value.)

## Notes & Optimizations

- The solution already runs in linear time and uses only the call stack, so further asymptotic improvement is not possible.
- Negative node values are handled correctly; the algorithm simply keeps the largest algebraic sum.
- If the problem constraints ever required the path to contain at least three nodes, the same framework could be extended by an extra check, but the current statement does not need it.
- An iterative post-order traversal with an explicit stack would avoid recursion depth limits on extremely skewed trees, at the cost of slightly more code.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)