# Longest Consecutive Path in Binary Tree

A clean and optimized solution for the GeeksforGeeks **Longest Consecutive Path in Binary Tree** problem using **Depth First Search (DFS)**. This repository includes optimized implementations in C++, Java, JavaScript, and Python3 along with a detailed explanation of the algorithm, complexity analysis, and walkthrough.

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
- [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

---

## Problem Summary

The goal is to find the length of the **longest consecutive path** in a binary tree.

A valid path must follow these rules:

- The path always moves from a parent to its child.
- Every child must have a value exactly **1 greater** than its parent.
- The path cannot move upward or skip nodes.

If no such parent-child consecutive sequence exists, the answer should be **-1**.

This is a classic **Binary Tree DFS** problem where we need to keep track of the current sequence while traversing the tree only once.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Number of nodes | `1 ≤ N ≤ 10^5` |
| Node value | `1 ≤ Node.data ≤ 10^5` |

---

## Intuition

The first thing I noticed was that every valid path always moves downward from parent to child.

That means I never need to move back upward or try different combinations of nodes.

While visiting a node, I already know its parent. So I can simply compare their values.

If the current node is exactly one greater than its parent, I extend the current consecutive path.

Otherwise, the previous sequence ends and a new sequence starts from the current node.

Since every node only needs to be processed once, a single DFS traversal is enough.

---

## Approach

I solve the problem using Depth First Search.

First, I start DFS from the root.

For every node, I keep track of:

- The current node
- The parent's value
- The current consecutive path length

While visiting a node:

1. Compare the current node with its parent.
2. If the values are consecutive, increase the current length.
3. Otherwise, reset the length to 1.
4. Update the global maximum answer.
5. Continue the same process for the left and right child.

After the traversal finishes, I simply check whether the maximum length is still 1.

If it is, then no valid consecutive parent-child pair exists, so I return -1.

---

## Data Structures Used

| Data Structure | Purpose |
|---------------|---------|
| Binary Tree | Stores the input tree structure |
| Recursive Call Stack | Performs DFS traversal without any extra container |

No additional arrays, hash maps, queues, or stacks are required.

---

## Operations & Behavior Summary

The algorithm works in the following order:

1. Start DFS from the root node.
2. Compare the current node with its parent.
3. Decide whether the consecutive sequence continues.
4. Update the longest sequence found so far.
5. Visit the left subtree.
6. Visit the right subtree.
7. Repeat until every node has been visited.
8. Return the maximum sequence length or `-1` if no valid sequence exists.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | **O(N)** | Every node is visited exactly one time. |
| Space Complexity | **O(H)** | Only the recursion stack is used, where `H` is the height of the tree. |

---

## Multi-language Solutions

### C++

```cpp
/* Structure of Binary Tree Node
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
  public:
    int ans = 1;

    // DFS to calculate consecutive path length
    void dfs(Node* node, int parentValue, int length) {
        // Stop if the node does not exist
        if (node == nullptr) return;

        // Check whether the current node continues the sequence
        if (node->data == parentValue + 1)
            length++;
        else
            // Start a new sequence from the current node
            length = 1;

        // Store the maximum sequence length found so far
        ans = max(ans, length);

        // Visit the left subtree
        dfs(node->left, node->data, length);

        // Visit the right subtree
        dfs(node->right, node->data, length);
    }

    int longestConsecutive(Node* root) {
        // Empty tree has no valid path
        if (root == nullptr) return -1;

        // Start DFS from the root
        // parentValue is set to root->data - 1
        // so that the root starts with length = 1
        dfs(root, root->data - 1, 0);

        // If no parent-child consecutive pair exists
        return (ans == 1) ? -1 : ans;
    }
};
```

### Java

```java
/* Structure of Binary Tree Node
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
}*/
class Solution {

    // Stores the maximum consecutive path length
    int ans = 1;

    // DFS traversal
    void dfs(Node node, int parentValue, int length) {

        // Stop if the node is null
        if (node == null) return;

        // Continue the sequence if values are consecutive
        if (node.data == parentValue + 1)
            length++;
        else
            // Otherwise start a new sequence
            length = 1;

        // Update the answer
        ans = Math.max(ans, length);

        // Traverse left subtree
        dfs(node.left, node.data, length);

        // Traverse right subtree
        dfs(node.right, node.data, length);
    }

    public int longestConsecutive(Node root) {

        // Empty tree
        if (root == null) return -1;

        // Start DFS
        dfs(root, root.data - 1, 0);

        // Return -1 if no valid consecutive path exists
        return ans == 1 ? -1 : ans;
    }
}
```

### JavaScript

```javascript
/* Structure of Binary Tree Node
class Node
{
    constructor(x){
        this.data = x;
        this.left = null;
        this.right = null;
    }
}
*/

/**
 * @param {Node} root
 * @return {number}
 */
class Solution {

    constructor() {
        // Stores the maximum consecutive path length
        this.ans = 1;
    }

    // DFS traversal
    dfs(node, parentValue, length) {

        // Stop if node is null
        if (node === null) return;

        // Check whether the sequence continues
        if (node.data === parentValue + 1)
            length++;
        else
            // Otherwise start a new sequence
            length = 1;

        // Update the answer
        this.ans = Math.max(this.ans, length);

        // Traverse left subtree
        this.dfs(node.left, node.data, length);

        // Traverse right subtree
        this.dfs(node.right, node.data, length);
    }

    longestConsecutive(root) {

        // Empty tree
        if (root === null) return -1;

        // Start DFS from root
        this.dfs(root, root.data - 1, 0);

        // Return -1 if no valid path exists
        return this.ans === 1 ? -1 : this.ans;
    }
}
```

### Python3

```python
'''
Structure of Binary Tree Node
class Node:
    def __init__(self, val):
        self.right = None
        self.data = val
        self.left = None
'''
class Solution:

    def __init__(self):
        # Stores the maximum consecutive path length
        self.ans = 1

    # DFS traversal
    def dfs(self, node, parent_value, length):

        # Stop if node does not exist
        if node is None:
            return

        # Continue the sequence if values are consecutive
        if node.data == parent_value + 1:
            length += 1
        else:
            # Otherwise start a new sequence
            length = 1

        # Update the maximum answer
        self.ans = max(self.ans, length)

        # Visit left subtree
        self.dfs(node.left, node.data, length)

        # Visit right subtree
        self.dfs(node.right, node.data, length)

    def longestConsecutive(self, root):
        # Empty tree
        if root is None:
            return -1

        # Start DFS from the root
        self.dfs(root, root.data - 1, 0)

        # Return -1 if no valid consecutive path exists
        return -1 if self.ans == 1 else self.ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The overall logic is exactly the same in all four languages.

The only difference is the syntax.

First, the traversal starts from the root.

The DFS function receives three values:

- The current node
- The parent's value
- The current consecutive length

At every node, the algorithm checks one condition.

If the current node's value is exactly one greater than the parent's value, the sequence continues.

Otherwise, the previous sequence ends and a new sequence starts from the current node.

After updating the current sequence length, the algorithm updates the global maximum answer.

Then it recursively visits both child nodes while carrying the latest sequence length forward.

Once the traversal finishes, the final answer is returned.

If the maximum length never becomes greater than one, it means no valid parent-child consecutive path exists, so the answer is `-1`.

Since every node is processed only once, the solution remains efficient even for very large binary trees.

---

## Examples

### Example 1

**Input**

```
root[] = [1, 2, 3]
```

**Output**

```
2
```

**Trace**

- Start at node 1.
- Node 2 is exactly one greater than 1.
- Current sequence becomes 2.
- Node 3 does not continue from node 1 because it is a separate child.
- Longest sequence is `1 → 2`.

---

### Example 2

**Input**

```
root[] = [10, 20, 30, 40, N, 60, 90]
```

**Output**

```
-1
```

**Trace**

None of the parent-child pairs differ by exactly one.

No valid consecutive sequence exists.

---

### Example 3

**Input**

```
root[] = [5, 6, 8, 7]
```

**Output**

```
3
```

**Trace**

- 5 → 6 continues the sequence.
- 6 → 7 also continues.
- Longest consecutive path becomes `5 → 6 → 7`.

---

## How to Use / Run Locally

Clone the repository.

```bash
git clone https://github.com/your-username/your-repository.git
```

Move into the project directory.

```bash
cd your-repository
```

### C++

Compile

```bash
g++ solution.cpp -o solution
```

Run

```bash
./solution
```

---

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

---

### JavaScript

Run using Node.js

```bash
node solution.js
```

---

### Python3

Run

```bash
python solution.py
```

---

## Notes & Optimizations

- This solution uses only one DFS traversal.
- Every node is processed exactly once.
- No extra data structures are required.
- The recursion stack is the only additional memory used.
- Returning `-1` when the maximum sequence length is one matches the problem requirement.
- An iterative DFS could also solve this problem, but the recursive version is much simpler and easier to understand.
- This approach works efficiently even for very large binary trees.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
