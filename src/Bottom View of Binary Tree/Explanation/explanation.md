# Bottom View of Binary Tree

## Table of Contents

* Problem Title
* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions

  * C++
  * Java
  * JavaScript
  * Python3
* Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Title

**Bottom View of Binary Tree**

## Problem Summary

You are given the root of a binary tree. Return the *bottom view* of the binary tree as a list of node values from leftmost to rightmost. The bottom view is the set of nodes visible when the tree is viewed from the bottom. If multiple nodes share the same horizontal distance (HD) from the root, the node that appears **later** in level-order (BFS) — i.e., the bottom-most or the right-most among the bottom-most — should be taken.

Example (visual):

* Input: `root = [1, 2, 3, 4, 5, N, 6]` (level order with `N` = null)
* Output: `[4, 2, 5, 3, 6]`

## Constraints

* `1 <= number of nodes <= 10^5`
* Node values fit in `int`.
* The tree may be skewed or balanced.

---

## Intuition

I thought about how the tree looks from the bottom. Nodes can be grouped by their horizontal distance (HD) from the root: root has `hd = 0`; left child `hd - 1`; right child `hd + 1`. If two or more nodes share the same HD, the node that is seen last in a level-order traversal (BFS) will be the one visible from bottom. So I decided to do a BFS and keep overwriting the value seen at a particular HD. After BFS finishes, the stored values from the smallest HD to largest HD form the bottom view.

## Approach

1. If the tree is empty, return an empty list.
2. Perform a BFS (level-order traversal). While enqueuing nodes, store their horizontal distance (hd).
3. Maintain a map/dictionary `hd -> node_value`. During BFS, overwrite this map entry when a node with the same `hd` is visited — since BFS visits top-to-bottom, later visits are deeper or later-in-level and represent bottom candidates.
4. Track `min_hd` and `max_hd` encountered to avoid sorting map keys later.
5. After BFS, read values from `min_hd` to `max_hd` in order and return them.

This approach ensures we visit each node once and produce the bottom view left-to-right.

## Data Structures Used

* Queue (for BFS)
* Hash map / dictionary (to map `hd -> node_value`)
* Integer counters (`min_hd`, `max_hd`)

## Operations & Behavior Summary

* Enqueue root with `hd = 0`.
* For each node popped from queue:

  * Overwrite `map[hd] = node_value`.
  * Enqueue left child with `hd - 1` (if exists).
  * Enqueue right child with `hd + 1` (if exists).
  * Update `min_hd` / `max_hd` accordingly.
* After traversal, collect `map[hd]` for `hd` in `[min_hd..max_hd]`.

## Complexity

* **Time Complexity:** `O(n)` — `n` is the number of nodes. Each node is enqueued and dequeued exactly once; hash map/array updates are O(1) on average.
* **Space Complexity:** `O(n)` — queue and map may contain up to `O(n)` elements in the worst case.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

// Node definition
class Node {
public:
    int data;
    Node* left;
    Node* right;
    Node(int x) : data(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    vector<int> bottomView(Node *root) {
        vector<int> result;
        if (!root) return result;

        unordered_map<int,int> hdValue; // hd -> last seen node data
        queue<pair<Node*, int>> q;      // pair of node and its horizontal distance
        int minHd = 0, maxHd = 0;

        q.push({root, 0});

        while (!q.empty()) {
            auto p = q.front(); q.pop();
            Node* node = p.first;
            int hd = p.second;

            // Overwrite the value at this horizontal distance.
            hdValue[hd] = node->data;

            if (node->left) {
                q.push({node->left, hd - 1});
                minHd = min(minHd, hd - 1);
            }
            if (node->right) {
                q.push({node->right, hd + 1});
                maxHd = max(maxHd, hd + 1);
            }
        }

        for (int hd = minHd; hd <= maxHd; ++hd) {
            result.push_back(hdValue[hd]);
        }

        return result;
    }
};

// Example main to run locally
int main() {
    /* Build the example tree:
            1
           / \
          2   3
         / \   \
        4   5   6
    */
    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->right = new Node(6);

    Solution sol;
    vector<int> ans = sol.bottomView(root);
    for (int v : ans) cout << v << " ";
    cout << '\n';

    return 0;
}
```

---

### Java

```java
import java.util.*;

class Node {
    int data;
    Node left, right;
    Node(int data) { this.data = data; left = right = null; }
}

class Solution {
    private static class QNode {
        Node node; int hd;
        QNode(Node n, int h) { node = n; hd = h; }
    }

    public ArrayList<Integer> bottomView(Node root) {
        ArrayList<Integer> result = new ArrayList<>();
        if (root == null) return result;

        HashMap<Integer, Integer> hdValue = new HashMap<>();
        Queue<QNode> q = new LinkedList<>();
        int minHd = 0, maxHd = 0;

        q.add(new QNode(root, 0));

        while (!q.isEmpty()) {
            QNode cur = q.poll();
            Node node = cur.node;
            int hd = cur.hd;

            // overwrite value for this horizontal distance
            hdValue.put(hd, node.data);

            if (node.left != null) {
                q.add(new QNode(node.left, hd - 1));
                minHd = Math.min(minHd, hd - 1);
            }
            if (node.right != null) {
                q.add(new QNode(node.right, hd + 1));
                maxHd = Math.max(maxHd, hd + 1);
            }
        }

        for (int hd = minHd; hd <= maxHd; ++hd) result.add(hdValue.get(hd));
        return result;
    }
}

// Example usage
public class Main {
    public static void main(String[] args) {
        Node root = new Node(1);
        root.left = new Node(2);
        root.right = new Node(3);
        root.left.left = new Node(4);
        root.left.right = new Node(5);
        root.right.right = new Node(6);

        Solution sol = new Solution();
        ArrayList<Integer> ans = sol.bottomView(root);
        System.out.println(ans); // [4, 2, 5, 3, 6]
    }
}
```

---

### JavaScript (Node.js)

```javascript
// Node definition
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Solution {
    bottomView(root) {
        const result = [];
        if (!root) return result;

        const hdValue = new Map(); // hd -> last seen node value
        const q = [];
        let head = 0;
        q.push([root, 0]);

        let minHd = 0, maxHd = 0;

        while (head < q.length) {
            const [node, hd] = q[head++];
            hdValue.set(hd, node.data);

            if (node.left) {
                q.push([node.left, hd - 1]);
                minHd = Math.min(minHd, hd - 1);
            }
            if (node.right) {
                q.push([node.right, hd + 1]);
                maxHd = Math.max(maxHd, hd + 1);
            }
        }

        for (let hd = minHd; hd <= maxHd; ++hd) {
            result.push(hdValue.get(hd));
        }
        return result;
    }
}

// Example usage
// Build the same example tree
const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.right = new Node(6);

const sol = new Solution();
console.log(sol.bottomView(root)); // [4, 2, 5, 3, 6]

// Run with: node bottomView.js
```

---

### Python3

```python
from collections import deque

class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None

class Solution:
    def bottomView(self, root):
        if not root:
            return []

        hd_value = {}  # hd -> last seen node.data
        q = deque([(root, 0)])
        min_hd = 0
        max_hd = 0

        while q:
            node, hd = q.popleft()
            hd_value[hd] = node.data

            if node.left:
                q.append((node.left, hd - 1))
                min_hd = min(min_hd, hd - 1)
            if node.right:
                q.append((node.right, hd + 1))
                max_hd = max(max_hd, hd + 1)

        return [hd_value[hd] for hd in range(min_hd, max_hd + 1)]

# Example usage
if __name__ == "__main__":
    # build example tree
    root = Node(1)
    root.left = Node(2)
    root.right = Node(3)
    root.left.left = Node(4)
    root.left.right = Node(5)
    root.right.right = Node(6)

    sol = Solution()
    print(sol.bottomView(root))  # [4, 2, 5, 3, 6]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below is the combined conceptual explanation. The language-specific code implements the same logic.

### 1) Horizontal Distance (HD)

* Define horizontal distance `hd` of nodes relative to root: root `hd = 0`.
* For left child: `hd_child = hd_parent - 1`.
* For right child: `hd_child = hd_parent + 1`.
* Nodes with same `hd` lie vertically above each other.

### 2) Why BFS?

* BFS (level-order) visits nodes by increasing depth. If a node appears later in BFS for the same `hd`, it is either on the same level but to the right or deeper — both cases indicate it would be visible from the bottom instead of previous nodes with same `hd`.
* So, overwriting `map[hd]` during BFS ensures final value corresponds to the bottom view.

### 3) How the queue and map work together

* Queue entries store `(node, hd)`.
* When we pop `(node, hd)`, we set `map[hd] = node.value`.
* Enqueue children with updated `hd` values.
* Track `min_hd` / `max_hd` so final result can be produced in sorted HD order without extra sorting.

### 4) Output formation

* After BFS completes, iterate `hd` from `min_hd` to `max_hd` and collect `map[hd]` in a list.
* That list is the bottom view from leftmost to rightmost.

---

## Examples

1. Example 1

* Input tree: `[1, 2, 3, 4, 5, N, 6]`
* Visual:

```
    1
   / \
  2   3
 / \   \
4   5   6
```

* Output: `[4, 2, 5, 3, 6]`

2. Example 2

* Input tree: `[20, 8, 22, 5, 3, 4, 25, 10, 14, N, N, N, N, 28]` (balanced-ish)
* Output: `[5, 10, 4, 28, 25]`

---

## How to use / Run locally

* **C++** (g++)

  1. Save the C++ code into `bottom_view.cpp`.
  2. Compile: `g++ -std=c++17 -O2 bottom_view.cpp -o bottom_view`
  3. Run: `./bottom_view`

* **Java**

  1. Save the Java classes (`Main`, `Node`, `Solution`) into `Main.java`.
  2. Compile: `javac Main.java`
  3. Run: `java Main`

* **JavaScript (Node.js)**

  1. Save into `bottomView.js`.
  2. Run: `node bottomView.js`

* **Python3**

  1. Save into `bottom_view.py`.
  2. Run: `python3 bottom_view.py`

Note: The example `main`/`if __name__ == '__main__'` sections construct the sample tree and print bottom view. To test different trees, build nodes accordingly or implement a small helper to build from level-order lists.

---

## Notes & Optimizations

* Using BFS with overwriting map is simple and `O(n)`.
* Alternative approach: run DFS storing depth and keep max depth per hd; then choose node with largest depth (requires explicit depth tracking and comparisons). BFS-overwrite is cleaner and often easier to implement.
* We avoid sorting hd keys by maintaining `min_hd` and `max_hd` as we go. This keeps output assembly `O(range)` which is `O(n)` worst-case.
* For extremely large trees, ensure recursion is avoided — BFS with an explicit queue is iterative and safe for large depth.

---

## Author

[Md. Aarzoo Islam](https://bento.me/withaarzoo)
