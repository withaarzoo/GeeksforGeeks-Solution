# Palindrome Linked List

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

I am given the **head of a singly linked list** containing positive integers.
My task is to check whether the linked list is a **palindrome** or not.

A linked list is called a palindrome if reading it from **left to right** gives the same sequence as **right to left**.

---

## Constraints

* 1 ≤ Number of nodes ≤ 10⁵
* 0 ≤ Node data ≤ 10³
* Expected Time Complexity: O(n)
* Expected Space Complexity: O(1)

---

## Intuition

When I think about palindrome problems, the first idea that comes to my mind is comparing the **first element with the last**, the second with the second last, and so on.

But in a **singly linked list**, I cannot move backward.

So I thought:

* What if I split the list into two halves?
* Reverse the second half
* Then compare both halves node by node

This way, I can check palindrome **without using extra memory**, which perfectly matches the expected constraints.

---

## Approach

1. If the list has **0 or 1 node**, it is already a palindrome.
2. Use **slow and fast pointers** to find the middle of the list.
3. Reverse the second half of the linked list.
4. Compare the first half and the reversed second half.
5. If all values match, return `true`. Otherwise, return `false`.

---

## Data Structures Used

* Singly Linked List
* Pointer variables only

No extra array, stack, or map is used.

---

## Operations & Behavior Summary

* Slow pointer moves 1 step
* Fast pointer moves 2 steps
* Second half of list is reversed in-place
* Node values are compared one by one
* Early exit if mismatch found

---

## Complexity

**Time Complexity:** O(n)

* `n` is the number of nodes in the linked list
* The list is traversed a constant number of times

**Space Complexity:** O(1)

* No extra data structure is used
* Only pointer manipulation

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool isPalindrome(Node *head) {
        if (!head || !head->next) return true;

        Node *slow = head, *fast = head;

        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }

        Node *prev = NULL, *curr = slow;
        while (curr) {
            Node* nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }

        Node *first = head, *second = prev;
        while (second) {
            if (first->data != second->data) return false;
            first = first->next;
            second = second->next;
        }

        return true;
    }
};
```

---

### Java

```java
class Solution {
    public boolean isPalindrome(Node head) {
        if (head == null || head.next == null) return true;

        Node slow = head, fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        Node prev = null, curr = slow;
        while (curr != null) {
            Node nextNode = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextNode;
        }

        Node first = head, second = prev;
        while (second != null) {
            if (first.data != second.data) return false;
            first = first.next;
            second = second.next;
        }

        return true;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    isPalindrome(head) {
        if (!head || !head.next) return true;

        let slow = head, fast = head;

        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }

        let prev = null, curr = slow;
        while (curr) {
            let nextNode = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextNode;
        }

        let first = head, second = prev;
        while (second) {
            if (first.data !== second.data) return false;
            first = first.next;
            second = second.next;
        }

        return true;
    }
}
```

---

### Python3

```python
class Solution:
    def isPalindrome(self, head):
        if not head or not head.next:
            return True

        slow = head
        fast = head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        prev = None
        curr = slow
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt

        first = head
        second = prev
        while second:
            if first.data != second.data:
                return False
            first = first.next
            second = second.next

        return True
```

---

## Step-by-step Detailed Explanation

1. I use two pointers to reach the middle of the list.
2. I reverse the second half in-place.
3. I start comparing values from the head and the reversed half.
4. If any mismatch occurs, I return false immediately.
5. If the comparison finishes successfully, the list is a palindrome.

---

## Examples

**Input:**
1 → 2 → 1 → 1 → 2 → 1

**Output:**
true

**Explanation:**
Reading forward and backward gives the same sequence.

---

**Input:**
10 → 20 → 30 → 40 → 50

**Output:**
false

---

## How to use / Run locally

1. Copy the code for your preferred language.
2. Use the given `Node` class structure.
3. Create a linked list manually or through input.
4. Call `isPalindrome(head)`.

---

## Notes & Optimizations

* This solution avoids extra memory usage.
* Works efficiently for very large lists.
* The list can be restored back if needed (optional improvement).
* This approach is highly preferred in interviews.

---

## Author

**Md Aarzoo Islam**

* 🌐 Portfolio: [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
