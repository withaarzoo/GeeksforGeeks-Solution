# Flattening a Linked List

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

I am given a special linked list where each node has two pointers:

* `next` points to the next node in the main list
* `bottom` points to a sub-linked list

Both the main list and all bottom sub-lists are already sorted in ascending order.

My task is to **flatten this structure into a single sorted linked list** using only the `bottom` pointer.
The final list should also remain sorted.

---

## Constraints

* 0 ≤ number of head nodes ≤ 100
* 1 ≤ number of nodes in each bottom list ≤ 50
* 1 ≤ node data ≤ 10⁴

---

## Intuition

When I first understood the structure, I noticed something important.

Each vertical list is already sorted, and even the head nodes are sorted.
So I thought:

This problem is very similar to **merging multiple sorted linked lists**.

If I can merge two sorted bottom-linked lists correctly, then I can keep merging them one by one and finally get one fully sorted list.

So my main idea was:
Flatten the list from right to left and merge each list with the already flattened part.

---

## Approach

This is how I solved the problem step by step:

1. If the list is empty or has only one head node, it is already flat.
2. I recursively flatten the list on the right side using the `next` pointer.
3. After flattening the right list, I merge it with the current list.
4. I use a helper function to merge two sorted bottom-linked lists.
5. During merging, I only use the `bottom` pointer.
6. I set all `next` pointers to null because the final list should use only `bottom`.

---

## Data Structures Used

* Linked List
* Recursion (call stack)

No extra arrays, heaps, or maps are used.

---

## Operations & Behavior Summary

* Traverse the main list using recursion
* Merge two sorted linked lists using bottom pointers
* Maintain ascending order
* Remove usage of next pointer in final output
* Return a single flattened sorted list

---

## Complexity

**Time Complexity:**
O(N × M)
Where N is the number of head nodes and M is the average size of each bottom list.

**Space Complexity:**
O(N)
Used only for recursion stack. No extra data structures are used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    Node* merge(Node* a, Node* b) {
        if (!a) return b;
        if (!b) return a;

        Node* result;
        if (a->data < b->data) {
            result = a;
            result->bottom = merge(a->bottom, b);
        } else {
            result = b;
            result->bottom = merge(a, b->bottom);
        }
        result->next = NULL;
        return result;
    }

    Node* flatten(Node* root) {
        if (!root || !root->next)
            return root;

        root->next = flatten(root->next);
        root = merge(root, root->next);

        return root;
    }
};
```

---

### Java

```java
class Solution {

    Node merge(Node a, Node b) {
        if (a == null) return b;
        if (b == null) return a;

        Node result;
        if (a.data < b.data) {
            result = a;
            result.bottom = merge(a.bottom, b);
        } else {
            result = b;
            result.bottom = merge(a, b.bottom);
        }
        result.next = null;
        return result;
    }

    public Node flatten(Node root) {
        if (root == null || root.next == null)
            return root;

        root.next = flatten(root.next);
        root = merge(root, root.next);

        return root;
    }
}
```

---

### JavaScript

```javascript
class Solution {

    merge(a, b) {
        if (!a) return b;
        if (!b) return a;

        let result;
        if (a.data < b.data) {
            result = a;
            result.bottom = this.merge(a.bottom, b);
        } else {
            result = b;
            result.bottom = this.merge(a, b.bottom);
        }
        result.next = null;
        return result;
    }

    flatten(root) {
        if (!root || !root.next) return root;

        root.next = this.flatten(root.next);
        root = this.merge(root, root.next);

        return root;
    }
}
```

---

### Python3

```python
class Solution:
    def merge(self, a, b):
        if not a:
            return b
        if not b:
            return a

        if a.data < b.data:
            result = a
            result.bottom = self.merge(a.bottom, b)
        else:
            result = b
            result.bottom = self.merge(a, b.bottom)

        result.next = None
        return result

    def flatten(self, root):
        if not root or not root.next:
            return root

        root.next = self.flatten(root.next)
        root = self.merge(root, root.next)

        return root
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. I start flattening from the rightmost list.
2. Each recursive call returns a flattened list.
3. I merge the current list with the flattened right list.
4. I always pick the smaller node first.
5. I move forward using the bottom pointer.
6. I set next pointer to null to clean the structure.
7. This process repeats until the full list becomes one sorted list.

---

## Examples

**Input Structure:**

5 → 10 → 19 → 28
↓     ↓     ↓     ↓
7     20    22    40
↓           ↓      ↓
8           50     45

**Output:**

5 → 7 → 8 → 10 → 19 → 20 → 22 → 28 → 40 → 45

---

## How to use / Run locally

1. Copy the code for your preferred language.
2. Make sure the Node class structure matches the problem.
3. Call the `flatten()` function with the head node.
4. Traverse the result using the bottom pointer to print output.

---

## Notes & Optimizations

* This solution does not use extra memory like arrays or heaps.
* Recursion keeps the code clean and readable.
* Time complexity is optimal for linked list merging.
* Using a min heap is possible but not needed here.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
