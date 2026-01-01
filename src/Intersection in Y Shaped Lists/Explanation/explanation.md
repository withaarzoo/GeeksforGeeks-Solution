# Intersection in Y Shaped Linked Lists

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
* How to Use / Run Locally
* Notes & Optimizations
* Author

---

## Problem Summary

I am given the heads of two non-empty singly linked lists.
These two linked lists intersect at some point and form a Y-shaped structure.

My task is to find and return the **node where both linked lists intersect**.

Important point:
The intersection is based on **memory reference**, not node value.
The problem guarantees that an intersection node always exists.

---

## Constraints

* Total number of nodes ≤ 2 × 10⁵
* Node values range from -10⁴ to 10⁴
* Both linked lists are non-empty
* Intersection node is guaranteed to exist

---

## Intuition

When I first looked at this problem, I understood that:

* Before the intersection, both lists can have different lengths
* After the intersection point, both lists share the same nodes

So the real challenge is handling the **difference in length**.

Instead of calculating lengths or using extra memory like hashing,
I used a smarter idea where both pointers travel equal total distance.

If both pointers walk through both lists once,
they will definitely meet at the intersection point.

---

## Approach

1. I initialize two pointers:

   * One at head of first list
   * One at head of second list

2. I move both pointers one step at a time.

3. If a pointer reaches the end of its list:

   * I redirect it to the head of the other list

4. I repeat this until both pointers point to the same node.

5. That node is the intersection point, so I return it.

This approach works because both pointers cover the same total path length.

---

## Data Structures Used

* Singly Linked List
* Two pointer technique

No extra data structures are used.

---

## Operations & Behavior Summary

* Traverse both linked lists
* Switch pointer heads after reaching null
* Compare node references, not values
* Stop when both pointers meet

---

## Complexity

**Time Complexity:**
O(n + m)
n = number of nodes in first list
m = number of nodes in second list

Each pointer traverses both lists once.

**Space Complexity:**
O(1)
No extra memory is used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    Node* intersectPoint(Node* head1, Node* head2) {
        Node* p1 = head1;
        Node* p2 = head2;

        while (p1 != p2) {
            p1 = (p1 == NULL) ? head2 : p1->next;
            p2 = (p2 == NULL) ? head1 : p2->next;
        }

        return p1;
    }
};
```

---

### Java

```java
class Solution {
    public Node intersectPoint(Node head1, Node head2) {
        Node p1 = head1;
        Node p2 = head2;

        while (p1 != p2) {
            p1 = (p1 == null) ? head2 : p1.next;
            p2 = (p2 == null) ? head1 : p2.next;
        }

        return p1;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    intersectPoint(head1, head2) {
        let p1 = head1;
        let p2 = head2;

        while (p1 !== p2) {
            p1 = (p1 === null) ? head2 : p1.next;
            p2 = (p2 === null) ? head1 : p2.next;
        }

        return p1;
    }
}
```

---

### Python3

```python
class Solution:
    def intersectPoint(self, head1, head2):
        p1 = head1
        p2 = head2

        while p1 != p2:
            p1 = head2 if p1 is None else p1.next
            p2 = head1 if p2 is None else p2.next

        return p1
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. I start with two pointers, one for each linked list.
2. Both pointers move forward one node at a time.
3. When a pointer reaches the end of its list:

   * I redirect it to the head of the other list.
4. This ensures both pointers travel equal total distance.
5. Eventually, both pointers meet at the intersection node.
6. Since the intersection is guaranteed, the loop always ends.
7. I return the meeting node as the answer.

This same logic applies to all four languages.

---

## Examples

**Example 1**

Input
head1: 10 → 15 → 30
head2: 3 → 6 → 9 → 15 → 30

Output
15

Explanation
Both linked lists merge at node with value 15.

---

**Example 2**

Input
head1: 4 → 1 → 8 → 5
head2: 5 → 6 → 1 → 8 → 5

Output
1

Explanation
Intersection starts from node with value 1.

---

## How to Use / Run Locally

1. Clone the repository
2. Open the file for your preferred language
3. Run the solution inside your IDE or online compiler
4. Provide linked list inputs as per platform format

This solution is compatible with GeeksforGeeks, LeetCode-style problems, and interviews.

---

## Notes & Optimizations

* This is the most optimized solution for this problem
* No extra memory is used
* No need to calculate list lengths
* Very common interview question
* Clean and readable logic

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
