# Complete Binary Tree Traversal with Array Input

A beginner-friendly solution for the GeeksforGeeks **Complete Binary Tree Traversal with Array Input** problem using an efficient level-by-level sorting approach. This repository includes optimized solutions in C++, Java, JavaScript, and Python, along with a detailed explanation of the algorithm, time complexity, and thought process.

---

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

The input is an integer array representing a **Complete Binary Tree** in **level order traversal**.

Instead of building the tree, the goal is to process the array level by level. Every level should be sorted independently in ascending order, and the final result should contain all sorted levels as a 2D array.

Since the array is already stored in level order, there is no need to create tree nodes or perform an actual BFS traversal. We can directly identify each level by the number of nodes it should contain.

**Input**

- An integer array representing the complete binary tree in level order.

**Output**

- A 2D array where every row contains the sorted values of one level.

This problem is a good example of combining **array processing**, **complete binary tree properties**, and **sorting** without explicitly constructing the tree.

---

## Constraints

| Constraint | Value |
|------------|-------|
| `1 ≤ arr.size() ≤ 10^4` | Array size |
| `1 ≤ arr[i] ≤ 10^9` | Node value |

---

## Intuition

The first thing I noticed was that the array already contains the tree in level order.

Normally, I would think about creating tree nodes and running a level order traversal using a queue. But after looking carefully, I realized that would only add unnecessary work.

A complete binary tree has a predictable structure.

- Level 0 contains 1 node.
- Level 1 contains 2 nodes.
- Level 2 contains 4 nodes.
- Level 3 contains 8 nodes.

So instead of building the tree, I can simply read the array in chunks of these sizes. After collecting one level, I sort it and move to the next level.

This makes the solution much simpler and avoids extra overhead.

---

## Approach

I solved the problem using the following steps.

1. Start reading from the beginning of the array.
2. Assume the first level contains one node.
3. Collect all nodes belonging to the current level.
4. Sort only those nodes.
5. Store the sorted level in the final answer.
6. Double the expected level size for the next iteration.
7. Continue until every element in the array has been processed.

Because every element belongs to exactly one level, each value is visited only once.

---

## Data Structures Used

### Dynamic Array / Vector / ArrayList / List

The answer is stored as a 2D collection because every level becomes one separate list.

### Temporary Level Container

Before adding a level to the final answer, I temporarily store all nodes of that level. After sorting, it gets added to the result.

No binary tree is created.

No queue is required.

---

## Operations & Behavior Summary

The algorithm performs these operations.

1. Start from index `0`.
2. Read one element for the first level.
3. Sort that level.
4. Save it.
5. Read two elements for the next level.
6. Sort them.
7. Save them.
8. Continue doubling the expected level size.
9. Stop after processing every array element.
10. Return all sorted levels.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | `O(n log n)` | Every element is processed once, and each level is sorted independently. The combined sorting cost is `O(n log n)` in the worst case. |
| Space Complexity | `O(n)` | Extra space is used for the final answer and the temporary list for each level. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<vector<int>> levelSort(vector<int>& arr) {
        // Store the final answer
        vector<vector<int>> ans;

        // Total number of elements
        int n = arr.size();

        // Current index in the array
        int index = 0;

        // Number of nodes expected at the current level
        int levelSize = 1;

        // Continue until every array element is processed
        while (index < n) {

            // Store all nodes of the current level
            vector<int> level;

            // Pick at most levelSize elements
            for (int i = 0; i < levelSize && index < n; i++) {
                level.push_back(arr[index]);
                index++;
            }

            // Sort only this level
            sort(level.begin(), level.end());

            // Save the sorted level
            ans.push_back(level);

            // Next level contains twice as many nodes
            levelSize *= 2;
        }

        // Return all sorted levels
        return ans;
    }
};
```

### Java

```java
class Solution {
    public ArrayList<ArrayList<Integer>> levelSort(int[] arr) {

        // Store the final answer
        ArrayList<ArrayList<Integer>> ans = new ArrayList<>();

        // Current index in the array
        int index = 0;

        // Number of nodes expected at the current level
        int levelSize = 1;

        // Process all elements
        while (index < arr.length) {

            // Store one level
            ArrayList<Integer> level = new ArrayList<>();

            // Take at most levelSize elements
            for (int i = 0; i < levelSize && index < arr.length; i++) {
                level.add(arr[index]);
                index++;
            }

            // Sort the current level
            Collections.sort(level);

            // Save it
            ans.add(level);

            // Double the size for the next level
            levelSize *= 2;
        }

        // Return the final answer
        return ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @return {number[][]}
 */
class Solution {
    levelSort(arr) {

        // Store the final answer
        const ans = [];

        // Current index in the array
        let index = 0;

        // Number of nodes at the current level
        let levelSize = 1;

        // Process every array element
        while (index < arr.length) {

            // Store one level
            const level = [];

            // Take at most levelSize elements
            for (let i = 0; i < levelSize && index < arr.length; i++) {
                level.push(arr[index]);
                index++;
            }

            // Sort only the current level
            level.sort((a, b) => a - b);

            // Save it
            ans.push(level);

            // Next level has twice the nodes
            levelSize *= 2;
        }

        // Return all sorted levels
        return ans;
    }
}
```

### Python3

```python
class Solution:
    def levelSort(self, arr):
        # Store the final answer
        ans = []

        # Current index in the array
        index = 0

        # Number of nodes in the current level
        level_size = 1

        # Continue until all elements are processed
        while index < len(arr):

            # Store one level
            level = []

            # Take at most level_size elements
            for _ in range(level_size):
                if index >= len(arr):
                    break

                level.append(arr[index])
                index += 1

            # Sort only the current level
            level.sort()

            # Save it
            ans.append(level)

            # Next level contains twice as many nodes
            level_size *= 2

        # Return the final answer
        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The overall logic is identical in every language. Only the syntax changes.

### Step 1

Create a 2D collection to store the final answer.

Each row will represent one level of the complete binary tree.

---

### Step 2

Initialize two variables.

- One variable keeps track of the current index inside the array.
- The other stores the expected number of nodes in the current level.

Initially, the first level always contains one node.

---

### Step 3

Repeat the process until every array element has been used.

Each iteration represents exactly one tree level.

---

### Step 4

Create a temporary list for the current level.

This prevents values from different levels from getting mixed together.

---

### Step 5

Read as many elements as the current level should contain.

If the last level is incomplete, stop as soon as the array ends.

This is why checking the array boundary is important.

---

### Step 6

Sort only the nodes collected for the current level.

Each level is completely independent, so sorting one level never affects another.

---

### Step 7

Store the sorted level in the final answer.

Once saved, that level never needs to be modified again.

---

### Step 8

Double the expected level size.

A complete binary tree follows this pattern.

- Level 0 → 1 node
- Level 1 → 2 nodes
- Level 2 → 4 nodes
- Level 3 → 8 nodes

This property lets us identify levels without constructing the tree.

---

### Step 9

Return the completed 2D array after processing every element.

The solution works because the input already follows level order traversal.

---

## Examples

### Example 1

**Input**

```text
arr = [7, 6, 5, 4, 3, 2, 1]
```

**Output**

```text
[
  [7],
  [5, 6],
  [1, 2, 3, 4]
]
```

**Trace**

- Level 0 → [7] → Sorted → [7]
- Level 1 → [6, 5] → Sorted → [5, 6]
- Level 2 → [4, 3, 2, 1] → Sorted → [1, 2, 3, 4]

---

### Example 2

**Input**

```text
arr = [7, 16, 1, 4, 13]
```

**Output**

```text
[
  [7],
  [1, 16],
  [4, 13]
]
```

**Trace**

- Level 0 → [7]
- Level 1 → [16, 1] → [1, 16]
- Level 2 → [4, 13] → Already sorted

---

### Example 3

**Input**

```text
arr = [10]
```

**Output**

```text
[
  [10]
]
```

**Trace**

The tree contains only the root node, so there is only one level.

---

## How to Use / Run Locally

Clone the repository.

```bash
git clone https://github.com/your-username/your-repository.git
```

Move into the project.

```bash
cd your-repository
```

### Run C++

Compile the program.

```bash
g++ solution.cpp -o solution
```

Execute it.

```bash
./solution
```

---

### Run Java

Compile the file.

```bash
javac Solution.java
```

Run the program.

```bash
java Solution
```

---

### Run JavaScript

Execute using Node.js.

```bash
node solution.js
```

---

### Run Python3

Run the script.

```bash
python solution.py
```

---

## Notes & Optimizations

- Building an actual binary tree is unnecessary because the input is already given in level order.
- The algorithm only scans the array once.
- Every element belongs to exactly one level.
- The final level may not be completely full, so always check the array boundary before reading elements.
- Sorting each level independently keeps the implementation simple and easy to understand.
- This approach is both clean and efficient for the given constraints.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
