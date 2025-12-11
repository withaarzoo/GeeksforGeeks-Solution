# Construct an array from its pair-sum array

## Table of Contents

* ## Problem Summary

* ## Constraints

* ## Intuition

* ## Approach

* ## Data Structures Used

* ## Operations & Behavior Summary

* ## Complexity

* ## Multi-language Solutions

  * ### C++

  * ### Java

  * ### JavaScript

  * ### Python3

* ## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

* ## Examples

* ## How to use / Run locally

* ## Notes & Optimizations

* ## Author

---

## Problem Summary

Given a pair-sum array `arr[]` that was constructed by taking all pairwise sums of an unknown original array `res[]` of size `n` in a fixed order:

```
res[0]+res[1], res[0]+res[2], ..., res[0]+res[n-1],
res[1]+res[2], res[1]+res[3], ...
```

Reconstruct and return the original array `res[]`.

We assume the input `arr` length equals `n*(n-1)/2` for some integer `n` and that `arr` is ordered exactly as above.

---

## Constraints

* Let `m = arr.length`. Then `m = n*(n-1)/2` for some integer `n >= 2`.
* Values in `arr` fit in 32-bit signed integers (we use 64-bit internally when required).
* The array `arr` is ordered as described above.
* Problem variants may or may not require positive original elements; here we reconstruct according to the formula (no extra positivity checks unless requested).

Typical bounds:

* `1 <= n <= 10^3` (so `m` up to ~500k for n=1000) — but typical competitive tests are smaller.

---

## Intuition

I thought: because of the fixed ordering of pair-sums, the first two sums and the (n-1)-th sum correspond to:

* `arr[0] = res[0] + res[1]`
* `arr[1] = res[0] + res[2]`
* `arr[n-1] = res[1] + res[2]`

From those three equations, `res[0]` can be solved:

```
res[0] = (arr[0] + arr[1] - arr[n-1]) / 2
```

Once `res[0]` is known, each `res[i]` is simply:

```
res[i] = arr[i-1] - res[0]   for i = 1 .. n-1
```

This gives the full original array in `O(n)` time (reconstruction). If you need to be defensive, you can regenerate all pair-sums and verify against the input `arr` (costs `O(n^2)`).

---

## Approach

1. Compute `m = arr.length`.
2. Solve `n` from quadratic: `n*(n-1)/2 = m` → `n = (1 + sqrt(1 + 8*m)) / 2`. (Use integer math / rounding.)
3. If `n < 2` or `n` does not match `m`, handle edge cases or return an empty result.
4. Calculate:

   * `res0 = (arr[0] + arr[1] - arr[n - 1]) / 2` using 64-bit safe arithmetic.
5. For `i` from `1` to `n-1`, set:

   * `res[i] = arr[i - 1] - res0`.
6. Return `res`.
7. (Optional) Regenerate pair-sums in the same order and compare to `arr` to confirm correctness (useful for malformed inputs).

---

## Data Structures Used

* Arrays / vectors / ArrayList — size `n`.
* Primitive integer types (use 64-bit internally where sums might overflow 32-bit).

---

## Operations & Behavior Summary

* Input: Ordered pair-sum array `arr` of length `m`.
* Operation: Deduce `n`, compute `res[0]` from first three pair-sums, then compute `res[1..n-1]`.
* Output: The reconstructed `res[]` in the same language-appropriate container.
* Edge cases handled: `m = 0`, `n = 2` (single pair-sum).

---

## Complexity

* **Time Complexity:**

  * Reconstruction: `O(n)` where `n` is length of original array (`m = n*(n-1)/2`).
  * If verification (regenerate pair sums) is done: `O(n^2)` — necessary if you must validate input.
* **Space Complexity:** `O(n)` for the result array.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    vector<int> constructArr(vector<int>& arr) {
        long long m = arr.size();
        long long disc = 1 + 8 * m;
        long long sq = (long long) llround(sqrt((long double)disc));
        long long n = (1 + sq) / 2;
        if (n < 2) return vector<int>((size_t)n);

        vector<int> res((size_t)n, 0);
        long long num = (long long)arr[0] + (long long)arr[1] - (long long)arr[n-1];
        long long r0 = num / 2;
        res[0] = (int)r0;
        for (long long i = 1; i < n; ++i) {
            long long val = (long long)arr[i-1] - r0;
            res[(size_t)i] = (int)val;
        }
        return res;
    }
};
```

### Java

```java
import java.util.ArrayList;

class Solution {
    public ArrayList<Integer> constructArr(int[] arr) {
        ArrayList<Integer> res = new ArrayList<>();
        int m = arr.length;
        if (m == 0) return res;

        long disc = 1L + 8L * m;
        long s = (long) Math.sqrt(disc);
        int n = (int) ((1 + s) / 2);

        if (n == 2) {
            res.add(0);
            res.add(arr[0]);
            return res;
        }

        long s01 = arr[0];
        long s02 = arr[1];
        long s12 = arr[n - 1];

        long r0 = (s01 + s02 - s12) / 2L;
        res.add((int) r0);
        for (int i = 1; i < n; i++) {
            long val = (long) arr[i - 1] - r0;
            res.add((int) val);
        }
        return res;
    }
}
```

### JavaScript

```javascript
class Solution {
    constructArr(arr) {
        const m = arr.length;
        if (m === 0) return [];

        const disc = 1 + 8 * m;
        const s = Math.floor(Math.sqrt(disc));
        const n = Math.floor((1 + s) / 2);

        if (n === 2) return [0, arr[0]];

        const s01 = arr[0], s02 = arr[1], s12 = arr[n - 1];
        const r0 = Math.floor((s01 + s02 - s12) / 2);

        const res = new Array(n).fill(0);
        res[0] = r0;
        for (let i = 1; i < n; ++i) res[i] = arr[i - 1] - r0;
        return res;
    }
}
```

### Python3

```python
class Solution:
    def constructArr(self, arr):
        from math import isqrt
        m = len(arr)
        if m == 0:
            return []
        disc = 1 + 8 * m
        s = isqrt(disc)
        n = (1 + s) // 2

        if n == 2:
            return [0, arr[0]]

        s01 = arr[0]; s02 = arr[1]; s12 = arr[n - 1]
        a1 = (s01 + s02 - s12) // 2

        original = [0] * n
        original[0] = a1
        for i in range(1, n):
            original[i] = arr[i - 1] - a1
        return original
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

> The same logical steps apply in every language; below I explain line-by-line in a language-agnostic manner and call out small syntax differences where needed.

1. **Compute `m`**

   * `m = arr.length` (number of pair-sums).

2. **Compute `n`**

   * Solve `n*(n-1)/2 = m`.
   * Rearranged: `n = (1 + sqrt(1 + 8*m)) / 2`.
   * Compute `disc = 1 + 8*m`, then integer `s = floor(sqrt(disc))`, finally `n = (1 + s) / 2`.
   * Implementation note: use integer math or careful rounding so `n` is an integer when input is valid.

3. **Handle edge cases**

   * If `m == 0` return empty (no data).
   * If `n == 2`, there is exactly one sum `S = arr[0]`. Any two numbers that sum to `S` will do — the examples above pick `[0, S]` for simplicity. (If you need positive integers, use `[1, S-1]` instead.)

4. **Compute `res[0]`**

   * Using the three sums:

     * `s01 = arr[0] = res0 + res1`
     * `s02 = arr[1] = res0 + res2`
     * `s12 = arr[n-1] = res1 + res2`
   * Solve: `res0 = (s01 + s02 - s12) / 2`.

5. **Compute the rest**

   * For each `i` in `1..n-1`:
     `res[i] = arr[i-1] - res0` (since `arr[i-1] = res0 + res[i]`).

6. **Return**

   * Return the result container (vector/ArrayList/array/list) filled with reconstructed values.

7. **(Optional verification)**

   * To be defensive: regenerate all pair sums in the exact order and compare with `arr`. If any mismatch, handle it (return empty or raise error). This step costs `O(n^2)`.

---

## Examples

Example 1:

* Input: `arr = [4, 5, 3]`
  Here `m = 3` → `n = 3`.

  * `res0 = (4 + 5 - 3) / 2 = 3`
  * `res[1] = arr[0] - res0 = 4 - 3 = 1`
  * `res[2] = arr[1] - res0 = 5 - 3 = 2`
* Output: `[3, 1, 2]`

Example 2 (single sum):

* Input: `arr = [10]`
  `m = 1` → `n = 2`. Our simple reconstruction returns `[0, 10]` (or `[1, 9]` if you require positive elements).
* Output: `[0, 10]` (or choose `[1,9]` if positives required)

---

## How to use / Run locally

### C++

1. Put the `Solution` class into the required driver (or add a `main()` to test).
2. Compile:

   ```bash
   g++ -std=c++17 -O2 solution.cpp -o sol
   ./sol
   ```

### Java

1. Place `Solution` class in `Solution.java`.
2. A driver should call `new Solution().constructArr(arr)`.
3. Compile & run:

   ```bash
   javac Solution.java
   java Main   # where Main sets up test arrays and prints result
   ```

### JavaScript (Node.js)

1. Put the `Solution` class into `solution.js` and create a small driver that constructs `arr` and prints `new Solution().constructArr(arr)`.
2. Run:

   ```bash
   node solution.js
   ```

### Python3

1. Put the `Solution` class in `solution.py` and add a snippet:

   ```python
   if __name__ == "__main__":
       s = Solution()
       print(s.constructArr([4,5,3]))
   ```

2. Run:

   ```bash
   python3 solution.py
   ```

---

## Notes & Optimizations

* The reconstruction itself is `O(n)` which is fast compared to the input size `m = O(n^2)`. Reconstructing `n` values from `m` inputs is minimal work.
* Use 64-bit (`long long`, `long`) arithmetic when computing sums or intermediate values to avoid overflow if inputs are large.
* If you must validate that the input is well-formed, regenerate pair sums in the same order and compare — this costs `O(n^2)` and may be expensive for large `n`, but is necessary for untrusted input.
* If the judge requires positive elements (≥1), add a check for each reconstructed value and handle `n==2` separately (return `[1, S-1]` instead of `[0,S]`).
* If the pair-sum ordering differs from the one assumed here, the formula will be different — ensure ordering matches the problem statement.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
