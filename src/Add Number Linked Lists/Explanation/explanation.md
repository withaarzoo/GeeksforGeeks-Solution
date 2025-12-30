# Add Number Linked Lists

---

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

I am given two singly linked lists.
Each linked list represents a **non-negative integer**, where each node stores **one digit**.

* Digits are stored from **left to right**
* I need to return a **new linked list** representing the **sum** of both numbers
* The output list should **not contain leading zeros**

---

## Constraints

* `1 ≤ number of nodes in head1, head2 ≤ 10^5`
* `0 ≤ node.data ≤ 9`
* Input lists may have leading zeros
* Output list must not have leading zeros

---

## Intuition

When I first saw the problem, I realized that:

* The digits are stored from **most significant to least significant**
* But addition is easiest from **right to left**

So I thought:

* If I **reverse both linked lists**, I can add digits just like normal math
* I can manage **carry** while adding
* After addition, I will **reverse the result again**

This avoids converting the list into a number and works efficiently even for large inputs.

---

## Approach

1. Reverse both linked lists
2. Initialize carry as `0`
3. Add digits node by node
4. Create a new node for `(sum % 10)`
5. Update carry as `(sum / 10)`
6. Continue until both lists and carry are finished
7. Reverse the result list
8. Remove leading zeros if any

---

## Data Structures Used

* Singly Linked List
* Pointers only (no extra arrays or stacks)

---

## Operations & Behavior Summary

* Reversal helps align digits for correct addition
* Carry is handled during addition
* Dummy node simplifies list creation
* Final reverse restores correct digit order
* Leading zeros are removed safely

---

## Complexity

* **Time Complexity:** `O(n + m)`
  where `n` and `m` are the lengths of the two linked lists

* **Space Complexity:** `O(1)`
  No extra data structures used (only pointers)

---

## Multi-language Solutions

---

### C++

```cpp
class Solution {
public:
    Node* reverse(Node* head) {
        Node* prev = NULL;
        while (head) {
            Node* nextNode = head->next;
            head->next = prev;
            prev = head;
            head = nextNode;
        }
        return prev;
    }

    Node* addTwoLists(Node* head1, Node* head2) {
        head1 = reverse(head1);
        head2 = reverse(head2);

        Node* dummy = new Node(0);
        Node* curr = dummy;
        int carry = 0;

        while (head1 || head2 || carry) {
            int sum = carry;
            if (head1) sum += head1->data, head1 = head1->next;
            if (head2) sum += head2->data, head2 = head2->next;

            carry = sum / 10;
            curr->next = new Node(sum % 10);
            curr = curr->next;
        }

        Node* result = reverse(dummy->next);
        while (result && result->data == 0 && result->next)
            result = result->next;

        return result;
    }
};
```

---

### Java

```java
class Solution {
    private Node reverse(Node head) {
        Node prev = null;
        while (head != null) {
            Node next = head.next;
            head.next = prev;
            prev = head;
            head = next;
        }
        return prev;
    }

    public Node addTwoLists(Node head1, Node head2) {
        head1 = reverse(head1);
        head2 = reverse(head2);

        Node dummy = new Node(0);
        Node curr = dummy;
        int carry = 0;

        while (head1 != null || head2 != null || carry != 0) {
            int sum = carry;
            if (head1 != null) sum += head1.data, head1 = head1.next;
            if (head2 != null) sum += head2.data, head2 = head2.next;

            carry = sum / 10;
            curr.next = new Node(sum % 10);
            curr = curr.next;
        }

        Node result = reverse(dummy.next);
        while (result.data == 0 && result.next != null)
            result = result.next;

        return result;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    reverse(head) {
        let prev = null;
        while (head) {
            let next = head.next;
            head.next = prev;
            prev = head;
            head = next;
        }
        return prev;
    }

    addTwoLists(head1, head2) {
        head1 = this.reverse(head1);
        head2 = this.reverse(head2);

        let dummy = new Node(0);
        let curr = dummy;
        let carry = 0;

        while (head1 || head2 || carry) {
            let sum = carry;
            if (head1) sum += head1.data, head1 = head1.next;
            if (head2) sum += head2.data, head2 = head2.next;

            carry = Math.floor(sum / 10);
            curr.next = new Node(sum % 10);
            curr = curr.next;
        }

        let result = this.reverse(dummy.next);
        while (result.data === 0 && result.next)
            result = result.next;

        return result;
    }
}
```

---

### Python3

```python
class Solution:
    def reverse(self, head):
        prev = None
        while head:
            nxt = head.next
            head.next = prev
            prev = head
            head = nxt
        return prev

    def addTwoLists(self, head1, head2):
        head1 = self.reverse(head1)
        head2 = self.reverse(head2)

        dummy = Node(0)
        curr = dummy
        carry = 0

        while head1 or head2 or carry:
            total = carry
            if head1:
                total += head1.data
                head1 = head1.next
            if head2:
                total += head2.data
                head2 = head2.next

            carry = total // 10
            curr.next = Node(total % 10)
            curr = curr.next

        result = self.reverse(dummy.next)
        while result.data == 0 and result.next:
            result = result.next

        return result
```

---

## Step-by-step Detailed Explanation (All Languages)

1. Reverse both linked lists to start addition from units place
2. Use a dummy node to simplify result creation
3. Add digits and carry in a loop
4. Store `(sum % 10)` in a new node
5. Update carry using integer division
6. Reverse the final list
7. Remove leading zeros safely

---

## Examples

**Input**

```
head1: 1 → 2 → 3
head2: 9 → 9 → 9
```

**Output**

```
1 → 1 → 2 → 2
```

---

**Input**

```
head1: 0 → 0 → 6 → 3
head2: 0 → 7
```

**Output**

```
7 → 0
```

---

## How to use / Run locally

1. Clone the repository
2. Copy the solution into your preferred language file
3. Run using:

   * C++: `g++ file.cpp && ./a.out`
   * Java: `javac file.java && java file`
   * JavaScript: `node file.js`
   * Python: `python3 file.py`

---

## Notes & Optimizations

* No conversion to integer (avoids overflow)
* Works for very large linked lists
* Uses constant extra space
* Clean and interview-friendly logic

---

## Author

* **Md Aarzoo Islam**
  🔗 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
