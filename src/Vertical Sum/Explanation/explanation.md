# Vertical Sum

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

The Vertical Sum problem is a popular Binary Tree and Data Structures problem asked in coding interviews and competitive programming platforms like GeeksforGeeks.

In this problem, we are given a binary tree and we need to calculate the sum of nodes lying on the same vertical line.

Every node belongs to a vertical column:

* Moving to the left child decreases the vertical index by `1`
* Moving to the right child increases the vertical index by `1`

The task is to return all vertical sums from the left-most vertical line to the right-most vertical line.

This problem mainly tests:

* Binary Tree traversal
* DFS recursion
* HashMap / Map usage
* Vertical order concepts
* Tree indexing logic

---

## Constraints

| Constraint      | Value                     |
| --------------- | ------------------------- |
| Number of nodes | `1 <= n <= 10^4`          |
| Node value      | `1 <= Node value <= 10^5` |

---

## Intuition

When I first looked at this problem, I realized that every node can be mapped to a vertical position.

The root node starts at column `0`.

Then:

* Left child goes to column `-1`
* Right child goes to column `+1`

So if multiple nodes reach the same column, I simply need to keep adding their values together.

That immediately suggested using a map where:

* Key = vertical column
* Value = sum of all nodes in that column

After traversing the entire tree, the map already contains all required vertical sums.

The only remaining task is printing them from the smallest column index to the largest.

---

## Approach

I used Depth First Search (DFS) traversal to solve this Binary Tree vertical sum problem.

Step-by-step approach:

1. Start DFS from the root node with column index `0`
2. Store vertical sums inside a map
3. For every node:

   * Add its value to the current column sum
4. Move left with `column - 1`
5. Move right with `column + 1`
6. Continue recursion until all nodes are visited
7. Traverse the map in sorted order
8. Store all sums into the final answer array

This approach is clean, efficient, and works perfectly within the given constraints.

---

## Data Structures Used

| Data Structure             | Purpose                     |
| -------------------------- | --------------------------- |
| Map / TreeMap / Dictionary | Stores vertical column sums |
| Recursion Stack            | Used for DFS traversal      |
| Array / Vector / List      | Stores final result         |

### Why I used a Map

I needed a structure that could:

* Store sums by vertical index
* Access/update quickly
* Maintain sorted order of columns

That makes Map or TreeMap a very natural choice.

---

## Operations & Behavior Summary

Here is what the algorithm does internally:

1. Begin traversal from the root node
2. Assign vertical column `0` to the root
3. Traverse left subtree with decreasing column values
4. Traverse right subtree with increasing column values
5. Keep updating the vertical sum for every column
6. Store sums inside the map
7. After traversal ends, iterate through sorted columns
8. Return all vertical sums from left to right

The traversal visits every node exactly once.

---

## Complexity

| Type             | Complexity | Explanation                                           |
| ---------------- | ---------- | ----------------------------------------------------- |
| Time Complexity  | `O(n)`     | Every node in the binary tree is visited exactly once |
| Space Complexity | `O(n)`     | Extra space is used for the map and recursion stack   |

Where:

* `n` = total number of nodes in the binary tree

---

## Multi-language Solutions

### C++

```cpp
/* Structure of binary tree node
class Node{
public:
    int data;
    Node* left, right;
    Node(int item)
    {
        data = item;
        left = nullptr;
        right = nullptr;
    }
}
*/
class Solution {
  public:
    
    // DFS function to traverse the tree
    void dfs(Node* root, int col, map<int, int>& mp) {
        
        // If node is null, simply return
        if(root == nullptr)
            return;
        
        // Add current node value into its vertical column sum
        mp[col] += root->data;
        
        // Move left with column -1
        dfs(root->left, col - 1, mp);
        
        // Move right with column +1
        dfs(root->right, col + 1, mp);
    }
    
    vector<int> verticalSum(Node* root) {
        
        // Map stores:
        // key   -> vertical column
        // value -> sum of nodes in that column
        map<int, int> mp;
        
        // Start DFS from root at column 0
        dfs(root, 0, mp);
        
        vector<int> ans;
        
        // Map automatically keeps keys sorted
        // So values come from left-most to right-most
        for(auto it : mp) {
            ans.push_back(it.second);
        }
        
        return ans;
    }
};
```

### Java

```java
/* Structure of binary tree node
class Node{
public:
    int data;
    Node left, right;
    Node(int item)
    {
        data = item;
        left = right = null;
    }
}
*/
class Solution {
    
    // DFS traversal function
    void dfs(Node root, int col, TreeMap<Integer, Integer> map) {
        
        // If node is null, stop recursion
        if(root == null)
            return;
        
        // Add node value into current vertical column
        map.put(col, map.getOrDefault(col, 0) + root.data);
        
        // Traverse left side
        dfs(root.left, col - 1, map);
        
        // Traverse right side
        dfs(root.right, col + 1, map);
    }
    
    public ArrayList<Integer> verticalSum(Node root) {
        
        // TreeMap keeps keys sorted automatically
        TreeMap<Integer, Integer> map = new TreeMap<>();
        
        // Start traversal from column 0
        dfs(root, 0, map);
        
        ArrayList<Integer> ans = new ArrayList<>();
        
        // Store sums in sorted vertical order
        for(int value : map.values()) {
            ans.add(value);
        }
        
        return ans;
    }
}
```

### JavaScript

```javascript
/* Structure of binary tree node
class Node{
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
*/
class Solution {
    
    // DFS traversal function
    dfs(root, col, map) {
        
        // Stop if node does not exist
        if(root === null)
            return;
        
        // Add current node value to its column sum
        map.set(col, (map.get(col) || 0) + root.data);
        
        // Traverse left subtree
        this.dfs(root.left, col - 1, map);
        
        // Traverse right subtree
        this.dfs(root.right, col + 1, map);
    }
    
    verticalSum(root) {
        
        // Map stores column -> sum
        let map = new Map();
        
        // Start DFS from column 0
        this.dfs(root, 0, map);
        
        // Sort columns from left to right
        let sortedKeys = [...map.keys()].sort((a, b) => a - b);
        
        let ans = [];
        
        // Push sums in sorted order
        for(let key of sortedKeys) {
            ans.push(map.get(key));
        }
        
        return ans;
    }
};
```

### Python3

```python
# Structure of binary tree node
'''
class Node:
    def __init__(self, item):
        self.data = item
        self.left = None
        self.right = None
'''

class Solution:
    
    # DFS traversal function
    def dfs(self, root, col, mp):
        
        # If node is None, stop recursion
        if not root:
            return
        
        # Add node value to current vertical column
        mp[col] = mp.get(col, 0) + root.data
        
        # Traverse left subtree
        self.dfs(root.left, col - 1, mp)
        
        # Traverse right subtree
        self.dfs(root.right, col + 1, mp)
    
    def verticalSum(self, root):
        
        # Dictionary stores:
        # key   -> column number
        # value -> vertical sum
        mp = {}
        
        # Start traversal from root at column 0
        self.dfs(root, 0, mp)
        
        # Sort columns from left-most to right-most
        sorted_cols = sorted(mp.keys())
        
        # Build final answer
        ans = []
        
        for col in sorted_cols:
            ans.append(mp[col])
        
        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains almost identical in all languages.

The only difference is syntax and the type of map used.

### Step 1: Start DFS Traversal

The traversal begins from the root node.

I assign vertical column `0` to the root because it is the center line of the tree.

---

### Step 2: Store Vertical Sums

For every visited node:

* Check its current vertical column
* Add node value into the sum of that column

If the column does not exist yet, create it first.

This is why a map or dictionary becomes very useful.

---

### Step 3: Move Left

Whenever traversal moves to the left child:

```text
column = column - 1
```

This represents moving one vertical line toward the left side.

---

### Step 4: Move Right

Whenever traversal moves to the right child:

```text
column = column + 1
```

This represents moving one vertical line toward the right side.

---

### Step 5: Continue Recursion

DFS continues recursively until all nodes are processed.

The recursion automatically explores:

* Left subtree
* Right subtree
* All vertical columns

---

### Step 6: Extract Answer in Sorted Order

After DFS finishes:

* The map contains all vertical sums
* Keys represent vertical columns

Now I simply traverse the map from smallest key to largest key.

That automatically gives the result from:

```text
left-most vertical line → right-most vertical line
```

---

### Why DFS Works Perfectly Here

The problem does not care about node order inside the same column.

It only asks for the final sum.

That means BFS is not necessary.

DFS is simpler and cleaner for this problem.

---

### Important Edge Cases

#### Single Node Tree

If the tree contains only one node:

```text
1
```

Output becomes:

```text
1
```

---

#### Completely Left Skewed Tree

Every node moves to a new left column.

Each vertical line contains only one node.

---

#### Completely Right Skewed Tree

Every node moves to a new right column.

Again, each vertical line contains one node.

---

#### Multiple Nodes in Same Vertical Line

This is the main case the algorithm handles.

All nodes sharing the same column are added together.

---

## Examples

### Example 1

### Input

```text
        1
      /   \
     2     3
    / \   / \
   4  5  6   7
```

### Output

```text
4 2 12 3 7
```

### Explanation

Vertical columns become:

| Column | Nodes   | Sum |
| ------ | ------- | --- |
| -2     | 4       | 4   |
| -1     | 2       | 2   |
| 0      | 1, 5, 6 | 12  |
| 1      | 3       | 3   |
| 2      | 7       | 7   |

---

### Example 2

### Input

```text
        1
       /
      2
     /
    3
   /
  4
```

### Output

```text
4 3 2 1
```

### Explanation

Each node belongs to a separate vertical column on the left side.

---

### Example 3

### Input

```text
    10
   /  \
  5   20
     /
    15
```

### Output

```text
5 25 20
```

### Explanation

Column sums:

| Column | Sum          |
| ------ | ------------ |
| -1     | 5            |
| 0      | 10 + 15 = 25 |
| 1      | 20           |

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

Run using Node.js:

```bash
node main.js
```

---

### Python3

Run:

```bash
python main.py
```

---

## Notes & Optimizations

### Why Ordered Map is Helpful

Using an ordered map automatically keeps vertical columns sorted.

That removes the need for extra sorting later.

---

### Alternative Approach

This problem can also be solved using:

* BFS traversal
* Queue + column indexing

But DFS is shorter and easier to implement.

---

### Recursion Depth

In a highly skewed tree, recursion depth can become large.

Iterative traversal can be used if stack overflow becomes a concern.

---

### Important Observation

The problem only asks for sums.

It does not require:

* level order
* top view
* bottom view
* node ordering inside columns

That is why the solution stays simple.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
