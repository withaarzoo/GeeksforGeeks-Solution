# Top View of Binary Tree

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

Given the root of a binary tree, the task is to return its **top view**.

The top view of a binary tree represents the nodes that are visible when the tree is viewed from the top.

Rules:

1. Nodes should be returned from the **leftmost node to the rightmost node**.
2. If multiple nodes overlap at the same horizontal position, only the **topmost node (closest to the root)** should be included.

---

## Constraints

* 1 ≤ number of nodes ≤ 10^5
* 1 ≤ node->data ≤ 10^5

---

## Intuition

When I started thinking about this problem, I imagined looking at the binary tree from directly above.

Some nodes hide the nodes below them. Only the **first visible node in each vertical column** should appear in the result.

To represent vertical columns, I use a concept called **Horizontal Distance (HD)**.

Rules for horizontal distance:

* Root node has HD = 0
* Moving left decreases HD by 1
* Moving right increases HD by 1

If I track the first node encountered for every horizontal distance, I can determine the top view.

To ensure I always see the **topmost node first**, I traverse the tree using **Breadth First Search (BFS)**.

---

## Approach

1. If the root is null, return an empty list.

2. Use **Breadth First Search (BFS)** with a queue.

3. Each element in the queue stores:

   * the current node
   * its horizontal distance

4. Use a **map** to store the first node seen at each horizontal distance.

5. Start traversal with:

   root → horizontal distance = 0

6. While traversing:

   * If a horizontal distance has not been seen before, store the node.
   * Push the left child with `hd - 1`.
   * Push the right child with `hd + 1`.

7. After traversal, iterate through the map from smallest HD to largest HD and collect the values.

---

## Data Structures Used

Queue

* Used for BFS traversal.
* Stores `(node, horizontal distance)`.

Map / Ordered Map

* Stores `horizontal distance -> node value`.
* Keeps keys sorted so output can be returned from leftmost to rightmost.

---

## Operations & Behavior Summary

| Operation                    | Purpose                                    |
| ---------------------------- | ------------------------------------------ |
| BFS traversal                | Ensures nodes are processed level by level |
| Horizontal Distance tracking | Identifies vertical columns                |
| Map insertion                | Stores first visible node for each column  |
| Sorted traversal of map      | Produces left-to-right order               |

---

## Complexity

Time Complexity: **O(n log n)**

* `n` is the number of nodes in the tree.
* Each node is visited once using BFS → O(n)
* Map insertion takes O(log n)

Space Complexity: **O(n)**

Extra space is used for:

* Queue used in BFS
* Map storing horizontal distances

---

## Multi-language Solutions

### C++

```cpp
/*
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
    vector<int> topView(Node *root) {
        vector<int> result;
        if(root == NULL) return result;

        map<int,int> mp;
        queue<pair<Node*,int>> q;

        q.push({root,0});

        while(!q.empty()){

            auto it = q.front();
            q.pop();

            Node* node = it.first;
            int hd = it.second;

            if(mp.find(hd) == mp.end())
                mp[hd] = node->data;

            if(node->left)
                q.push({node->left, hd-1});

            if(node->right)
                q.push({node->right, hd+1});
        }

        for(auto it : mp)
            result.push_back(it.second);

        return result;
    }
};
```

---

### Java

```java
/*
class Node {
    int data;
    Node left, right;

    Node(int val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}
*/

class Solution {
    public ArrayList<Integer> topView(Node root) {

        ArrayList<Integer> result = new ArrayList<>();
        if(root == null) return result;

        TreeMap<Integer,Integer> map = new TreeMap<>();

        Queue<Pair> q = new LinkedList<>();
        q.add(new Pair(root,0));

        while(!q.isEmpty()){

            Pair p = q.poll();
            Node node = p.node;
            int hd = p.hd;

            if(!map.containsKey(hd))
                map.put(hd,node.data);

            if(node.left != null)
                q.add(new Pair(node.left, hd-1));

            if(node.right != null)
                q.add(new Pair(node.right, hd+1));
        }

        for(int val : map.values())
            result.add(val);

        return result;
    }
}

class Pair{
    Node node;
    int hd;

    Pair(Node n, int h){
        node = n;
        hd = h;
    }
}
```

---

### JavaScript

```javascript
class Solution {

    topView(root) {

        if (!root) return [];

        const map = new Map();
        const queue = [[root,0]];

        while(queue.length){

            const [node,hd] = queue.shift();

            if(!map.has(hd))
                map.set(hd,node.data);

            if(node.left)
                queue.push([node.left, hd-1]);

            if(node.right)
                queue.push([node.right, hd+1]);
        }

        const keys = [...map.keys()].sort((a,b)=>a-b);

        const result = [];

        for(const k of keys)
            result.push(map.get(k));

        return result;
    }
}
```

---

### Python3

```python
from collections import deque

class Solution:

    def topView(self, root):

        if not root:
            return []

        mp = {}
        q = deque([(root,0)])

        while q:

            node,hd = q.popleft()

            if hd not in mp:
                mp[hd] = node.data

            if node.left:
                q.append((node.left, hd-1))

            if node.right:
                q.append((node.right, hd+1))

        result = []

        for key in sorted(mp):
            result.append(mp[key])

        return result
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Start by checking if the root is null. If it is, return an empty list.

2. Create a queue to perform **Breadth First Search**.

3. Push the root node with horizontal distance **0**.

4. Create a map to store the first node seen at every horizontal distance.

5. While the queue is not empty:

   * Remove the front element.
   * Extract the node and its horizontal distance.

6. If this horizontal distance is not present in the map:

   * Store the node's value.

   This ensures we only store the **topmost node** for that column.

7. If the current node has a left child:

   * Push it into the queue with `hd - 1`.

8. If the current node has a right child:

   * Push it with `hd + 1`.

9. Continue until all nodes are processed.

10. Finally, traverse the map in sorted order of horizontal distance and build the result list.

---

## Examples

Example 1

Input:

[1,2,3]

Tree:

```
1
```

/
2   3

Output:

[2,1,3]

Explanation:

Nodes visible from the top are the left node, root node, and right node.

---

Example 2

Input:

[10,20,30,40,60,90,100]

Output:

[40,20,10,30,100]

Explanation:

The nodes visible when viewing the tree from the top correspond to the first node encountered in each vertical column.

---

## How to use / Run locally

1. Clone the repository

```
git clone https://github.com/yourusername/repository-name
```

1. Navigate to the folder

```
cd repository-name
```

1. Compile and run

C++ example:

```
g++ solution.cpp
./a.out
```

Python example:

```
python solution.py
```

---

## Notes & Optimizations

* BFS guarantees that the first node seen at a horizontal distance is the topmost node.
* Using an ordered map automatically sorts horizontal distances.
* The approach works efficiently even for large trees up to **10^5 nodes**.

Possible optimization:

Instead of a map, we can use **unordered_map with minHD and maxHD tracking** to reduce logarithmic insertion cost.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
