# Generate Permutations of an Array

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
* How to Use / Run Locally
* Notes & Optimizations
* Author

---

## Problem Summary

Given an array of **unique integers**, I need to generate **all possible permutations** of the array.

A permutation means **every possible ordering** of the elements.
The output can be in any order. The driver code will sort it automatically.

---

## Constraints

* 1 ≤ arr.size() ≤ 9
* All elements in the array are unique

---

## Intuition

When I first saw this problem, I understood that:

* I need to try **every possible order** of numbers
* Each number can appear **only once** in a single permutation
* Once a number is used, I should not reuse it again

So I thought of using **recursion with backtracking**.

My idea was simple:

* Pick one number
* Fix it at the current position
* Try all remaining numbers
* After one attempt, undo the choice and try another

This is a classic permutation + backtracking problem.

---

## Approach

1. I use **recursion** to build permutations step by step
2. I maintain:

   * A temporary list `current` to store one permutation
   * A boolean array `used` to track used elements
3. I loop through the array:

   * If an element is not used, I pick it
   * Mark it as used
   * Call recursion
4. When `current` size equals array size:

   * I store it as a valid permutation
5. After recursion:

   * I remove the last element
   * Mark it unused (backtracking)

This guarantees all permutations are generated.

---

## Data Structures Used

* Array / Vector → to store input
* Boolean array → to track used elements
* List / Vector → to store current permutation
* List of Lists → to store all permutations

---

## Operations & Behavior Summary

* Uses **Depth First Search (DFS)**
* Uses **Backtracking** to explore all possibilities
* No duplicate permutations because elements are unique
* Recursion explores permutation tree fully

---

## Complexity

### Time Complexity: `O(n! × n)`

* `n!` permutations are generated
* Each permutation takes `O(n)` time to copy

### Space Complexity: `O(n)`

* Used array + recursion stack
* Output space not counted

---

## Multi-language Solutions

---

### C++

```cpp
class Solution {
public:
    void backtrack(vector<int>& arr, vector<int>& curr,
                   vector<bool>& used, vector<vector<int>>& result) {
        if (curr.size() == arr.size()) {
            result.push_back(curr);
            return;
        }

        for (int i = 0; i < arr.size(); i++) {
            if (used[i]) continue;

            used[i] = true;
            curr.push_back(arr[i]);

            backtrack(arr, curr, used, result);

            curr.pop_back();
            used[i] = false;
        }
    }

    vector<vector<int>> permuteDist(vector<int>& arr) {
        vector<vector<int>> result;
        vector<int> curr;
        vector<bool> used(arr.size(), false);

        backtrack(arr, curr, used, result);
        return result;
    }
};
```

---

### Java

```java
class Solution {

    private static void backtrack(int[] arr, boolean[] used,
                                  ArrayList<Integer> curr,
                                  ArrayList<ArrayList<Integer>> result) {

        if (curr.size() == arr.length) {
            result.add(new ArrayList<>(curr));
            return;
        }

        for (int i = 0; i < arr.length; i++) {
            if (used[i]) continue;

            used[i] = true;
            curr.add(arr[i]);

            backtrack(arr, used, curr, result);

            curr.remove(curr.size() - 1);
            used[i] = false;
        }
    }

    public static ArrayList<ArrayList<Integer>> permuteDist(int[] arr) {
        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        boolean[] used = new boolean[arr.length];

        backtrack(arr, used, new ArrayList<>(), result);
        return result;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    permuteDist(arr) {
        const result = [];
        const used = new Array(arr.length).fill(false);

        const backtrack = (curr) => {
            if (curr.length === arr.length) {
                result.push([...curr]);
                return;
            }

            for (let i = 0; i < arr.length; i++) {
                if (used[i]) continue;

                used[i] = true;
                curr.push(arr[i]);

                backtrack(curr);

                curr.pop();
                used[i] = false;
            }
        };

        backtrack([]);
        return result;
    }
}
```

---

### Python3

```python
class Solution:
    def permuteDist(self, arr):
        result = []
        used = [False] * len(arr)

        def backtrack(curr):
            if len(curr) == len(arr):
                result.append(curr[:])
                return

            for i in range(len(arr)):
                if used[i]:
                    continue

                used[i] = True
                curr.append(arr[i])

                backtrack(curr)

                curr.pop()
                used[i] = False

        backtrack([])
        return result
```

---

## Step-by-step Detailed Explanation

1. I start with an empty permutation
2. I try each unused element
3. I add it to the current list
4. I mark it as used
5. I go deeper using recursion
6. When the permutation is complete, I save it
7. I backtrack by removing the last element
8. I repeat until all permutations are generated

This systematic trial ensures **no permutation is missed**.

---

## Examples

### Input

```bash
arr = [1, 2, 3]
```

### Output

```bash
[
 [1, 2, 3],
 [1, 3, 2],
 [2, 1, 3],
 [2, 3, 1],
 [3, 1, 2],
 [3, 2, 1]
]
```

---

## How to Use / Run Locally

1. Clone the repository
2. Open the file for your preferred language
3. Compile / run using:

   * C++: `g++ file.cpp && ./a.out`
   * Java: `javac Solution.java && java Solution`
   * JavaScript: `node file.js`
   * Python: `python3 file.py`

---

## Notes & Optimizations

* Works efficiently because input size ≤ 9
* No extra sorting needed
* Swap-based approach can reduce space further
* This solution is interview-safe and clean

---

## Author

**Md Aarzoo Islam**
🔗 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
