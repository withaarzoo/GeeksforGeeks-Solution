# Check Level Anagrams in Binary Trees

## Table of Contents
- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations & Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
  - [C++](#c)
  - [Java](#java)
  - [JavaScript](#javascript)
  - [Python3](#python3)
- [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

## Problem Summary
You are given the roots of two binary trees. The task is to check whether the nodes at every corresponding level of both trees form anagrams of each other.

Two levels are anagrams if they contain the exact same node values with the same frequencies, no matter the order of the nodes.

The function should return true if every level matches this condition, otherwise false.

This problem tests your understanding of level-order traversal (BFS) on binary trees and how to compare multisets of values efficiently.

## Constraints
- 1 <= size of binary tree <= 10^5
- 1 <= node.data <= 10^6
- The character N represents a null child

## Intuition
When I first saw this problem I realized I do not care about the structure of the tree beyond the levels. The only thing that matters is the collection of values sitting on the same depth in both trees.

If I can walk both trees level by level at the same time and compare the bags of numbers on each level, I can decide whether they are anagrams. Sorting the values on a level (or counting frequencies) makes the comparison simple and reliable.

Because the trees can have up to 10^5 nodes, a single O(n) traversal with light extra work per level is the way to go.

## Approach
I perform a simultaneous level-order traversal (BFS) on both trees using two queues.

While both queues are not empty:
1. Record the number of nodes on the current level for each tree.
2. If the sizes differ, the levels cannot be anagrams, so return false.
3. Collect all node values from the current level of both trees into two separate lists.
4. Push the children of those nodes into the queues for the next level.
5. Sort both lists and compare them. If they are not identical, return false.

After the loop finishes I check that both queues are empty. If one still has nodes, the trees have different heights and the answer is false. Otherwise every corresponding level matched and the answer is true.

This approach guarantees we examine every node exactly once while keeping the comparison clean.

## Data Structures Used
- Queue (or deque) — needed for classic BFS level-order traversal so I can process nodes level by level.
- Dynamic array / list — temporary storage for the values present on the current level of each tree.
- Sorting routine — turns the unordered collections into ordered sequences so equality can be checked in linear time after sorting.

These structures keep the solution simple, readable, and efficient enough for the given constraints.

## Operations & Behavior Summary
1. Handle the base cases: both roots null → true; exactly one null → false.
2. Initialize two queues and enqueue the two roots.
3. While both queues still contain nodes:
   - Capture the current level sizes.
   - If sizes differ, return false.
   - Extract every node of the current level, store its value, and enqueue its non-null children.
   - Sort the two collected value lists.
   - Compare the sorted lists; any mismatch returns false.
4. After the main loop, verify both queues are empty (same height).
5. Return true only if every level passed the anagram test.

## Complexity

| Aspect            | Complexity   | Explanation |
|-------------------|--------------|-------------|
| Time Complexity   | O(n log n)   | BFS visits each of the n nodes once (O(n)). Sorting the values of every level costs O(s log s) where s is the size of that level. In the worst case one level can contain all n nodes, giving O(n log n) overall. |
| Space Complexity  | O(n)         | The queues and temporary level lists together hold at most O(n) nodes or values at any moment. |

## Multi-language Solutions

### C++
```cpp
/* Structure of binary tree Node
class Node {
    public:
    int data;
    Node *left, *right;
    Node(int x) {
        data = x;
        left = right = nullptr;
    }
};
*/
class Solution {
  public:
    bool areAnagrams(Node* root1, Node* root2) {
        if (!root1 && !root2) return true;
        if (!root1 || !root2) return false;
        queue<Node*> q1, q2;
        q1.push(root1);
        q2.push(root2);
        while (!q1.empty() && !q2.empty()) {
            int sz1 = q1.size(), sz2 = q2.size();
            if (sz1 != sz2) return false;
            vector<int> a, b;
            for (int i = 0; i < sz1; i++) {
                Node* n1 = q1.front(); q1.pop();
                Node* n2 = q2.front(); q2.pop();
                a.push_back(n1->data);
                b.push_back(n2->data);
                if (n1->left) q1.push(n1->left);
                if (n1->right) q1.push(n1->right);
                if (n2->left) q2.push(n2->left);
                if (n2->right) q2.push(n2->right);
            }
            sort(a.begin(), a.end());
            sort(b.begin(), b.end());
            if (a != b) return false;
        }
        return q1.empty() && q2.empty();
    }
};
```

### Java
```java
/* Structure of binary tree Node
class Node {
    int data;
    Node left, right;
    Node(int x) {
        data = x;
        left = right = null;
    }
}
*/
class Solution {
    public boolean areAnagrams(Node root1, Node root2) {
        if (root1 == null && root2 == null) return true;
        if (root1 == null || root2 == null) return false;
        Queue<Node> q1 = new LinkedList<>();
        Queue<Node> q2 = new LinkedList<>();
        q1.offer(root1);
        q2.offer(root2);
        while (!q1.isEmpty() && !q2.isEmpty()) {
            int sz1 = q1.size(), sz2 = q2.size();
            if (sz1 != sz2) return false;
            List<Integer> a = new ArrayList<>();
            List<Integer> b = new ArrayList<>();
            for (int i = 0; i < sz1; i++) {
                Node n1 = q1.poll();
                Node n2 = q2.poll();
                a.add(n1.data);
                b.add(n2.data);
                if (n1.left != null) q1.offer(n1.left);
                if (n1.right != null) q1.offer(n1.right);
                if (n2.left != null) q2.offer(n2.left);
                if (n2.right != null) q2.offer(n2.right);
            }
            Collections.sort(a);
            Collections.sort(b);
            if (!a.equals(b)) return false;
        }
        return q1.isEmpty() && q2.isEmpty();
    }
}
```

### JavaScript
```javascript
/*
Structure of binary tree Node
class Node {
    constructor(data) {
        this.data = data;
        this.left = this.right = null;
    }
}
*/
/**
 * @param {Node} root1
 * @param {Node} root2
 * @return {boolean}
 */
class Solution {
    areAnagrams(root1, root2) {
        if (!root1 && !root2) return true;
        if (!root1 || !root2) return false;
        let q1 = [root1], q2 = [root2];
        while (q1.length && q2.length) {
            let sz1 = q1.length, sz2 = q2.length;
            if (sz1 !== sz2) return false;
            let a = [], b = [];
            for (let i = 0; i < sz1; i++) {
                let n1 = q1.shift();
                let n2 = q2.shift();
                a.push(n1.data);
                b.push(n2.data);
                if (n1.left) q1.push(n1.left);
                if (n1.right) q1.push(n1.right);
                if (n2.left) q2.push(n2.left);
                if (n2.right) q2.push(n2.right);
            }
            a.sort((x, y) => x - y);
            b.sort((x, y) => x - y);
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) return false;
            }
        }
        return q1.length === 0 && q2.length === 0;
    }
}
```

### Python3
```python
"""
Structure of binary tree Node
class Node:
    def __init__(self, x: int):
        self.data = x
        self.left = self.right = None
"""
class Solution:
    def areAnagrams(self, root1, root2):
        if not root1 and not root2:
            return True
        if not root1 or not root2:
            return False
        from collections import deque
        q1 = deque([root1])
        q2 = deque([root2])
        while q1 and q2:
            sz1, sz2 = len(q1), len(q2)
            if sz1 != sz2:
                return False
            a, b = [], []
            for _ in range(sz1):
                n1 = q1.popleft()
                n2 = q2.popleft()
                a.append(n1.data)
                b.append(n2.data)
                if n1.left:
                    q1.append(n1.left)
                if n1.right:
                    q1.append(n1.right)
                if n2.left:
                    q2.append(n2.left)
                if n2.right:
                    q2.append(n2.right)
            a.sort()
            b.sort()
            if a != b:
                return False
        return not q1 and not q2
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)
The logic is identical across all four languages; only the syntax for queues, lists, and sorting changes.

I begin by checking the two easy cases. If both roots are null the trees are empty and therefore anagrams of each other. If only one root is null the trees differ in height and structure, so I immediately return false.

Next I create two queues and place the roots inside them. These queues will always hold the nodes belonging to the level I am currently examining.

The main loop continues as long as both queues still have nodes. I first read the size of each queue. This size tells me exactly how many nodes sit on the current level. If the two sizes are different I already know the levels cannot be anagrams, so I return false.

I then allocate two empty lists (or vectors). I loop exactly “size” times. In each iteration I dequeue one node from each queue, record its data value, and enqueue its left and right children (if they exist). After the loop finishes, the two lists contain every value that appears on the current level of the respective trees.

I sort both lists. Sorting removes any dependence on the order of children and turns the anagram check into a simple element-by-element comparison. If the sorted lists differ at any position I return false.

When the while-loop ends I verify that both queues are empty. A non-empty queue means one tree is taller than the other, which violates the “every corresponding level” requirement. Only when both queues are empty and every level comparison succeeded do I return true.

Edge cases such as single-node trees, completely skewed trees, or trees with identical values but different structures are all handled naturally by the size checks and the final emptiness test.

## Examples

**Example 1**  
Input:  
root1 = [1, 3, 2, N, N, 5, 4]  
root2 = [1, 2, 3, 4, 5, N, N]  

Level 0: [1] and [1] → match  
Level 1: [3, 2] and [2, 3] → after sorting both become [2, 3] → match  
Level 2: [5, 4] and [4, 5] → after sorting both become [4, 5] → match  

Output: true

**Example 2**  
Input:  
root1 = [1, 2, 3, 5, 4]  
root2 = [1, 2, 4, 5, 3]  

Level 0: [1] and [1] → match  
Level 1: [2, 3] and [2, 4] → after sorting [2, 3] vs [2, 4] → mismatch  

Output: false

**Example 3** (single-node trees)  
Input:  
root1 = [7]  
root2 = [7]  

Only level 0 exists and the values are identical.  
Output: true

## How to Use / Run Locally
1. Copy the solution of the language you prefer into a file (for example `Solution.cpp`, `Solution.java`, etc.).
2. Make sure the Node class definition is present or included according to the platform you are using.
3. Compile and run:

- C++: `g++ -std=c++17 Solution.cpp -o solution && ./solution`
- Java: `javac Solution.java && java Solution`
- JavaScript: `node Solution.js`
- Python3: `python3 Solution.py`

You can also paste the code directly into an online judge or a local test harness that builds the trees from the given level-order arrays and calls the `areAnagrams` function.

## Notes & Optimizations
- The current solution uses sorting for simplicity and clarity. With node values up to 10^6 an alternative is to use a frequency map (hash map or unordered_map) for each level; that would bring the worst-case time closer to O(n) while still using O(n) extra space.
- Because the expected complexities on most platforms accept O(n log n) for this constraint range, the sorting approach is practical and easy to implement correctly.
- Always remember to handle the case when one tree is taller than the other; the final queue-empty check is essential.
- Null children are never pushed into the queues, which keeps the level sizes accurate.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)