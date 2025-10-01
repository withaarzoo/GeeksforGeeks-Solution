# All Unique Permutations of an Array

> Generate all **unique** permutations of an integer array that may contain duplicates.

---

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

Given an array of integers `arr` that **may contain duplicate values**, return all possible **unique** permutations of the array. The order of permutations in the result does not matter.

**Example:**

```
Input:  [1, 1, 2]
Output: [[1,1,2], [1,2,1], [2,1,1]]
```

## Constraints

* `0 <= n <= 10` is a reasonable practical limit to consider because permutations grow factorially — for larger `n` the output becomes huge and impractical to store or traverse.
* Array elements are integers (can be negative, zero, positive).
* The solution should not return duplicate permutations.

> Note: Exact constraint limits depend on the platform (GeeksforGeeks, LeetCode, etc.). The algorithm here is general-purpose and works for typical input sizes used in competitive programming.

## Intuition

I thought about how permutations are normally generated: choose each element in turn and backtrack. When elements are distinct I can freely choose any unused element. But duplicates cause repeated permutations. To avoid duplicates I first **sort** the array so equal values are adjacent, then while backtracking I **skip** choosing an element if it's the same as the previous element and the previous one hasn't been used in the current recursion path. This enforces a consistent ordering of identical values and prevents generating the same permutation multiple times.

## Approach

1. Sort the input array `arr`.
2. Use backtracking (recursive DFS) to build permutations.
3. Maintain:

   * `curr` — the current permutation being built (array/list).
   * `used` — boolean array that tracks which indices have been included in `curr`.
   * `result` — list of completed unique permutations.
4. For each recursion level iterate over indices `i` from `0` to `n-1`:

   * If `used[i]` is `true`, skip it.
   * If `i > 0 && arr[i] == arr[i-1] && !used[i-1]`, skip it too — this avoids duplicates.
   * Otherwise, pick `arr[i]`, mark `used[i] = true`, recurse, then backtrack.
5. When `curr.size() == n`, append a **copy** of `curr` to `result`.

This way I generate each unique permutation exactly once.

## Data Structures Used

* Array / Vector / List for the input.
* `vector<vector<int>>` / `ArrayList<ArrayList<Integer>>` / `number[][]` / `List[List[int]]` for results.
* `used` boolean array of length `n` to mark chosen indices.
* Recursion stack for DFS/backtracking.

## Operations & Behavior Summary

* Sorting groups duplicates and allows an easy check for skipping repeated choices.
* `used` is based on **indices** (not values) so identical values are treated distinctly by position while generating permutations; the duplicate-skip rule prevents equivalent orderings.
* The algorithm generates permutations in a depth-first manner and pushes a copy of the current permutation when length reaches `n`.

## Complexity

* **Time Complexity:**

  * Let `n` be number of elements and `k` be number of **unique** permutations. The algorithm does `O(k * n)` work in total: there are `k` leaf permutations and each leaf requires copying `n` elements to store it. Worst-case (all elements distinct) `k = n!`, so worst-case time is `O(n! * n)`.

* **Space Complexity:**

  * Extra space is `O(n)` for recursion depth and the `used` array and current permutation. The output requires `O(k * n)` to store all unique permutations.

---

## Multi-language Solutions

Below are clean, optimized, and well-commented implementations in C++, Java, JavaScript and Python3.

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    // Returns all unique permutations of arr
    vector<vector<int>> uniquePerms(vector<int>& arr) {
        int n = arr.size();
        vector<vector<int>> res;
        if (n == 0) {
            res.push_back({});
            return res;
        }
        sort(arr.begin(), arr.end());            // group duplicates
        vector<int> curr;                        // current permutation
        vector<bool> used(n, false);             // marks indices already used

        function<void()> dfs = [&]() {
            if ((int)curr.size() == n) {
                res.push_back(curr);              // store a copy
                return;
            }
            for (int i = 0; i < n; ++i) {
                if (used[i]) continue;            // skip chosen index
                // skip duplicates: if same as previous and previous not used
                if (i > 0 && arr[i] == arr[i-1] && !used[i-1]) continue;
                used[i] = true;
                curr.push_back(arr[i]);
                dfs();
                curr.pop_back();                  // backtrack
                used[i] = false;
            }
        };

        dfs();
        return res;
    }
};

// Example driver (uncomment to run standalone)
// int main() {
//     vector<int> arr = {1, 1, 2};
//     Solution s;
//     auto ans = s.uniquePerms(arr);
//     for (auto &p : ans) {
//         for (int x : p) cout << x << ' ';
//         cout << '\n';
//     }
//     return 0;
// }
```

### Java

```java
import java.util.*;

class Solution {
    public static ArrayList<ArrayList<Integer>> uniquePerms(int[] arr) {
        int n = arr.length;
        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        if (n == 0) {
            res.add(new ArrayList<>());
            return res;
        }
        Arrays.sort(arr); // group duplicates
        boolean[] used = new boolean[n];
        ArrayList<Integer> curr = new ArrayList<>();

        class Backtrack {
            void dfs() {
                if (curr.size() == n) {
                    res.add(new ArrayList<>(curr));
                    return;
                }
                for (int i = 0; i < n; i++) {
                    if (used[i]) continue;
                    if (i > 0 && arr[i] == arr[i-1] && !used[i-1]) continue; // skip duplicates
                    used[i] = true;
                    curr.add(arr[i]);
                    dfs();
                    curr.remove(curr.size() - 1); // backtrack
                    used[i] = false;
                }
            }
        }

        new Backtrack().dfs();
        return res;
    }

    // Example driver (uncomment to run)
    // public static void main(String[] args) {
    //     int[] arr = {1,1,2};
    //     ArrayList<ArrayList<Integer>> out = uniquePerms(arr);
    //     for (ArrayList<Integer> p : out) System.out.println(p);
    // }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @returns {number[][]}
 */
class Solution {
    uniquePerms(arr) {
        const n = arr.length;
        const res = [];
        if (n === 0) {
            res.push([]);
            return res;
        }
        arr.sort((a, b) => a - b);      // group duplicates
        const used = new Array(n).fill(false);
        const curr = [];

        function dfs() {
            if (curr.length === n) {
                res.push(curr.slice()); // push copy
                return;
            }
            for (let i = 0; i < n; ++i) {
                if (used[i]) continue;
                if (i > 0 && arr[i] === arr[i - 1] && !used[i - 1]) continue; // skip duplicates
                used[i] = true;
                curr.push(arr[i]);
                dfs();
                curr.pop();
                used[i] = false;
            }
        }

        dfs();
        return res;
    }
}

// Example usage (uncomment to run with Node.js)
// const s = new Solution();
// console.log(s.uniquePerms([1,1,2]));
```

### Python3

```python3
class Solution:
    def uniquePerms(self, arr):
        """
        :param arr: List[int]
        :return: List[List[int]]
        """
        n = len(arr)
        res = []
        if n == 0:
            res.append([])
            return res

        arr.sort()               # group duplicates
        used = [False] * n
        curr = []

        def dfs():
            if len(curr) == n:
                res.append(curr.copy())
                return
            for i in range(n):
                if used[i]:
                    continue
                if i > 0 and arr[i] == arr[i-1] and not used[i-1]:
                    continue
                used[i] = True
                curr.append(arr[i])
                dfs()
                curr.pop()
                used[i] = False

        dfs()
        return res

# Example usage (uncomment to run):
# if __name__ == '__main__':
#     print(Solution().uniquePerms([1,1,2]))
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain the core algorithm once (it maps to each language). Then I will highlight language-specific mapping notes.

**Core algorithm (single concise explanation):**

1. **Sort the array.** This groups equal values together and makes it possible to decide when a value should be skipped to avoid duplicate permutations.
2. **Backtracking (DFS):** Build `curr` step-by-step by choosing unused indices.
3. **Use `used` boolean array:** It marks which indices have been taken. Using indices (not values) allows treating duplicate values as distinct positions during generation.
4. **Duplicate-skip rule:** When considering index `i`, if `i > 0 && arr[i] == arr[i-1] && !used[i-1]` then skip `i`. This ensures that among equal values we always try them in left-to-right order in any single recursion path.
5. **When `curr.size() == n`,** add a copy of `curr` to the result.

### Language-specific notes

* **C++**

  * `sort(arr.begin(), arr.end())` arranges duplicates.
  * `vector<bool> used(n, false)` indicates taken indices.
  * The lambda `dfs` captures local variables by reference to keep code compact.
  * Copying `curr` into `res` stores the permutation snapshot.

* **Java**

  * `Arrays.sort(arr)` sorts the array.
  * `boolean[] used` tracks used indices.
  * Create an inner class `Backtrack` to define recursion (`dfs`) so that it can access `curr` and `used` variables comfortably.
  * Use `new ArrayList<>(curr)` to copy current permutation.

* **JavaScript**

  * `arr.sort((a,b) => a-b)` sorts numerically.
  * `used` array and recursion `dfs` are straightforward closures.
  * `curr.slice()` makes a shallow copy to push into `res`.

* **Python3**

  * `arr.sort()` sorts in-place.
  * `used` is a list of booleans. `curr.copy()` creates a snapshot.
  * Recursion uses a nested `dfs` function which captures `arr`, `used`, `curr`, `res`.

In all languages the **duplicate-skip rule** is the same and is the crucial trick to avoid repeated permutations.

---

## Examples

1. `arr = [1,1,2]`  → `[[1,1,2],[1,2,1],[2,1,1]]`
2. `arr = [1,2,3]`  → `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`
3. `arr = []`       → `[[]]` (one empty permutation)

---

## How to use / Run locally

**C++**

1. Save the C++ code to `solution.cpp`.
2. Compile: `g++ -std=c++17 solution.cpp -O2 -o solution`
3. Run: `./solution`

**Java**

1. Save the Java code to `Solution.java` (or include in a file with a `main` wrapper).
2. Compile: `javac Solution.java`
3. Run: `java Solution` (if `main` is provided in the file)

**JavaScript (Node.js)**

1. Save the code to `solution.js`.
2. Run: `node solution.js`

**Python3**

1. Save the code to `solution.py`.
2. Run: `python3 solution.py`

> For each language the repository can contain a small driver (example `main`) that demonstrates how to call the function and prints the output.

---

## Notes & Optimizations

* The backtracking + duplicate-skip approach is standard and optimal for generating **unique** permutations without extra filtering.

* **Alternative**: In C++ and Python you can also use a lexicographic generation method:

  * Sort the array and repeatedly call `next_permutation` (C++) or implement a `next_permutation` helper (Python) to enumerate permutations in lexicographic order — this will produce each unique permutation once when started from a sorted array.
  * However, the backtracking approach gives more direct control and is easy to adapt to additional constraints.

* Memory: Output size is the dominant factor. For large `n` the number of unique permutations explodes — avoid storing all permutations if you only need to stream or count them.

* If you only need the count of unique permutations, compute it combinatorially by `n! / (freq(v1)! * freq(v2)! * ...)` where `freq` are frequency of each distinct value.

---

## Author

* **[Md. Aarzoo Islam](https://bento.me/withaarzoo)** (as the problem solver) — writeup and multi-language solutions
