# Vertical Tree Traversal

## Table of Contents

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
* Step-by-step Detailed Explanation
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

Given the root of a Binary Tree, the task is to return the vertical order traversal of the tree.

Nodes that lie on the same vertical line should be grouped together. The traversal should start from the leftmost vertical line and move toward the rightmost vertical line.

If multiple nodes appear in the same vertical line, they should be printed in the order they appear during level order traversal.

---

## Constraints

* 1 ≤ number of nodes ≤ 10^5
* 1 ≤ node value ≤ 10^5

---

## Intuition

When I first looked at the problem, I realized that the tree needs to be viewed column by column instead of level by level.

To solve this, I imagined assigning every node a horizontal distance from the root.

The rules are:

* Root node has horizontal distance = 0
* Moving to the left child decreases the distance by 1
* Moving to the right child increases the distance by 1

Nodes that share the same horizontal distance belong to the same vertical column.

However, the problem also requires nodes in the same column to appear in level order. Because of that, I decided to use Breadth First Search instead of Depth First Search.

---

## Approach

Step 1: If the root is null, return an empty result.

Step 2: Use a queue to perform Breadth First Search.

Step 3: Store pairs of (node, horizontal distance) inside the queue.

Step 4: Use a map where:

Key = horizontal distance
Value = list of nodes belonging to that vertical line

Step 5: Start BFS traversal.

* Remove the front node from the queue
* Add the node's value to the list corresponding to its horizontal distance
* Push the left child with distance (hd - 1)
* Push the right child with distance (hd + 1)

Step 6: After BFS is complete, iterate through the map from smallest to largest horizontal distance.

Step 7: Add each column to the final result.

---

## Data Structures Used

Queue
Used for Breadth First Search traversal so that nodes are processed in level order.

Map / TreeMap / Dictionary
Used to group nodes based on their horizontal distance.

List / Vector / ArrayList
Used to store nodes belonging to the same vertical column.

---

## Operations & Behavior Summary

| Operation                    | Purpose                                            |
| ---------------------------- | -------------------------------------------------- |
| BFS Traversal                | Ensures nodes are processed level by level         |
| Horizontal Distance Tracking | Determines which vertical column a node belongs to |
| Map Storage                  | Groups nodes by vertical column                    |
| Ordered Iteration            | Produces columns from left to right                |

---

## Complexity

Time Complexity: O(N)

N is the number of nodes in the tree. Each node is visited exactly once during the BFS traversal.

Space Complexity: O(N)

Extra space is used for the queue, the map storing vertical groups, and the final result.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    vector<vector<int>> verticalOrder(Node *root) {
        vector<vector<int>> result;
        if (!root) return result;

        map<int, vector<int>> mp;
        queue<pair<Node*, int>> q;

        q.push({root, 0});

        while (!q.empty()) {
            auto front = q.front();
            q.pop();

            Node* node = front.first;
            int hd = front.second;

            mp[hd].push_back(node->data);

            if (node->left)
                q.push({node->left, hd - 1});

            if (node->right)
                q.push({node->right, hd + 1});
        }

        for (auto &it : mp)
            result.push_back(it.second);

        return result;
    }
};
```

### Java

```java
class Pair {
    Node node;
    int hd;

    Pair(Node n, int h) {
        node = n;
        hd = h;
    }
}

class Solution {
    public ArrayList<ArrayList<Integer>> verticalOrder(Node root) {

        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        TreeMap<Integer, ArrayList<Integer>> map = new TreeMap<>();
        Queue<Pair> queue = new LinkedList<>();

        queue.add(new Pair(root, 0));

        while (!queue.isEmpty()) {

            Pair p = queue.poll();
            Node node = p.node;
            int hd = p.hd;

            map.putIfAbsent(hd, new ArrayList<>());
            map.get(hd).add(node.data);

            if (node.left != null)
                queue.add(new Pair(node.left, hd - 1));

            if (node.right != null)
                queue.add(new Pair(node.right, hd + 1));
        }

        for (ArrayList<Integer> list : map.values())
            result.add(list);

        return result;
    }
}
```

### JavaScript

```javascript
class Solution {
    verticalOrder(root) {

        if (!root) return [];

        const map = new Map();
        const queue = [[root, 0]];

        let min = 0;
        let max = 0;

        while (queue.length) {

            const [node, hd] = queue.shift();

            if (!map.has(hd)) map.set(hd, []);
            map.get(hd).push(node.data);

            min = Math.min(min, hd);
            max = Math.max(max, hd);

            if (node.left)
                queue.push([node.left, hd - 1]);

            if (node.right)
                queue.push([node.right, hd + 1]);
        }

        const result = [];

        for (let i = min; i <= max; i++) {
            if (map.has(i)) result.push(map.get(i));
        }

        return result;
    }
}
```

### Python3

```python
from collections import defaultdict, deque

class Solution:
    def verticalOrder(self, root):

        if not root:
            return []

        mp = defaultdict(list)
        queue = deque()

        queue.append((root, 0))

        while queue:

            node, hd = queue.popleft()

            mp[hd].append(node.data)

            if node.left:
                queue.append((node.left, hd - 1))

            if node.right:
                queue.append((node.right, hd + 1))

        result = []

        for key in sorted(mp.keys()):
            result.append(mp[key])

        return result
```

---

## Step-by-step Detailed Explanation

1. Create a map that stores vertical columns using horizontal distance as the key.

2. Use a queue to perform BFS traversal.

3. Insert the root node into the queue with horizontal distance 0.

4. While the queue is not empty:

   * Remove the front node
   * Store its value in the map using its horizontal distance

5. If the node has a left child, insert it into the queue with horizontal distance minus one.

6. If the node has a right child, insert it into the queue with horizontal distance plus one.

7. Continue until the queue becomes empty.

8. Finally, iterate through the map from smallest to largest key and collect the stored lists.

This produces the vertical order traversal from leftmost column to rightmost column.

---

## Examples

Example 1

Input

root = [1,2,3,4,5,6,7]

Output

[[4],[2],[1,5,6],[3],[7]]

Example 2

Input

root = [1,2,3,4,5,N,6]

Output

[[4],[2],[1,5],[3],[6]]

---

## How to use / Run locally

1. Clone the repository

```
 git clone https://github.com/your-repo
```

1. Navigate to the project folder

```
 cd vertical-tree-traversal
```

1. Compile and run

C++

```
 g++ solution.cpp
 ./a.out
```

Java

```
 javac Solution.java
 java Solution
```

Python

```
 python solution.py
```

---

## Notes & Optimizations

* Breadth First Search is necessary to maintain correct node ordering.
* Using a map keeps vertical columns automatically sorted.
* The algorithm processes every node exactly once.

Possible optimization:

Instead of a map, we can store minimum and maximum horizontal distances and use an array-based structure for faster access.

---

## Author

Md Aarzoo Islam

Instagram

[https://www.instagram.com/code.with.aarzoo/](https://www.instagram.com/code.with.aarzoo/)
