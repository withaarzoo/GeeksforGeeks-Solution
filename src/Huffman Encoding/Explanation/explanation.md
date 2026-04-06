# Huffman Encoding

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given a string `s` of distinct characters and an array `f[]` where `f[i]` represents the frequency of `s[i]`, I need to build a Huffman Tree and return all Huffman codes in preorder traversal order.

The main rule of Huffman Encoding is:

* Characters with smaller frequency should be closer to the root.
* Characters with larger frequency should get shorter binary codes.

If two frequencies are equal, then the node that appeared first should be placed on the left side.

---

## Constraints

```text
1 <= s.size() = f.size() <= 26
```

---

## Intuition

I thought about always taking the two smallest frequencies first.

Because Huffman Encoding is built by repeatedly merging the two minimum frequency nodes, a Min Heap is the perfect data structure.

My plan was:

1. Put all characters into a Min Heap.
2. Remove the two smallest nodes.
3. Combine them into one new node.
4. Push the new node back into the heap.
5. Repeat until only one node remains.

That last remaining node becomes the root of the Huffman Tree.

Then I simply traverse the tree:

* Left move means `0`
* Right move means `1`

Whenever I reach a leaf node, the path becomes the Huffman code.

---

## Approach

1. Create a node structure to store:

   * Frequency
   * Original index
   * Left child
   * Right child

2. Insert all characters into a Min Heap.

3. If two nodes have the same frequency, give higher priority to the node with smaller original index.

4. Keep removing the two smallest nodes.

5. Create a parent node:

   * Parent frequency = left frequency + right frequency
   * Parent index = minimum index of both children

6. Push the parent back into the heap.

7. Repeat until only one node remains.

8. Traverse the tree using DFS:

   * Add `0` while moving left
   * Add `1` while moving right

9. Store the code whenever a leaf node is found.

---

## Data Structures Used

* Min Heap / Priority Queue

  * Used to efficiently get the two smallest frequency nodes.

* Binary Tree

  * Used to build the Huffman Tree.

* Recursion / DFS

  * Used to generate binary codes from root to leaf.

* Array / Vector / List

  * Used to store the final Huffman codes.

---

## Operations & Behavior Summary

| Operation                | Purpose                   |
| ------------------------ | ------------------------- |
| Insert into heap         | Store all character nodes |
| Remove two minimum nodes | Get smallest frequencies  |
| Merge nodes              | Build Huffman Tree        |
| DFS traversal            | Generate Huffman codes    |
| Leaf node check          | Store final code          |

---

## Complexity

* Time Complexity: `O(n log n)`

  * `n` is the number of characters.
  * Each heap insertion and removal takes `O(log n)`.

* Space Complexity: `O(n)`

  * Extra space is used for the heap, recursion stack, and Huffman Tree.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    struct Node {
        int freq;
        int idx;
        Node* left;
        Node* right;

        Node(int f, int i) {
            freq = f;
            idx = i;
            left = right = NULL;
        }
    };

    struct Compare {
        bool operator()(Node* a, Node* b) {
            if (a->freq == b->freq)
                return a->idx > b->idx;

            return a->freq > b->freq;
        }
    };

    void buildCodes(Node* root, string code, vector<string>& ans) {
        if (!root) return;

        if (!root->left && !root->right) {
            ans.push_back(code);
            return;
        }

        buildCodes(root->left, code + "0", ans);
        buildCodes(root->right, code + "1", ans);
    }

    vector<string> huffmanCodes(string &s, vector<int> f) {
        priority_queue<Node*, vector<Node*>, Compare> pq;

        int n = s.size();

        for (int i = 0; i < n; i++) {
            pq.push(new Node(f[i], i));
        }

        if (n == 1) return {"0"};

        while (pq.size() > 1) {
            Node* left = pq.top();
            pq.pop();

            Node* right = pq.top();
            pq.pop();

            Node* parent = new Node(
                left->freq + right->freq,
                min(left->idx, right->idx)
            );

            parent->left = left;
            parent->right = right;

            pq.push(parent);
        }

        vector<string> ans;
        buildCodes(pq.top(), "", ans);

        return ans;
    }
};
```

### Java

```java
class Solution {

    class Node {
        int freq;
        int idx;
        Node left, right;

        Node(int freq, int idx) {
            this.freq = freq;
            this.idx = idx;
        }
    }

    void buildCodes(Node root, String code, ArrayList<String> ans) {
        if (root == null) return;

        if (root.left == null && root.right == null) {
            ans.add(code);
            return;
        }

        buildCodes(root.left, code + "0", ans);
        buildCodes(root.right, code + "1", ans);
    }

    public ArrayList<String> huffmanCodes(String s, int f[]) {
        int n = s.length();

        PriorityQueue<Node> pq = new PriorityQueue<>((a, b) -> {
            if (a.freq == b.freq)
                return a.idx - b.idx;

            return a.freq - b.freq;
        });

        for (int i = 0; i < n; i++) {
            pq.offer(new Node(f[i], i));
        }

        if (n == 1) {
            ArrayList<String> ans = new ArrayList<>();
            ans.add("0");
            return ans;
        }

        while (pq.size() > 1) {
            Node left = pq.poll();
            Node right = pq.poll();

            Node parent = new Node(
                left.freq + right.freq,
                Math.min(left.idx, right.idx)
            );

            parent.left = left;
            parent.right = right;

            pq.offer(parent);
        }

        ArrayList<String> ans = new ArrayList<>();
        buildCodes(pq.peek(), "", ans);

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    huffmanCodes(s, f) {

        class Node {
            constructor(freq, idx) {
                this.freq = freq;
                this.idx = idx;
                this.left = null;
                this.right = null;
            }
        }

        let pq = [];

        for (let i = 0; i < f.length; i++) {
            pq.push(new Node(f[i], i));
        }

        if (f.length === 1) return ["0"];

        const sortHeap = () => {
            pq.sort((a, b) => {
                if (a.freq === b.freq) return a.idx - b.idx;
                return a.freq - b.freq;
            });
        };

        while (pq.length > 1) {
            sortHeap();

            let left = pq.shift();
            let right = pq.shift();

            let parent = new Node(
                left.freq + right.freq,
                Math.min(left.idx, right.idx)
            );

            parent.left = left;
            parent.right = right;

            pq.push(parent);
        }

        let ans = [];

        const buildCodes = (root, code) => {
            if (!root) return;

            if (!root.left && !root.right) {
                ans.push(code);
                return;
            }

            buildCodes(root.left, code + "0");
            buildCodes(root.right, code + "1");
        };

        buildCodes(pq[0], "");

        return ans;
    }
}
```

### Python3

```python
class Solution:
    class Node:
        def __init__(self, freq, idx):
            self.freq = freq
            self.idx = idx
            self.left = None
            self.right = None

        def __lt__(self, other):
            if self.freq == other.freq:
                return self.idx < other.idx
            return self.freq < other.freq

    def buildCodes(self, root, code, ans):
        if not root:
            return

        if root.left is None and root.right is None:
            ans.append(code)
            return

        self.buildCodes(root.left, code + "0", ans)
        self.buildCodes(root.right, code + "1", ans)

    def huffmanCodes(self, s, f):
        import heapq

        heap = []
        n = len(s)

        for i in range(n):
            heapq.heappush(heap, self.Node(f[i], i))

        if n == 1:
            return ["0"]

        while len(heap) > 1:
            left = heapq.heappop(heap)
            right = heapq.heappop(heap)

            parent = self.Node(
                left.freq + right.freq,
                min(left.idx, right.idx)
            )

            parent.left = left
            parent.right = right

            heapq.heappush(heap, parent)

        ans = []
        self.buildCodes(heap[0], "", ans)

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### Step 1: Create a Node

Each node stores:

* Frequency
* Original index
* Left child
* Right child

```cpp
struct Node {
    int freq;
    int idx;
    Node* left;
    Node* right;
};
```

The original index is important because when two frequencies are equal, the earlier node should come first.

### Step 2: Insert All Nodes into Min Heap

```cpp
for (int i = 0; i < n; i++) {
    pq.push(new Node(f[i], i));
}
```

Now every character becomes an independent node.

### Step 3: Remove Two Smallest Nodes

```cpp
Node* left = pq.top();
pq.pop();

Node* right = pq.top();
pq.pop();
```

These two nodes have the smallest frequencies.

### Step 4: Merge Both Nodes

```cpp
Node* parent = new Node(
    left->freq + right->freq,
    min(left->idx, right->idx)
);
```

The new parent stores:

* Sum of both frequencies
* Minimum original index

### Step 5: Connect Parent with Children

```cpp
parent->left = left;
parent->right = right;
```

Left child always gets `0` and right child always gets `1`.

### Step 6: Push Parent Back into Heap

```cpp
pq.push(parent);
```

This process continues until only one node remains.

### Step 7: Generate Huffman Codes Using DFS

```cpp
buildCodes(root->left, code + "0", ans);
buildCodes(root->right, code + "1", ans);
```

Whenever I reach a leaf node, I store the generated code.

```cpp
if (!root->left && !root->right) {
    ans.push_back(code);
}
```

---

## Examples

### Example 1

```text
Input:
s = "abcdef"
f = [5, 9, 12, 13, 16, 45]

Output:
[0, 100, 101, 1100, 1101, 111]
```

Explanation:

```text
f -> 0
c -> 100
d -> 101
a -> 1100
b -> 1101
e -> 111
```

### Example 2

```text
Input:
s = "a"
f = [10]

Output:
["0"]
```

---

## How to use / Run locally

### C++

```bash
g++ solution.cpp -o solution
./solution
```

### Java

```bash
javac Solution.java
java Solution
```

### JavaScript

```bash
node solution.js
```

### Python3

```bash
python solution.py
```

---

## Notes & Optimizations

* A Min Heap is used to efficiently get the two smallest nodes.
* Original index is stored to correctly handle equal frequencies.
* DFS traversal is used to generate Huffman codes.
* If only one character exists, the answer is always `0`.
* Overall solution is optimal with `O(n log n)` time complexity.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
