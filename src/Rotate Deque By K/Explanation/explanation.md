# Rotate Deque By K

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

I am given a deque `dq` (double-ended queue) of non-negative integers, and two integers: `type` and `k`.

* If `type == 1` → perform **right rotation** `k` times (each rotation moves the last element to the front).
* If `type == 2` → perform **left rotation** `k` times (each rotation moves the first element to the back).

I need to produce the deque after performing the rotations.

Example:

```bash
Input: dq = [1,2,3,4,5,6], type = 1, k = 2
Output: [5,6,1,2,3,4]
```

---

## Constraints

* `1 <= dq.size() <= 10^5` (the deque length)
* `1 <= k <= 10^5`
* `1 <= type <= 2`

Corner cases to remember:

* Empty deque (size 0) — no change.
* `k` may be larger than `n` — rotations repeat every `n` times.

---

## Intuition

I thought about what a deque does: I can remove and insert elements from both ends in O(1) time (amortized). Rotating the deque by `k` is repetitive — doing it `n` times brings it back to original. So I only need `k % n` effective rotations.

For right rotation (type = 1) I move the last element to the front `r` times. For left rotation (type = 2) I move the first element to the back `r` times. In Python, `collections.deque` has a native `rotate()` method which is implemented in C and is very fast.

---

## Approach

1. Let `n = dq.size()`.
2. If `n == 0` return immediately (nothing to rotate).
3. Let `r = k % n` — effective rotations.
4. If `r == 0` return (deque unchanged).
5. If `type == 1` (right): move the last element to front `r` times.
6. If `type == 2` (left): move the first element to back `r` times.

This is simple, safe, and uses constant extra space.

---

## Data Structures Used

* `deque` (double-ended queue) — either `std::deque` in C++, `Deque` in Java (e.g., `ArrayDeque`), Python's `collections.deque`, or a JavaScript `Array` (used as deque). The deque supports pop/push from both ends in O(1) (except JS array `shift/unshift` which are O(n), so for JS we use `slice` concatenation for O(n) time overall).

---

## Operations & Behavior Summary

* Right rotation by 1: `pop_back()` then `push_front(value)`.
* Left rotation by 1: `pop_front()` then `push_back(value)`.
* Repeat `r = k % n` times.

Alternative (language dependent) optimizations:

* Python `deque.rotate(r)` (built-in and efficient).
* C++ `std::rotate` (works on random access iterators) — O(n) but useful when `r` ~ `n`.

---

## Complexity

* **Time Complexity:** `O(r)` where `r = k % n` (worst-case `O(n)`).

  * `n` is the number of elements, `k` is requested rotations; after modulo, `r <= n-1`.
* **Space Complexity:** `O(1)` extra space (we only use a small temporary variable) — except for the JavaScript `slice` approach that uses `O(n)` extra space for the new array.

---

## Multi-language Solutions

### C++

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Rotates dq in-place. type: 1->right, 2->left
    void rotateDeque(deque<int>& dq, int type, int k) {
        int n = dq.size();
        if (n == 0) return;         // nothing to do
        int r = k % n;              // effective rotations
        if (r == 0) return;

        if (type == 1) {            // right rotation
            for (int i = 0; i < r; ++i) {
                int val = dq.back();
                dq.pop_back();
                dq.push_front(val);
            }
        } else if (type == 2) {     // left rotation
            for (int i = 0; i < r; ++i) {
                int val = dq.front();
                dq.pop_front();
                dq.push_back(val);
            }
        }
    }
};

int main() {
    Solution sol;
    deque<int> dq = {1,2,3,4,5,6};

    // Example: right rotate by 2
    sol.rotateDeque(dq, 1, 2);

    // Print result
    for (int x : dq) cout << x << ' ';
    cout << '\n'; // Expected: 5 6 1 2 3 4
    return 0;
}
```

### Java

```java
import java.util.*;

public class Solution {
    public static void rotateDeque(Deque<Integer> dq, int type, int k) {
        int n = dq.size();
        if (n == 0) return;
        int r = k % n;
        if (r == 0) return;

        if (type == 1) { // right
            for (int i = 0; i < r; i++) {
                int val = dq.removeLast();
                dq.addFirst(val);
            }
        } else { // left
            for (int i = 0; i < r; i++) {
                int val = dq.removeFirst();
                dq.addLast(val);
            }
        }
    }

    public static void main(String[] args) {
        Deque<Integer> dq = new ArrayDeque<>(Arrays.asList(1,2,3,4,5,6));
        rotateDeque(dq, 1, 2);
        System.out.println(dq); // Expected: [5, 6, 1, 2, 3, 4]
    }
}
```

### JavaScript

```javascript
/**
 * Simple array-based rotation. If you have a custom Deque class, you can
 * use pop/push on both ends; this version uses slicing which is O(n) time
 * and O(n) extra space but is simple and fast in JS engines.
 *
 * type: 1 => right rotate, type: 2 => left rotate
 */

function rotateArray(arr, type, k) {
    const n = arr.length;
    if (n === 0) return arr.slice();
    const r = k % n;
    if (r === 0) return arr.slice();

    if (type === 1) {
        // right rotate
        return arr.slice(n - r).concat(arr.slice(0, n - r));
    } else {
        // left rotate
        return arr.slice(r).concat(arr.slice(0, r));
    }
}

// Example
const arr = [1,2,3,4,5,6];
console.log(rotateArray(arr, 1, 2)); // [5, 6, 1, 2, 3, 4]
```

### Python3

```python
from collections import deque

class Solution:
    def rotateDeque(self, dq: deque, type: int, k: int) -> None:
        n = len(dq)
        if n == 0:
            return
        r = k % n
        if r == 0:
            return

        # deque.rotate is implemented in C; positive -> right, negative -> left
        if type == 1:
            dq.rotate(r)
        elif type == 2:
            dq.rotate(-r)

if __name__ == '__main__':
    dq = deque([1,2,3,4,5,6])
    Solution().rotateDeque(dq, 1, 2)
    print(list(dq))  # [5, 6, 1, 2, 3, 4]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### C++ (step-by-step)

* `int n = dq.size();` — get the number of elements.
* `if (n == 0) return;` — nothing to rotate if empty.
* `int r = k % n;` — reduce rotations using modulo.
* `if (r == 0) return;` — if remainder 0, no work.
* For `type == 1`, we loop `r` times:

  * `int val = dq.back();` — read the last element.
  * `dq.pop_back();` — remove it.
  * `dq.push_front(val);` — insert it at front.
* For `type == 2`, we loop `r` times:

  * `int val = dq.front();` — read the first element.
  * `dq.pop_front();` — remove it.
  * `dq.push_back(val);` — insert it at back.
* Each `pop`/`push` on `std::deque` is O(1) amortized; the loop costs O(r).

### Java (step-by-step)

* `int n = dq.size();` — size query.
* `int r = k % n;` — compute effective rotations.
* Use `removeLast()`/`addFirst()` for right rotation and `removeFirst()`/`addLast()` for left.
* Repeating `r` times yields the final rotated deque.

### JavaScript (step-by-step)

* JavaScript doesn't have a standard deque API; arrays can be used, but `shift`/`unshift` are O(n).
* Instead, we compute `r = k % n` and then create a new array with one slice operation for each side:

  * Right rotation: `arr.slice(n-r)` grabs last `r` elements, then we `concat` with `arr.slice(0, n-r)`.
  * This is O(n) time and returns a new array with the rotated order.

### Python (step-by-step)

* Using `collections.deque`:

  * `n = len(dq)` and `r = k % n`.
  * `dq.rotate(r)` moves elements to the right by `r` places; `dq.rotate(-r)` moves to the left.
  * Implementation is in C; very efficient and O(r) time.

---

## Examples

1. Right rotate

```
Input: dq = [1,2,3,4,5,6], type = 1, k = 2
Output: [5,6,1,2,3,4]
```

2. Left rotate

```
Input: dq = [10,20,30,40,50], type = 2, k = 3
Output: [40,50,10,20,30]
```

---

## How to use / Run locally

### C++

Save the C++ code to `rotate_deque.cpp` and run:

```bash
g++ -std=c++17 rotate_deque.cpp -O2 -o rotate_deque
./rotate_deque
```

### Java

Save the Java code to `Solution.java` and run:

```bash
javac Solution.java
java Solution
```

### JavaScript

Save the JS code to `rotate_deque.js` and run with Node.js:

```bash
node rotate_deque.js
```

### Python3

Save the Python code to `rotate_deque.py` and run:

```bash
python3 rotate_deque.py
```

---

## Notes & Optimizations

* I always reduce `k` by `n` using modulo: `r = k % n`. This avoids unnecessary repeated rotations.
* Python's `deque.rotate` is preferred when available — it's implemented in C and is very fast.
* C++ alternative: `std::rotate(dq.begin(), dq.end() - r, dq.end());` — this is O(n) and can be used if you prefer a single algorithm call instead of `r` repeated pops/pushes.
* If `r` is small compared to `n` then performing `r` pops/pushes is efficient (`O(r)`). If `r` is large (e.g., near `n/2`), using a single `std::rotate` (C++) or building a new array (JS) both cost O(n) but avoid repeated constant-factor overhead.
* Java `ArrayDeque` is a good choice: it offers `addFirst`, `addLast`, `removeFirst`, and `removeLast` in amortized O(1).

---

## Author

[Aarzoo](https://bento.me/withaarzoo)
