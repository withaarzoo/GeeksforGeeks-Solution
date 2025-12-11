# Construct an array from its pair-sum array

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

Given a **pair-sum array** `arr[]` which contains the sums of all unordered pairs of elements of an unknown original array `res[]` in a fixed triangular order:

* First all sums with `res[0]`: `res[0]+res[1], res[0]+res[2], ..., res[0]+res[n-1]`
* Then sums with `res[1]` excluding `res[0]`: `res[1]+res[2], res[1]+res[3], ...`
* And so on.

From this `arr[]`, I need to reconstruct any valid original array `res[]` of size `n` such that the triangular pair-sum ordering of `res[]` matches `arr[]`.

Important note: `arr.length = m = n*(n-1)/2` (triangular number). We may assume input is valid.

---

## Constraints

* `1 ≤ n ≤ 10^3` (original array size)
* `1 ≤ arr[i] ≤ 10^9`
* `m = arr.length = n*(n-1)/2`
* Values and intermediate sums fit into 64-bit integers (use `long` / `long long` where needed).

---

## Intuition

I thought about how the pair-sum array is produced. Because they list pair sums in rows:

* row 0 (length n-1): `res[0]+res[1], res[0]+res[2], ..., res[0]+res[n-1]`
* row 1 (length n-2): `res[1]+res[2], ...`

So the very first three relevant values in `arr` are:

* `s01 = arr[0] = res[0] + res[1]`
* `s02 = arr[1] = res[0] + res[2]`
* `s12 = arr[n-1] = res[1] + res[2]` (since the first row has `n-1` items, the next element `arr[n-1]` is the first of row 1)

Adding and subtracting these lets me isolate `res[0]`:

```
(s01 + s02 - s12) = 2 * res[0]
=> res[0] = (s01 + s02 - s12) / 2
```

Once I know `res[0]`, for every `i >= 1`:

```
arr[i-1] = res[0] + res[i]  =>  res[i] = arr[i-1] - res[0]
```

So we can reconstruct the entire original array in linear time.

---

## Approach

1. Let `m = len(arr)`. Compute `n` by solving `n*(n-1)/2 = m`:

   ```
   n = (1 + sqrt(1 + 8*m)) / 2
   ```

   (Because m is triangular number.)
2. If `n == 2`, only one pair-sum exists. Return a valid pair such as `[arr[0], 0]`.
3. If `n >= 3`:

   * Let `s01 = arr[0]`, `s02 = arr[1]`, `s12 = arr[n-1]`.
   * Compute `res0 = (s01 + s02 - s12) // 2`.
   * Set `res[0] = res0`. For `i = 1 .. n-1`: `res[i] = arr[i-1] - res0`.
4. Return `res`.

This approach uses only arithmetic and one pass to fill the result. It exploits the fixed order of pair sums.

---

## Data Structures Used

* Input: array/list of integers (`arr[]`) — pair-sums.
* Output: array/list of integers (`res[]`) — reconstructed original array.
* No extra data structures beyond the output array; only a few scalar variables for arithmetic.

---

## Operations & Behavior Summary

* Compute `n` from `m` using square root (constant work).
* Index into `arr` to read the first two sums and the `(n-1)`-th sum (constant).
* Compute `res[0]` by integer arithmetic (constant).
* One linear pass of length `n` to fill `res[]`.
* Output the array.

The program expects the triangular ordering of `arr[]` as described; otherwise results will be incorrect.

---

## Complexity

* **Time Complexity:** `O(n)` where `n` is the size of the original array. (Computing `n` from `m` is `O(1)`. Reconstructing `n` elements takes `O(n)`.)
* **Space Complexity:** `O(n)` to store the output original array. Auxiliary extra space is `O(1)`.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

/*
 Reconstruct original array 'res' from pair-sum array 'arr' (triangular ordering).
 Uses 64-bit integers to avoid overflow.
*/
class Solution {
  public:
    vector<long long> constructArr(const vector<long long>& arr) {
        long long m = arr.size();
        if (m == 0) return {};

        // Solve n*(n-1)/2 = m  =>  n = (1 + sqrt(1 + 8*m)) / 2
        long long disc = 1 + 8 * m;
        long long sq = (long long) floor(sqrt((long double)disc));
        long long n = (1 + sq) / 2;

        if (n < 2) return {};

        if (n == 2) {
            // Only one pair-sum -> return a valid pair [s, 0]
            return {arr[0], 0};
        }

        // s01 = arr[0] = res0 + res1
        // s02 = arr[1] = res0 + res2
        // s12 = arr[n-1] = res1 + res2
        long long s01 = arr[0];
        long long s02 = arr[1];
        long long s12 = arr[n - 1];

        // res0 = (s01 + s02 - s12) / 2
        long long res0 = (s01 + s02 - s12) / 2;

        vector<long long> res(n);
        res[0] = res0;
        for (long long i = 1; i < n; ++i) {
            // arr[i-1] = res0 + res[i]  => res[i] = arr[i-1] - res0
            res[i] = arr[i - 1] - res0;
        }
        return res;
    }
};

// Example usage (main function)
int main() {
    vector<long long> pairSums = {4, 5, 3}; // example input
    Solution sol;
    vector<long long> original = sol.constructArr(pairSums);
    for (auto v : original) cout << v << " ";
    cout << "\n";
    return 0;
}
```

---

### Java

```java
import java.util.*;
/*
 Reconstruct original array 'res' from pair-sum array 'arr' (triangular ordering).
 Use long to avoid overflow.
*/
class Solution {
    public ArrayList<Long> constructArr(long[] arr) {
        int m = arr.length;
        ArrayList<Long> resList = new ArrayList<>();
        if (m == 0) return resList;

        long disc = 1L + 8L * m;
        long sq = (long) Math.floor(Math.sqrt(disc));
        long n = (1 + sq) / 2;

        if (n < 2) return resList;

        if (n == 2) {
            // only one pair-sum -> return [s, 0]
            resList.add(arr[0]);
            resList.add(0L);
            return resList;
        }

        long s01 = arr[0];            // res0 + res1
        long s02 = arr[1];            // res0 + res2
        long s12 = arr[(int)(n - 1)]; // res1 + res2

        long res0 = (s01 + s02 - s12) / 2;

        resList.add(res0);
        for (int i = 1; i < n; ++i) {
            long val = arr[i - 1] - res0; // arr[i-1] = res0 + res[i]
            resList.add(val);
        }
        return resList;
    }

    // Example usage
    public static void main(String[] args) {
        long[] pairSums = {4, 5, 3};
        Solution sol = new Solution();
        ArrayList<Long> original = sol.constructArr(pairSums);
        for (Long v : original) System.out.print(v + " ");
        System.out.println();
    }
}
```

---

### JavaScript

```javascript
/*
 Reconstruct original array 'res' from pair-sum array 'arr' (triangular ordering).
 Uses Number (double) but works with integers within safe range.
*/
class Solution {
    constructArr(arr) {
        const m = arr.length;
        if (m === 0) return [];

        const disc = 1 + 8 * m;
        const sq = Math.floor(Math.sqrt(disc));
        const n = Math.floor((1 + sq) / 2);

        if (n < 2) return [];

        if (n === 2) {
            // only one pair-sum -> return [s, 0]
            return [arr[0], 0];
        }

        const s01 = arr[0];      // res0 + res1
        const s02 = arr[1];      // res0 + res2
        const s12 = arr[n - 1];  // res1 + res2

        const res0 = Math.floor((s01 + s02 - s12) / 2);

        const res = new Array(n);
        res[0] = res0;
        for (let i = 1; i < n; ++i) {
            res[i] = arr[i - 1] - res0; // arr[i-1] = res0 + res[i]
        }
        return res;
    }
}

// Example usage
const pairSums = [4, 5, 3];
const sol = new Solution();
console.log(sol.constructArr(pairSums)); // prints reconstructed array
```

---

### Python3

```python
import math

class Solution:
    def constructArr(self, arr):
        m = len(arr)
        if m == 0:
            return []

        # Solve n*(n-1)//2 = m  => n = (1 + sqrt(1 + 8*m)) // 2
        disc = 1 + 8 * m
        sq = int(math.isqrt(disc))
        n = (1 + sq) // 2

        if n < 2:
            return []

        if n == 2:
            # only one pair-sum -> return [s, 0]
            return [arr[0], 0]

        # arr[0] = res0 + res1
        # arr[1] = res0 + res2
        # arr[n-1] = res1 + res2
        s01 = arr[0]
        s02 = arr[1]
        s12 = arr[n - 1]

        res0 = (s01 + s02 - s12) // 2

        res = [0] * n
        res[0] = res0
        for i in range(1, n):
            # arr[i-1] = res0 + res[i] => res[i] = arr[i-1] - res0
            res[i] = arr[i - 1] - res0
        return res

# Example usage
if __name__ == "__main__":
    pairSums = [4, 5, 3]
    sol = Solution()
    print(sol.constructArr(pairSums))
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain the logic line-by-line and the important parts as if I'm teaching a friend.

### 1) Determine `n` from length `m`

* We know `m = n*(n-1)/2` because there are that many unordered pairs.
* Solve the quadratic equation for `n`:

  ```
  n^2 - n - 2m = 0
  n = (1 + sqrt(1 + 8*m)) / 2
  ```

* Use integer sqrt and integer division. The input guarantees `m` is triangular.

### 2) Handle small `n`

* If `n == 2`, there's only one pair sum `s = arr[0]`. Any two numbers that sum to `s` are valid — I choose `[s, 0]` as a simple valid reconstruction.

### 3) Extract first three key sums

* Because of triangular ordering:

  * `s01 = arr[0]` is `res[0]+res[1]`
  * `s02 = arr[1]` is `res[0]+res[2]`
  * `s12 = arr[n-1]` is `res[1]+res[2]`
    (The first row contains `n-1` items — those are `res[0] + res[1..n-1]`. So the next element `arr[n-1]` begins the second row.)

### 4) Compute `res[0]`

* Add first two sums and subtract third:

  ```
  s01 + s02 - s12 = (res0+res1) + (res0+res2) - (res1+res2) = 2*res0
  ```

  So:

  ```
  res0 = (s01 + s02 - s12) / 2
  ```

* Use integer division — values are integers if input is consistent.

### 5) Compute remaining elements

* For each `i >= 1`, `arr[i-1] = res0 + res[i]`. So:

  ```
  res[i] = arr[i-1] - res0
  ```

* Fill the result array in a single pass.

### 6) Return `res`

---

## Examples

1. Input: `arr = [4, 5, 3]`

   * Compute `m=3`. Solve `n*(n-1)/2 = 3` -> `n=3`.
   * `s01 = 4`, `s02 = 5`, `s12 = arr[2] = 3`.
   * `res0 = (4 + 5 - 3) / 2 = 3`
   * `res = [3, arr[0]-3, arr[1]-3] = [3, 1, 2]`
   * Output: `[3, 1, 2]` (pair sums: 3+1=4, 3+2=5, 1+2=3)

2. Input: `arr = [3]`

   * `m=1`, `n=2`
   * Return `[3, 0]` (one valid reconstruction)

---

## How to use / Run locally

1. **C++**

   * Save the code as `construct_from_pairs.cpp`.
   * Compile:

     ```
     g++ -std=c++17 construct_from_pairs.cpp -O2 -o construct
     ```

   * Run:

     ```
     ./construct
     ```

2. **Java**

   * Save as `Solution.java`.
   * Compile:

     ```
     javac Solution.java
     ```

   * Run:

     ```
     java Solution
     ```

3. **JavaScript (Node.js)**

   * Save as `solution.js`.
   * Run:

     ```
     node solution.js
     ```

4. **Python3**

   * Save as `solution.py`.
   * Run:

     ```
     python3 solution.py
     ```

Replace example `pairSums` arrays in the `main` / example sections to test other inputs.

---

## Notes & Optimizations

* I use 64-bit integers (`long` / `long long`) in C++/Java to avoid overflow when computing sums.
* The method assumes the input triangular ordering is exact. If input may be shuffled, a different approach (sorting and/or multiset reconstructions) would be required.
* This approach is optimal for this problem statement: `O(n)` time and `O(n)` space.
* Edge cases:

  * If `m = 0` => return `[]`.
  * If `n*(n-1)/2 != m` (invalid input), the computed `n` might be wrong; in robust code, validate `n` equals `(1 + sqrt(1+8m))/2` and is integer.
* For very large inputs, ensure integer arithmetic does not overflow; use 64-bit integers.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
