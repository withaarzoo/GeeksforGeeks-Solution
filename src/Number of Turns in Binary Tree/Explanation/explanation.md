# Number of Turns in Binary Tree | Binary Tree DSA Solution

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

The **Number of Turns in Binary Tree** problem asks us to find how many times the direction changes while moving from one node `p` to another node `q` in a binary tree.

A turn happens when the movement changes from:

* Left to Right
* Right to Left

For example, if the path contains directions like:

`Left -> Left -> Right -> Left`

there are two turns because the direction changes twice.

The main challenge is that the path starts at `p` and ends at `q`, so the two nodes may have a common ancestor somewhere in the tree. I need to find their actual path and then count every change between consecutive left and right movements.

If the complete path stays in one direction without changing, the answer should be `-1`.

This binary tree problem is a useful example of combining **DFS traversal**, **root-to-node path finding**, **Lowest Common Ancestor logic**, and **direction change counting**.

## Constraints

| Constraint                   | Description                                         |
| ---------------------------- | --------------------------------------------------- |
| `1 ≤ n ≤ 10^4`               | `n` is the total number of nodes in the binary tree |
| `1 ≤ node->data ≤ 10^4`      | Every node contains a valid integer value           |
| `1 ≤ p, q ≤ n`               | `p` and `q` represent the given node values         |
| All node values are distinct | Each node can be uniquely identified by its value   |

## Intuition

My first observation was that I do not need to calculate the distance between `p` and `q`. The only thing that matters is the sequence of left and right directions used while travelling between them.

I started by thinking about the path from the root to both nodes.

If I know the path from the root to `p` and the path from the root to `q`, both paths will share some common starting part. That common part represents the path from the root to their common ancestor.

After removing the common part, I get two remaining path sections.

For the path from `p`, I need to read the directions in reverse because I am travelling upward toward the common ancestor. For the path toward `q`, I keep the directions in their normal order because I am travelling downward.

Once I combine these directions, the problem becomes simple: I scan the final path and count every time `Left` changes to `Right` or `Right` changes to `Left`.

## Approach

I use the following steps to solve the Number of Turns in Binary Tree problem:

1. Find the path from the root to node `p`.
2. Find the path from the root to node `q`.
3. Store each movement as either `L` for left or `R` for right.
4. Compare both paths from the beginning.
5. Find the longest common part of both paths.
6. Reverse the remaining part of the path to `p` because the movement starts from `p` and goes upward.
7. Add the remaining part of the path to `q` normally.
8. Scan the complete direction sequence.
9. Count every place where two consecutive directions are different.
10. Return `-1` if no direction change occurs.

This approach works well because every edge on the final path is processed only a small number of times.

## Data Structures Used

### Arrays or Lists

I use arrays or lists to store the root-to-node paths.

Each entry stores one direction:

* `L` for moving to a left child
* `R` for moving to a right child

This makes it easy to compare both paths and build the final path from `p` to `q`.

### Recursion Stack

I use recursive DFS to search for both nodes.

The recursion stack stores the current path through the binary tree. Its maximum size depends on the height of the tree.

### Binary Tree Nodes

The existing binary tree structure is used directly. No additional tree or graph needs to be created.

## Operations & Behavior Summary

The algorithm works in the following order:

1. Start a DFS from the root and search for `p`.
2. Add `L` or `R` whenever DFS moves to a child.
3. Remove that direction if the current branch does not contain the target.
4. Repeat the same process for `q`.
5. Compare both root-to-node paths from the beginning.
6. Skip every direction that appears in both paths at the same position.
7. Reverse the remaining path for `p`.
8. Append the remaining path for `q`.
9. Compare every direction with the previous direction.
10. Increase the answer whenever the two directions are different.
11. Return `-1` if the number of turns is `0`.

In simple terms, I first find the route, then convert that route into a sequence of left and right moves, and finally count the direction changes.

## Complexity

| Complexity       | Value  | Explanation                                                                                                                                                                  |
| ---------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Time Complexity  | `O(n)` | In the worst case, DFS may visit every node in the binary tree while finding the paths to `p` and `q`. The final path comparison is at most proportional to the tree height. |
| Space Complexity | `O(h)` | `h` is the height of the binary tree. The recursion stack and stored root-to-node paths can each grow up to the height of the tree.                                          |

Here, `n` is the total number of nodes and `h` is the height of the binary tree.

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
}; */

class Solution {
    // This DFS finds a target and stores the L/R path from root to that target.
    bool findPath(Node* root, int target, vector<char>& path) {
        // If this subtree is empty, the target cannot be found here.
        if (root == nullptr) return false;

        // If I reached the target, the current path is the required path.
        if (root->data == target) return true;

        // Record a left move before searching the left subtree.
        path.push_back('L');

        // Keep the move only if the target exists in the left subtree.
        if (findPath(root->left, target, path)) return true;

        // Remove the failed left move before trying another direction.
        path.pop_back();

        // Record a right move before searching the right subtree.
        path.push_back('R');

        // Keep the move only if the target exists in the right subtree.
        if (findPath(root->right, target, path)) return true;

        // Remove the failed right move because this subtree also did not contain the target.
        path.pop_back();

        // Tell the parent call that the target was not found here.
        return false;
    }

  public:
    int numberOfTurns(Node* root, int p, int q) {
        // Store the directions from root to p and root to q.
        vector<char> pathP, pathQ;

        // Build both root-to-node paths.
        findPath(root, p, pathP);
        findPath(root, q, pathQ);

        // Find the length of the common prefix, which represents the path to the LCA.
        int i = 0;
        while (i < pathP.size() && i < pathQ.size() &&
               pathP[i] == pathQ[i]) {
            i++;
        }

        // Store the exact sequence of edge directions while travelling from p to q.
        vector<char> path;

        // Travel upward from p to the LCA, so reverse p's remaining directions.
        for (int j = (int)pathP.size() - 1; j >= i; j--) {
            path.push_back(pathP[j]);
        }

        // Then travel downward from the LCA to q using q's remaining directions.
        for (int j = i; j < pathQ.size(); j++) {
            path.push_back(pathQ[j]);
        }

        // A path with fewer than two edges cannot contain a turn.
        if (path.size() < 2) return -1;

        // Count every change between consecutive L and R directions.
        int turns = 0;
        for (int j = 1; j < path.size(); j++) {
            if (path[j] != path[j - 1]) {
                turns++;
            }
        }

        // Return -1 when the complete path continues in only one direction.
        return turns == 0 ? -1 : turns;
    }
};
```

### Java

```java
import java.util.*;

class Solution {

    // This DFS finds a target and stores the L/R path from root to that target.
    private boolean findPath(Node root, int target, List<Character> path) {
        // If this subtree is empty, the target cannot be found here.
        if (root == null) return false;

        // If I reached the target, the current path is complete.
        if (root.data == target) return true;

        // Record a left move before searching the left subtree.
        path.add('L');

        // Keep the move only if the target exists in the left subtree.
        if (findPath(root.left, target, path)) return true;

        // Remove the failed left move before trying the right subtree.
        path.remove(path.size() - 1);

        // Record a right move before searching the right subtree.
        path.add('R');

        // Keep the move only if the target exists in the right subtree.
        if (findPath(root.right, target, path)) return true;

        // Remove the failed right move because this subtree also did not contain the target.
        path.remove(path.size() - 1);

        // Tell the parent call that the target was not found here.
        return false;
    }

    public int numberOfTurns(Node root, int p, int q) {
        // Store the directions from root to p and root to q.
        List<Character> pathP = new ArrayList<>();
        List<Character> pathQ = new ArrayList<>();

        // Build both root-to-node paths.
        findPath(root, p, pathP);
        findPath(root, q, pathQ);

        // Find the common prefix, which ends at the Lowest Common Ancestor.
        int i = 0;
        while (i < pathP.size() && i < pathQ.size()
                && pathP.get(i) == pathQ.get(i)) {
            i++;
        }

        // Store the exact direction sequence while travelling from p to q.
        List<Character> path = new ArrayList<>();

        // Move from p upward to the LCA, so add p's remaining path in reverse.
        for (int j = pathP.size() - 1; j >= i; j--) {
            path.add(pathP.get(j));
        }

        // Move from the LCA downward to q using q's remaining path normally.
        for (int j = i; j < pathQ.size(); j++) {
            path.add(pathQ.get(j));
        }

        // Fewer than two edges means no turn is possible.
        if (path.size() < 2) return -1;

        // Count every place where the movement changes from L to R or R to L.
        int turns = 0;
        for (int j = 1; j < path.size(); j++) {
            if (path.get(j) != path.get(j - 1)) {
                turns++;
            }
        }

        // If there was no direction change, the path is straight.
        return turns == 0 ? -1 : turns;
    }
}
```

### JavaScript

```javascript
/* Structure of Binary Tree Node
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
} */

/**
 * @param {Node} root
 * @param {number} p
 * @param {number} q
 * @return {number}
 */

class Solution {

    // This DFS finds a target and stores the L/R path from root to that target.
    findPath(root, target, path) {
        // An empty subtree cannot contain the target.
        if (root === null) return false;

        // Reaching the target means the current path is correct.
        if (root.data === target) return true;

        // Record the left move before exploring the left subtree.
        path.push('L');

        // Keep this move only if the target is found on the left.
        if (this.findPath(root.left, target, path)) return true;

        // Remove the failed left move before trying the right side.
        path.pop();

        // Record the right move before exploring the right subtree.
        path.push('R');

        // Keep this move only if the target is found on the right.
        if (this.findPath(root.right, target, path)) return true;

        // Remove the failed right move because this subtree did not contain the target.
        path.pop();

        // Tell the previous recursive call that the target was not found here.
        return false;
    }

    numberOfTurns(root, p, q) {
        // Store the root-to-p and root-to-q direction paths.
        const pathP = [];
        const pathQ = [];

        // Build both paths.
        this.findPath(root, p, pathP);
        this.findPath(root, q, pathQ);

        // Find the common prefix, which represents movement from root to the LCA.
        let i = 0;
        while (
            i < pathP.length &&
            i < pathQ.length &&
            pathP[i] === pathQ[i]
        ) {
            i++;
        }

        // Build the actual direction sequence while moving from p to q.
        const path = [];

        // Move upward from p to the LCA, so read p's remaining directions backward.
        for (let j = pathP.length - 1; j >= i; j--) {
            path.push(pathP[j]);
        }

        // Move downward from the LCA to q, so keep q's remaining order unchanged.
        for (let j = i; j < pathQ.length; j++) {
            path.push(pathQ[j]);
        }

        // A path with fewer than two edges cannot contain a turn.
        if (path.length < 2) return -1;

        // Count every change between consecutive directions.
        let turns = 0;
        for (let j = 1; j < path.length; j++) {
            if (path[j] !== path[j - 1]) {
                turns++;
            }
        }

        // Return -1 when all edges in the path follow the same direction.
        return turns === 0 ? -1 : turns;
    }
}
```

### Python3

```python
''' Structure of Binary Tree Node
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
'''

class Solution:
    # This DFS finds a target and stores the L/R path from root to that target.
    def findPath(self, root, target, path):
        # An empty subtree cannot contain the target.
        if root is None:
            return False

        # Reaching the target means the current path is complete.
        if root.data == target:
            return True

        # Record the left move before searching the left subtree.
        path.append('L')

        # Keep this move only if the target exists on the left.
        if self.findPath(root.left, target, path):
            return True

        # Remove the failed left move before trying the right subtree.
        path.pop()

        # Record the right move before searching the right subtree.
        path.append('R')

        # Keep this move only if the target exists on the right.
        if self.findPath(root.right, target, path):
            return True

        # Remove the failed right move because this subtree also failed.
        path.pop()

        # Tell the previous recursive call that the target was not found here.
        return False

    def numberOfTurns(self, root, p, q):
        # Store directions from root to p and root to q.
        pathP = []
        pathQ = []

        # Build both root-to-node paths.
        self.findPath(root, p, pathP)
        self.findPath(root, q, pathQ)

        # Find the common prefix, which ends at the Lowest Common Ancestor.
        i = 0
        while i < len(pathP) and i < len(pathQ) and pathP[i] == pathQ[i]:
            i += 1

        # Build the exact sequence of directions while travelling from p to q.
        path = []

        # Move upward from p to the LCA, so add p's remaining directions in reverse.
        for j in range(len(pathP) - 1, i - 1, -1):
            path.append(pathP[j])

        # Move downward from the LCA to q using q's remaining directions normally.
        for j in range(i, len(pathQ)):
            path.append(pathQ[j])

        # Fewer than two edges means a turn is impossible.
        if len(path) < 2:
            return -1

        # Count every change from L to R or from R to L.
        turns = 0
        for j in range(1, len(path)):
            if path[j] != path[j - 1]:
                turns += 1

        # If no direction changed, both nodes lie on one straight path.
        return turns if turns > 0 else -1
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The same core algorithm is used in C++, Java, JavaScript, and Python3. The syntax changes, but the logic remains the same.

### Finding the path to `p`

I first run DFS from the root.

Whenever I move to the left child, I record `L`. Whenever I move to the right child, I record `R`.

If I reach the target node, I stop searching and keep the current path.

If the target is not found in a subtree, I remove the last recorded direction. This is important because that direction belongs to a failed branch.

For example, if DFS tries:

`Root -> Left`

but the target is not inside that subtree, I must remove `L` before searching the right subtree.

This process is called backtracking. Without it, the stored path could contain directions that are not part of the actual root-to-node path.

### Finding the path to `q`

I repeat the same DFS process for `q`.

Now I have two direction sequences:

`root -> p`

and

`root -> q`

Both sequences describe how to reach each node from the root.

### Finding the common path

The two nodes may share several edges from the root.

For example:

```text
Path to p: L -> R -> L
Path to q: L -> R -> R
```

The first two directions are common:

```text
L -> R
```

This common section leads to the Lowest Common Ancestor of `p` and `q`.

I move through both paths until the directions become different.

At that point, the remaining parts describe the separate routes to both nodes.

### Building the path from `p` to `q`

The stored path to `p` goes from the root downward.

But the actual journey starts at `p` and moves upward toward the common ancestor.

That is why I reverse the remaining part of `p`'s path.

The path toward `q` already goes in the correct downward direction, so I add it normally.

After combining both parts, I get the exact sequence of left and right edges used while travelling from `p` to `q`.

### Counting turns

Now I compare every direction with the previous one.

If both directions are the same, there is no turn.

For example:

`L -> L`

The movement continues in the same direction.

But if the directions are different:

`L -> R`

or:

`R -> L`

I increase the turn count.

### Handling a straight path

Suppose the complete path is:

`L -> L -> L`

There are multiple edges, but the direction never changes.

The turn count remains `0`.

According to the problem statement, a path with no turns should return `-1`.

The same result applies when the path contains fewer than two edges because one edge alone cannot create a direction change.

### Language-specific behavior

In C++, dynamic arrays are typically handled with `vector`.

In Java, `ArrayList` can store the sequence of directions.

In JavaScript, normal arrays work well because they support adding and removing elements from the end.

In Python3, lists provide the same push-and-pop behavior needed for DFS backtracking.

The algorithm and expected output remain the same across all implementations.

## Examples

### Example 1

**Input:**

```text
root[] = [1, 2, 3, 4, 5, 6, 7, 8, N, N, 9, 10]
p = 5
q = 10
```

**Expected Output:**

```text
4
```

**Trace:**

The path is:

```text
5 -> 2 -> 1 -> 3 -> 6 -> 10
```

The movement directions change several times while moving through the tree.

Every transition from left to right or right to left is counted as one turn.

The total number of turns is:

```text
4
```

### Example 2

**Input:**

```text
root[] = [1, 2, 3, 4, 5, 6, 7, 8, N, N, 9, 10]
p = 1
q = 4
```

**Expected Output:**

```text
-1
```

**Trace:**

The path is:

```text
1 -> 2 -> 4
```

Both edges follow the same left-side direction.

There is no switch from left to right or right to left, so no turn occurs.

The answer is:

```text
-1
```

### Example 3

**Input:**

```text
root[] = [1, 2, 3, 4, 5]
p = 4
q = 5
```

**Expected Output:**

```text
1
```

**Trace:**

The path is:

```text
4 -> 2 -> 5
```

The movement changes from one side of node `2` to the other side.

So there is exactly one direction change.

The answer is:

```text
1
```

## How to Use / Run Locally

Create separate files for each language implementation and paste the corresponding solution into the empty code section.

### C++

Save the solution in a file such as:

```text
solution.cpp
```

Compile it using:

```bash
g++ solution.cpp -o solution
```

Run the compiled program:

```bash
./solution
```

On Windows, the command may be:

```bash
solution.exe
```

### Java

Save the solution in a Java file:

```text
Solution.java
```

Compile it using:

```bash
javac Solution.java
```

Run it with:

```bash
java Solution
```

Make sure the required `Node` class and any input-handling code are available when running the solution outside an online judge.

### JavaScript

Save the solution in:

```text
solution.js
```

Run it using Node.js:

```bash
node solution.js
```

You can verify that Node.js is installed with:

```bash
node --version
```

### Python3

Save the solution in:

```text
solution.py
```

Run it with:

```bash
python3 solution.py
```

On some Windows systems, you may use:

```bash
python solution.py
```

For competitive programming platforms, the input and output code may already be handled by the platform. In that case, only submit the required solution class and method.

## Notes & Optimizations

* The node values are distinct, so each target node can be identified without ambiguity.
* The solution does not need parent pointers or a separate graph representation.
* DFS with path backtracking keeps the implementation simple and efficient.
* The approach works for balanced and highly skewed binary trees.
* In the worst case, recursion depth can reach `O(n)` for a skewed tree.
* An iterative DFS can be used if recursion depth is a concern in a particular language.
* Another possible solution is to explicitly find the Lowest Common Ancestor and then count direction changes on both sides. The path-based approach is easier to follow because it directly builds the movement sequence.
* If the final path contains only one direction repeatedly, the answer must be `-1`.
* This approach naturally fits common DSA topics such as binary tree traversal, DFS, path finding, recursion, backtracking, and Lowest Common Ancestor reasoning.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
