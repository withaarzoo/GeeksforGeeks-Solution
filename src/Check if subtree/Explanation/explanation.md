# Check if Subtree | Binary Tree Subtree Check Solution

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

# Problem Summary

The "Check if Subtree" problem is a popular Binary Tree and Recursion problem asked in coding interviews and competitive programming platforms like GeeksforGeeks.

In this problem, two binary trees are given:

* `root1` → main tree
* `root2` → subtree candidate

The task is to determine whether `root2` exists somewhere inside `root1` as an exact subtree.

A subtree means:

* Structure must match exactly
* Node values must also match exactly

If such a subtree exists, return `true`. Otherwise, return `false`.

This problem mainly tests:

* Tree traversal
* Recursion
* Tree comparison logic
* Understanding of binary tree structure

---

## Constraints

| Constraint      | Value                |
| --------------- | -------------------- |
| Number of nodes | `1 <= n <= 10^3`     |
| Node values     | `1 <= value <= 10^4` |

---

## Intuition

When I first saw this Binary Tree subtree problem, the first thing I noticed was that a subtree is basically a smaller tree hidden somewhere inside the larger tree.

So instead of trying complicated matching tricks immediately, I thought about solving it in two simple steps:

1. Traverse every node in the main tree
2. Whenever node values match, check whether both trees are completely identical from that point

That naturally leads to two recursive functions:

* One function for subtree searching
* One function for identical tree checking

This approach feels very natural because Binary Tree problems usually become easier once we break them into smaller recursive tasks.

---

## Approach

I solved this problem using recursion and tree comparison.

Step-by-step process:

1. Create a helper function to compare two trees

   * If both nodes are `NULL`, return `true`
   * If only one node is `NULL`, return `false`
   * If node values differ, return `false`
   * Otherwise recursively compare left and right subtrees

2. Traverse the main binary tree

   * At every node, try matching the subtree
   * If both trees become identical, return `true`

3. If current node does not match

   * Continue searching in left subtree
   * Continue searching in right subtree

4. If traversal finishes without finding a match

   * Return `false`

This is one of the cleanest Recursive Binary Tree solutions for subtree checking problems.

---

## Data Structures Used

| Data Structure  | Why It Was Used                               |
| --------------- | --------------------------------------------- |
| Binary Tree     | Input structure of the problem                |
| Recursion Stack | Used for DFS traversal and subtree comparison |

No extra hash maps, arrays, or queues are required in this solution.

---

## Operations & Behavior Summary

The algorithm works like this:

1. Start from the root of the main tree
2. Compare current node with subtree root
3. If values match:

   * Check entire subtree structure recursively
4. If trees are identical:

   * Return `true`
5. Otherwise:

   * Move left
   * Move right
6. Continue until all nodes are checked

This behaves similarly to searching for a pattern inside a larger structure.

---

## Complexity

| Type             | Complexity   | Explanation                                      |
| ---------------- | ------------ | ------------------------------------------------ |
| Time Complexity  | `O(n * m)`   | `n` = nodes in main tree, `m` = nodes in subtree |
| Space Complexity | `O(h1 + h2)` | Recursive call stack for both trees              |

Where:

* `h1` = height of main tree
* `h2` = height of subtree

---

## Multi-language Solutions

### C++

```cpp
/*
Definition for Node
struct Node
{
    int data;
    Node* left;
    Node* right;

    Node(int x){
        data = x;
        left = right = nullptr;
    }
};
*/

class Solution {
  public:
  
    // Function to check whether two trees are identical
    bool isSame(Node* a, Node* b) {
        
        // If both nodes are NULL, trees match till here
        if(a == NULL && b == NULL)
            return true;
        
        // If one node is NULL and the other is not
        // then structure is different
        if(a == NULL || b == NULL)
            return false;
        
        // If current node values are different
        // then trees are not identical
        if(a->data != b->data)
            return false;
        
        // Recursively check left and right subtrees
        return isSame(a->left, b->left) &&
               isSame(a->right, b->right);
    }
  
    bool isSubTree(Node *root1, Node *root2) {
        
        // Empty tree is always a subtree
        if(root2 == NULL)
            return true;
        
        // If main tree becomes empty
        // subtree cannot exist anymore
        if(root1 == NULL)
            return false;
        
        // If both trees match completely from this node
        if(isSame(root1, root2))
            return true;
        
        // Otherwise search in left and right subtree
        return isSubTree(root1->left, root2) ||
               isSubTree(root1->right, root2);
    }
}; 
```

### Java

```java
/*
Definition for Node
class Node {
    int data;
    Node left;
    Node right;

    Node(int x) {
        data = x;
        left = right = null;
    }
}
*/
class Solution {
    
    // Function to check whether two trees are identical
    boolean isSame(Node a, Node b) {
        
        // If both nodes are null
        // trees match till this point
        if(a == null && b == null)
            return true;
        
        // If one node is null
        // structures are different
        if(a == null || b == null)
            return false;
        
        // Values must also match
        if(a.data != b.data)
            return false;
        
        // Check left and right subtrees recursively
        return isSame(a.left, b.left) &&
               isSame(a.right, b.right);
    }
    
    public boolean isSubTree(Node root1, Node root2) {
        
        // Empty tree is always a subtree
        if(root2 == null)
            return true;
        
        // Main tree finished
        // subtree not found
        if(root1 == null)
            return false;
        
        // Check if trees are identical from current node
        if(isSame(root1, root2))
            return true;
        
        // Otherwise continue searching
        return isSubTree(root1.left, root2) ||
               isSubTree(root1.right, root2);
    }
} 
```

### JavaScript

```javascript
/*
Definition for Node
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}
*/
class Solution {
    
    // Function to check if two trees are identical
    isSame(a, b) {
        
        // If both nodes are null
        if(a === null && b === null)
            return true;
        
        // If one node is null
        // structures are different
        if(a === null || b === null)
            return false;
        
        // Node values must match
        if(a.data !== b.data)
            return false;
        
        // Recursively compare left and right subtrees
        return this.isSame(a.left, b.left) &&
               this.isSame(a.right, b.right);
    }
    
    isSubTree(root1, root2) {
        
        // Empty tree is always a subtree
        if(root2 === null)
            return true;
        
        // Main tree exhausted
        if(root1 === null)
            return false;
        
        // Check whether trees match from current node
        if(this.isSame(root1, root2))
            return true;
        
        // Otherwise search in left and right subtree
        return this.isSubTree(root1.left, root2) ||
               this.isSubTree(root1.right, root2);
    }
} 
```

### Python3

```python
# Definition for Node
class Node:
    def __init__(self, x):
        self.data = x
        self.left = None
        self.right = None

class Solution:
    
    # Function to check whether two trees are identical
    def isSame(self, a, b):
        
        # If both nodes are None
        # trees match till here
        if a is None and b is None:
            return True
        
        # If one node is None
        # structure becomes different
        if a is None or b is None:
            return False
        
        # Node values must match
        if a.data != b.data:
            return False
        
        # Recursively compare left and right subtrees
        return (self.isSame(a.left, b.left) and
                self.isSame(a.right, b.right))
    
    def isSubTree(self, root1, root2):
        
        # Empty tree is always a subtree
        if root2 is None:
            return True
        
        # Main tree finished
        if root1 is None:
            return False
        
        # Check if both trees are identical
        if self.isSame(root1, root2):
            return True
        
        # Otherwise continue searching
        return (self.isSubTree(root1.left, root2) or
                self.isSubTree(root1.right, root2))
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in all four languages.

Only syntax changes.

### Part 1: Identical Tree Checking

The helper function compares two trees node by node.

First condition:

* If both nodes are empty (`NULL` or `None`)
* Trees match perfectly till this point

Second condition:

* If one node exists and the other does not
* Tree structure becomes different
* Return `false`

Third condition:

* Compare current node values
* If values differ, trees are not identical

Recursive step:

* Compare left subtree
* Compare right subtree

Both comparisons must return `true`.

This guarantees:

* Same structure
* Same node values

---

### Part 2: Searching Inside Main Tree

Now we traverse the larger binary tree.

At every node:

* Try checking whether subtree starts here

If yes:

* Return `true`

Otherwise:

* Continue searching left side
* Continue searching right side

This is basically Depth First Search (DFS) over the Binary Tree.

---

### Why Recursion Works Well Here

Binary Trees are recursive by nature.

Every subtree itself is also a Binary Tree.

That makes recursive thinking extremely natural for this problem.

Instead of manually handling nodes using stacks or queues, recursion automatically explores every subtree cleanly.

---

### Important Edge Cases

#### Case 1: Empty Subtree

If `root2` is empty:

* Answer should always be `true`
* Because an empty tree is considered a subtree of every tree

---

#### Case 2: Main Tree Becomes Empty First

If `root1` becomes empty before finding subtree:

* Return `false`

---

#### Case 3: Same Values But Different Structure

Example:

Main Tree:

```text
    1
   /
  2
```

Subtree:

```text
  1
   \
    2
```

Even though values match, structure differs.

Answer should be `false`.

---

## Examples

### Example 1

#### Input

```text
root1 = [1, 2, 3, N, N, 4]
root2 = [3, 4]
```

#### Output

```text
true
```

#### Explanation

Node `3` exists inside the main tree.

Its subtree:

```text
  3
 /
4
```

matches `root2` exactly.

---

### Example 2

#### Input

```text
root1 = [26, 10, N, 20, 30, 40, 60]
root2 = [26, 10, N, 20, 30, 40, 60]
```

#### Output

```text
true
```

#### Explanation

Both trees are completely identical.

So subtree condition is satisfied.

---

### Example 3

#### Input

```text
root1 = [1, 2, 3]
root2 = [2, 4]
```

#### Output

```text
false
```

#### Explanation

Node `2` exists in the main tree.

But its subtree structure and values do not match `root2`.

---

## How to Use / Run Locally

### C++

Compile:

```bash
g++ main.cpp -o main
```

Run:

```bash
./main
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

Run:

```bash
node main.js
```

---

### Python3

Run:

```bash
python main.py
```

or

```bash
python3 main.py
```

---

## Notes & Optimizations

* This Recursive Binary Tree solution is simple and easy to understand.
* Works well within given constraints.
* Time complexity can become high for very large trees.
* More advanced approaches exist using:

  * Tree serialization
  * KMP pattern matching
  * Hashing techniques

But for interview preparation and competitive programming, the recursive identical subtree approach is usually the cleanest solution.

### Common Mistakes

* Forgetting to compare tree structure
* Only comparing node values
* Not handling empty subtree cases
* Returning true too early

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
