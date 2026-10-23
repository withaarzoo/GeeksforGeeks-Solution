# Count Pairs Violating BST Property - GeeksforGeeks Solution

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

You are given a binary tree. Your task is to count how many pairs of nodes violate the Binary Search Tree (BST) property.

In a valid BST:
- Every value in the left subtree of a node must be strictly smaller than the node.
- Every value in the right subtree must be strictly greater than the node.

The problem asks you to count every pair of nodes that break these rules anywhere in the tree.

Input is the root of the binary tree.  
Output is a single integer — the total number of violating pairs.

This is a classic problem that combines tree traversal with the well-known inversion-count technique using merge sort.

## Constraints

- 1 ≤ size of binary tree ≤ 5 × 10⁴
- 1 ≤ node.data ≤ 10⁹

These limits mean an O(n²) solution will time out. We need an O(n log n) approach.

## Intuition

A binary tree is a BST if and only if its inorder traversal produces a strictly increasing sequence.

So any place where a larger value appears before a smaller value in the inorder list is exactly a pair that violates the BST property.

Counting such pairs is the same as counting inversions in an array.  
And the fastest practical way to count inversions is a modified merge-sort that keeps track of how many times a left-half value is greater than a right-half value while merging.

That single observation turns a hard tree problem into a standard inversion-count problem.

## Approach

1. Perform a normal inorder traversal and collect every node value into a list (or array).
2. Run a merge-sort based inversion counter on that list.
3. While merging two sorted halves, whenever the current left value is strictly greater than the current right value, add the number of remaining elements in the left half to the answer.
4. Return the total inversion count.

This gives the exact number of pairs that break the BST order.

## Data Structures Used

- Vector / ArrayList / List — to store the inorder sequence of node values.
- Temporary array (or list) — used only during the merge step of merge sort.
- Recursion stack — for both the inorder walk and the merge-sort calls. Depth is O(log n) on average and O(n) in the worst case for a skewed tree.

No extra heavy structures are needed.

## Operations & Behavior Summary

- Walk the tree left → root → right and push every value into a flat list.
- Split the list into two halves recursively.
- Count inversions inside the left half.
- Count inversions inside the right half.
- While merging the two already-sorted halves, count the cross inversions (pairs where a value from the left half is greater than a value from the right half).
- Add all three counts together and return the total.

That total is the number of pairs violating the BST property.

## Complexity

| Type              | Complexity   | Explanation                                      |
|-------------------|--------------|--------------------------------------------------|
| Time Complexity   | O(n log n)   | Inorder traversal is O(n). Merge-sort inversion count is the classic O(n log n). |
| Space Complexity  | O(n)         | We store the inorder values and need temporary space while merging. |

## Multi-language Solutions

### C++
```cpp
/* BST Node Structure
class Node {
public:
    int data;
    Node *left;
    Node *right;
    Node(int val) {
        data = val;
        left = right = nullptr;
    }
};
*/
class Solution {
  public:
    void inorder(Node* root, vector<int>& vals) {
        if (!root) return;
        inorder(root->left, vals);
        vals.push_back(root->data);
        inorder(root->right, vals);
    }
    
    long long merge(vector<int>& arr, int low, int mid, int high) {
        vector<int> temp;
        int i = low, j = mid + 1;
        long long inv = 0;
        while (i <= mid && j <= high) {
            if (arr[i] <= arr[j]) {
                temp.push_back(arr[i++]);
            } else {
                inv += (mid - i + 1);
                temp.push_back(arr[j++]);
            }
        }
        while (i <= mid) temp.push_back(arr[i++]);
        while (j <= high) temp.push_back(arr[j++]);
        for (int k = low; k <= high; k++) arr[k] = temp[k - low];
        return inv;
    }
    
    long long mergeSort(vector<int>& arr, int low, int high) {
        long long inv = 0;
        if (low < high) {
            int mid = low + (high - low) / 2;
            inv += mergeSort(arr, low, mid);
            inv += mergeSort(arr, mid + 1, high);
            inv += merge(arr, low, mid, high);
        }
        return inv;
    }
    
    int pairsViolatingBST(Node *root) {
        vector<int> vals;
        inorder(root, vals);
        return (int)mergeSort(vals, 0, (int)vals.size() - 1);
    }
};
```

### Java
```java
/* BST Node Structure
class Node {
    int data;
    Node left, right;
    Node(int val) {
        data = val;
        left = right = null;
    }
}
*/
class Solution {
    void inorder(Node root, ArrayList<Integer> vals) {
        if (root == null) return;
        inorder(root.left, vals);
        vals.add(root.data);
        inorder(root.right, vals);
    }
    
    long merge(int[] arr, int low, int mid, int high) {
        int[] temp = new int[high - low + 1];
        int i = low, j = mid + 1, k = 0;
        long inv = 0;
        while (i <= mid && j <= high) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                inv += (mid - i + 1);
                temp[k++] = arr[j++];
            }
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= high) temp[k++] = arr[j++];
        for (int p = 0; p < temp.length; p++) arr[low + p] = temp[p];
        return inv;
    }
    
    long mergeSort(int[] arr, int low, int high) {
        long inv = 0;
        if (low < high) {
            int mid = low + (high - low) / 2;
            inv += mergeSort(arr, low, mid);
            inv += mergeSort(arr, mid + 1, high);
            inv += merge(arr, low, mid, high);
        }
        return inv;
    }
    
    public int pairsViolatingBST(Node root) {
        ArrayList<Integer> vals = new ArrayList<>();
        inorder(root, vals);
        int n = vals.size();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = vals.get(i);
        return (int)mergeSort(arr, 0, n - 1);
    }
}
```

### JavaScript
```javascript
/* BST Node Structure
class Node {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
} */
/**
 * @param {Node} root
 * @returns {number}
 */
class Solution {
    inorder(root, vals) {
        if (!root) return;
        this.inorder(root.left, vals);
        vals.push(root.data);
        this.inorder(root.right, vals);
    }
    
    merge(arr, low, mid, high) {
        let temp = [];
        let i = low, j = mid + 1;
        let inv = 0;
        while (i <= mid && j <= high) {
            if (arr[i] <= arr[j]) {
                temp.push(arr[i++]);
            } else {
                inv += (mid - i + 1);
                temp.push(arr[j++]);
            }
        }
        while (i <= mid) temp.push(arr[i++]);
        while (j <= high) temp.push(arr[j++]);
        for (let k = low; k <= high; k++) arr[k] = temp[k - low];
        return inv;
    }
    
    mergeSort(arr, low, high) {
        let inv = 0;
        if (low < high) {
            let mid = low + Math.floor((high - low) / 2);
            inv += this.mergeSort(arr, low, mid);
            inv += this.mergeSort(arr, mid + 1, high);
            inv += this.merge(arr, low, mid, high);
        }
        return inv;
    }
    
    pairsViolatingBST(root) {
        let vals = [];
        this.inorder(root, vals);
        return this.mergeSort(vals, 0, vals.length - 1);
    }
}
```

### Python3
```python
''' BST Node Structure
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
'''
class Solution:
    def inorder(self, root, vals):
        if not root:
            return
        self.inorder(root.left, vals)
        vals.append(root.data)
        self.inorder(root.right, vals)
    
    def merge(self, arr, low, mid, high):
        temp = []
        i, j = low, mid + 1
        inv = 0
        while i <= mid and j <= high:
            if arr[i] <= arr[j]:
                temp.append(arr[i])
                i += 1
            else:
                inv += (mid - i + 1)
                temp.append(arr[j])
                j += 1
        while i <= mid:
            temp.append(arr[i])
            i += 1
        while j <= high:
            temp.append(arr[j])
            j += 1
        for k in range(low, high + 1):
            arr[k] = temp[k - low]
        return inv
    
    def mergeSort(self, arr, low, high):
        inv = 0
        if low < high:
            mid = low + (high - low) // 2
            inv += self.mergeSort(arr, low, mid)
            inv += self.mergeSort(arr, mid + 1, high)
            inv += self.merge(arr, low, mid, high)
        return inv
    
    def pairsViolatingBST(self, root):
        vals = []
        self.inorder(root, vals)
        return self.mergeSort(vals, 0, len(vals) - 1)
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages. Only the syntax changes.

First we collect the inorder sequence.  
This is a simple recursive walk: go left, record the current node’s value, go right.  
After this step we have a plain list of numbers that would be sorted if the tree were a valid BST.

Next comes the inversion-counting merge sort.  
We recursively sort the left half and the right half while accumulating the inversions found inside each half.  
Then we merge the two sorted halves.  

During the merge:
- If the current left value is smaller than or equal to the current right value, we simply take the left value (no inversion).
- If the current left value is strictly larger, then every remaining element from the left pointer to the middle also forms an inversion with the current right value. We add that count and take the right value.

Because we only count when the left value is strictly greater, equal values are treated correctly according to the problem’s strict BST definition.

Edge cases are handled naturally:
- Empty tree or single node → zero inversions.
- Completely skewed tree → still works, just uses more stack space.
- Duplicate values → not counted as inversions, which matches the expected output on the official test cases.

The final returned number is exactly the count of pairs that violate the BST property.

## Examples

**Example 1**  
Input: root = [10, 50, 40, N, N, 20, 30]  

Inorder sequence: 50, 10, 20, 40, 30  

Inversions:  
(50,10), (50,20), (50,40), (50,30), (40,30)  

Output: 5

**Example 2**  
Input: root = [80, 40, 30, 70, N, 60, 70]  

Inorder sequence: 70, 40, 80, 60, 30, 70  

Strict inversions (a[i] > a[j]): 8  

(The official sample explanation sometimes lists 9 including an equal pair, but the judge counts only strict greater pairs.)

**Example 3**  
Input: root = [4, 1, N, 4]  

Inorder: 4, 1, 4  

Only one strict inversion (4 > 1).  
Output: 1

## How to Use / Run Locally

1. Copy the solution for your preferred language into a file (for example `solution.cpp`, `Solution.java`, etc.).
2. Make sure the Node class definition is present (it is usually provided by the platform, but you can add a minimal one for local testing).
3. Compile and run:

**C++**
```bash
g++ -std=c++17 solution.cpp -o solution
./solution
```

**Java**
```bash
javac Solution.java
java Solution
```

**JavaScript** (Node.js)
```bash
node solution.js
```

**Python3**
```bash
python3 solution.py
```

You will need to write a small driver that builds the tree from the given array representation and calls the function. Most online judges already handle the tree construction for you.

## Notes & Optimizations

- The solution is already optimal for the given constraints.  
- If the tree is guaranteed to be balanced you could explore Fenwick-tree or Segment-tree based inversion counting, but merge sort is simpler and performs just as well.  
- Watch out for integer overflow when counting inversions — use a 64-bit integer (long long / long) and cast to int only at the end if the platform requires it.  
- The recursion depth can reach O(n) on a skewed tree. In languages with limited stack size this is rarely a problem for n ≤ 5×10⁴, but iterative inorder + bottom-up merge sort is a possible alternative if you ever hit stack limits.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
