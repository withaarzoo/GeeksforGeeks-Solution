# Get Minimum Squares

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

Given a positive integer `n`, find the **minimum number of perfect squares** (squares of integers) that sum up to `n`.

> Example:
> `n = 6` → minimum count is `3` because `6 = 2^2 + 1^2 + 1^2`.

---

## Constraints

* `1 ≤ n ≤ 10^4` (works fine for much larger too)
* Output is always an integer in `{1, 2, 3, 4}`

---

## Intuition

I thought: building a DP table is easy but a bit heavy.
Then I remembered two facts from number theory:

* **Lagrange’s Four-Square Theorem:** every number is a sum of at most **four** squares.
* **Legendre’s Three-Square Criterion (usable form):** a number needs **four** squares **iff** after removing all factors of 4, it becomes `7 (mod 8)`.

So I can decide the answer with a few quick checks:

1. If `n` is a perfect square → answer `1`.
2. If `n` is sum of **two** squares → answer `2`.
3. If (after dividing by 4 repeatedly) `n % 8 == 7` → answer `4`.
4. Otherwise → answer `3`.

---

## Approach

1. **Check 1-square:** if `n` is a perfect square, return `1`.
2. **Check 2-squares:** try `a = 1..⌊√n⌋`. If `n - a^2` is a perfect square, return `2`.
3. **Check the 4-squares pattern:** divide out factors of 4 from `n`.
   If the remainder `m` satisfies `m % 8 == 7`, return `4`.
4. **Else:** return `3`.

No big arrays. Only a small loop up to `√n`.

---

## Data Structures Used

* Only scalar integers. No arrays, maps, or DP tables.

---

## Operations & Behavior Summary

* `isSquare(x)`: `O(1)` math check using integer square root.
* For 2-squares detection: single loop `a=1..√n` with constant-time checks.
* Early returns for quick cases.

---

## Complexity

* **Time Complexity:** `O(√n)`
  The two-square scan dominates; all other checks are constant time.
* **Space Complexity:** `O(1)`
  Only a handful of integers are used.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  private:
    bool isSquare(int x) {
        int r = (int)std::sqrt(x);
        return r * r == x;
    }

  public:
    int minSquares(int n) {
        // 1) If n itself is a perfect square -> 1
        if (isSquare(n)) return 1;

        // 2) If n = a^2 + b^2 -> 2
        for (int a = 1; a * a <= n; ++a) {
            if (isSquare(n - a * a)) return 2;
        }

        // 3) Remove factors of 4 (doesn't change the 3-vs-4 decision)
        int m = n;
        while (m % 4 == 0) m /= 4;
        // If m ≡ 7 (mod 8) -> needs 4 squares
        if (m % 8 == 7) return 4;

        // 4) Otherwise -> 3
        return 3;
    }
};

// Driver (optional)
// int main(){ ios::sync_with_stdio(false); cin.tie(nullptr);
//     int n; if(!(cin>>n)) return 0; cout<<Solution().minSquares(n)<<"\n"; }
```

### Java

```java
import java.io.*;
import java.util.*;

class Solution {
    private boolean isSquare(int x) {
        int r = (int)Math.sqrt(x);
        return r * r == x;
    }

    public int minSquares(int n) {
        // 1) Perfect square?
        if (isSquare(n)) return 1;

        // 2) Sum of two squares?
        int limit = (int)Math.sqrt(n);
        for (int a = 1; a <= limit; a++) {
            if (isSquare(n - a * a)) return 2;
        }

        // 3) Remove factors of 4, then check 7 (mod 8)
        int m = n;
        while (m % 4 == 0) m /= 4;
        if (m % 8 == 7) return 4;

        // 4) Otherwise 3
        return 3;
    }
}

// class Main{ public static void main(String[] args) throws Exception{
//     Scanner sc=new Scanner(System.in); int n=sc.nextInt();
//     System.out.println(new Solution().minSquares(n)); }}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @returns {number}
 */
class Solution {
    isSquare(x) {
        const r = Math.floor(Math.sqrt(x));
        return r * r === x;
    }

    minSquares(n) {
        // 1) Perfect square
        if (this.isSquare(n)) return 1;

        // 2) Sum of two squares
        const limit = Math.floor(Math.sqrt(n));
        for (let a = 1; a <= limit; a++) {
            if (this.isSquare(n - a * a)) return 2;
        }

        // 3) Remove powers of 4, check 7 mod 8
        let m = n;
        while (m % 4 === 0) m = Math.floor(m / 4);
        if (m % 8 === 7) return 4;

        // 4) Otherwise 3
        return 3;
    }
}

// // Node.js quick test
// const n = parseInt(process.argv[2] || "6", 10);
// console.log(new Solution().minSquares(n));
```

### Python3

```python
class Solution:
    def _is_square(self, x: int) -> bool:
        r = int(x ** 0.5)
        return r * r == x

    def minSquares(self, n: int) -> int:
        # 1) Perfect square?
        if self._is_square(n):
            return 1

        # 2) Sum of two squares?
        a = 1
        while a * a <= n:
            if self._is_square(n - a * a):
                return 2
            a += 1

        # 3) Remove factors of 4 and check 7 mod 8
        m = n
        while m % 4 == 0:
            m //= 4
        if m % 8 == 7:
            return 4

        # 4) Otherwise it's 3
        return 3

# # Quick test:
# if __name__ == "__main__":
#     n = int(input().strip())
#     print(Solution().minSquares(n))
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

**1) Perfect square check**

* I compute `r = floor(sqrt(n))`.
* If `r * r == n`, then `n` itself is a perfect square → answer `1`.
* This is constant time.

**2) Two-squares scan**

* I loop `a` from `1` to `⌊√n⌋`.
* For each `a`, I compute `b2 = n - a^2`.
* I check if `b2` is a perfect square using the same helper.
* If yes, `n = a^2 + b^2`, so return `2`.
* This loop runs at most `√n` times.

**3) Must-be-four detection**

* I copy `n` to `m`.
* While `m % 4 == 0`, I divide `m` by `4`. (Factors of 4 don’t affect the “can be 3 squares?” property.)
* If the reduced number `m % 8 == 7`, then by Legendre’s criterion, `n` cannot be written as a sum of three squares.
* Therefore, return `4`.

**4) Remaining case is three**

* If it’s not 1 and not 2, and it’s not forced to be 4, the only option left is `3`.
* This follows from Lagrange’s theorem (max is 4).

The helper `isSquare`/`_is_square` is shared logic across languages.

---

## Examples

| n  | Best Decomposition (one of many) | Answer |
| -- | -------------------------------- | ------ |
| 1  | 1²                               | 1      |
| 6  | 2² + 1² + 1²                     | 3      |
| 10 | 3² + 1²                          | 2      |
| 12 | 2² + 2² + 2²                     | 3      |
| 13 | 3² + 2²                          | 2      |
| 19 | 3² + 3² + 1²                     | 3      |
| 28 | 4² + 2²                          | 2      |
| 31 | 25 + 4 + 1 + 1 (must be 4)       | 4      |

> Note: After stripping powers of 4, `31 % 8 = 7`, so it needs 4 squares.

---

## How to use / Run locally

**C++**

```bash
g++ -O2 -std=c++17 main.cpp -o run
./run < input.txt
# or: echo 12 | ./run
```

**Java**

```bash
javac Main.java
java Main < input.txt
# or: echo 12 | java Main
```

**JavaScript (Node.js)**

```bash
node main.js 12
# or adapt to read from stdin in your own runner
```

**Python3**

```bash
python3 main.py
# then type: 12
```

Each sample driver prints the minimum number of squares for the given `n`.

---

## Notes & Optimizations

* This solution is **faster** than DP (`O(n√n)` or `O(n)` memory) because it relies on math theorems and only loops up to `√n`.
* For very large `n`, performance remains excellent since the loop stays `O(√n)`.
* If you ever need the **actual squares** (not just the count), you can extend the two-squares and three-squares cases to record terms, but that’s outside this problem’s scope.

---

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
