# Burning Tree

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions
* Step-by-step Detailed Explanation
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

## Problem Summary

Given the root of a binary tree and a target node, we need to find the minimum time required to burn the entire tree. Fire spreads from a node to its left child, right child, and parent in one second.

## Constraints

* 1 ≤ number of nodes ≤ 1e5
* 1 ≤ node value ≤ 1e5

## Intuition

I thought of this problem as a graph problem instead of a tree problem. Fire spreads in all directions, including upward (to parent), but a tree does not provide parent references. So I realized I need to convert the tree into something like a graph and then perform BFS starting from the target node.

## Approach

1. Traverse the tree using BFS and store parent pointers.
2. Locate the target node.
3. Start BFS from the target node.
4. Spread fire to left, right, and parent nodes.
5. Count levels of BFS to calculate time.

## Data Structures Used

* Queue (for BFS)
* HashMap / Dictionary (for parent mapping)
* Set / Map (for visited tracking)

## Operations & Behavior Summary

* Build parent mapping in O(n)
* BFS traversal from target node
* Track visited nodes to avoid cycles
* Count BFS levels to determine time

## Complexity

* Time Complexity: O(n), where n is the number of nodes
* Space Complexity: O(n), due to parent map, visited set, and queue

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    Node* markParents(Node* root, unordered_map<Node*, Node*>& parent, int target) {
        queue<Node*> q;
        q.push(root);
        Node* targetNode = NULL;
        
        while(!q.empty()) {
            Node* curr = q.front(); q.pop();
            if(curr->data == target) targetNode = curr;
            
            if(curr->left) {
                parent[curr->left] = curr;
                q.push(curr->left);
            }
            if(curr->right) {
                parent[curr->right] = curr;
                q.push(curr->right);
            }
        }
        return targetNode;
    }
    
    int minTime(Node* root, int target) {
        unordered_map<Node*, Node*> parent;
        Node* targetNode = markParents(root, parent, target);
        
        unordered_map<Node*, bool> visited;
        queue<Node*> q;
        q.push(targetNode);
        visited[targetNode] = true;
        
        int time = 0;
        
        while(!q.empty()) {
            int size = q.size();
            bool burned = false;
            
            for(int i = 0; i < size; i++) {
                Node* curr = q.front(); q.pop();
                
                if(curr->left && !visited[curr->left]) {
                    burned = true;
                    visited[curr->left] = true;
                    q.push(curr->left);
                }
                
                if(curr->right && !visited[curr->right]) {
                    burned = true;
                    visited[curr->right] = true;
                    q.push(curr->right);
                }
                
                if(parent[curr] && !visited[parent[curr]]) {
                    burned = true;
                    visited[parent[curr]] = true;
                    q.push(parent[curr]);
                }
            }
            
            if(burned) time++;
        }
        
        return time;
    }
};
```

### Java

```java
class Solution {
    public Node markParents(Node root, HashMap<Node, Node> parent, int target) {
        Queue<Node> q = new LinkedList<>();
        q.add(root);
        Node targetNode = null;
        
        while (!q.isEmpty()) {
            Node curr = q.poll();
            if (curr.data == target) targetNode = curr;
            
            if (curr.left != null) {
                parent.put(curr.left, curr);
                q.add(curr.left);
            }
            if (curr.right != null) {
                parent.put(curr.right, curr);
                q.add(curr.right);
            }
        }
        return targetNode;
    }

    public int minTime(Node root, int target) {
        HashMap<Node, Node> parent = new HashMap<>();
        Node targetNode = markParents(root, parent, target);
        
        HashSet<Node> visited = new HashSet<>();
        Queue<Node> q = new LinkedList<>();
        
        q.add(targetNode);
        visited.add(targetNode);
        
        int time = 0;
        
        while (!q.isEmpty()) {
            int size = q.size();
            boolean burned = false;
            
            for (int i = 0; i < size; i++) {
                Node curr = q.poll();
                
                if (curr.left != null && !visited.contains(curr.left)) {
                    burned = true;
                    visited.add(curr.left);
                    q.add(curr.left);
                }
                
                if (curr.right != null && !visited.contains(curr.right)) {
                    burned = true;
                    visited.add(curr.right);
                    q.add(curr.right);
                }
                
                if (parent.get(curr) != null && !visited.contains(parent.get(curr))) {
                    burned = true;
                    visited.add(parent.get(curr));
                    q.add(parent.get(curr));
                }
            }
            
            if (burned) time++;
        }
        
        return time;
    }
}
```

### JavaScript

```javascript
class Solution {
    minTime(root, target) {
        const parent = new Map();
        let targetNode = null;

        let q = [root];
        while (q.length) {
            let curr = q.shift();
            if (curr.data === target) targetNode = curr;

            if (curr.left) {
                parent.set(curr.left, curr);
                q.push(curr.left);
            }
            if (curr.right) {
                parent.set(curr.right, curr);
                q.push(curr.right);
            }
        }

        let visited = new Set();
        q = [targetNode];
        visited.add(targetNode);

        let time = 0;

        while (q.length) {
            let size = q.length;
            let burned = false;

            for (let i = 0; i < size; i++) {
                let curr = q.shift();

                if (curr.left && !visited.has(curr.left)) {
                    burned = true;
                    visited.add(curr.left);
                    q.push(curr.left);
                }

                if (curr.right && !visited.has(curr.right)) {
                    burned = true;
                    visited.add(curr.right);
                    q.push(curr.right);
                }

                if (parent.get(curr) && !visited.has(parent.get(curr))) {
                    burned = true;
                    visited.add(parent.get(curr));
                    q.push(parent.get(curr));
                }
            }

            if (burned) time++;
        }

        return time;
    }
}
```

### Python3

```python
class Solution:
    def minTime(self, root, target):
        from collections import deque
        parent = {}
        q = deque([root])
        targetNode = None

        while q:
            curr = q.popleft()
            if curr.data == target:
                targetNode = curr

            if curr.left:
                parent[curr.left] = curr
                q.append(curr.left)
            if curr.right:
                parent[curr.right] = curr
                q.append(curr.right)

        visited = set()
        q = deque([targetNode])
        visited.add(targetNode)

        time = 0

        while q:
            size = len(q)
            burned = False

            for _ in range(size):
                curr = q.popleft()

                if curr.left and curr.left not in visited:
                    burned = True
                    visited.add(curr.left)
                    q.append(curr.left)

                if curr.right and curr.right not in visited:
                    burned = True
                    visited.add(curr.right)
                    q.append(curr.right)

                if curr in parent and parent[curr] not in visited:
                    burned = True
                    visited.add(parent[curr])
                    q.append(parent[curr])

            if burned:
                time += 1

        return time
```

## Step-by-step Detailed Explanation

1. First, I traverse the tree using BFS and store parent relationships.
2. While traversing, I also locate the target node.
3. Then I start BFS from the target node.
4. From each node, I try to spread fire in three directions: left, right, and parent.
5. I keep track of visited nodes to avoid revisiting.
6. Each BFS level represents one second.
7. If at least one node burns in a level, I increment time.

## Examples

Input: root = [1,2,3,4,5,6,7], target = 2
Output: 3

## How to use / Run locally

1. Copy the code into your local IDE.
2. Create a binary tree structure.
3. Call minTime(root, target).
4. Print the result.

## Notes & Optimizations

* Using BFS ensures optimal shortest spread time.
* Parent mapping is necessary to simulate upward movement.
* Avoid revisiting nodes using a visited set.

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
