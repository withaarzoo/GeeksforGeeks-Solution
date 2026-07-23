# Check Preorder of BST | Binary Search Tree Preorder Validation Solution

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

---

## Problem Summary

This problem asks whether a given array can represent the preorder traversal of a Binary Search Tree (BST).

A preorder traversal always visits nodes in this order:

1. Root
2. Left Subtree
3. Right Subtree

A Binary Search Tree also follows one important rule:

- Every value in the left subtree is smaller than the root.
- Every value in the right subtree is greater than the root.

The task is to examine the preorder sequence and determine whether it is possible to build a valid BST from it.

Input:

- An array of distinct integers representing a preorder traversal.

Output:

- Return `true` if the preorder sequence can represent a BST.
- Otherwise, return `false`.

This is a classic Binary Search Tree validation problem that frequently appears in coding interviews and competitive programming contests.

---

## Constraints

| Constraint | Value |
|------------|--------|
| Number of elements | `1 ≤ n ≤ 10^5` |
| Array values | `0 ≤ arr[i] ≤ 10^5` |
| Elements | All distinct |

---

## Intuition

The first thing I noticed was that I don't actually need to build the Binary Search Tree.

While reading the preorder traversal from left to right, I only need to know whether every new value appears in a valid position according to BST rules.

Whenever I move from a left subtree into a right subtree, every future value must stay larger than the parent whose right subtree I entered.

That observation makes it possible to solve the problem using a stack and a single variable that stores the current lower limit.

Instead of constructing the tree, I simply simulate the preorder traversal.

---

## Approach

I process every element from left to right.

First, I keep a stack that stores ancestor nodes whose right subtree has not been processed yet.

I also maintain a variable called `lowerBound`.

Initially, there is no restriction, so the lower bound starts with the smallest possible value.

For every number in the preorder array:

1. If the current value is smaller than the lower bound, the preorder sequence is invalid.
2. Otherwise, while the current value is greater than the top of the stack, I keep removing elements from the stack.
3. Every popped value becomes the new lower bound because I have now entered its right subtree.
4. Finally, I push the current value into the stack.

If the traversal finishes without violating any BST property, the preorder sequence is valid.

This approach avoids building the tree and works in linear time.

---

## Data Structures Used

### Stack

The stack keeps track of ancestor nodes.

Whenever I move into a right subtree, I pop ancestors until I find the correct parent.

### Integer Variable (`lowerBound`)

This variable stores the smallest value allowed for future nodes.

If any upcoming value becomes smaller than this limit, I immediately know the preorder traversal cannot represent a BST.

---

## Operations & Behavior Summary

The algorithm works in the following order:

1. Start with an empty stack.
2. Set the lower bound to negative infinity.
3. Read every value from the preorder array.
4. Check whether the value violates the current lower bound.
5. If needed, pop ancestors while moving toward a right subtree.
6. Update the lower bound whenever an ancestor is removed.
7. Push the current value into the stack.
8. Continue until every element is processed.
9. If no rule is broken, return `true`.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | **O(n)** | Every element is pushed into the stack once and popped at most once. |
| Space Complexity | **O(n)** | The stack may contain all nodes in the worst case, such as a strictly decreasing preorder traversal. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool canRepresentBST(vector<int> &arr) {
        // Stack stores ancestors whose right subtree is not processed yet
        stack<int> st;

        // Every upcoming node must be greater than this value
        int lowerBound = INT_MIN;

        // Traverse every node in preorder
        for (int value : arr) {

            // If current value violates the BST property,
            // preorder cannot represent any BST
            if (value < lowerBound)
                return false;

            // If current value is greater than stack top,
            // we are moving to the right subtree
            while (!st.empty() && value > st.top()) {

                // Update the latest ancestor that becomes
                // the new lower limit
                lowerBound = st.top();

                // Remove it because its right subtree starts now
                st.pop();
            }

            // Store current node for future comparisons
            st.push(value);
        }

        // Entire preorder is valid
        return true;
    }
};
```

### Java

```java
class Solution {
    public boolean canRepresentBST(List<Integer> arr) {

        // Stack stores ancestor nodes
        Stack<Integer> stack = new Stack<>();

        // Every future value must be greater than this
        int lowerBound = Integer.MIN_VALUE;

        // Traverse every preorder value
        for (int value : arr) {

            // Invalid preorder sequence
            if (value < lowerBound)
                return false;

            // Moving towards the right subtree
            while (!stack.isEmpty() && value > stack.peek()) {

                // Update lower limit
                lowerBound = stack.pop();
            }

            // Save current node
            stack.push(value);
        }

        // Valid preorder
        return true;
    }
}
```

### JavaScript

```javascript
class Solution {
    canRepresentBST(arr) {

        // Stack stores ancestor nodes
        let stack = [];

        // Lowest value allowed for upcoming nodes
        let lowerBound = -Infinity;

        // Traverse every preorder value
        for (let value of arr) {

            // BST property is violated
            if (value < lowerBound)
                return false;

            // We entered the right subtree
            while (stack.length && value > stack[stack.length - 1]) {

                // Update the lower limit
                lowerBound = stack.pop();
            }

            // Store current node
            stack.push(value);
        }

        // Preorder is valid
        return true;
    }
}
```

### Python3

```python
class Solution:
    def canRepresentBST(self, arr):

        # Stack stores ancestor nodes
        stack = []

        # Smallest allowed value for future nodes
        lower_bound = float("-inf")

        # Traverse every preorder value
        for value in arr:

            # BST property is violated
            if value < lower_bound:
                return False

            # Moving to the right subtree
            while stack and value > stack[-1]:

                # Update the lower limit
                lower_bound = stack.pop()

            # Store current node
            stack.append(value)

        # Entire preorder is valid
        return True
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The overall logic is identical in every language.

Only the syntax changes.

The algorithm starts by creating an empty stack. The stack stores ancestor nodes whose right subtree has not been visited yet.

Next, a variable called `lowerBound` is initialized.

At the beginning, there is no restriction, so this variable starts with the smallest possible value.

The algorithm then reads every value from the preorder array.

For every element, the first check is whether the current value is smaller than the lower bound.

If that happens, the BST property has already been violated because we are trying to place a smaller value inside a right subtree.

In that situation, the algorithm immediately returns `false`.

If the value is valid, the algorithm checks the stack.

Whenever the current value is larger than the stack's top element, it means we are leaving one or more left subtrees and entering a right subtree.

The algorithm keeps removing those ancestor nodes until it finds the correct parent.

Every node removed from the stack becomes the new lower bound.

That ensures every future value remains greater than those completed ancestors.

Finally, the current value is pushed into the stack because it may still have an unexplored left subtree.

This process repeats for every element in the preorder traversal.

If the loop finishes without finding any violation, the preorder traversal satisfies every Binary Search Tree rule, so the answer is `true`.

Since every element is inserted into the stack only once and removed only once, the solution runs efficiently even for the largest input size.

---

## Examples

### Example 1

**Input**

```text
arr = [2, 4, 3]
```

**Output**

```text
true
```

**Trace**

- Visit 2
- Visit 4 (move to right subtree)
- Visit 3 (valid because it belongs to the left subtree of 4)
- Entire traversal follows BST rules

---

### Example 2

**Input**

```text
arr = [2, 4, 1]
```

**Output**

```text
false
```

**Trace**

- Visit 2
- Visit 4
- Lower bound becomes 2
- Next value is 1
- 1 is smaller than the lower bound
- BST property is violated

---

### Example 3

**Input**

```text
arr = [40, 30, 35, 80, 100]
```

**Output**

```text
true
```

**Trace**

- Visit 40
- Visit 30
- Visit 35
- Enter right subtree of 30
- Visit 80
- Enter right subtree of 40
- Visit 100
- Every node satisfies BST preorder rules

---

## How to Use / Run Locally

Clone the repository first.

```bash
git clone https://github.com/your-username/your-repository.git
```

Move into the project directory.

```bash
cd your-repository
```

### C++

Compile the source file.

```bash
g++ solution.cpp -o solution
```

Run the executable.

```bash
./solution
```

---

### Java

Compile the Java file.

```bash
javac Solution.java
```

Run it.

```bash
java Solution
```

---

### JavaScript

Run using Node.js.

```bash
node solution.js
```

---

### Python3

Run using Python.

```bash
python solution.py
```

---

## Notes & Optimizations

- The Binary Search Tree is never constructed.
- Every node is processed only once.
- The stack makes it easy to simulate preorder traversal.
- This is the optimal solution for the given constraints.
- A recursive tree-building solution would require more work and additional overhead.
- The algorithm works correctly for increasing, decreasing, and mixed preorder sequences.
- Since all values are distinct, there is no need to handle duplicate elements.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
