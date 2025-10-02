# Unique K-Number Sum

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
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given two integers `n` (target sum) and `k` (number of distinct numbers), find all unique combinations of `k` numbers from the range **1 to 9** that add up to `n`.

**Important rules:**

* Only numbers from `1` through `9` are allowed.
* Each number may be used **at most once** in a combination.
* Combinations are considered unique irrespective of ordering (i.e., `[1,2,6]` is the same as `[2,1,6]`).

Return all unique combinations in any order.

---

## Constraints

* `1 <= n <= 50`
* `1 <= k <= 9`

---

## Intuition

I thought about the problem like this: the allowed numbers are only from `1` to `9`, which is a very small and fixed set. I can try combinations using backtracking and ensure I only pick increasing numbers (to avoid duplicate permutations). While exploring, I can stop early (prune) if it's impossible to reach the target sum with the remaining picks — that keeps the search small and efficient.

---

## Approach

1. Use **backtracking (depth-first search)** to explore combinations. I choose numbers in increasing order to avoid duplicate permutations.
2. Maintain a current `path` (the chosen numbers so far), `remaining` (remaining sum to reach `n`) and `k_left` (how many numbers are still needed).
3. Before recursing deeper, compute the **minimum** and **maximum** possible sums achievable with `k_left` numbers from the remaining candidate range. If `remaining` is outside this interval, prune (stop exploring this branch).
4. If `k_left == 0` and `remaining == 0`, add `path` to the result.
5. Use push/pop (or append/pop) when entering/exiting a choice.

This is clean and efficient because the search space is small and pruning stops impossible branches early.

---

## Data Structures Used

* Lists / arrays / vectors for storing the current path and final results.
* Recursion stack for backtracking.

---

## Operations & Behavior Summary

* A driver function (`combinationSum` / `combinationSum` depending on language) sets up containers and calls a recursive helper `dfs(start, remaining, k_left)`.
* `start` is the smallest candidate number we can pick next (ensures increasing order and uniqueness).
* `remaining` is the amount left to reach `n`.
* `k_left` is how many more numbers we need to pick.
* At each step, we try candidates from `start` to `9`. For each candidate `num`, we append it to `path`, recurse with updated parameters, then backtrack.

---

## Complexity

* **Time Complexity:** `O(C(9, k) * k)` — We explore combinations of at most 9 numbers and for each valid combination we copy `k` elements to the output. Because `9` is a constant, this is effectively constant-time in practice. Here `k` is the number of elements we pick.

* **Space Complexity:** `O(k)` recursion depth (call stack) plus `O(#results * k)` for storing results. The working extra memory is `O(k)`.

---

## Multi-language Solutions

Below are clean and optimized implementations with helpful comments.

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

// Returns all unique combinations of k numbers from 1..9 that sum to n.
class Solution {
  public:
    vector<vector<int>> combinationSum(int n, int k) {
        vector<vector<int>> res;
        vector<int> path;
        function<void(int,int,int)> dfs = [&](int start, int remaining, int k_left) {
            if (k_left == 0) {
                if (remaining == 0) res.push_back(path);
                return;
            }
            // Prune using min and max possible sums
            int min_sum = 0;
            for (int t = 0; t < k_left; ++t) min_sum += (start + t);
            int max_sum = 0;
            for (int t = 0; t < k_left; ++t) max_sum += (9 - t);
            if (remaining < min_sum || remaining > max_sum) return;

            for (int num = start; num <= 9; ++num) {
                if (num > remaining) break;
                path.push_back(num);
                dfs(num + 1, remaining - num, k_left - 1);
                path.pop_back();
            }
        };

        dfs(1, n, k);
        return res;
    }
};

// Example driver (uncomment to run locally)
// int main() {
//     Solution sol;
//     int n = 9, k = 3;
//     auto ans = sol.combinationSum(n, k);
//     for (auto &v : ans) {
//         for (int x : v) cout << x << ' ';
//         cout << '\n';
//     }
//     return 0;
// }
```

---

### Java

```java
import java.util.ArrayList;

class Solution {
    // Returns all unique combinations of k numbers from 1..9 that sum to n.
    public ArrayList<ArrayList<Integer>> combinationSum(int n, int k) {
        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        ArrayList<Integer> path = new ArrayList<>();
        dfs(1, n, k, path, res);
        return res;
    }

    private void dfs(int start, int remaining, int k_left, ArrayList<Integer> path, ArrayList<ArrayList<Integer>> res) {
        if (k_left == 0) {
            if (remaining == 0) res.add(new ArrayList<>(path));
            return;
        }
        int min_sum = 0;
        for (int t = 0; t < k_left; t++) min_sum += (start + t);
        int max_sum = 0;
        for (int t = 0; t < k_left; t++) max_sum += (9 - t);
        if (remaining < min_sum || remaining > max_sum) return; // prune

        for (int num = start; num <= 9; num++) {
            if (num > remaining) break;
            path.add(num);
            dfs(num + 1, remaining - num, k_left - 1, path, res);
            path.remove(path.size() - 1);
        }
    }
}

// Example usage:
// public static void main(String[] args) {
//     Solution s = new Solution();
//     ArrayList<ArrayList<Integer>> ans = s.combinationSum(9, 3);
//     System.out.println(ans);
// }
```

---

### JavaScript

```javascript
/**
 * @param {number} n
 * @param {number} k
 * @returns {number[][]}
 */
class Solution {
    // Returns all unique combinations of k numbers from 1..9 that sum to n.
    combinationSum(n, k) {
        const res = [];
        const path = [];

        function dfs(start, remaining, k_left) {
            if (k_left === 0) {
                if (remaining === 0) res.push([...path]);
                return;
            }
            let min_sum = 0;
            for (let t = 0; t < k_left; t++) min_sum += (start + t);
            let max_sum = 0;
            for (let t = 0; t < k_left; t++) max_sum += (9 - t);
            if (remaining < min_sum || remaining > max_sum) return;

            for (let num = start; num <= 9; num++) {
                if (num > remaining) break;
                path.push(num);
                dfs(num + 1, remaining - num, k_left - 1);
                path.pop();
            }
        }

        dfs(1, n, k);
        return res;
    }
}

// Example usage:
// const s = new Solution();
// console.log(s.combinationSum(9,3));
```

---

### Python3

```python3
class Solution:
    # Returns all unique combinations of k numbers from 1..9 that sum to n.
    def combinationSum(self, n, k):
        res = []
        path = []

        def dfs(start, remaining, k_left):
            if k_left == 0:
                if remaining == 0:
                    res.append(path.copy())
                return
            # minimal possible sum: start + (start+1) + ... for k_left numbers
            min_sum = sum(start + t for t in range(k_left))
            # maximal possible sum: 9 + 8 + ... for k_left numbers
            max_sum = sum(9 - t for t in range(k_left))
            if remaining < min_sum or remaining > max_sum:
                return

            for num in range(start, 10):  # 1..9 inclusive
                if num > remaining:
                    break
                path.append(num)
                dfs(num + 1, remaining - num, k_left - 1)
                path.pop()

        dfs(1, n, k)
        return res

# Example usage:
# if __name__ == '__main__':
#     s = Solution()
#     print(s.combinationSum(9,3))
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I will explain the main logic using the same core idea for all languages (I'll use Python-like pseudocode snippets and map them to each language):

1. **Driver function**

   * Initialize `res = []` and `path = []`.
   * Call `dfs(1, n, k)` to start picking numbers from `1`.

2. **DFS helper (dfs(start, remaining, k_left))**

   * **Base case:** If `k_left == 0`:

     * If `remaining == 0`, append a copy of `path` to `res`.
     * Return because we cannot pick more numbers.

   * **Pruning:** Compute `min_sum` and `max_sum` for the next `k_left` picks.

     * `min_sum = start + (start+1) + ...` for `k_left` numbers.
     * `max_sum = 9 + 8 + ...` for `k_left` numbers.
     * If `remaining` not in `[min_sum, max_sum]` then return.

   * **Iteration:** For `num` in `[start..9]`:

     * If `num > remaining` then break (because numbers are positive and growing).
     * `path.append(num)`.
     * Recurse: `dfs(num+1, remaining - num, k_left-1)`.
     * `path.pop()` to backtrack.

3. **Why this works:**

   * Using `start` ensures chosen numbers are strictly increasing, hence we avoid duplicates.
   * Pruning with `min_sum` and `max_sum` reduces needless recursion when the target is unreachable.

**Language mapping notes:**

* C++: implemented using `function<void(...)>` lambda for concise recursive capture of `path` and `res`.
* Java: pass `path` and `res` as references and create copies when adding results.
* JavaScript: simple nested `dfs` function and array spread to copy `path`.
* Python3: use `list.copy()` or `path[:]` when appending to results.

---

## Examples

1. **Input:** `n = 9, k = 3`
   **Output:** `[[1,2,6], [1,3,5], [2,3,4]]`
   **Explanation:** There are three valid combinations of 3 distinct numbers from 1..9 that sum to 9.

2. **Input:** `n = 3, k = 3`
   **Output:** `[]`
   **Explanation:** It's not possible to pick 3 distinct numbers from 1..9 that sum to 3.

---

## How to use / Run locally

### C++

1. Save the C++ code into `solution.cpp` (include the example `main` if you want to run it).
2. Compile and run:

```bash
g++ -std=c++17 solution.cpp -O2 -o solution
./solution
```

### Java

1. Save the Java code into `Solution.java`. If using the example `main`, make sure it's inside a `public class Main` or adapt accordingly.
2. Compile and run:

```bash
javac Solution.java
java Solution
```

### JavaScript (Node.js)

1. Save the JS code into `solution.js`. Uncomment the example usage and run:

```bash
node solution.js
```

### Python3

1. Save the Python code into `solution.py`. Uncomment the example usage at the bottom and run:

```bash
python3 solution.py
```

---

## Notes & Optimizations

* **Pruning** with `min_sum` and `max_sum` is the key optimization. It stops impossible branches early.
* Because the candidate set is fixed (1..9), recursion depth is at most 9 and the algorithm is extremely fast in practice.
* Alternative solutions: bitmask enumeration of `1..9` (2^9 subsets) is also possible, but backtracking + pruning is clearer and usually faster for this problem.

---

## Author

[Md. Aarzoo Islam](https://bento.me/withaarzoo)
