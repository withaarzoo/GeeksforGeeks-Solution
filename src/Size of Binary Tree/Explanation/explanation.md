# Size of Binary Tree

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

The "Size of Binary Tree" problem asks us to find the total number of nodes present in a binary tree.

We are given the root node of the binary tree, and we need to return how many nodes exist in the entire tree.

In simple words:

* Every node counts as `1`
* We need to count all nodes from the left subtree, right subtree, and the root itself

This is a very common Binary Tree recursion problem in Data Structures and Algorithms (DSA) and is frequently asked in coding interviews and competitive programming platforms like GeeksforGeeks.

Input:

* Root node of a binary tree

Output:

* Total number of nodes in the tree

---

## Constraints

| Constraint      | Value                     |
| --------------- | ------------------------- |
| Number of nodes | `1 <= n <= 10^5`          |
| Node value      | `1 <= node->data <= 10^5` |

---

## Intuition

The first thing I noticed was that every subtree is itself a smaller binary tree.

So instead of thinking about the whole tree at once, I thought:

* If I already know the size of the left subtree
* And I already know the size of the right subtree

Then I can easily calculate the size of the current tree.

The formula becomes:

```text
Size = Left Subtree + Right Subtree + 1
```

That extra `1` is for the current node.

This immediately suggests a recursive solution because recursion works naturally with trees.

---

## Approach

I used Depth First Search (DFS) recursion to traverse the binary tree.

Step-by-step process:

1. Start from the root node
2. If the node is `NULL`, return `0`
3. Recursively calculate:

   * size of left subtree
   * size of right subtree
4. Add both subtree sizes
5. Add `1` for the current node
6. Return the final count

This process continues until all nodes are visited exactly once.

---

## Data Structures Used

| Data Structure       | Why It Was Used                         |
| -------------------- | --------------------------------------- |
| Binary Tree          | The given input structure               |
| Recursion Call Stack | Used automatically during DFS traversal |

No extra arrays, queues, stacks, or hash maps are needed.

---

## Operations & Behavior Summary

The algorithm performs these operations:

1. Visit the current node
2. Move recursively to the left subtree
3. Move recursively to the right subtree
4. Count nodes from both sides
5. Add the current node to the answer
6. Return the total subtree size upward

The recursion keeps combining smaller subtree answers until the root gets the final size of the entire binary tree.

---

## Complexity

| Complexity Type  | Value  | Explanation                                 |
| ---------------- | ------ | ------------------------------------------- |
| Time Complexity  | `O(n)` | Every node is visited exactly one time      |
| Space Complexity | `O(h)` | Recursive call stack uses tree height space |

Where:

* `n` = total number of nodes
* `h` = height of the binary tree

For a balanced tree:

* `h = log n`

For a skewed tree:

* `h = n`

---

## Multi-language Solutions

### C++

```cpp
/*
Definition for Node
struct Node {
    int data;
    struct Node* left;
    struct Node* right;

    Node(int val) {
        data = val;
        left = right = NULL;
    }
};
*/
class Solution {
  public:
    int getSize(Node* root) {
        
        // If node is NULL, there are no nodes to count
        if(root == NULL) {
            return 0;
        }
        
        // Recursively count nodes in left subtree
        int leftSize = getSize(root->left);
        
        // Recursively count nodes in right subtree
        int rightSize = getSize(root->right);
        
        // Total size =
        // left subtree nodes + right subtree nodes + current node
        return leftSize + rightSize + 1;
    }
}; 
```

### Java

```java
/*
Definition for Node
class Node
{
    int data;
    Node left;
    Node right;

    Node(int data)
    {
        this.data = data;
        left = null;
        right = null;
    }
}
*/
class Solution {
    public int getSize(Node root) {
        
        // If node is null, no node exists here
        if(root == null) {
            return 0;
        }
        
        // Count nodes in left subtree
        int leftSize = getSize(root.left);
        
        // Count nodes in right subtree
        int rightSize = getSize(root.right);
        
        // Add left subtree, right subtree, and current node
        return leftSize + rightSize + 1;
    }
} 
```

### JavaScript

```javascript
/*
Definition for Node
class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
*/
/**
 * @param Node root
 * @returns number
 */
class Solution {
    getSize(root) {
        
        // If node does not exist, return 0
        if(root === null) {
            return 0;
        }
        
        // Recursively count left subtree nodes
        let leftSize = this.getSize(root.left);
        
        // Recursively count right subtree nodes
        let rightSize = this.getSize(root.right);
        
        // Return total nodes including current node
        return leftSize + rightSize + 1;
    }
} 
```

### Python3

```python
"""
Definition for Node
class Node:
    def _init_(self,val):
        self.data = val
        self.left = None
        self.right = None
"""
class Solution:
    def getSize(self, root):
        
        # If node is None, no node is present
        if root is None:
            return 0
        
        # Recursively count nodes in left subtree
        left_size = self.getSize(root.left)
        
        # Recursively count nodes in right subtree
        right_size = self.getSize(root.right)
        
        # Total nodes =
        # left subtree + right subtree + current node
        return left_size + right_size + 1
         
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in all four languages. Only syntax changes.

First, the function checks whether the current node exists or not.

If the node is `NULL` or `null`, it means there is nothing left to count, so the function returns `0`.

This becomes the base case of recursion.

After that, the algorithm recursively explores:

* the left child
* the right child

Each recursive call returns the total number of nodes inside that subtree.

Once both subtree sizes are available, the algorithm adds:

* left subtree size
* right subtree size
* `1` for the current node

That final value becomes the size of the current subtree.

Eventually, all recursive calls return back to the root node, and the root gets the total number of nodes present in the entire binary tree.

### Why recursion works well here

Binary trees are recursive by nature.

Every node itself acts like a smaller tree:

* one root
* one left subtree
* one right subtree

So recursion makes the implementation clean and efficient.

### Important edge case

If the tree contains only one node:

* left subtree size = `0`
* right subtree size = `0`
* current node = `1`

Final answer becomes:

```text
0 + 0 + 1 = 1
```

### What happens in a skewed tree

If the tree becomes completely left-skewed or right-skewed, recursion depth can become `n`.

That is why worst-case space complexity becomes `O(n)`.

---

## Examples

### Example 1

Input:

```text
    1
   / \
  2   3
```

Output:

```text
3
```

Explanation:

* Node 1
* Node 2
* Node 3

Total nodes = `3`

---

### Example 2

Input:

```text
        5
       / \
      1   6
     /   / \
    3   7   4
```

Output:

```text
6
```

Explanation:

* Left subtree nodes = `2`
* Right subtree nodes = `3`
* Root node = `1`

Total:

```text
2 + 3 + 1 = 6
```

---

### Example 3

Input:

```text
  10
```

Output:

```text
1
```

Explanation:
Only one node exists in the binary tree.

---

## How to Use / Run Locally

### C++

Compile and run:

```bash
g++ main.cpp -o main
./main
```

---

### Java

Compile and run:

```bash
javac Main.java
java Main
```

---

### JavaScript

Run using Node.js:

```bash
node main.js
```

---

### Python3

Run using Python:

```bash
python main.py
```

---

## Notes & Optimizations

* This is the most optimal solution for finding the size of a binary tree.
* Every node must be visited at least once, so `O(n)` time complexity is unavoidable.
* No extra data structure is required.
* Recursive DFS traversal keeps the solution short and readable.
* An iterative solution using stack or queue is also possible, but recursion is cleaner for this problem.
* In extremely deep trees, recursion depth can become large depending on language limitations.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
