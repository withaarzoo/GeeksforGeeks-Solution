# Implement UNDO & REDO

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

I am given a text document that is initially empty.
I need to support four operations:

* **append(x)** → add character `x` at the end
* **undo()** → remove the most recent appended character
* **redo()** → restore the last removed character
* **read()** → return the current document content

The input is a sequence of queries, and I only need to implement these four functions.
The driver code will handle the input and call the functions.

---

## Constraints

* `1 ≤ q ≤ 10⁴`
* Each operation must be fast
* Expected Time Complexity: **O(1)** per operation

---

## Intuition

When I read this problem, I immediately thought about how **text editors** work.

Whenever I type something, it gets added.
When I press **CTRL + Z**, the last change is removed.
When I press **CTRL + Y**, the removed change comes back.

So I asked myself:

* What data structure works best when I want to remove and restore the **last action**?

The answer was **STACK**.

Undo and redo are classic **Last In, First Out (LIFO)** problems.

---

## Approach

This is exactly how I solved it:

1. I keep the document as a **string or list**
2. I use one stack to store **characters removed by undo**
3. When I append a character:

   * I add it to the document
   * I clear the redo stack
4. When I undo:

   * I remove the last character from the document
   * I push it into the redo stack
5. When I redo:

   * I pop a character from redo stack
   * I add it back to the document
6. When I read:

   * I return the current document

All operations work in constant time.

---

## Data Structures Used

* **String / StringBuilder / Array**

  * To store current document
* **Stack**

  * To store undone characters for redo

---

## Operations & Behavior Summary

| Operation | Action                         |
| --------- | ------------------------------ |
| append(x) | Adds character `x` to document |
| undo()    | Removes last character         |
| redo()    | Restores last undone character |
| read()    | Returns document content       |

---

## Complexity

### Time Complexity

* **O(1)** per operation
  Each append, undo, redo, and read takes constant time.

### Space Complexity

* **O(n)**
  Extra space for document and redo stack.

---

## Multi-language Solutions

---

### C++

```cpp
class Solution {
private:
    string doc;
    stack<char> redoStack;

public:
    void append(char x) {
        doc.push_back(x);
        while (!redoStack.empty()) redoStack.pop();
    }

    void undo() {
        if (!doc.empty()) {
            redoStack.push(doc.back());
            doc.pop_back();
        }
    }

    void redo() {
        if (!redoStack.empty()) {
            doc.push_back(redoStack.top());
            redoStack.pop();
        }
    }

    string read() {
        return doc;
    }
};
```

---

### Java

```java
import java.util.Stack;

class Solution {
    private StringBuilder doc = new StringBuilder();
    private Stack<Character> redoStack = new Stack<>();

    public void append(char x) {
        doc.append(x);
        redoStack.clear();
    }

    public void undo() {
        if (doc.length() > 0) {
            redoStack.push(doc.charAt(doc.length() - 1));
            doc.deleteCharAt(doc.length() - 1);
        }
    }

    public void redo() {
        if (!redoStack.isEmpty()) {
            doc.append(redoStack.pop());
        }
    }

    public String read() {
        return doc.toString();
    }
}
```

---

### JavaScript

```javascript
class Solution {
    constructor() {
        this.doc = [];
        this.redoStack = [];
    }

    append(x) {
        this.doc.push(x);
        this.redoStack = [];
    }

    undo() {
        if (this.doc.length > 0) {
            this.redoStack.push(this.doc.pop());
        }
    }

    redo() {
        if (this.redoStack.length > 0) {
            this.doc.push(this.redoStack.pop());
        }
    }

    read() {
        return this.doc.join("");
    }
}
```

---

### Python3

```python
class Solution:
    def __init__(self):
        self.doc = []
        self.redo_stack = []

    def append(self, x):
        self.doc.append(x)
        self.redo_stack.clear()

    def undo(self):
        if self.doc:
            self.redo_stack.append(self.doc.pop())

    def redo(self):
        if self.redo_stack:
            self.doc.append(self.redo_stack.pop())

    def read(self):
        return "".join(self.doc)
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. I store the document as a list or string
2. When append is called, I add the character
3. Undo removes the last character and saves it
4. Redo restores the last removed character
5. Read simply returns the document

The logic is exactly the same in all languages, only syntax changes.

---

## Examples

### Example 1

**Input**

```bash
[1 A], [1 B], [1 C], [2], [4], [3], [4]
```

**Output**

```bash
["AB", "ABC"]
```

### Example 2

**Input**

```bash
[1 D], [2], [4]
```

**Output**

```bash
[""]
```

---

## How to Use / Run Locally

1. Clone the repository
2. Open the file in your preferred language
3. Run using:

   * C++ → `g++ file.cpp && ./a.out`
   * Java → `javac Solution.java && java Solution`
   * JS → `node solution.js`
   * Python → `python solution.py`

Driver code is handled by GeeksforGeeks.

---

## Notes & Optimizations

* Stack is the best choice for undo/redo
* Clearing redo stack on append is very important
* Solution works perfectly within given constraints
* Easy to extend for real text editor features

---

## Author

* **Md Aarzoo Islam**
  🔗 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
