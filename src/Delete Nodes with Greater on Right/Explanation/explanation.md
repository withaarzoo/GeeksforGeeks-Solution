# Delete Nodes with Greater on Right

A complete solution and explanation for the GeeksforGeeks Linked List problem **Delete Nodes with Greater on Right** using an optimized in-place approach.

This repository contains clean implementations in multiple programming languages along with a detailed explanation, complexity analysis, examples, and implementation notes.

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

## Problem Summary

Given a singly linked list, the task is to delete every node that has a node with a greater value somewhere on its right side.

Only the nodes that are greater than or equal to all elements appearing after them should remain in the final linked list.

### Example

Input:

```text
12 -> 15 -> 10 -> 11 -> 5 -> 6 -> 2 -> 3
```

Output:

```text
15 -> 11 -> 6 -> 3
```

In this example:

* 12 is removed because 15 exists on its right.
* 10 is removed because 11 exists on its right.
* 5 is removed because 6 exists on its right.
* 2 is removed because 3 exists on its right.

The final linked list contains only valid nodes.

This is a classic linked list problem frequently asked in coding interviews and competitive programming contests.

## Constraints

| Constraint          | Value           |
| ------------------- | --------------- |
| Size of linked list | 1 ≤ N ≤ 10⁶     |
| Node value          | 1 ≤ Value ≤ 10⁶ |

## Intuition

My first thought was to compare every node with all nodes present on its right side.

That would work, but it would be far too slow for large linked lists.

Then I noticed something interesting.

If I reverse the linked list, all nodes that were originally on the right side become nodes on the left side.

Now instead of looking ahead, I only need to keep track of the maximum value seen so far while traversing the reversed list.

Any node smaller than this maximum must be removed because it originally had a greater value on its right.

After processing the list, I simply reverse it again to restore the original order.

This gives an efficient O(N) solution without using extra memory.

## Approach

1. Reverse the linked list.
2. Initialize a variable to store the maximum value seen so far.
3. Traverse the reversed linked list.
4. If the next node is smaller than the current maximum, remove it.
5. Otherwise, update the maximum value.
6. Continue until the end of the list.
7. Reverse the linked list again.
8. Return the new head.

This approach avoids nested loops and works efficiently even for very large inputs.

## Data Structures Used

### Singly Linked List

The entire problem is based on a singly linked list.

It allows:

* Sequential traversal
* Constant-time node deletion when the previous node is known
* In-place reversal without extra memory

### Pointer References

A few pointer variables are used during:

* Linked list reversal
* Traversal
* Node deletion

No additional arrays, stacks, queues, or hash maps are required.

## Operations & Behavior Summary

The algorithm performs the following major operations:

### Reverse the Linked List

Convert:

```text
12 -> 15 -> 10 -> 11 -> 5 -> 6 -> 2 -> 3
```

into:

```text
3 -> 2 -> 6 -> 5 -> 11 -> 10 -> 15 -> 12
```

### Track Maximum Value

Maintain the largest value encountered so far while traversing.

### Remove Invalid Nodes

If a node is smaller than the maximum already seen:

```text
Current Maximum = 11
Node Value = 10
```

Remove that node.

### Restore Original Order

Reverse the remaining nodes again.

Final result:

```text
15 -> 11 -> 6 -> 3
```

## Complexity

| Metric           | Complexity | Explanation                                                         |
| ---------------- | ---------- | ------------------------------------------------------------------- |
| Time Complexity  | O(N)       | The linked list is reversed twice and traversed once                |
| Space Complexity | O(1)       | Only a few pointers are used; no extra data structures are required |

Where:

* N = number of nodes in the linked list

## Multi-language Solutions

### C++

```cpp
/* Structure of a Linked List node
class Node {
  public:
    int data;
    Node* next;

    Node(int x) {
        data = x;
        next = nullptr;
    }
};
*/
class Solution {
  public:
    
    // Reverse the linked list and return new head
    Node* reverseList(Node* head) {
        Node* prev = nullptr;
        Node* curr = head;

        while (curr) {
            Node* nextNode = curr->next; // store next node
            curr->next = prev;           // reverse current link
            prev = curr;                 // move prev forward
            curr = nextNode;             // move curr forward
        }

        return prev; // new head
    }

    Node *compute(Node *head) {
        
        // Reverse list so that right-side nodes become left-side nodes
        head = reverseList(head);

        int maxSoFar = head->data;
        Node* curr = head;

        while (curr && curr->next) {

            // Remove node if it is smaller than max seen so far
            if (curr->next->data < maxSoFar) {
                curr->next = curr->next->next;
            }
            else {
                curr = curr->next;
                maxSoFar = curr->data;
            }
        }

        // Restore original order
        return reverseList(head);
    }
};
```

### Java

```java
/* Structure of linked list node
class Node {

    int data;
    Node next;

    Node(int d) {
        data = d;
        next = null;
    }
}
*/
class Solution {
    
    // Reverse linked list
    Node reverseList(Node head) {
        Node prev = null;
        Node curr = head;

        while (curr != null) {
            Node nextNode = curr.next; // store next node
            curr.next = prev;          // reverse link
            prev = curr;               // move prev
            curr = nextNode;           // move curr
        }

        return prev;
    }

    Node compute(Node head) {

        // Reverse list first
        head = reverseList(head);

        int maxSoFar = head.data;
        Node curr = head;

        while (curr != null && curr.next != null) {

            // Delete smaller node
            if (curr.next.data < maxSoFar) {
                curr.next = curr.next.next;
            } else {
                curr = curr.next;
                maxSoFar = curr.data;
            }
        }

        // Reverse back to original order
        return reverseList(head);
    }
}
```

### JavaScript

```javascript
/* Structure of linked list node
class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}
*/

class Solution {
    
    // Reverse linked list
    reverseList(head) {
        let prev = null;
        let curr = head;

        while (curr) {
            let nextNode = curr.next; // save next node
            curr.next = prev;         // reverse link
            prev = curr;              // move prev
            curr = nextNode;          // move curr
        }

        return prev;
    }

    compute(head) {

        // Reverse the list
        head = this.reverseList(head);

        let maxSoFar = head.data;
        let curr = head;

        while (curr && curr.next) {

            // Remove node if smaller than maxSoFar
            if (curr.next.data < maxSoFar) {
                curr.next = curr.next.next;
            } else {
                curr = curr.next;
                maxSoFar = curr.data;
            }
        }

        // Restore original order
        return this.reverseList(head);
    }
}
```

### Python3

```python
'''
Structure of linked list node
class Node:
    def __init__(self,x):
        self.data=x
        self.next=None

'''
class Solution:
    
    # Reverse linked list and return new head
    def reverseList(self, head):
        prev = None
        curr = head

        while curr:
            next_node = curr.next   # store next node
            curr.next = prev        # reverse link
            prev = curr             # move prev
            curr = next_node        # move curr

        return prev

    def compute(self, head):

        # Reverse the linked list
        head = self.reverseList(head)

        max_so_far = head.data
        curr = head

        while curr and curr.next:

            # Delete node if it is smaller than maximum seen so far
            if curr.next.data < max_so_far:
                curr.next = curr.next.next
            else:
                curr = curr.next
                max_so_far = curr.data

        # Reverse again to restore original order
        return self.reverseList(head)
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all programming languages.

### Step 1: Reverse the Linked List

The first operation is reversing the linked list.

This transforms the problem from:

"Find a greater node on the right"

to

"Find a greater node already seen."

That makes processing much easier.

### Step 2: Store the Maximum Value

After reversal, the first node automatically becomes the current maximum.

Every upcoming node will be compared against this value.

### Step 3: Traverse the List

Move through the reversed linked list one node at a time.

At every step:

* Compare the next node with the current maximum.
* Decide whether to keep or delete it.

### Step 4: Delete Smaller Nodes

Whenever a node contains a value smaller than the maximum already encountered:

* It cannot survive.
* A greater node existed on its right in the original list.

Therefore it is removed.

### Step 5: Update Maximum

If a node is greater than or equal to the current maximum:

* Keep the node.
* Update the maximum value.

This ensures future comparisons remain correct.

### Step 6: Reverse Again

Once all invalid nodes are removed:

* Reverse the list again.
* Restore the original order.

The remaining nodes form the final answer.

### Why This Works

In the reversed list:

* Every processed node originally appeared to the right.
* The running maximum represents the greatest value available on that side.

Therefore any smaller node must be deleted.

This observation guarantees correctness while keeping both time and space usage optimal.

## Examples

### Example 1

Input:

```text
12 -> 15 -> 10 -> 11 -> 5 -> 6 -> 2 -> 3
```

Output:

```text
15 -> 11 -> 6 -> 3
```

Trace:

* Remove 12
* Remove 10
* Remove 5
* Remove 2

Remaining:

```text
15 -> 11 -> 6 -> 3
```

---

### Example 2

Input:

```text
10 -> 20 -> 30 -> 40 -> 50 -> 60
```

Output:

```text
60
```

Trace:

Every node except the last one has a greater value on its right.

Only:

```text
60
```

remains.

---

### Example 3

Input:

```text
60 -> 50 -> 40 -> 30
```

Output:

```text
60 -> 50 -> 40 -> 30
```

Trace:

No node has a greater value on its right.

Nothing is removed.

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

### Java

Compile:

```bash
javac Main.java
```

Run:

```bash
java Main
```

### JavaScript

Run:

```bash
node main.js
```

### Python3

Run:

```bash
python main.py
```

or

```bash
python3 main.py
```

## Notes & Optimizations

### Important Edge Cases

1. Single-node linked list
2. All nodes increasing
3. All nodes decreasing
4. Duplicate values
5. Very large linked lists

### Why Not Use Nested Loops?

A brute-force approach compares every node with all nodes on its right.

Complexity:

```text
O(N²)
```

This becomes too slow when N is large.

### Why Reverse the List?

Reversal converts a difficult right-side comparison problem into a simple left-side traversal problem.

This enables:

* Linear time complexity
* Constant extra space
* Cleaner implementation

### Alternative Approaches

Possible alternatives include:

* Recursion
* Stack-based solutions

However, both typically require additional memory.

The reverse-and-process method is usually considered the most efficient solution.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
