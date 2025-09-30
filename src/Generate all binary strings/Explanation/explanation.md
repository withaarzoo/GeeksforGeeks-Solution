# Generate all binary strings

A clean, optimized README for the **Generate all binary strings** problem — ready to drop into a GitHub repo.
This explains my approach, gives complexity analysis, multi-language solutions (C++, Java, JavaScript, Python3), step-by-step explanations, examples, run instructions, and notes.

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

Given an integer `n`, generate all binary strings of length `n` (strings consisting of `'0'` and `'1'`) in **ascending (lexicographic / numeric)** order.
Return the list of all strings.

Example:

* Input: `n = 2` → Output: `["00", "01", "10", "11"]`
* Input: `n = 3` → Output: `["000", "001", "010", "011", "100", "101", "110", "111"]`

---

## Constraints

* `1 ≤ n ≤ 20` (practical limit: `2^n` grows quickly; `n = 20` → 1,048,576 strings).
* Output size is `2^n`, so solutions must be aware of memory/time required.

---

## Intuition

I thought about the problem like counting in binary.
If I list all integers from `0` to `2^n - 1` and convert each integer to its `n`-bit binary representation (padding with leading zeros), I will get every possible binary string of length `n` exactly once, and in ascending order. This is simple, predictable, and efficient.

---

## Approach

1. Compute `total = 2^n` using a left shift: `1 << n`.
2. For each integer `mask` from `0` to `total - 1`:

   * Build an `n`-length string where each bit of `mask` maps to the correct character position in the string (LSB → rightmost).
   * Append the built string to the result list.
3. Return the final list.

I prefer building each string with a temporary character array (or char buffer) and then converting it into a string — this avoids repeated concatenation and is fast.

---

## Data Structures Used

* Fixed-length char array (or `string` pre-filled with `'0'`) per string for construction.
* Dynamic array/list to store all results:

  * C++: `vector<string>`
  * Java: `ArrayList<String>`
  * JavaScript: `Array` of strings
  * Python3: `list` of strings

---

## Operations & Behavior Summary

* Bitwise operations: right-shift `>>` and bitwise `&` to test a bit.
* Fixed-size buffer fill for each string: `O(n)` per string.
* Iterate mask `0..2^n - 1`: `2^n` iterations.

Behavior:

* Output strings appear in ascending numeric order because `mask` increments from `0` upwards.

---

## Complexity

* **Time Complexity:** `O(n * 2^n)` — there are `2^n` strings; constructing each string takes `O(n)` time.
  (`n` = length of each binary string.)
* **Space Complexity:** `O(n * 2^n)` — storing `2^n` strings each of length `n`. Auxiliary temporary buffer is `O(n)`.

---

## Multi-language Solutions

> These functions follow the usual GeeksforGeeks-style function signatures and are optimized for speed and minimal temporary allocations.

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    vector<string> binstr(int n) {
        unsigned long long total = 1ULL << n;      // 2^n (use 64-bit to be safe)
        vector<string> ans;
        ans.reserve((size_t)total);                 // reserve to avoid reallocations

        for (unsigned long long mask = 0; mask < total; ++mask) {
            string s(n, '0');                       // build an n-length string filled with '0'
            for (int j = 0; j < n; ++j) {
                if ((mask >> j) & 1ULL)             // if j-th bit set in mask
                    s[n - 1 - j] = '1';            // set corresponding right-side position
            }
            ans.push_back(move(s));                 // move to avoid copy
        }
        return ans;
    }
};
```

### Java

```java
import java.util.ArrayList;
import java.util.Arrays;

class Solution {
    public ArrayList<String> binstr(int n) {
        int total = 1 << n;                          // 2^n
        ArrayList<String> result = new ArrayList<>(total);
        char[] buf = new char[n];

        for (int mask = 0; mask < total; ++mask) {
            Arrays.fill(buf, '0');                  // reset buffer fast
            for (int j = 0; j < n; ++j) {
                if (((mask >> j) & 1) == 1)         // check j-th bit
                    buf[n - 1 - j] = '1';
            }
            result.add(new String(buf));
        }
        return result;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @returns {string[]}
 */
class Solution {
    binstr(n) {
        const total = 1 << n;                       // 2^n (safe for n up to 31 in JS bit ops)
        const ans = new Array(total);

        for (let mask = 0; mask < total; ++mask) {
            const arr = new Array(n).fill('0');
            for (let j = 0; j < n; ++j) {
                if (((mask >> j) & 1) === 1)        // if j-th bit is set
                    arr[n - 1 - j] = '1';
            }
            ans[mask] = arr.join('');
        }
        return ans;
    }
}
```

### Python3

```python
class Solution:
    def binstr(self, n):
        total = 1 << n           # 2^n
        ans = []
        for mask in range(total):
            s = ['0'] * n
            for j in range(n):
                if (mask >> j) & 1:
                    s[n - 1 - j] = '1'
            ans.append(''.join(s))
        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below I explain the core idea once, then give language-specific commentary for important lines.

### Core idea (shared)

* `total = 1 << n` gives `2^n` (total count of strings).
* Each integer `mask` in `[0, total)` maps to a unique binary string.
* For each bit position `j` (0-based LSB), check `(mask >> j) & 1`. If 1, set `s[n - 1 - j] = '1'`. That places the least-significant bit at the rightmost character, matching typical binary string representation.

---

### C++ — line-by-line key points

```c++
unsigned long long total = 1ULL << n;
```

* Compute total with 64-bit to avoid overflow when `n` up to 63 (but our problem uses n ≤ 20).

```c++
string s(n, '0');
```

* Create `s` filled with `'0'` characters (fast).

```c++
if ((mask >> j) & 1ULL) s[n - 1 - j] = '1';
```

* Test j-th bit and set the correct position.

```c++
ans.push_back(move(s));
```

* Use `move` to avoid copying the string into the vector.

---

### Java — line-by-line key points

```java
int total = 1 << n;
ArrayList<String> result = new ArrayList<>(total);
char[] buf = new char[n];
```

* Pre-allocate `ArrayList` capacity; reuse a `char[]` buffer to avoid repeated allocations for each string.

```java
Arrays.fill(buf, '0');
if (((mask >> j) & 1) == 1) buf[n - 1 - j] = '1';
result.add(new String(buf));
```

* Fill buffer with `'0'` each iteration, set `'1'` where bit is set, then convert to `String`.

---

### JavaScript — line-by-line key points

```javascript
const total = 1 << n;
const arr = new Array(n).fill('0');
if (((mask >> j) & 1) === 1) arr[n - 1 - j] = '1';
ans[mask] = arr.join('');
```

* Use `Array(n).fill('0')` for a buffer. `join('')` creates the string efficiently.

> Note: JS bitwise ops coerce numbers to 32-bit signed ints; for `n <= 31` this is fine. For `n > 31`, `1 << n` would overflow in JS; our constraint `n ≤ 20` means JS works fine.

---

### Python3 — line-by-line key points

```python
total = 1 << n
s = ['0'] * n
if (mask >> j) & 1:
    s[n - 1 - j] = '1'
ans.append(''.join(s))
```

* Build `s` as a list of chars (mutable and fast), then `join` into final string.

---

## Examples

* Input: `n = 2`
  Output: `["00", "01", "10", "11"]`
  Explanation: `00 (0), 01 (1), 10 (2), 11 (3)` — listed in ascending order.

* Input: `n = 3`
  Output: `["000","001","010","011","100","101","110","111"]`
  Explanation: `0..7` as 3-bit zero-padded binary strings.

---

## How to use / Run locally

### C++

1. Create `main.cpp` containing the `Solution` class and a small driver like:

```c++
#include <bits/stdc++.h>
using namespace std;
// paste Solution here

int main() {
    Solution sol;
    int n = 3;
    auto res = sol.binstr(n);
    for (auto &s : res) cout << s << '\n';
    return 0;
}
```

2. Compile and run:

```bash
g++ -std=c++17 main.cpp -O2 -o run
./run
```

### Java

1. Create `Solution.java` containing `class Solution` and a `public class Main` driver:

```java
// paste Solution here

public class Main {
    public static void main(String[] args) {
        Solution s = new Solution();
        ArrayList<String> out = s.binstr(3);
        for (String str : out) System.out.println(str);
    }
}
```

2. Compile and run:

```bash
javac Main.java
java Main
```

### JavaScript (Node)

1. Create `solution.js`:

```javascript
// paste the Solution class here

const s = new Solution();
console.log(s.binstr(3).join('\n'));
```

2. Run:

```bash
node solution.js
```

### Python3

1. Create `solution.py`:

```python
# paste Solution class here

if __name__ == "__main__":
    s = Solution()
    for line in s.binstr(3):
        print(line)
```

2. Run:

```bash
python3 solution.py
```

---

## Notes & Optimizations

* This solution is iterative and memory-hungry only because the problem asks to **return all** strings. If memory is a concern, yield/stream results:

  * Python: use a generator that `yield`s each string (avoid building the full list).
  * C++: provide an iterator interface that generates on demand.
* Recursive/backtracking approach is equally valid: build strings position-by-position appending `'0'` and `'1'`. That approach uses recursion depth `n` and will also generate `2^n` strings.
* Using bitwise iteration is concise, avoids recursion overhead, and is easy to reason about.
* For large `n`, ensure your environment can handle memory for `2^n` strings.

---

## Author

[Md. Aarzoo Islam](https://bento.me/withaarzoo)
