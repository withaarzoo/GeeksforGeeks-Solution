# Predecessor and Successor (BST)

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

Given the root of a Binary Search Tree (BST) and a key, find:

* Inorder Predecessor (largest value smaller than key)
* Inorder Successor (smallest value greater than key)

If either does not exist, return NULL.

---

## Constraints

* 1 ≤ number of nodes ≤ 10^5
* 0 ≤ node->data ≤ 10^6
* 1 ≤ key ≤ 10^6

---

## Intuition

I thought about how BST works:

* Left subtree contains smaller values
* Right subtree contains greater values

So instead of traversing the entire tree, I can use BST properties to efficiently find predecessor and successor in one pass.

---

## Approach

1. Initialize two pointers:

   * predecessor = NULL
   * successor = NULL

2. Traverse the BST:

   * If current node < key:

     * Update predecessor
     * Move right
   * If current node > key:

     * Update successor
     * Move left
   * If current node == key:

     * Find max in left subtree (predecessor)
     * Find min in right subtree (successor)

3. Return both values

---

## Data Structures Used

* Binary Search Tree (BST)
* No additional data structures (O(1) space)

---

## Operations & Behavior Summary

* Move left → smaller values
* Move right → larger values
* Track closest smaller and greater values dynamically

---

## Complexity

* Time Complexity: O(h)

  * h = height of BST
* Space Complexity: O(1)

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<Node*> findPreSuc(Node* root, int key) {
        Node* pre = NULL;
        Node* suc = NULL;

        while (root) {
            if (root->data < key) {
                pre = root;
                root = root->right;
            }
            else if (root->data > key) {
                suc = root;
                root = root->left;
            }
            else {
                Node* temp = root->left;
                while (temp) {
                    pre = temp;
                    temp = temp->right;
                }

                temp = root->right;
                while (temp) {
                    suc = temp;
                    temp = temp->left;
                }
                break;
            }
        }

        return {pre, suc};
    }
};
```

### Java

```java
class Solution {
    public ArrayList<Node> findPreSuc(Node root, int key) {
        Node pre = null, suc = null;

        while (root != null) {
            if (root.data < key) {
                pre = root;
                root = root.right;
            } else if (root.data > key) {
                suc = root;
                root = root.left;
            } else {
                Node temp = root.left;
                while (temp != null) {
                    pre = temp;
                    temp = temp.right;
                }

                temp = root.right;
                while (temp != null) {
                    suc = temp;
                    temp = temp.left;
                }
                break;
            }
        }

        ArrayList<Node> res = new ArrayList<>();
        res.add(pre);
        res.add(suc);
        return res;
    }
}
```

### JavaScript

```javascript
class Solution {
    findPreSuc(root, key) {
        let pre = null, suc = null;

        while (root) {
            if (root.data < key) {
                pre = root;
                root = root.right;
            } else if (root.data > key) {
                suc = root;
                root = root.left;
            } else {
                let temp = root.left;
                while (temp) {
                    pre = temp;
                    temp = temp.right;
                }

                temp = root.right;
                while (temp) {
                    suc = temp;
                    temp = temp.left;
                }
                break;
            }
        }

        return [pre, suc];
    }
}
```

### Python3

```python
class Solution:
    def findPreSuc(self, root, key):
        pre = None
        suc = None

        while root:
            if root.data < key:
                pre = root
                root = root.right
            elif root.data > key:
                suc = root
                root = root.left
            else:
                temp = root.left
                while temp:
                    pre = temp
                    temp = temp.right

                temp = root.right
                while temp:
                    suc = temp
                    temp = temp.left
                break

        return [pre, suc]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Start at root node.
2. Compare node value with key.
3. If node < key:

   * Store as predecessor.
   * Move to right subtree.
4. If node > key:

   * Store as successor.
   * Move to left subtree.
5. If node == key:

   * Go to left subtree → find maximum value.
   * Go to right subtree → find minimum value.
6. Return predecessor and successor.

---

## Examples

Input: root = [50,30,70,20,40,60,80], key = 65
Output: [60,70]

Input: root = [8,1,9,N,4,N,10,3], key = 8
Output: [4,9]

---

## How to use / Run locally

1. Copy code into your preferred language file.
2. Create BST structure.
3. Call function with root and key.
4. Print predecessor and successor.

---

## Notes & Optimizations

* Uses BST property for efficient search.
* Avoids full traversal.
* Works best with balanced BST.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
