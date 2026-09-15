# Visit Leaves with Budget

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

You are given a binary tree and a fixed budget `k`.

Every leaf node has a cost equal to its level or depth in the binary tree. The task is to find the **maximum number of leaf nodes that can be visited without exceeding the given budget**.

The root is considered to be at level `1`. Therefore, a leaf directly connected to the root has a cost of `2`, a leaf one level further has a cost of `3`, and so on.

### Input

* A binary tree represented using `Node`.
* An integer `k`, representing the total available budget.

### Output

Return an integer representing the **maximum number of leaf nodes that can be visited within budget `k`**.

The important observation is that the actual values stored inside the tree do not affect the answer. Only the levels of the leaf nodes matter.

## Constraints

The exact constraints can vary depending on the platform version of the problem. The solution is designed to work efficiently for a binary tree containing up to `n` nodes.

* The tree can be empty or contain one or more nodes.
* Each node can have a left child, a right child, or both.
* A leaf node has no left and no right child.
* The root is considered to be at level `1`.
* `k` represents the available budget.
* The goal is to maximize the number of visited leaves.

## Intuition

The first thing I notice is that every leaf has a cost based only on its depth.

Suppose the leaf costs are:

```text
[5, 2, 4, 3]
```

If I want to visit as many leaves as possible, spending the budget on the leaf costing `5` first does not make much sense. I could potentially visit multiple cheaper leaves instead.

So the natural greedy idea is:

1. Find the cost of every leaf.
2. Sort all leaf costs from smallest to largest.
3. Visit the cheapest leaf first.
4. Continue while the remaining budget is enough.

For example, with a budget of `8` and leaf costs:

```text
[3, 4, 3]
```

Sorting gives:

```text
[3, 3, 4]
```

I can take the first `3`, leaving `5`.

Then I can take the second `3`, leaving `2`.

The final cost `4` cannot be paid with the remaining budget.

So the maximum number of leaves is `2`.

This is why sorting the leaf depths gives a simple and effective greedy solution.

## Approach

The solution can be divided into two main parts.

### 1. Collect the level of every leaf

Use DFS, or Depth First Search, to traverse the binary tree.

While traversing the tree, keep the current level as an extra parameter.

For every node:

* If the node is `null`, return.
* If both children are `null`, it is a leaf, so store its current level.
* Otherwise, visit the left and right children with `level + 1`.

After the DFS, we have a list containing the cost of every leaf.

### 2. Choose the cheapest leaves

Sort the collected leaf levels in ascending order.

Then iterate through them:

* If the current leaf cost is less than or equal to the remaining budget, visit it.
* Subtract the cost from the budget.
* Increase the answer by `1`.
* If the current cost is greater than the remaining budget, stop.

Because the list is sorted, every later leaf has an equal or greater cost. Therefore, once the current leaf cannot be afforded, none of the remaining leaves can be afforded either.

## Data Structures Used

### Binary Tree

The input itself is a binary tree containing nodes with:

* `data`
* `left`
* `right`

The tree structure is traversed using DFS.

### Array / Vector / List

A dynamic array is used to store the level of every leaf.

Examples:

* C++: `vector<int>`
* Java: `ArrayList<Integer>`
* JavaScript: `Array`
* Python: `list`

This makes it easy to collect all leaf costs and sort them later.

### Recursion Stack

The DFS uses recursion to move through the tree. The recursion stack stores the current path from the root to the node being processed.

## Operations & Behavior Summary

The algorithm works like this:

```text
Start with the root at level 1.

Traverse the binary tree using DFS.

For every node:
    If the node is null:
        return

    If the node has no children:
        store its level
        return

    Traverse the left child at level + 1.
    Traverse the right child at level + 1.

Sort all collected leaf levels.

Set count = 0.

For every leaf cost:
    If cost > remaining budget:
        stop

    Subtract cost from the budget.
    Increase count.

Return count.
```

The main idea is to convert the tree problem into a simple **minimum-cost selection problem** after collecting the leaf depths.

## Complexity

| Operation          | Complexity     |
| ------------------ | -------------- |
| DFS traversal      | `O(n)`         |
| Sorting leaf costs | `O(l log l)`   |
| Final greedy scan  | `O(l)`         |
| **Overall Time**   | **O(n log n)** |
| **Space**          | **O(n)**       |

Here:

* `n` = number of nodes in the binary tree
* `l` = number of leaf nodes
* Since `l <= n`, the sorting step can take `O(n log n)` in the worst case.

The DFS itself takes `O(n)` because every tree node is visited once.

The space complexity is `O(n)` because the leaf-level list can contain up to `n` elements, and the recursion stack can also reach `O(n)` in a highly skewed tree.

## Multi-language Solutions

### C++

```cpp
/* Binary Tree Node Structure
class Node {
  public:
    int data;
    Node *left;
    Node *right;

    Node(int x) {
        data = x;
        left = nullptr;
        right = nullptr;
    }
};
*/

class Solution {
  public:
    // helper that walks the tree and records every leaf depth
    void collect(Node* node, int depth, vector<int>& leaves) {
        if (!node) return;                     // safety, never happens for a real root
        if (!node->left && !node->right) {     // both children null → this is a leaf
            leaves.push_back(depth);           // store its level
            return;
        }
        collect(node->left, depth + 1, leaves);  // go left, depth increases by 1
        collect(node->right, depth + 1, leaves); // go right, depth increases by 1
    }

    int getCount(Node *root, int k) {
        vector<int> leaves;                    // will hold all leaf levels
        collect(root, 1, leaves);              // root starts at level 1
        sort(leaves.begin(), leaves.end());    // cheapest first
        int count = 0;
        for (int cost : leaves) {
            if (cost > k) break;               // cannot afford this leaf or any later one
            k -= cost;                         // pay for it
            count++;                           // one more leaf visited
        }
        return count;
    }
};
```

### Java

```java
/* Binary Tree Node Structure
class Node {
    int data;
    Node left, right;

    public Node(int data){
        this.data = data;
    }
}
*/
class Solution {
    // helper that walks the tree and records every leaf depth
    void collect(Node node, int depth, ArrayList<Integer> leaves) {
        if (node == null) return;
        if (node.left == null && node.right == null) { // leaf found
            leaves.add(depth);
            return;
        }
        collect(node.left, depth + 1, leaves);   // left child is one level deeper
        collect(node.right, depth + 1, leaves);  // right child is one level deeper
    }

    public int getCount(Node root, int k) {
        ArrayList<Integer> leaves = new ArrayList<>();
        collect(root, 1, leaves);                // start from level 1
        Collections.sort(leaves);                // ascending order so cheapest come first
        int count = 0;
        for (int cost : leaves) {
            if (cost > k) break;                 // budget exhausted
            k -= cost;
            count++;
        }
        return count;
    }
}
```

### JavaScript

```javascript
/* Binary Tree Node Structure
class Node{
    constructor(data){
        this.data = data;
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
    // helper that walks the tree and records every leaf depth
    collect(node, depth, leaves) {
        if (!node) return;
        if (!node.left && !node.right) {       // leaf
            leaves.push(depth);
            return;
        }
        this.collect(node.left, depth + 1, leaves);
        this.collect(node.right, depth + 1, leaves);
    }

    getCount(root, k) {
        let leaves = [];
        this.collect(root, 1, leaves);         // root is level 1
        leaves.sort((a, b) => a - b);          // cheapest first
        let count = 0;
        for (let cost of leaves) {
            if (cost > k) break;
            k -= cost;
            count++;
        }
        return count;
    }
}
```

### Python3

```python
''' Binary Tree Node Structure
class Node:
    def __init__(self,val):
        self.data = val
        self.left = None
        self.right = None
'''

class Solution:
    # helper that walks the tree and records every leaf depth
    def collect(self, node, depth, leaves):
        if not node:
            return
        if not node.left and not node.right:   # leaf found
            leaves.append(depth)
            return
        self.collect(node.left, depth + 1, leaves)
        self.collect(node.right, depth + 1, leaves)

    def getCount(self, root, k):
        leaves = []
        self.collect(root, 1, leaves)          # start counting from level 1
        leaves.sort()                          # ascending so we take cheapest first
        count = 0
        for cost in leaves:
            if cost > k:
                break
            k -= cost
            count += 1
        return count
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### C++ Explanation

The C++ solution uses a recursive helper function to collect the level of every leaf node.

The helper receives:

* the current `Node*`
* the current depth
* a reference to the vector storing leaf depths

If the node is `nullptr`, there is nothing to process.

Next, it checks whether both `left` and `right` are `nullptr`. If they are, the current node is a leaf. Its depth is added to the vector.

For a non-leaf node, the DFS continues with:

```text
left  → depth + 1
right → depth + 1
```

The main function starts the DFS with depth `1`, because the root is considered level `1`.

After collecting all leaf levels, `sort()` arranges them from the cheapest to the most expensive.

The algorithm then iterates over the sorted vector. If the current cost fits inside the remaining budget, it is selected. Otherwise, the loop stops.

The C++ implementation uses `vector<int>` because the number of leaves is not known beforehand and the vector grows dynamically.

### Java Explanation

The Java solution follows exactly the same algorithm.

The recursive helper receives a `Node`, the current depth, and an `ArrayList<Integer>`.

When the current node has no children, its depth is added to the list.

The traversal then continues through both children, increasing the depth by one each time.

The main method starts the traversal using:

```text
depth = 1
```

After the traversal, `Collections.sort()` sorts all leaf costs in ascending order.

The greedy loop then spends the budget on the cheapest available leaf first.

`ArrayList<Integer>` is used because it provides a dynamic collection for storing all leaf depths.

### JavaScript Explanation

The JavaScript implementation uses an array to store leaf levels.

The `collect()` method performs recursive DFS.

For every node:

* `!node` handles a missing node.
* `!node.left && !node.right` identifies a leaf.
* The current depth is stored when a leaf is found.
* Otherwise, both children are visited with `depth + 1`.

JavaScript's default `sort()` sorts values as strings, so a numeric comparator is required:

```text
(a, b) => a - b
```

This makes sure values such as `10` and `2` are sorted numerically rather than alphabetically.

After sorting, the solution uses the same greedy process: spend the budget on the smallest leaf costs first.

### Python3 Explanation

The Python solution uses a normal recursive DFS and a Python `list` to store the leaf levels.

The `collect()` function first handles the base case where the node does not exist.

Then it checks whether the node is a leaf by verifying that both children are missing.

If it is a leaf, its depth is appended to the list.

Otherwise, DFS continues through both children with the depth increased by one.

Python's built-in `sort()` method sorts integers numerically, so no custom comparator is needed.

Finally, the sorted list is processed from left to right. Every affordable leaf reduces the remaining budget and increases the answer.

### Why the same logic works in all four languages

The programming language changes, but the algorithm stays the same:

```text
Binary Tree
    ↓
DFS
    ↓
Collect leaf depths
    ↓
Sort depths
    ↓
Take cheapest leaves
    ↓
Maximum number of leaves
```

The important part is the algorithm, not the language-specific syntax.

## Examples

### Example 1

Consider the following binary tree:

```text
        10
       /  \
      8    2
     /    / \
    3    3   6
        /
       4
```

The leaf nodes are:

```text
3 → level 3
4 → level 4
6 → level 3
```

So the costs are:

```text
[3, 4, 3]
```

After sorting:

```text
[3, 3, 4]
```

Budget:

```text
k = 8
```

Trace:

```text
Take 3 → remaining budget = 5 → count = 1
Take 3 → remaining budget = 2 → count = 2
Take 4 → cannot afford
```

Expected output:

```text
2
```

### Example 2

Suppose the leaf costs collected from the tree are:

```text
[2, 4, 3, 5]
```

and the budget is:

```text
k = 9
```

After sorting:

```text
[2, 3, 4, 5]
```

Trace:

```text
Take 2 → remaining = 7 → count = 1
Take 3 → remaining = 4 → count = 2
Take 4 → remaining = 0 → count = 3
Take 5 → cannot afford
```

Expected output:

```text
3
```

### Example 3

Suppose the tree has only one leaf, and that leaf is at level `4`.

The collected costs are:

```text
[4]
```

If:

```text
k = 3
```

the leaf cannot be visited because its cost is greater than the available budget.

Expected output:

```text
0
```

If instead:

```text
k = 4
```

the leaf can be visited.

Expected output:

```text
1
```

## How to Use / Run Locally

The code provided in this repository is written in the format normally expected by competitive programming platforms. The `Node` structure and driver code may be supplied by the platform.

To run the solution locally, create a small driver program that:

1. Defines the binary tree node structure.
2. Builds the required tree.
3. Creates an instance of the solution class.
4. Calls `getCount(root, k)`.
5. Prints the returned answer.

### C++

Save the complete program as:

```text
solution.cpp
```

Compile it using:

```bash
g++ -std=c++17 solution.cpp -o solution
```

Run it with:

```bash
./solution
```

On Windows, the generated executable can be run with:

```bash
solution.exe
```

### Java

Save the program as:

```text
Solution.java
```

Compile it:

```bash
javac Solution.java
```

Run it:

```bash
java Solution
```

Make sure the public class name matches the Java filename.

### JavaScript

Save the solution as:

```text
solution.js
```

Run it using Node.js:

```bash
node solution.js
```

You can check whether Node.js is installed with:

```bash
node --version
```

### Python3

Save the solution as:

```text
solution.py
```

Run it using:

```bash
python3 solution.py
```

On some Windows installations, you may use:

```bash
python solution.py
```

## Notes & Optimizations

### 1. Tree values are not important

The actual values stored in the nodes do not affect the solution.

For this problem, only the level of each leaf matters.

### 2. Root starts at level 1

The traversal starts with:

```text
depth = 1
```

This is important because using `0` would change every leaf cost by one.

### 3. Empty tree

If the root is `null`, there are no leaves to visit, so the answer is `0`.

### 4. One-node tree

If the tree contains only the root, the root itself is a leaf.

Its cost is `1` because the root is at level `1`.

Therefore:

* `k >= 1` → answer is `1`
* `k < 1` → answer is `0`

### 5. Why greedy works

After collecting the leaf levels, the problem becomes:

> Given a list of costs and a budget, select the maximum number of items whose total cost does not exceed the budget.

Since every selected leaf contributes exactly `1` to the answer, choosing cheaper leaves first is optimal.

For example:

```text
Costs:  [2, 3, 5]
Budget: 5
```

Choosing `2 + 3` gives `2` leaves.

Choosing `5` gives only `1` leaf.

So minimizing the cost of each selected item helps maximize the number of selected leaves.

### 6. Possible optimization

The current solution sorts all leaf depths, giving an overall `O(n log n)` time complexity.

Because tree depth values are bounded by the height of the tree, another approach could use a frequency array or counting-based technique in certain constraint ranges. However, sorting is much simpler, easier to understand, and efficient enough for typical competitive programming constraints.

### 7. Recursive DFS tradeoff

Recursive DFS keeps the implementation short and readable.

However, in a very deep and skewed tree, the recursion depth can become large. An iterative DFS using an explicit stack can avoid relying on the language's recursion limit.

For normal competitive programming constraints, the recursive solution is straightforward and easy to maintain.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
