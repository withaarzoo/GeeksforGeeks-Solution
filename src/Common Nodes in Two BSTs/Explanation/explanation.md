# Common Nodes in Two BSTs - GeeksforGeeks Solution

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

You are given the roots of two Binary Search Trees. Your task is to find every value that appears in both trees. These are the common nodes.

Return all common values in sorted order.

This is a classic Binary Search Tree intersection problem. Because both trees follow BST properties, we can find the common nodes efficiently without checking every pair of nodes.

## Constraints

- Size of each binary tree: 1 ≤ n ≤ 10^5
- Node values: 0 ≤ Node.data ≤ 10^9

These constraints mean a solution that stores both trees fully in arrays may use too much memory on large inputs. We need something lighter.

## Intuition

The first useful observation is that an inorder traversal of a BST always produces values in sorted order.

If I can walk both trees in sorted order at the same time, I can compare the current values just like merging two sorted lists. Whenever the values match, I have found a common node.

Doing the full inorder into two arrays would work, but it costs O(n) extra space. With tree sizes up to 10^5, that is not ideal. Using two stacks to simulate the inorder walks keeps the extra space proportional only to the heights of the trees.

## Approach

I perform a simultaneous iterative inorder traversal on both BSTs using two stacks.

1. Push the entire left path of the first tree onto stack 1.
2. Push the entire left path of the second tree onto stack 2.
3. While both stacks are not empty:
   - Compare the top nodes.
   - If they are equal, record the value, pop both, and push the right subtrees (again taking their left paths).
   - If one is smaller, advance only that tree by popping it and pushing its right subtree’s left path.
4. Continue until one stack becomes empty.

Because each tree is processed in sorted order, the collected common values are already sorted. No extra sorting step is needed.

## Data Structures Used

- Two stacks: Used to simulate the recursive call stack of an inorder traversal. They let us process nodes in sorted order while using only O(height) space.
- Result list / vector: Stores the common values as we find them.

No other heavy data structures are required.

## Operations & Behavior Summary

- Initialize two empty stacks and an empty result list.
- Fill stack 1 with the left spine of the first tree.
- Fill stack 2 with the left spine of the second tree.
- While both stacks still have nodes:
  - Look at the two current top values.
  - Equal → add to result, advance both trees.
  - First smaller → advance only the first tree.
  - Second smaller → advance only the second tree.
- Return the result list when one tree is fully processed.

This is essentially the two-pointer merge technique applied directly on the trees.

## Complexity

| Type              | Complexity   | Explanation                                      |
|-------------------|--------------|--------------------------------------------------|
| Time Complexity   | O(n1 + n2)   | Every node is pushed and popped at most once.    |
| Space Complexity  | O(h1 + h2)   | Only the two stacks are used; size equals height.|

Here n1 and n2 are the number of nodes, and h1 and h2 are the heights of the two trees.

## Multi-language Solutions

### C++
```cpp
/* Structure of a Binary Search Tree node
class Node {
  public:
    int data;
    Node* left;
    Node* right;

    Node(int val) {
        data = val;
        left = right = nullptr;
    }
};
*/

class Solution {
  public:
    vector<int> findCommon(Node* r1, Node* r2) {
        vector<int> res;
        stack<Node*> s1, s2;
        
        while (r1) {
            s1.push(r1);
            r1 = r1->left;
        }
        while (r2) {
            s2.push(r2);
            r2 = r2->left;
        }
        
        while (!s1.empty() && !s2.empty()) {
            Node* a = s1.top();
            Node* b = s2.top();
            
            if (a->data == b->data) {
                res.push_back(a->data);
                s1.pop();
                s2.pop();
                r1 = a->right;
                r2 = b->right;
                while (r1) {
                    s1.push(r1);
                    r1 = r1->left;
                }
                while (r2) {
                    s2.push(r2);
                    r2 = r2->left;
                }
            }
            else if (a->data < b->data) {
                s1.pop();
                r1 = a->right;
                while (r1) {
                    s1.push(r1);
                    r1 = r1->left;
                }
            }
            else {
                s2.pop();
                r2 = b->right;
                while (r2) {
                    s2.push(r2);
                    r2 = r2->left;
                }
            }
        }
        return res;
    }
};
```

### Java
```java
/* Structure of a Binary Search Tree node
class Node {
  public int data;
  public Node left;
  public Node right;

  public Node(int val) {
      data = val;
      left = right = null;
  }
};
*/

class Solution {
    public ArrayList<Integer> findCommon(Node r1, Node r2) {
        ArrayList<Integer> res = new ArrayList<>();
        Stack<Node> s1 = new Stack<>();
        Stack<Node> s2 = new Stack<>();
        
        while (r1 != null) {
            s1.push(r1);
            r1 = r1.left;
        }
        while (r2 != null) {
            s2.push(r2);
            r2 = r2.left;
        }
        
        while (!s1.isEmpty() && !s2.isEmpty()) {
            Node a = s1.peek();
            Node b = s2.peek();
            
            if (a.data == b.data) {
                res.add(a.data);
                s1.pop();
                s2.pop();
                r1 = a.right;
                r2 = b.right;
                while (r1 != null) {
                    s1.push(r1);
                    r1 = r1.left;
                }
                while (r2 != null) {
                    s2.push(r2);
                    r2 = r2.left;
                }
            }
            else if (a.data < b.data) {
                s1.pop();
                r1 = a.right;
                while (r1 != null) {
                    s1.push(r1);
                    r1 = r1.left;
                }
            }
            else {
                s2.pop();
                r2 = b.right;
                while (r2 != null) {
                    s2.push(r2);
                    r2 = r2.left;
                }
            }
        }
        return res;
    }
}
```

### JavaScript
```javascript
/* Structure of a Binary Search Tree node
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
};
*/

/**
 * @param {Node} r1
 * @param {Node} r2
 * @return {Number[]}
 */

class Solution {
    findCommon(r1, r2) {
        let res = [];
        let s1 = [];
        let s2 = [];
        
        while (r1) {
            s1.push(r1);
            r1 = r1.left;
        }
        while (r2) {
            s2.push(r2);
            r2 = r2.left;
        }
        
        while (s1.length && s2.length) {
            let a = s1[s1.length - 1];
            let b = s2[s2.length - 1];
            
            if (a.data === b.data) {
                res.push(a.data);
                s1.pop();
                s2.pop();
                r1 = a.right;
                r2 = b.right;
                while (r1) {
                    s1.push(r1);
                    r1 = r1.left;
                }
                while (r2) {
                    s2.push(r2);
                    r2 = r2.left;
                }
            }
            else if (a.data < b.data) {
                s1.pop();
                r1 = a.right;
                while (r1) {
                    s1.push(r1);
                    r1 = r1.left;
                }
            }
            else {
                s2.pop();
                r2 = b.right;
                while (r2) {
                    s2.push(r2);
                    r2 = r2.left;
                }
            }
        }
        return res;
    }
}
```

### Python3
```python
''' 
Structure of a Binary Search Tree node
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
'''

class Solution:
    def findCommon(self, r1: 'Node', r2: 'Node') -> list[int]:
        res = []
        s1 = []
        s2 = []
        
        while r1:
            s1.append(r1)
            r1 = r1.left
        while r2:
            s2.append(r2)
            r2 = r2.left
        
        while s1 and s2:
            a = s1[-1]
            b = s2[-1]
            
            if a.data == b.data:
                res.append(a.data)
                s1.pop()
                s2.pop()
                r1 = a.right
                r2 = b.right
                while r1:
                    s1.append(r1)
                    r1 = r1.left
                while r2:
                    s2.append(r2)
                    r2 = r2.left
            elif a.data < b.data:
                s1.pop()
                r1 = a.right
                while r1:
                    s1.append(r1)
                    r1 = r1.left
            else:
                s2.pop()
                r2 = b.right
                while r2:
                    s2.append(r2)
                    r2 = r2.left
        return res
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same across all four languages. Only the syntax for stacks and lists changes.

We begin by creating two empty stacks and an empty result container.

The first phase pushes every node on the left path of the first tree into stack 1. After this, the top of stack 1 holds the smallest value in the first tree. The same is done for the second tree.

In the main loop we keep going while both stacks still contain nodes. We look at the two top values without removing them yet.

When the values are equal we have found a common node. We add it to the result, pop both stacks, and then treat the right children of those nodes as the new starting points. We push the full left path of each right child so the next smallest unprocessed value sits on top again.

If the top of the first stack is smaller, that value cannot exist in the second tree at this moment. We discard it by popping stack 1 and advancing into its right subtree.

The opposite happens when the second stack has the smaller value.

The process stops as soon as one stack becomes empty. Any remaining nodes in the other tree cannot be common, so we simply return the list we have built.

Because we always process nodes in increasing order, the result is already sorted. No extra sort call is required.

Edge cases such as empty trees or trees with no common nodes are handled naturally: one of the stacks will be empty at the start or will become empty without any matches.

## Examples

**Example 1**

Input:  
r1 = [5, 1, 10, 0, 4, 7, N, N, N, N, N, N, 9]  
r2 = [10, 7, 20, 4, 9, N, N]

Output: [4, 7, 9, 10]

Trace:  
The simultaneous inorder walk first sees 0 and 4 → advances first tree.  
Then 1 and 4 → advances first tree.  
Then 4 and 4 → match, record 4.  
Continues and later matches 7, 9, and 10.

**Example 2**

Input:  
r1 = [10, 2, 11, 1, 3, N, N]  
r2 = [2, 1, 3]

Output: [1, 2, 3]

Trace:  
Both trees start with left paths leading to 1.  
1 matches.  
Next values are both 2 → match.  
Next values are both 3 → match.  
One tree finishes.

**Example 3**

Input: Two trees with no overlapping values.

Output: []

The algorithm simply exhausts one stack without ever finding equal tops.

## How to Use / Run Locally

**C++**  
1. Copy the C++ solution into a file named `main.cpp`.  
2. Make sure you have a Node class definition available or paste the standard GeeksforGeeks Node structure.  
3. Compile with: `g++ -std=c++17 main.cpp -o main`  
4. Run: `./main`

**Java**  
1. Place the code inside a class file (for example `Solution.java`).  
2. Compile: `javac Solution.java`  
3. Run the driver that creates the trees and calls `findCommon`.

**JavaScript**  
1. Paste the code into a `.js` file.  
2. Run with Node.js: `node solution.js`  
3. You will need a small driver that builds the trees and prints the returned array.

**Python3**  
1. Save the code as `solution.py`.  
2. Run: `python3 solution.py`  
3. Add a few lines at the bottom to construct sample trees and print the result of `findCommon`.

In all languages you still need a small driver that builds the two BSTs from the given level-order arrays and then calls the function.

## Notes & Optimizations

- The solution works correctly even if the trees are skewed (worst-case height O(n)). In that case space becomes O(n), which is unavoidable for a stack-based inorder.
- A recursive approach with two pointers is possible but risks stack-overflow on deep trees. The iterative version is safer under the given constraints.
- If the problem only asked for the count of common nodes instead of the list, we could avoid storing the result and just keep a counter. Here we must return the values.
- An alternative is to insert all values of the first tree into a hash set and then check the second tree. That gives O(n1 + n2) time but O(n1) space, which is worse than the height-based solution when trees are reasonably balanced.

This approach is one of the cleanest ways to find the intersection of two Binary Search Trees while keeping extra memory low.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
