# Number of BST From Array — README

## Table of Contents

* [Problem Title](#problem-title)
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

## Problem Title

**Number of BST From Array**

---

## Problem Summary

You are given an integer array `arr[]` containing **distinct** elements. For each index `i`, return the number of unique Binary Search Trees (BSTs) that can be formed when `arr[i]` is chosen as the root and all other elements are used (maintaining BST property).

Because the elements are distinct, all elements smaller than `arr[i]` must go in the left subtree and all larger must go in the right subtree. The number of BSTs possible for a subtree of size `k` equals the `k`-th Catalan number.

---

## Constraints

* `1 ≤ arr.size() ≤ 6` (problem-specific constraint; small `n`)
* `1 ≤ arr[i] ≤ 15`
* All elements in `arr` are **distinct**.

> Note: My solution works for larger `n` too, but Catalan numbers grow quickly — consider big integer handling if `n` becomes large.

---

## Intuition

I thought about how a BST is uniquely constrained by the number of nodes in the left and right subtrees. For any chosen root `r`, the count of nodes smaller than `r` (call this `L`) must be in the left subtree; the rest `R = n - 1 - L` are in the right subtree. The number of BSTs with `L` nodes on the left and `R` on the right equals `Catalan(L) * Catalan(R)`. So if I precompute Catalan numbers up to `n`, I can answer for each element in `O(1)` after computing its rank (number of smaller elements).

---

## Approach

1. Let `n = arr.size()`.
2. Precompute Catalan numbers `C[0..n]` using the standard DP recurrence:
   `C[0] = 1`, and for `i >= 1`: `C[i] = sum_{j=0..i-1} C[j] * C[i-1-j]`.
3. To know how many elements are smaller than `arr[i]`, sort a copy of `arr` and record each value's index (rank). Because elements are distinct, the index in the sorted array is exactly the number of elements smaller.
4. For each `arr[i]`, compute `left = rank[arr[i]]`, `right = n - 1 - left`, and answer = `C[left] * C[right]`.
5. Return the answers array.

This uses Catalan precomputation once and one mapping pass over `arr`.

---

## Data Structures Used

* Arrays / Vectors for:

  * input `arr`
  * `catalan` DP table
  * `ans` result array
  * copy of `arr` for sorting
* Hash map / dictionary (`unordered_map`, `HashMap`, `Map`, or `dict`) to map value → rank (number of smaller elements).

---

## Operations & Behavior Summary

* Sorting the array to compute ranks.
* DP loop to compute Catalan numbers.
* Multiplication of two Catalan numbers per element for final result.
* Works deterministically for distinct elements.

---

## Complexity

* **Time Complexity:**

  * Precompute Catalan: `O(n^2)` (DP double loop).
  * Sorting to compute ranks: `O(n log n)`.
  * Final mapping and result computation: `O(n)`.
  * Overall: `O(n^2 + n log n)` — for the given constraint (n ≤ 6) this is trivially fast.

* **Space Complexity:**

  * `O(n)` extra space for `catalan`, `ans`, and rank mapping.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

/*
 Compute Catalan numbers up to n. For each value in arr, find how many elements
 are smaller (rank). Answer for each element = catalan[left] * catalan[right].
*/
class Solution {
  public:
    vector<int> countBSTs(vector<int>& arr) {
        int n = arr.size();
        vector<int> ans(n, 0);
        if (n == 0) return ans;

        // Catalan DP
        vector<int> catalan(n+1, 0);
        catalan[0] = 1;
        for (int i = 1; i <= n; ++i) {
            long long sum = 0;
            for (int j = 0; j < i; ++j) {
                sum += 1LL * catalan[j] * catalan[i-1-j];
            }
            catalan[i] = (int)sum;
        }

        // Map each value to its rank (number of smaller elements)
        vector<int> sorted_arr = arr;
        sort(sorted_arr.begin(), sorted_arr.end());
        unordered_map<int,int> rank;
        for (int i = 0; i < n; ++i) rank[sorted_arr[i]] = i;

        // Build answer
        for (int i = 0; i < n; ++i) {
            int left = rank[arr[i]];
            int right = n - 1 - left;
            ans[i] = catalan[left] * catalan[right];
        }
        return ans;
    }
};
```

---

### Java

```java
import java.util.*;

class Solution {
    public ArrayList<Integer> countBSTs(int[] arr) {
        int n = arr.length;
        ArrayList<Integer> ans = new ArrayList<>();
        if (n == 0) return ans;

        // Catalan DP
        int[] catalan = new int[n+1];
        catalan[0] = 1;
        for (int i = 1; i <= n; ++i) {
            long sum = 0;
            for (int j = 0; j < i; ++j) {
                sum += 1L * catalan[j] * catalan[i-1-j];
            }
            catalan[i] = (int)sum;
        }

        // Rank mapping
        int[] sorted = Arrays.copyOf(arr, n);
        Arrays.sort(sorted);
        HashMap<Integer,Integer> rank = new HashMap<>();
        for (int i = 0; i < n; ++i) rank.put(sorted[i], i);

        // Compute answers
        for (int v : arr) {
            int left = rank.get(v);
            int right = n - 1 - left;
            ans.add(catalan[left] * catalan[right]);
        }
        return ans;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @return {number[]}
 */
class Solution {
    countBSTs(arr) {
        const n = arr.length;
        const ans = new Array(n).fill(0);
        if (n === 0) return ans;

        // Catalan DP
        const catalan = new Array(n+1).fill(0);
        catalan[0] = 1;
        for (let i = 1; i <= n; ++i) {
            let sum = 0n; // BigInt for safety
            for (let j = 0; j < i; ++j) {
                sum += BigInt(catalan[j]) * BigInt(catalan[i-1-j]);
            }
            catalan[i] = Number(sum);
        }

        // Rank mapping
        const sorted = Array.from(arr).sort((a,b) => a - b);
        const rank = new Map();
        for (let i = 0; i < n; ++i) rank.set(sorted[i], i);

        // Answers
        for (let i = 0; i < n; ++i) {
            const left = rank.get(arr[i]);
            const right = n - 1 - left;
            ans[i] = catalan[left] * catalan[right];
        }
        return ans;
    }
}
```

---

### Python3

```python3
class Solution:
    def countBSTs(self, arr):
        """
        Precompute Catalan numbers, map each value to number of smaller elements,
        result for each value = catalan[left] * catalan[right].
        """
        n = len(arr)
        ans = [0] * n
        if n == 0:
            return ans

        # Catalan DP
        catalan = [0] * (n + 1)
        catalan[0] = 1
        for i in range(1, n + 1):
            s = 0
            for j in range(i):
                s += catalan[j] * catalan[i - 1 - j]
            catalan[i] = s

        # Rank mapping via sorted copy
        sorted_arr = sorted(arr)
        rank = {val: idx for idx, val in enumerate(sorted_arr)}

        # Compute results
        for i, v in enumerate(arr):
            left = rank[v]
            right = n - 1 - left
            ans[i] = catalan[left] * catalan[right]
        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain the core idea and code blocks so you can teach it to a friend.

### 1) Why Catalan numbers?

* If a subtree has `k` nodes, the number of structurally different BSTs that can be formed from those `k` distinct keys equals the `k`-th Catalan number.
* When I pick a root `r`, exactly `L` nodes (values smaller than `r`) must be left children and `R` nodes (values larger than `r`) must be right children.
* The total BSTs with `r` as root = `Catalan(L) * Catalan(R)` because left and right structures combine independently.

### 2) How do I get `L` for each element?

* Sort the array (a copy), then the index of a value in this sorted array equals how many elements are smaller than it — because elements are distinct.
* So `rank[value] = index_in_sorted`.

### 3) Precompute Catalans

* Use DP: `C[0] = 1`. For each `i` from `1` to `n`:

  ```
  C[i] = sum_{j=0..i-1} C[j] * C[i-1-j]
  ```

  This counts all splits of `i` nodes into `left` and `right`.

### 4) Final answer per element

* For `arr[i]`:

  * `left = rank[arr[i]]`
  * `right = n - 1 - left`
  * `answer = Catalan[left] * Catalan[right]`

### 5) Why precompute?

* Catalan values are used repeatedly (for different elements). Precomputation avoids recomputing them repeatedly.

### 6) Example walkthrough (applies to all languages)

* Example: `arr = [2, 1, 3]`, `n = 3`.

  * Sorted = `[1, 2, 3]`
  * Ranks: `1 -> 0`, `2 -> 1`, `3 -> 2`.
  * Catalan: `C0 = 1, C1 = 1, C2 = 2, C3 = 5` (we compute up to `n`).
  * For `2` (rank 1): left = 1, right = 1 => `C1 * C1 = 1 * 1 = 1`.
  * For `1` (rank 0): left = 0, right = 2 => `C0 * C2 = 1 * 2 = 2`.
  * For `3` (rank 2): left = 2, right = 0 => `C2 * C0 = 2 * 1 = 2`.
  * Output `[1, 2, 2]`.

---

## Examples

1. Input: `[2, 1, 3]`
   Output: `[1, 2, 2]`
   Explanation: Root 2 has 1 left and 1 right => 1 BST; root 1 or 3 have 0 left and 2 right (or vice versa) => 2 BSTs each.

2. Input: `[2, 1]`
   Output: `[1, 1]`
   Explanation: Each value as root yields one BST (other node must be left or right child).

---

## How to use / Run locally

### C++

1. Put the `Solution` class code in a `.cpp` file and write a `main()` that calls `countBSTs`.
2. Compile & run:

```bash
g++ -std=c++17 solution.cpp -O2 -o solution
./solution
```

### Java

1. Put the `Solution` class in `Solution.java`. Add a `main` method to create an instance and call `countBSTs`.
2. Compile & run:

```bash
javac Solution.java
java Solution
```

### JavaScript (Node.js)

1. Put the class in `solution.js`, add code to instantiate and call `countBSTs` and print the result.
2. Run:

```bash
node solution.js
```

### Python3

1. Put the `Solution` class and a test driver in `solution.py`.
2. Run:

```bash
python3 solution.py
```

---

## Notes & Optimizations

* For the problem constraints (`n ≤ 6`) integer arithmetic is safe. For larger `n`, Catalan numbers grow fast; you may need `BigInteger` (Java), `boost::multiprecision::cpp_int` (C++), or use `BigInt` (JS) / Python `int` (Python automatically supports big integers).
* Alternative Catalan computation: `Catalan(n) = C(2n, n) / (n+1)` using binomial coefficients — this can be faster if you use fast factorials and modular arithmetic (if modulo is required).
* If there were repeated elements (not in this problem), the approach would change: we would need combinatorics to handle equal keys (or the problem definition would forbid duplicates).
* Memory is `O(n)` and time is dominated by Catalan DP `O(n^2)` — fine for small `n`. For very large `n`, use closed-form formulas or faster polynomial multiplication methods.

---

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
