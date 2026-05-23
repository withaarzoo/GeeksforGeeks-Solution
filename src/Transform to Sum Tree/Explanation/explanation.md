# Transform to Sum Tree

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

---

## Problem Summary

The "Transform to Sum Tree" problem is a popular Binary Tree problem from GeeksforGeeks that focuses on recursion and tree traversal.

In this problem, we are given the root of a binary tree. Our task is to convert the tree into a Sum Tree.

A Sum Tree means:

* Every node stores the sum of values present in its left and right subtrees from the original tree
* Leaf nodes become `0` because they do not have any children

The transformation must happen directly on the original tree.

### Input

* Root node of a binary tree
* Nodes may contain positive or negative values

### Output

* The original binary tree transformed into a Sum Tree

This problem is a good practice question for:

* Binary Tree recursion
* Postorder traversal
* Tree transformation algorithms
* Depth First Search (DFS)

---

## Constraints

| Constraint      | Value                         |
| --------------- | ----------------------------- |
| Number of nodes | `1 ≤ n ≤ 10^4`                |
| Node values     | Positive or negative integers |

---

## Intuition

When I first looked at this Binary Tree problem, I noticed something important.

A node depends on the values of its children before it can update itself.

That immediately suggested using Postorder Traversal because in postorder:

1. Left subtree is processed first
2. Right subtree is processed second
3. Current node is processed last

This order perfectly fits the problem requirement.

I also realized that while updating a node, I should not lose its original value because the parent node may still need that value later while calculating subtree sums.

So the idea became simple:

* Recursively calculate subtree sums
* Update the current node
* Return the original subtree total back to the parent

That gives an efficient recursive solution in one traversal.

---

## Approach

I used recursion with postorder traversal to solve this Sum Tree problem.

### Step-by-step approach

1. Start traversing the tree recursively
2. Process the left subtree first
3. Process the right subtree next
4. Store the original value of the current node
5. Replace the current node value with:

   * left subtree sum
   * plus right subtree sum
6. Return the total original subtree sum to the parent

Leaf nodes automatically become `0` because:

* left subtree sum = 0
* right subtree sum = 0

This approach modifies the tree in-place and visits every node only once.

---

## Data Structures Used

| Data Structure  | Why It Was Used                       |
| --------------- | ------------------------------------- |
| Binary Tree     | Main input structure                  |
| Recursion Stack | Helps perform DFS traversal naturally |

No extra arrays, maps, or queues are required.

The recursion stack itself handles traversal efficiently.

---

## Operations & Behavior Summary

Here is what the algorithm does internally:

1. Move to the left child recursively
2. Move to the right child recursively
3. Calculate subtree sums
4. Save the original node value
5. Replace the node value with subtree sum
6. Return the total subtree value upward

The recursion continues until every node in the binary tree gets updated.

Since the algorithm works bottom-up, child nodes are always processed before their parent.

---

## Complexity

| Type             | Complexity | Explanation                                                    |
| ---------------- | ---------- | -------------------------------------------------------------- |
| Time Complexity  | `O(n)`     | Every node in the binary tree is visited exactly once          |
| Space Complexity | `O(h)`     | Recursive call stack space where `h` is the height of the tree |

### Complexity Variables

* `n` = total number of nodes in the binary tree
* `h` = height of the binary tree

Worst-case recursion depth can become `O(n)` for a skewed tree.

---

## Multi-language Solutions

### C++

```cpp
/* Structure for Tree Node
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
    
    // Helper function to convert tree and return
    // total sum of original subtree
    int solve(Node* root) {
        
        // Base case
        if (root == NULL)
            return 0;
        
        // Recursively get left subtree sum
        int leftSum = solve(root->left);
        
        // Recursively get right subtree sum
        int rightSum = solve(root->right);
        
        // Store original node value before changing it
        int originalValue = root->data;
        
        // Update current node with sum of left and right subtree
        root->data = leftSum + rightSum;
        
        // Return total original subtree sum to parent
        return originalValue + root->data;
    }
    
    void toSumTree(Node *root) {
        
        // Start recursive transformation
        solve(root);
    }
};
```

### Java

```java
/* Structure for Tree Node
class Node {
    int data;
    Node left, right;

    // Constructor
    Node(int val) {
        data = val;
        left = null;
        right = null;
    }
};
*/
class Solution {
    
    // Helper function to transform tree
    // and return original subtree sum
    int solve(Node root) {
        
        // Base case
        if (root == null)
            return 0;
        
        // Calculate left subtree sum
        int leftSum = solve(root.left);
        
        // Calculate right subtree sum
        int rightSum = solve(root.right);
        
        // Store original node value
        int originalValue = root.data;
        
        // Update current node value
        root.data = leftSum + rightSum;
        
        // Return total subtree sum
        return originalValue + root.data;
    }
    
    public void toSumTree(Node root) {
        
        // Start recursion
        solve(root);
    }
}
```

### JavaScript

```javascript
/* Structure for Tree Node
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}
*/

class Solution {
    
    // Helper function
    // Returns total original subtree sum
    solve(root) {
        
        // Base case
        if (root === null)
            return 0;
        
        // Get left subtree sum
        let leftSum = this.solve(root.left);
        
        // Get right subtree sum
        let rightSum = this.solve(root.right);
        
        // Store original value
        let originalValue = root.data;
        
        // Update current node
        root.data = leftSum + rightSum;
        
        // Return total subtree sum
        return originalValue + root.data;
    }
    
    toSumTree(root) {
        
        // Start transformation
        this.solve(root);
    }
}
```

### Python3

```python
# Structure for Tree Node
'''
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None

'''
class Solution:
    
    # Helper function
    # Returns total original subtree sum
    def solve(self, root):
        
        # Base case
        if root is None:
            return 0
        
        # Get sum from left subtree
        left_sum = self.solve(root.left)
        
        # Get sum from right subtree
        right_sum = self.solve(root.right)
        
        # Store original node value
        original_value = root.data
        
        # Update current node value
        root.data = left_sum + right_sum
        
        # Return total original subtree sum
        return original_value + root.data
    
    def toSumTree(self, root):
        
        # Start recursive conversion
        self.solve(root)
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all programming languages.

Only syntax changes.

### Base Case

The recursion stops when the current node becomes `NULL` or `None`.

At that point, the subtree sum is `0`.

This prevents unnecessary recursion calls and handles empty child nodes safely.

---

### Recursive Left Subtree Processing

The algorithm first processes the left subtree recursively.

This helps calculate the complete sum of the left subtree before updating the current node.

The returned value represents:

* original left subtree total

---

### Recursive Right Subtree Processing

After the left subtree, the algorithm processes the right subtree.

Again, the recursive call returns:

* original right subtree total

Now both subtree sums are available.

---

### Store Original Node Value

Before changing the node value, the original value must be saved.

This step is extremely important.

If we overwrite the node immediately, we lose the original data needed for parent calculations.

---

### Update Current Node

The node is updated using:

```text
left subtree sum + right subtree sum
```

This directly follows the Sum Tree definition.

Leaf nodes become `0` automatically because both subtree sums are `0`.

---

### Return Total Original Subtree Sum

Finally, the function returns:

```text
original node value + updated node value
```

This gives the total original subtree sum.

The parent node later uses this returned value to calculate its own transformation.

---

### Why Postorder Traversal Works Best

This problem is a classic use case of postorder traversal.

The parent node depends on already-processed child nodes.

So the order must be:

1. Left
2. Right
3. Root

If preorder or inorder traversal were used, subtree sums would not be ready when needed.

---

## Examples

### Example 1

### Input

```text
       10
      /  \
    -2    6
    / \   / \
   8  -4 7   5
```

### Output

```text
       20
      /  \
     4    12
    / \   / \
   0  0  0   0
```

### Explanation

* Leaf nodes become `0`
* Node `-2` becomes `8 + (-4) = 4`
* Node `6` becomes `7 + 5 = 12`
* Root becomes `4 + 12 + original child sums = 20`

---

### Example 2

### Input

```text
    5
   / \
  1   2
```

### Output

```text
    3
   / \
  0   0
```

### Explanation

* Leaf nodes `1` and `2` become `0`
* Root becomes `1 + 2 = 3`

---

### Example 3

### Input

```text
   7
```

### Output

```text
   0
```

### Explanation

A single node has no children.

So it becomes `0`.

---

## How to Use / Run Locally

### C++

Compile and run:

```bash
g++ filename.cpp -o output
./output
```

---

### Java

Compile:

```bash
javac Main.java
```

Run:

```bash
java Main
```

---

### JavaScript

Run using Node.js:

```bash
node filename.js
```

---

### Python3

Run using Python:

```bash
python filename.py
```

---

## Notes & Optimizations

* This Binary Tree solution works in a single traversal
* No extra data structures are required
* Recursive DFS makes the implementation clean and short
* The algorithm works with:

  * positive numbers
  * negative numbers
  * skewed trees
  * balanced trees

### Important Edge Cases

* Single node tree
* Empty subtree
* Negative node values
* Highly skewed binary tree

### Alternative Approaches

An iterative DFS approach is possible using stacks, but recursion is much simpler and easier to understand for this problem.

Postorder traversal is the most natural fit because child subtree sums must be known before updating the parent.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
