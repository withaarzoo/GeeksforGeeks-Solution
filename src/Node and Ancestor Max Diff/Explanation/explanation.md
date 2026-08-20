# Node and Ancestor Max Diff

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
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

The **Node and Ancestor Max Diff** problem asks us to find the maximum difference between an ancestor node `A` and one of its descendant nodes `B` in a binary tree.

The required difference is:

`A - B`

The ancestor must appear somewhere above the descendant in the tree. The descendant can be any node inside the ancestor's left or right subtree.

For every ancestor, the goal is to find a descendant that gives the largest possible value of `A - B`. Finally, we return the maximum difference found anywhere in the binary tree.

This problem is a good example of using **DFS**, **tree traversal**, and **bottom-up recursion** to solve a binary tree problem efficiently.

## Constraints

| Constraint                  | Value                   |
| --------------------------- | ----------------------- |
| Number of nodes in the tree | `2 ≤ n ≤ 10^4`          |
| Node value                  | `0 ≤ node->data ≤ 10^5` |
| Number of edges             | `2 ≤ edges ≤ 10^4`      |

## Intuition

My first thought was to compare every ancestor with every one of its descendants. But that would repeat the same work many times.

Then I noticed something important.

For a fixed ancestor with value `A`, I want to maximize:

`A - B`

Since `A` is already fixed, the best choice for `B` is simply the smallest descendant value.

So instead of checking every descendant separately, I can find the minimum value inside each subtree.

While returning from a recursive DFS call, I keep track of the smallest node value found in that subtree. The parent can then use that value to calculate the best possible difference with one of its descendants.

This gives an efficient binary tree DFS solution in a single traversal.

## Approach

I solve the problem using a bottom-up Depth First Search.

1. Start DFS from the root of the binary tree.
2. For every node, recursively process its left and right subtrees.
3. Find the minimum value present in both subtrees.
4. Compare the current node value with the minimum descendant value from each existing subtree.
5. Update the maximum difference using `current node - minimum descendant`.
6. Return the minimum value from the current subtree to its parent.
7. Continue until the entire tree has been processed.

The key idea is that each recursive call gives useful information back to its parent.

Instead of returning only after visiting a node, the DFS returns the smallest value available below that node. This allows every ancestor to quickly find its best possible descendant.

## Data Structures Used

### Binary Tree

The input itself is a binary tree made of nodes containing:

* A data value
* A left child
* A right child

The algorithm directly traverses this tree using DFS.

### Recursion Stack

The recursive function uses the system call stack to move through the tree.

No additional arrays, hash maps, queues, or other large data structures are required.

A single variable is also maintained to store the maximum ancestor-descendant difference found during traversal.

## Operations & Behavior Summary

The algorithm works like this:

1. Visit the current node.
2. Move to the left child and find the minimum value in the left subtree.
3. Move to the right child and find the minimum value in the right subtree.
4. If a child subtree exists, compare the current node with that subtree's minimum value.
5. Update the global maximum difference if the new difference is larger.
6. Find the minimum among the current node, left subtree, and right subtree.
7. Return that minimum value to the parent node.

For example, if a node has value `10` and the smallest value in its complete subtree is `3`, then this information can be passed upward.

The parent of `10` can then use `3` as one of its possible descendants without traversing the same subtree again.

## Complexity

| Complexity       | Value  | Explanation                                                                                                                             |
| ---------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Time Complexity  | `O(n)` | Every node is visited exactly once during the DFS traversal, where `n` is the total number of nodes in the binary tree.                 |
| Space Complexity | `O(h)` | The recursion stack stores at most `h` active calls, where `h` is the height of the binary tree. In the worst case, `h` can become `n`. |

## Multi-language Solutions

### C++

```cpp
/* Structure of Binary Tree Node
class Node {
  public:
    int data;
    Node *left;
    Node *right;
    Node(int val) {
        data = val;
        left = right = nullptr;
    }
};*/

class Solution {
  public:
    // This stores the maximum ancestor - descendant difference found so far.
    int ans;

    // This function returns the minimum value present in the current subtree.
    int dfs(Node* node) {
        // A null node does not contribute any value to the minimum.
        if (node == nullptr) {
            return INT_MAX;
        }

        // Recursively find the minimum values in both subtrees.
        int leftMin = dfs(node->left);
        int rightMin = dfs(node->right);

        // If the left subtree exists, compare the current ancestor with
        // the minimum descendant value available in that subtree.
        if (node->left != nullptr) {
            ans = max(ans, node->data - leftMin);
        }

        // If the right subtree exists, compare the current ancestor with
        // the minimum descendant value available in that subtree.
        if (node->right != nullptr) {
            ans = max(ans, node->data - rightMin);
        }

        // Return the minimum value in the entire current subtree so that
        // the parent can use it as one of its possible descendants.
        return min(node->data, min(leftMin, rightMin));
    }

    int maxDiff(Node* root) {
        // Start with the smallest possible integer because the answer
        // can also be negative.
        ans = INT_MIN;

        // Traverse the whole tree and calculate the answer.
        dfs(root);

        // Return the maximum ancestor - descendant difference.
        return ans;
    }
};
```

### Java

```java
/* Structure of binary tree node
class Node
{
    int data;
    Node left, right;

    Node(int item)
    {
        data = item;
        left = right = null;
    }
}
*/

class Solution {
    // This stores the maximum ancestor - descendant difference found so far.
    private int ans;

    // This function returns the minimum value present in the current subtree.
    private int dfs(Node node) {
        // A null node should not affect the minimum calculation.
        if (node == null) {
            return Integer.MAX_VALUE;
        }

        // Recursively find the minimum values in both subtrees.
        int leftMin = dfs(node.left);
        int rightMin = dfs(node.right);

        // If the left subtree exists, use its minimum as a possible descendant.
        if (node.left != null) {
            ans = Math.max(ans, node.data - leftMin);
        }

        // If the right subtree exists, use its minimum as a possible descendant.
        if (node.right != null) {
            ans = Math.max(ans, node.data - rightMin);
        }

        // Return the minimum value in this subtree to the parent node.
        return Math.min(node.data, Math.min(leftMin, rightMin));
    }

    int maxDiff(Node root) {
        // The answer can be negative, so start from the smallest integer.
        ans = Integer.MIN_VALUE;

        // Process the complete tree.
        dfs(root);

        // Return the maximum difference found.
        return ans;
    }
}
```

### JavaScript

```javascript
/* Structure of Binary Tree Node
class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}*/

/**
 * @param {Node} root
 * @returns {number}
 */

class Solution {
    maxDiff(root) {
        // Start with negative infinity because the final answer can be negative.
        let ans = Number.NEGATIVE_INFINITY;

        // This helper returns the minimum value present in a subtree.
        const dfs = (node) => {
            // A missing node should not affect the minimum calculation.
            if (node === null) {
                return Number.POSITIVE_INFINITY;
            }

            // Find the minimum values from both child subtrees.
            const leftMin = dfs(node.left);
            const rightMin = dfs(node.right);

            // If the left subtree exists, compare the current node
            // with the smallest descendant from that subtree.
            if (node.left !== null) {
                ans = Math.max(ans, node.data - leftMin);
            }

            // If the right subtree exists, compare the current node
            // with the smallest descendant from that subtree.
            if (node.right !== null) {
                ans = Math.max(ans, node.data - rightMin);
            }

            // Return the smallest value in this subtree to the parent.
            return Math.min(node.data, leftMin, rightMin);
        };

        // Traverse the tree and update ans during the DFS.
        dfs(root);

        // Return the maximum ancestor - descendant difference.
        return ans;
    }
}
```

### Python3

```python
''' Structure of Binary Tree Node
class Node:
    def __init__(self,val):
        self.data = val
        self.left = None
        self.right = None
'''
class Solution:
    def maxDiff(self, root):
        # This list lets the nested DFS function update the answer.
        # I use negative infinity because the answer can be negative.
        ans = [float('-inf')]

        # This function returns the minimum value in the current subtree.
        def dfs(node):
            # A missing node should not affect the minimum calculation.
            if node is None:
                return float('inf')

            # Recursively find the minimum values in both subtrees.
            left_min = dfs(node.left)
            right_min = dfs(node.right)

            # If the left subtree exists, compare the current ancestor
            # with its smallest possible descendant from that subtree.
            if node.left is not None:
                ans[0] = max(ans[0], node.data - left_min)

            # If the right subtree exists, compare the current ancestor
            # with its smallest possible descendant from that subtree.
            if node.right is not None:
                ans[0] = max(ans[0], node.data - right_min)

            # Return the smallest value in this subtree to the parent.
            return min(node.data, left_min, right_min)

        # Traverse the whole tree.
        dfs(root)

        # Return the maximum ancestor - descendant difference.
        return ans[0]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The main logic is the same in C++, Java, JavaScript, and Python3. Only the syntax and language-specific handling of recursion and variables are different.

First, I keep a variable that stores the maximum difference found so far.

This value should start with the smallest possible value because the answer can be negative. For example, if every ancestor is smaller than its descendants, the maximum valid difference may still be less than zero.

Next, I create a recursive DFS helper function.

The helper function takes the current node and returns the minimum value present in the subtree rooted at that node.

### Handling a Missing Node

When the current node is empty or `null`, there is no actual value to return.

I return a very large value such as positive infinity or the maximum integer value.

This works because later I use a minimum operation. A very large value will never incorrectly become the minimum when compared with real node values.

For example:

`min(5, infinity) = 5`

This makes the recursive logic simpler.

### Processing the Left and Right Subtrees

For every valid node, I recursively process both children.

The recursive calls return:

* The minimum value in the left subtree
* The minimum value in the right subtree

At this point, I already know the smallest possible descendant available from each direction.

### Updating the Maximum Difference

If the left subtree exists, the current node is an ancestor of every node inside it.

Therefore, I calculate:

`current node value - minimum value in left subtree`

I do the same for the right subtree.

The smallest descendant gives the largest possible difference for the current ancestor because subtracting a smaller number produces a larger result.

I update the answer whenever a larger difference is found.

### Returning the Minimum Value

After processing both subtrees, I return the minimum value among:

* The current node value
* The minimum value from the left subtree
* The minimum value from the right subtree

This value becomes useful to the parent.

That parent does not need to search through the current subtree again. It immediately receives the smallest possible descendant value.

### Language-specific Behavior

In C++ and Java, the maximum answer can be stored as a class-level or instance-level variable that every recursive call can access.

In JavaScript, a nested DFS function can access and update a variable from its outer function.

In Python3, the answer can be stored using a mutable object or handled with a suitable scope declaration so the nested DFS function can update it.

The algorithm itself remains exactly the same in all languages.

## Examples

### Example 1

**Input:**

```text
root[] = [5, 2, 1]
```

The binary tree is:

```text
      5
     / \
    2   1
```

**Expected Output:**

```text
4
```

**Trace:**

* Ancestor `5` and descendant `2` give `5 - 2 = 3`
* Ancestor `5` and descendant `1` give `5 - 1 = 4`

The maximum difference is `4`.

### Example 2

**Input:**

```text
root[] = [1, 2, 3, N, N, N, 7]
```

The relevant ancestor-descendant comparisons include:

```text
1 - 2 = -1
1 - 3 = -2
1 - 7 = -6
3 - 7 = -4
```

**Expected Output:**

```text
-1
```

**Trace:**

Even though all valid differences are negative, `-1` is the largest among them.

This is why the answer should not always start from `0`.

### Example 3

**Input:**

```text
root[] = [10, 8, 15, 3, 9, 12, 20]
```

One possible tree structure is:

```text
        10
       /  \
      8    15
     / \   / \
    3   9 12 20
```

**Expected Output:**

```text
7
```

**Trace:**

* For node `10`, the smallest descendant is `3`
* `10 - 3 = 7`
* Other ancestor-descendant differences are smaller

So the maximum difference is `7`.

## How to Use / Run Locally

### C++

Save the solution in a file named:

```text
solution.cpp
```

Compile it using:

```bash
g++ solution.cpp -o solution
```

Run the program using:

```bash
./solution
```

On Windows:

```bash
solution.exe
```

### Java

Save the solution in a Java file.

If you are using a complete program with a main class named `Main`, compile it using:

```bash
javac Main.java
```

Run it using:

```bash
java Main
```

For online judge submissions, copy only the required `Solution` class into the editor provided by the platform.

### JavaScript

Save the solution in:

```text
solution.js
```

Make sure Node.js is installed.

Run it using:

```bash
node solution.js
```

For online judges, copy the required `Solution` class into the JavaScript editor.

### Python3

Save the solution in:

```text
solution.py
```

Run it using:

```bash
python3 solution.py
```

Depending on your system configuration, this may also work:

```bash
python solution.py
```

For GeeksforGeeks or another online judge, submit only the required `Solution` class and method.

## Notes & Optimizations

The most important optimization in this binary tree problem is avoiding repeated subtree traversal.

A brute-force approach could check every ancestor against all of its descendants. That can cause the same nodes to be visited repeatedly.

The DFS approach avoids this by calculating the minimum value of every subtree only once.

Some important edge cases are:

* The maximum difference can be negative.
* A leaf node cannot form a valid ancestor-descendant pair by itself.
* A highly skewed binary tree can make the recursion stack reach `O(n)`.
* A balanced binary tree keeps the recursion depth close to `O(log n)`.

An iterative DFS could be considered if recursion depth is a concern, but the recursive approach is simpler and directly matches the bottom-up nature of this problem.

The final solution is optimal for the given constraints because every node must be examined at least once to determine the correct maximum ancestor-descendant difference.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
