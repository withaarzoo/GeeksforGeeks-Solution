# All Subsets Xor Sum

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

Given an array `arr[]`, I need to find the **sum of XOR of all elements for every possible subset** of the array.

* Subsets with the same elements but different positions are considered the same, but they are still counted as separate subsets when generated normally.
* The empty subset has XOR value `0`.
* The final answer is guaranteed to fit inside a 32-bit integer.

**Example:**

* Input: `arr = [1, 2, 3]`
  All subsets:
  `[] , [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]`
  XOR of each subset:
  `0, 1, 2, 3, (1^2)=3, (1^3)=2, (2^3)=1, (1^2^3)=0`
  Sum = `0+1+2+3+3+2+1+0 = 12`

---

## Constraints

* `1 ≤ arr.size() ≤ 30`
* `1 ≤ arr[i] ≤ 10^3`
* Answer fits in a signed 32-bit integer.

---

## Intuition

At first, I thought about doing it in the most direct way:

1. Generate all subsets of the array.
2. For each subset, compute the XOR of its elements.
3. Add all those XOR values.

But for `n` elements, there are `2^n` subsets.
Here `n` can be up to **30**, so `2^30` is around **1 billion** subsets — that's too slow.

So I changed my view.
Instead of thinking about each subset, I started thinking **bit by bit**.

I asked myself:

* For a particular bit position (like 1, 2, 4, 8, …), how many times does this bit contribute to the final sum of all XORs?

Then I realized:

* If a certain bit appears in **at least one** array element, that bit will be `1` in the XOR result of **exactly half** of all subsets.
* The total number of subsets is `2^n`, so each present bit contributes in `2^(n-1)` subset-XORs.

So if I know **which bits exist in any element**, I can directly count their total contribution.

To get all bits that appear anywhere, I can just compute the **bitwise OR** of all elements.

Let:

* `allOr = arr[0] | arr[1] | ... | arr[n-1]`
* `multiplier = 2^(n-1)`

Then:

> **Answer = allOr × multiplier**

---

## Approach

1. **Compute the bitwise OR of all elements.**

   * Initialize `allOr = 0`.
   * For each `x` in `arr`, do `allOr |= x`.
   * After the loop, `allOr` has all bits that appear in at least one element.

2. **Compute how many times each bit contributes.**

   * For `n` elements, total subsets = `2^n`.
   * Any present bit is `1` in exactly half of the subsets → `2^(n-1)`.
   * Compute this as `1 << (n - 1)`.

3. **Multiply.**

   * Final answer = `allOr * (1 << (n - 1))`.
   * Use a larger integer type (like `long long`, `long`, `BigInt`) during multiplication for safety.
   * Cast or convert back to normal integer at the end.

4. **Return the answer.**

This avoids generating subsets and gives an O(n) solution.

---

## Data Structures Used

* Only **primitive integers**:

  * `int` / `long long` / `long` / `BigInt` depending on language.
* No extra arrays, sets, or maps.

---

## Operations & Behavior Summary

For a given array `arr`:

1. I loop once over the array to compute `allOr` using bitwise OR.
2. I compute `multiplier = 2^(n-1)` using bit shifting.
3. I multiply `allOr` and `multiplier`.
4. I return this product as the result.

Function signatures:

* C++: `int subsetXORSum(vector<int>& arr)`
* Java: `int subsetXORSum(int arr[])`
* JavaScript: `subsetXORSum(arr)`
* Python3: `subsetXORSum(self, arr)`

---

## Complexity

* **Time Complexity:** `O(n)`

  * I scan the array once to compute the OR, where `n` is the size of the array.
  * The bit shift and multiplication are O(1).

* **Space Complexity:** `O(1)`

  * I use only a few variables (`allOr`, `multiplier`, `ans`).
  * No extra data structures of size proportional to `n`.

---

## Multi-language Solutions

### C++

```c++
class Solution {
  public:
    int subsetXORSum(vector<int>& arr) {
        int n = arr.size();
        
        // Step 1: Compute OR of all elements
        int allOr = 0;
        for (int x : arr) {
            allOr |= x;  // collect all bits that appear in the array
        }
        
        // Step 2: Each present bit contributes in 2^(n-1) subset XORs
        long long multiplier = 1LL << (n - 1);
        
        // Step 3: Final answer = allOr * 2^(n-1)
        long long ans = 1LL * allOr * multiplier;
        
        // The answer is guaranteed to fit in 32-bit integer
        return (int) ans;
    }
}; 
```

---

### Java

```java
class Solution {
    int subsetXORSum(int arr[]) {
        int n = arr.length;
        
        // Step 1: Compute OR of all elements
        int allOr = 0;
        for (int x : arr) {
            allOr |= x;  // collect all bits that appear in the array
        }
        
        // Step 2: Each present bit contributes in 2^(n-1) subset XORs
        long multiplier = 1L << (n - 1);
        
        // Step 3: Final answer = allOr * 2^(n-1)
        long ans = (long) allOr * multiplier;
        
        return (int) ans;  // guaranteed to fit in 32-bit
    }
} 
```

---

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @returns {number}
 */

class Solution {
    subsetXORSum(arr) {
        const n = arr.length;

        // Step 1: Compute OR of all elements
        let allOr = 0;
        for (const x of arr) {
            allOr |= x;  // collect all bits that appear in the array
        }

        // Step 2: Each present bit contributes in 2^(n-1) subset XORs
        // Use BigInt for safety in intermediate multiplication
        const multiplier = 1n << BigInt(n - 1);

        // Step 3: Final answer = allOr * 2^(n-1)
        const ans = BigInt(allOr) * multiplier;

        // Convert back to Number (safe because result fits in 32-bit)
        return Number(ans);
    }
} 
```

---

### Python3

```python
class Solution:
    def subsetXORSum(self, arr):
        n = len(arr)
        
        # Step 1: Compute OR of all elements
        all_or = 0
        for x in arr:
            all_or |= x  # collect all bits that appear in the array
        
        # Step 2: Each present bit contributes in 2^(n-1) subset XORs
        multiplier = 1 << (n - 1)
        
        # Step 3: Final answer = all_or * 2^(n-1)
        ans = all_or * multiplier
        
        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Here I explain the key parts of the logic in a language-agnostic way.
The same idea is used in all 4 implementations.

### 1. Computing the OR of all elements

```pseudo
allOr = 0
for each x in arr:
    allOr = allOr OR x
```

* I start from `0` because OR-ing with `0` doesn’t change the bits.
* For every element `x`, I OR it with `allOr`.
* If any bit is `1` in any number, that bit becomes `1` in `allOr`.
* After the loop, `allOr` contains all bits that exist in the array.

Example: `arr = [1, 2, 3]`

* `1`   → `01`
* `2`   → `10`
* `3`   → `11`
* `allOr = 1 | 2 | 3 = 3 (11 in binary)`

### 2. Why each bit contributes in `2^(n-1)` subsets

Total subsets of `n` elements = `2^n`.

Pick any single bit position, say the `k`-th bit:

* Some elements have this bit as `1`, some as `0`.
* When I consider all subsets, if I group them by **whether this bit’s total XOR is 0 or 1**, the number of subsets in each group is the same.
* So this bit is `1` in XOR of exactly **half** of the subsets.

Half of `2^n` is `2^(n-1)`.

I calculate this as:

```pseudo
multiplier = 1 << (n - 1)
```

Shifting `1` left by `(n - 1)` positions is equivalent to `2^(n-1)`.

### 3. Combining contributions of all bits

Every bit that is `1` in `allOr`:

* Value of the bit: `2^k` if it is the k-th bit.
* It contributes to the sum in `2^(n-1)` XOR results.
* So its total contribution = `2^k * 2^(n-1)`.

If I add this for all bits where `allOr` has `1`, it is the same as:

```pseudo
answer = allOr * (2^(n-1))
```

This is exactly what I compute as:

```pseudo
answer = allOr * (1 << (n - 1))
```

### 4. Using safe types

In C++ and Java:

* I store `multiplier` and `answer` in `long long` or `long` to make sure intermediate multiplication does not overflow.
* At the end, I cast back to `int` since the problem says the final answer fits in 32 bits.

In JavaScript:

* I use `BigInt` for intermediate multiplication and then convert to `Number`.

In Python:

* Python’s `int` automatically handles big integers, so I just multiply directly.

---

## Examples

### Example 1

**Input:**

```text
arr = [7, 2]
```

Subsets:

* `[]` → XOR = 0
* `[7]` → 7
* `[2]` → 2
* `[7, 2]` → 7 ^ 2 = 5

Sum = `0 + 7 + 2 + 5 = 14`

Using formula:

* `allOr = 7 | 2 = 7` (binary `111`)
* `n = 2`
* `multiplier = 2^(2-1) = 2`
* Answer = `7 * 2 = 14`

### Example 2

**Input:**

```text
arr = [1, 2, 3]
```

We already saw:

* Sum of all subset XORs = 12

Using formula:

* `allOr = 1 | 2 | 3 = 3`
* `n = 3`
* `multiplier = 2^(3-1) = 4`
* Answer = `3 * 4 = 12`

---

## How to use / Run locally

Below is a simple guideline for each language.

### C++

1. Save the solution in a file, e.g. `solution.cpp`.
2. Wrap it with a simple `main` to test locally, or plug it into the GFG driver code.
3. Compile and run:

   ```bash
   g++ -std=c++17 solution.cpp -o solution
   ./solution
   ```

### Java

1. Save as `Solution.java`.
2. Add a `main` method for local testing, or use the GFG driver.
3. Compile and run:

   ```bash
   javac Solution.java
   java Solution
   ```

### JavaScript (Node.js)

1. Save as `solution.js`.
2. At bottom, you can add:

   ```javascript
   const s = new Solution();
   console.log(s.subsetXORSum([1, 2, 3]));
   ```

3. Run:

   ```bash
   node solution.js
   ```

### Python3

1. Save as `solution.py`.
2. At bottom, you can add:

   ```python
   if __name__ == "__main__":
       s = Solution()
       print(s.subsetXORSum([1, 2, 3]))
   ```

3. Run:

   ```bash
   python3 solution.py
   ```

---

## Notes & Optimizations

* The brute-force subset generation approach is `O(2^n * n)` and too slow for `n = 30`.
* By turning the problem into a **bitwise counting problem**, I avoid generating any subsets.
* The key optimization is recognizing:

  * **Bit contributions are symmetric** across subsets.
  * Each bit in any element appears in half of all XOR results.
* The solution is **linear** in the size of the array and uses **constant extra space**.
* This pattern of “each bit contributes in half of all subsets” appears in many XOR and subset-sum bit problems and is a useful trick to remember.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
