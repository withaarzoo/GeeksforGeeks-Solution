# K Sum Paths

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

Given the root of a binary tree and an integer k, determine the number of downward-only paths where the sum of node values equals k.

A path can start and end at any node but must move only from parent to child.

---

## Constraints

1 ≤ number of nodes ≤ 10^4

-100 ≤ node value ≤ 100

-10^9 ≤ k ≤ 10^9

---

## Intuition

When I first looked at the problem, my initial idea was to start a path from every node and calculate all possible downward path sums. However, that approach would lead to O(n^2) time complexity in the worst case.

To improve efficiency, I used a prefix sum technique similar to what is used in subarray sum problems. While traversing the tree, I maintain the cumulative sum from the root to the current node. If at any point (currentSum - k) has already appeared before, it means there exists a previous prefix that forms a path with sum k.

Using this idea with a HashMap allows me to count valid paths efficiently.

---

## Approach

1. Traverse the tree using Depth First Search.
2. Maintain a running prefix sum while visiting nodes.
3. Use a HashMap to store the frequency of prefix sums encountered so far.
4. For each node:

   * Update the running sum.
   * Check if (currentSum - k) exists in the map.
   * If yes, those many valid paths exist.
5. Add the current prefix sum into the map.
6. Recursively process left and right subtrees.
7. After finishing the subtree, remove the current sum from the map to maintain correctness.

---

## Data Structures Used

Binary Tree

HashMap / Dictionary

Recursion Stack

---

## Operations & Behavior Summary

Tree traversal is performed using DFS.

Prefix sums are stored in a HashMap to allow constant time lookup.

Backtracking ensures prefix sums only apply to the current path.

---

## Complexity

Time Complexity: O(n)

Each node is visited exactly once.

Space Complexity: O(n)

Extra space is used by the HashMap and recursion stack.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
public:

    int dfs(Node* node, long currSum, int k, unordered_map<long,int>& mp){
        if(!node) return 0;

        currSum += node->data;

        int count = 0;

        if(currSum == k) count++;

        if(mp.count(currSum - k))
            count += mp[currSum - k];

        mp[currSum]++;

        count += dfs(node->left, currSum, k, mp);
        count += dfs(node->right, currSum, k, mp);

        mp[currSum]--;

        return count;
    }

    int countAllPaths(Node *root, int k) {
        unordered_map<long,int> mp;
        return dfs(root, 0, k, mp);
    }
};
```

### Java

```java
class Solution {

    public int dfs(Node node, long currSum, int k, HashMap<Long,Integer> map){
        if(node == null) return 0;

        currSum += node.data;

        int count = 0;

        if(currSum == k) count++;

        if(map.containsKey(currSum - k))
            count += map.get(currSum - k);

        map.put(currSum, map.getOrDefault(currSum,0)+1);

        count += dfs(node.left, currSum, k, map);
        count += dfs(node.right, currSum, k, map);

        map.put(currSum, map.get(currSum)-1);

        return count;
    }

    public int countAllPaths(Node root, int k) {
        HashMap<Long,Integer> map = new HashMap<>();
        return dfs(root,0,k,map);
    }
}
```

### JavaScript

```javascript
class Solution {

    dfs(node, currSum, k, map){
        if(node === null) return 0;

        currSum += node.data;

        let count = 0;

        if(currSum === k) count++;

        if(map.has(currSum - k))
            count += map.get(currSum - k);

        map.set(currSum, (map.get(currSum) || 0) + 1);

        count += this.dfs(node.left, currSum, k, map);
        count += this.dfs(node.right, currSum, k, map);

        map.set(currSum, map.get(currSum) - 1);

        return count;
    }

    countAllPaths(root, k) {
        let map = new Map();
        return this.dfs(root, 0, k, map);
    }
}
```

### Python3

```python
class Solution:

    def dfs(self, node, curr_sum, k, prefix):
        if not node:
            return 0

        curr_sum += node.data

        count = 0

        if curr_sum == k:
            count += 1

        count += prefix.get(curr_sum - k, 0)

        prefix[curr_sum] = prefix.get(curr_sum, 0) + 1

        count += self.dfs(node.left, curr_sum, k, prefix)
        count += self.dfs(node.right, curr_sum, k, prefix)

        prefix[curr_sum] -= 1

        return count

    def countAllPaths(self, root, k):
        prefix = {}
        return self.dfs(root, 0, k, prefix)
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Start a DFS traversal from the root.

2. Maintain a variable called currSum which represents the sum of nodes from root to the current node.

3. At every node:

   * Add the node value to currSum.

4. Check if currSum equals k.

5. Check if (currSum - k) exists in the prefix map.

6. If it exists, it means there is a previous prefix sum that forms a valid path ending at the current node.

7. Add currSum into the map.

8. Recursively visit the left subtree.

9. Recursively visit the right subtree.

10. After finishing both subtrees, remove the current prefix sum from the map to maintain correct path state.

---

## Examples

Example 1

Input:

root = [8,4,5,3,2,null,2,3,-2,null,1]

k = 7

Output:

3

Valid Paths:

4 -> 3

4 -> 2 -> 1

5 -> 2

Example 2

Input:

root = [1,2,3]

k = 3

Output:

2

Paths:

1 -> 2

3

---

## How to use / Run locally

1. Clone the repository

2. Navigate to the project directory

3. Compile and run the code

Example for C++

```
g++ solution.cpp
./a.out
```

Example for Python

```
python solution.py
```

---

## Notes & Optimizations

Using prefix sums reduces the complexity from O(n^2) to O(n).

Backtracking is required to maintain correct prefix state.

Using long for prefix sum prevents integer overflow.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
