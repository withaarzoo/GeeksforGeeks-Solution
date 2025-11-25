# Game of XOR – Problem Set

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

I am given an integer array `arr[]`.

* The **value of a subarray** is defined as the **bitwise XOR** of all elements in that subarray.
* My task is to compute the **bitwise XOR of the values of all possible subarrays** of `arr[]`.

Formally:

> Answer = XOR of (XOR of each subarray)

I need to return a single integer – the final XOR.

---

## Constraints

* `1 ≤ arr.size() ≤ 10^5`
* `0 ≤ arr[i] ≤ 10^9`

These constraints tell me:

* O(n²) brute force will be too slow (because n can be 100,000).
* I must find an O(n) or O(n log n) solution.

---

## Intuition

First, I imagined the most direct way:

1. Generate **every** possible subarray.
2. For each subarray, compute the XOR of its elements.
3. XOR all those subarray results together.

Then I realized:

* Number of subarrays is `n * (n + 1) / 2`.
* For `n = 10^5`, that’s ~5 billion subarrays → impossible in time.

So I changed my thinking:

> Instead of iterating over all subarrays, I should think about **how many times each element contributes** to the final XOR.

Because XOR has a nice property:

* If a number appears an **even** number of times in XOR, it cancels out.
* If it appears an **odd** number of times, it stays in the final result.

So the key idea is:

> For each index `i`, count how many subarrays include `arr[i]`.
> If that count is odd → `arr[i]` affects the final answer.
> If that count is even → `arr[i]` cancels out.

Once I simplified that count, a very clean pattern appeared:

* When `n` (array size) is **even** → final answer is always **0**.
* When `n` is **odd** → only elements at **even indices** (0, 2, 4, …) matter.

This gives a super small and efficient solution.

---

## Approach

1. Let array size be `n`.
2. For each index `i` (0-based):

   * Number of ways to choose the **start** of a subarray that includes `arr[i]` = `(i + 1)`
     (Starts can be from `0` to `i`).
   * Number of ways to choose the **end** = `(n - i)`
     (Ends can be from `i` to `n - 1`).
   * So, `arr[i]` is included in
     `freq[i] = (i + 1) * (n - i)`
     different subarrays.
3. If `freq[i]` is:

   * **even** → `arr[i]` is XORed an even number of times → cancels out.
   * **odd** → `arr[i]` contributes to final answer.
4. When is `freq[i]` odd?

   * `(i + 1)` and `(n - i)` must both be **odd** (product of two numbers is odd only if both are odd).
5. Break it down:

   * If `n` is **even**:

     * `n - i` is even whenever `i` is even.
     * `i + 1` is even whenever `i` is odd.
     * So they can never both be odd at the same time → frequency is **always even**.
       ⇒ answer = **0**.
   * If `n` is **odd**:

     * For **even** `i`:

       * `i + 1` is odd.
       * `n - i` is also odd (odd minus even = odd).
       * So `freq[i]` is odd → these indices contribute.
     * For **odd** `i`, one of those two becomes even → no contribution.
6. Final logic:

   * If `n` is **even** → return `0`.
   * If `n` is **odd**:

     * Initialize `ans = 0`.
     * Loop through all even indices `i = 0, 2, 4, …`
     * `ans ^= arr[i]`.
     * Return `ans`.

This avoids generating subarrays and uses only simple arithmetic + XOR.

---

## Data Structures Used

* **Input array**: `arr[]` (given in the problem).
* **Scalars / basic variables**:

  * `n`: size of the array.
  * `ans`: final XOR result.
  * Loop variable `i`.

No extra data structures (like additional arrays, hash maps, etc.) are needed.

---

## Operations & Behavior Summary

* I compute the final XOR based on **index parity and array length**:

  * If the array length is even:

    * Every element appears an even number of times in all subarrays and cancels out.
    * Final result = `0`.
  * If the array length is odd:

    * Only elements at even positions `0, 2, 4, ...` appear an odd number of times.
    * I XOR those elements to get the final answer.
* Only one pass (or half a pass) through the array is required.

---

## Complexity

* **Time Complexity:**

  * **O(n)**, where `n` is the size of the array.
  * I either:

    * immediately return 0 when `n` is even, or
    * loop through approximately `n/2` elements (even indices only) when `n` is odd.
* **Space Complexity:**

  * **O(1)** extra space.
  * I use only a few integer variables (`n`, `ans`, `i`), no extra arrays or data structures.

---

## Multi-language Solutions

### C++

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int subarrayXor(vector<int>& arr) {
        int n = (int)arr.size();
        
        // If length of the array is even, each element appears
        // an even number of times in all subarrays, so result is 0.
        if (n % 2 == 0) return 0;
        
        int ans = 0;
        // For odd n, only elements at even indices (0-based) contribute.
        for (int i = 0; i < n; i += 2) {
            ans ^= arr[i];
        }
        
        return ans;
    }
};

int main() {
    // Example usage:
    vector<int> arr = {1, 2, 3};
    Solution sol;
    cout << sol.subarrayXor(arr) << endl; // Output: 2
    return 0;
}
```

---

### Java

```java
import java.util.*;

class Solution {
    public int subarrayXor(int[] arr) {
        int n = arr.length;
        
        // If array size is even, the result is always 0.
        if (n % 2 == 0) return 0;
        
        int ans = 0;
        // For odd n, XOR all elements at even indices.
        for (int i = 0; i < n; i += 2) {
            ans ^= arr[i];
        }
        
        return ans;
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3};
        Solution sol = new Solution();
        System.out.println(sol.subarrayXor(arr)); // Output: 2
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @return {number}
 */

class Solution {
    subarrayXor(arr) {
        const n = arr.length;
        
        // If length is even, final XOR of all subarray XORs is 0.
        if (n % 2 === 0) return 0;
        
        let ans = 0;
        // For odd n, only even indices (0, 2, 4, ...) contribute.
        for (let i = 0; i < n; i += 2) {
            ans ^= arr[i];
        }
        
        return ans;
    }
}

// Example usage:
const arr = [1, 2, 3];
const sol = new Solution();
console.log(sol.subarrayXor(arr)); // Output: 2
```

---

### Python3

```python
class Solution:
    def subarrayXor(self, arr):
        n = len(arr)
        
        # If length of array is even, all contributions cancel out
        # and final result is 0.
        if n % 2 == 0:
            return 0
        
        ans = 0
        # For odd n, only elements at even indices (0, 2, 4, ...) contribute.
        for i in range(0, n, 2):
            ans ^= arr[i]
        
        return ans


if __name__ == "__main__":
    arr = [1, 2, 3]
    sol = Solution()
    print(sol.subarrayXor(arr))  # Output: 2
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic in all four languages is exactly the same. I’ll explain it once in a language-agnostic way:

### 1. Get the size of the array

```python
n = len(arr)
```

* I store the size of the array in `n`.
* I will use `n` to decide if the array has an even or odd length.

(In C++: `int n = arr.size();`
In Java: `int n = arr.length;`
In JS: `const n = arr.length;`)

---

### 2. Handle the **even-length** case

```python
if n % 2 == 0:
    return 0
```

* If `n` is even:

  * For each index `i`, the number of subarrays containing `arr[i]` is `(i + 1) * (n - i)`.
  * When `n` is even, this product is always **even**.
  * That means each element `arr[i]` appears an even number of times in the XOR expression.
  * XOR-ing a number an even number of times cancels it out:

    * `x ^ x = 0`
    * `x ^ x ^ x ^ x = 0`, and so on.
  * So the total result becomes `0`.

Same idea in all languages:

```cpp
if (n % 2 == 0) return 0;
```

```java
if (n % 2 == 0) return 0;
```

```javascript
if (n % 2 === 0) return 0;
```

---

### 3. Initialize the answer

```python
ans = 0
```

* I start with `ans = 0` because:

  * XOR with zero keeps the other number: `x ^ 0 = x`.
  * So it’s a perfect starting value for accumulating XOR.

In other languages:

```cpp
int ans = 0;
```

```java
int ans = 0;
```

```javascript
let ans = 0;
```

---

### 4. Loop only over **even indices** when `n` is odd

```python
for i in range(0, n, 2):
    ans ^= arr[i]
```

* Now I know `n` is odd.
* From earlier math:

  * `freq[i] = (i + 1) * (n - i)` is odd **only when** `i` is even (0, 2, 4, …).
  * When `freq[i]` is odd → element `arr[i]` contributes to the final XOR.
* `range(0, n, 2)` means start from 0, go up to `n-1`, stepping by 2 → only even indices.
* For each such index `i`, I XOR its value into `ans`:

  * `ans = ans ^ arr[i]` (short form: `ans ^= arr[i]`).

Same in other languages:

```cpp
for (int i = 0; i < n; i += 2) {
    ans ^= arr[i];
}
```

```java
for (int i = 0; i < n; i += 2) {
    ans ^= arr[i];
}
```

```javascript
for (let i = 0; i < n; i += 2) {
    ans ^= arr[i];
}
```

---

### 5. Return the final answer

```python
return ans
```

* After the loop finishes, `ans` holds the XOR of all elements that appear an odd number of times in all subarrays.
* That is exactly what the problem asked for.

Same in C++ / Java / JS:

```cpp
return ans;
```

```java
return ans;
```

```javascript
return ans;
```

---

## Examples

### Example 1

**Input:**

```text
arr = [1, 2, 3]
```

All subarrays and their XORs:

* `[1]` → `1`
* `[1, 2]` → `1 ^ 2 = 3`
* `[1, 2, 3]` → `1 ^ 2 ^ 3 = 0`
* `[2]` → `2`
* `[2, 3]` → `2 ^ 3 = 1`
* `[3]` → `3`

Now XOR all subarray XOR values:

```text
1 ^ 3 ^ 0 ^ 2 ^ 1 ^ 3 = 2
```

So the output is:

```text
2
```

Using our formula:

* `n = 3` (odd)
* Even indices: `i = 0, 2`
* `arr[0] = 1`, `arr[2] = 3`
* `ans = 1 ^ 3 = 2` ✔

---

### Example 2

**Input:**

```text
arr = [1, 2]
```

Subarrays and XORs:

* `[1]` → `1`
* `[1, 2]` → `1 ^ 2 = 3`
* `[2]` → `2`

Final XOR:

```text
1 ^ 3 ^ 2 = 0
```

Using our method:

* `n = 2` (even) → directly return `0`.

---

## How to use / Run locally

### C++

1. Save the file as `main.cpp`.
2. Make sure it contains:

   * `#include <bits/stdc++.h>`
   * The `Solution` class.
   * A `main` function (for testing).
3. Compile and run:

   ```bash
   g++ -std=c++17 -O2 main.cpp -o main
   ./main
   ```

---

### Java

1. Save the file as `Solution.java`.
2. Make sure the class name is `Solution` and includes a `main` method to test.
3. Compile and run:

   ```bash
   javac Solution.java
   java Solution
   ```

---

### JavaScript (Node.js)

1. Save as `solution.js`.
2. Make sure you have Node.js installed.
3. Run:

   ```bash
   node solution.js
   ```

---

### Python3

1. Save as `solution.py`.
2. Run:

   ```bash
   python3 solution.py
   ```

You can modify the `arr` variable in the `main` part of each program to test with different inputs.

---

## Notes & Optimizations

* The biggest optimization is **mathematical**, not code-level:

  * Instead of checking all subarrays (O(n²)), I use **index frequency counting** to bring it down to **O(n)**.
* For very large inputs (up to `10^5` elements):

  * This approach is safe and efficient.
  * No extra memory is used except a few integers.
* The solution works for any integer values that fit in the language’s integer type:

  * In C++ and Java, `int` is enough for constraints up to `10^9`.
  * In JS and Python, integers naturally handle these sizes.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
