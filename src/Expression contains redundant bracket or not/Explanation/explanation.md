# Expression Contains Redundant Bracket or Not

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

Given a valid mathematical expression as a string, I need to check whether it contains **redundant brackets** or not.

A bracket is considered **redundant** if it does not affect the expression and can be removed without changing the meaning.

The expression:

* Is always valid
* Contains characters like `+ - * /`
* Does not contain any whitespace

If redundant brackets exist, return `true`.
Otherwise, return `false`.

---

## Constraints

* `1 ≤ length of string ≤ 10^5`
* Expression is valid
* Only round brackets `(` `)` are used

---

## Intuition

When I first looked at the problem, I realized one thing.

Brackets are only useful when they contain **at least one operator** inside them.

If a bracket only wraps:

* a single variable like `(a)`
* or another bracket like `((a+b))`

then those brackets are unnecessary.

So I thought:
Whenever I see a closing bracket `)`, I should check what is inside it.

If I don’t find any operator between `(` and `)`, then the bracket is redundant.

To do this efficiently, I decided to use a **stack**.

---

## Approach

1. I create an empty stack.
2. I traverse the expression character by character.
3. If the character is **not `)`**, I push it into the stack.
4. If the character is `)`:

   * I pop characters until I reach `(`.
   * While popping, I check if there is any operator.
5. If no operator is found inside the brackets:

   * I return `true` (redundant bracket found).
6. If the entire string is processed safely:

   * I return `false`.

This approach works in one pass and is very efficient.

---

## Data Structures Used

* **Stack**

  * To track characters inside brackets
  * Helps in checking operators between matching parentheses

---

## Operations & Behavior Summary

* Push characters until a closing bracket appears
* On `)`:

  * Pop elements
  * Detect operator
* If no operator exists between brackets → redundant
* Early exit for better performance

---

## Complexity

**Time Complexity:** `O(n)`
I traverse the string once.
Here, `n` is the length of the expression.

**Space Complexity:** `O(n)`
In the worst case, the stack stores all characters.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool checkRedundancy(string &s) {
        stack<char> st;

        for (char ch : s) {
            if (ch != ')') {
                st.push(ch);
            } else {
                bool hasOperator = false;

                while (!st.empty() && st.top() != '(') {
                    char top = st.top();
                    st.pop();
                    if (top == '+' || top == '-' || top == '*' || top == '/') {
                        hasOperator = true;
                    }
                }

                if (!st.empty()) st.pop(); // remove '('

                if (!hasOperator) return true;
            }
        }
        return false;
    }
};
```

---

### Java

```java
class Solution {
    public static boolean checkRedundancy(String s) {
        Stack<Character> stack = new Stack<>();

        for (char ch : s.toCharArray()) {
            if (ch != ')') {
                stack.push(ch);
            } else {
                boolean hasOperator = false;

                while (!stack.isEmpty() && stack.peek() != '(') {
                    char top = stack.pop();
                    if (top == '+' || top == '-' || top == '*' || top == '/') {
                        hasOperator = true;
                    }
                }

                if (!stack.isEmpty()) stack.pop();

                if (!hasOperator) return true;
            }
        }
        return false;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    checkRedundancy(s) {
        let stack = [];

        for (let ch of s) {
            if (ch !== ')') {
                stack.push(ch);
            } else {
                let hasOperator = false;

                while (stack.length && stack[stack.length - 1] !== '(') {
                    let top = stack.pop();
                    if (top === '+' || top === '-' || top === '*' || top === '/') {
                        hasOperator = true;
                    }
                }

                if (stack.length) stack.pop();

                if (!hasOperator) return true;
            }
        }
        return false;
    }
}
```

---

### Python3

```python
class Solution():
    def checkRedundancy(self, s):
        stack = []

        for ch in s:
            if ch != ')':
                stack.append(ch)
            else:
                has_operator = False

                while stack and stack[-1] != '(':
                    top = stack.pop()
                    if top in ['+', '-', '*', '/']:
                        has_operator = True

                if stack:
                    stack.pop()

                if not has_operator:
                    return True

        return False
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. I loop through each character of the expression.
2. All characters except `)` are pushed into the stack.
3. When I encounter `)`:

   * I pop elements until I reach `(`.
   * I track whether an operator appears.
4. If no operator exists:

   * The brackets are redundant.
5. This same logic works in all languages because the core idea is identical.

---

## Examples

**Input:** `((a+b))`
**Output:** `true`
Reason: Extra outer brackets are unnecessary.

**Input:** `(a+(b)/c)`
**Output:** `true`
Reason: `(b)` does not contain an operator.

**Input:** `(a+b+(c+d))`
**Output:** `false`
Reason: All brackets are meaningful.

---

## How to use / Run locally

1. Copy the solution code for your preferred language.
2. Paste it into your IDE or compiler.
3. Call the `checkRedundancy` function with the expression string.
4. Print the returned boolean value.

---

## Notes & Optimizations

* This is a single-pass solution.
* Early exit improves performance.
* Works efficiently even for very large strings.
* Ideal for interviews and competitive programming.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
