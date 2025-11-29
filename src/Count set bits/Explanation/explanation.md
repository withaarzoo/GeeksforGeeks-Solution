# Count Set Bits (1 to N)

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

**Problem (GeeksforGeeks – “Count Set Bits”)**
Given an integer `n`, find the **total number of set bits (1-bits)** in the binary representation of **all numbers from `1` to `n` (inclusive)**.

Example:

* `n = 4`

  * Numbers: `1 (1)`, `2 (10)`, `3 (11)`, `4 (100)`
  * Total set bits = `1 + 1 + 2 + 1 = 5`

We need to return this total.

---

## Constraints

* `1 ≤ n ≤ 10^8` (as per GfG statement)
* Answer fits in 32-bit signed integer
* We must avoid `O(n log n)` brute force and aim for **better than linear**.

---

## Intuition

(Meri thinking process 🙂)

* Pehle maine socha:
  “Main 1 se `n` tak har number ka set bits count kar sakta hoon, phir sab add kar dunga.”
  But for `n = 10^8`, ye approach bahut slow ho jaayegi.

* Fir maine observe kiya ki **har bit position pe ek pattern repeat hota hai**:

  * Least significant bit (bit `0`): `0 1 0 1 0 1 ...`
  * Next bit (bit `1`): `0 0 1 1 0 0 1 1 ...`
  * Next bit (bit `2`): `0 0 0 0 1 1 1 1 ...`

* Ye pattern ka length hamesha `2^(i+1)` hota hai (i-th bit ke liye):

  * First `2^i` numbers → bit `i = 0`
  * Next `2^i` numbers → bit `i = 1`

* Idea clear ho gaya:

  > Agar main har bit position ke liye count kar loon ki 1 se `n` tak kitni baar woh bit **1** banti hai,
  > phir sab bits ke counts ko add kar doon → that is my final answer.

* Is se main **numbers ke upar loop** nahi kar raha, main **bits ke upar loop** kar raha hoon.
  Bits ka count ≈ `log₂(n)` hota hai. So solution fast ho jaata hai.

---

## Approach

Step-by-step simple breakdown:

1. Main bit positions ke upar loop karunga: `i = 0, 1, 2, ...`
   Jab tak `2^i <= n` (matlab woh bit realistically appear ho sakti hai).

2. For each bit position `i`:

   * `bitValue = 2^i`
   * `cycleLen = 2^(i+1)` → pattern ka total length.

3. Ab 1 se `n` tak ki range mein:

   * `fullCycles = n / cycleLen`

     * Har full cycle mein bit `i` exactly `bitValue` times `1` hota hai.
       So contribution from full cycles = `fullCycles * bitValue`.

   * `remainder = n % cycleLen`

     * Ye incomplete pattern part hai jo last mein bachta hai.
     * Is remainder mein:

       * First `bitValue` numbers → bit `i = 0`
       * Next numbers (agar exist karein) → bit `i = 1`
     * Extra ones from remainder:

       * `extra = remainder - bitValue + 1`
       * Agar `extra > 0`, toh yahi `extra` additional `1`s hain at bit `i`.

4. Total contribution for this bit =
   `fullCycles * bitValue + max(0, extra)`.

5. Main ye contribution `total` mein add karunga for every bit `i`.

6. Last mein `total` ko return karunga.

---

## Data Structures Used

* Sirf **basic integer variables**:

  * `total`, `i`, `bitMask`, `cycleLen`, `fullCycles`, `remainder`, `extraOnes`.
* **No arrays, no lists, no maps**.
* So memory usage is constant.

---

## Operations & Behavior Summary

For each bit `i`:

1. Calculate cycle length: `cycleLen = 2^(i+1)`.
2. Count how many complete cycles from `1` to `n`: `fullCycles = n / cycleLen`.
3. Count `1`s from full cycles: `fullCycles * 2^i`.
4. Handle remaining part:

   * Let `remainder = n % cycleLen`.
   * `extraOnes = max(0, remainder - 2^i + 1)`.
5. Add both parts to `total`.

Behavior wise:

* Function is **monotonic** in `n`: agar `n` badhata hai, answer kabhi decrease nahi hota.
* Works efficiently even for upper bound `n = 10^8`.

---

## Complexity

* **Time Complexity: `O(log n)`**

  * Because main har bit position pe loop kar raha hoon.
  * Highest bit needed ≈ index of MSB of `n`, which is around `log₂(n)`.

* **Space Complexity: `O(1)`**

  * Sirf kuch integers use ho rahe hain.
  * No extra arrays or dynamic memory.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countSetBits(int n) {
        long long total = 0;  // for safe intermediate sums
        
        // iterate over bit positions while (1 << i) <= n
        for (int i = 0; (1LL << i) <= n; i++) {
            long long bitMask  = 1LL << i;       // 2^i
            long long cycleLen = bitMask << 1;   // 2^(i+1)
            
            // number of complete cycles of length cycleLen
            long long fullCycles = n / cycleLen;
            
            // each full cycle contributes 'bitMask' ones at this bit
            total += fullCycles * bitMask;
            
            // handle remaining elements (incomplete cycle)
            long long remainder = n % cycleLen;
            
            // extra ones after first bitMask zeros
            long long extraOnes = remainder - bitMask + 1;
            if (extraOnes > 0) {
                total += extraOnes;
            }
        }
        
        return (int)total;
    }
};
```

---

### Java

```java
class Solution {
    public static int countSetBits(int n) {
        long total = 0;  // safe intermediate sum
        
        // loop over bit positions while (1 << i) <= n
        for (int i = 0; (1L << i) <= n; i++) {
            long bitMask  = 1L << i;       // 2^i
            long cycleLen = bitMask << 1;  // 2^(i+1)
            
            long fullCycles = n / cycleLen;
            
            // in each full cycle, bit i is '1' exactly bitMask times
            total += fullCycles * bitMask;
            
            long remainder = n % cycleLen;
            
            long extraOnes = remainder - bitMask + 1;
            if (extraOnes > 0) {
                total += extraOnes;
            }
        }
        
        return (int)total;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {Number} N
 * @returns {Number}
 */
class Solution {
    countSetBits(N) {
        let total = 0;
        
        // iterate over bit positions while (1 << i) <= N
        for (let i = 0; (1 << i) <= N; i++) {
            let bitMask  = 1 << i;       // 2^i
            let cycleLen = bitMask << 1; // 2^(i+1)
            
            let fullCycles = Math.floor(N / cycleLen);
            
            // each full cycle contributes bitMask ones at this bit
            total += fullCycles * bitMask;
            
            let remainder = N % cycleLen;
            
            let extraOnes = remainder - bitMask + 1;
            if (extraOnes > 0) {
                total += extraOnes;
            }
        }
        
        return total;
    }
}
```

---

### Python3

```python
class Solution:
    def countSetBits(self, n: int) -> int:
        total = 0  # total number of set bits
        
        i = 0
        # loop over bit positions while (1 << i) <= n
        while (1 << i) <= n:
            bit_mask  = 1 << i          # 2^i
            cycle_len = bit_mask << 1   # 2^(i+1)
            
            full_cycles = n // cycle_len
            
            # each full cycle contributes bit_mask ones at bit i
            total += full_cycles * bit_mask
            
            remainder = n % cycle_len
            
            extra_ones = remainder - bit_mask + 1
            if extra_ones > 0:
                total += extra_ones
            
            i += 1
        
        return total
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Main Python code ko base le kar explain kar raha hoon (baaki languages same logic follow karte hain).

```python
class Solution:
    def countSetBits(self, n: int) -> int:
        total = 0  # total number of set bits
```

* `total` final answer store karega.
* Start with `0` since abhi koi bit count nahi hui.

```python
        i = 0
        # loop over bit positions while (1 << i) <= n
        while (1 << i) <= n:
```

* `i` current bit position hai (0th, 1st, 2nd, ...).
* `(1 << i)` = `2^i`.
* Jab tak `2^i <= n`, tab tak ye bit numbers 1..n mein appear ho sakta hai.
* Jab `2^i > n` ho jaata hai, further bits sab zero honge → loop stop.

```python
            bit_mask  = 1 << i          # 2^i
            cycle_len = bit_mask << 1   # 2^(i+1)
```

* `bit_mask` is `2^i`, jo ye bit ka value hai.
* `cycle_len` is `2^(i+1)`, pattern ka total length.

  * For example, `i = 1` → pattern: `00 11` → length = 4.

```python
            full_cycles = n // cycle_len
```

* `full_cycles` bataata hai ki 1 se `n` tak kitne **complete patterns** fit ho gaye.
* Har complete pattern mein bit `i` exactly `bit_mask` times `1` hota hai.

```python
            # each full cycle contributes bit_mask ones at bit i
            total += full_cycles * bit_mask
```

* Har full cycle → `bit_mask` ones.
* So total ones from all full cycles = `full_cycles * bit_mask`.
* Is value ko main `total` mein add kar deta hoon.

```python
            remainder = n % cycle_len
```

* Ab dekhte hain ki last mein ek **incomplete block** bacha hoga ya nahi.
* `remainder` us block ka size hai:

  * Means `1..n` ko agar main full cycles mein divide karu,
    to kya extra numbers bachte hain, unki count = `remainder`.

```python
            extra_ones = remainder - bit_mask + 1
            if extra_ones > 0:
                total += extra_ones
```

* Ek complete pattern structure:

  * First `bit_mask` numbers → bit `i = 0`
  * Next `bit_mask` numbers → bit `i = 1`

* `remainder` part mein initially `bit_mask` numbers tak bit `0` hota hai.

* Agar `remainder` `bit_mask` se bada ho jaata hai,
  to remaining part mein bit `1` hota hai.

* Count of 1s in remainder =
  `remainder - bit_mask + 1` (agar yeh positive ho).

  * Example: `remainder = 6`, `bit_mask = 4`

    * Extra ones = `6 - 4 + 1 = 3` → positions 5,6,7 (1-based offset).

* Agar `extra_ones` positive hai, main usko `total` mein add karta hoon.

```python
            i += 1
```

* Move to next bit position.

```python
        return total
```

* Sab bits handle hone ke baad `total` ke andar
  1 se `n` tak ke **saare set bits ka sum** aa chuka hota hai.
* Main simply `total` return kar deta hoon.

> C++, Java, JavaScript versions mein bhi exactly same steps hain,
> bas syntax thoda different hai (types, loops, integer division, etc.).

---

## Examples

### Example 1

**Input:** `n = 4`

Numbers and bits:

* `1` → `1` → 1 bit
* `2` → `10` → 1 bit
* `3` → `11` → 2 bits
* `4` → `100` → 1 bit

**Output:**
`1 + 1 + 2 + 1 = 5`

---

### Example 2

**Input:** `n = 17`

GeeksforGeeks example:

* Total set bits from `1` to `17` = **35**

(Our function should return `35`.)

---

## How to use / Run locally

Assume file name is `main` or `Solution` depending on platform.

### C++

```bash
g++ -std=c++17 main.cpp -o main
./main
```

Inside `main.cpp`, you can create:

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int countSetBits(int n) {
        long long total = 0;
        for (int i = 0; (1LL << i) <= n; i++) {
            long long bitMask  = 1LL << i;
            long long cycleLen = bitMask << 1;
            long long fullCycles = n / cycleLen;
            total += fullCycles * bitMask;
            long long remainder = n % cycleLen;
            long long extraOnes = remainder - bitMask + 1;
            if (extraOnes > 0) total += extraOnes;
        }
        return (int)total;
    }
};

int main() {
    int n;
    cin >> n;
    Solution sol;
    cout << sol.countSetBits(n) << endl;
    return 0;
}
```

---

### Java

```bash
javac Main.java
java Main
```

`Main.java`:

```java
import java.util.*;

class Solution {
    public static int countSetBits(int n) {
        long total = 0;
        for (int i = 0; (1L << i) <= n; i++) {
            long bitMask  = 1L << i;
            long cycleLen = bitMask << 1;
            long fullCycles = n / cycleLen;
            total += fullCycles * bitMask;
            long remainder = n % cycleLen;
            long extraOnes = remainder - bitMask + 1;
            if (extraOnes > 0) total += extraOnes;
        }
        return (int)total;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(Solution.countSetBits(n));
    }
}
```

---

### JavaScript (Node.js)

```bash
node main.js
```

`main.js`:

```javascript
class Solution {
    countSetBits(N) {
        let total = 0;
        for (let i = 0; (1 << i) <= N; i++) {
            let bitMask  = 1 << i;
            let cycleLen = bitMask << 1;
            let fullCycles = Math.floor(N / cycleLen);
            total += fullCycles * bitMask;
            let remainder = N % cycleLen;
            let extraOnes = remainder - bitMask + 1;
            if (extraOnes > 0) total += extraOnes;
        }
        return total;
    }
}

const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim();
const n = parseInt(input, 10);

const sol = new Solution();
console.log(sol.countSetBits(n));
```

---

### Python3

```bash
python3 main.py
```

`main.py`:

```python
class Solution:
    def countSetBits(self, n: int) -> int:
        total = 0
        i = 0
        while (1 << i) <= n:
            bit_mask  = 1 << i
            cycle_len = bit_mask << 1
            full_cycles = n // cycle_len
            total += full_cycles * bit_mask
            remainder = n % cycle_len
            extra_ones = remainder - bit_mask + 1
            if extra_ones > 0:
                total += extra_ones
            i += 1
        return total

if __name__ == "__main__":
    n = int(input().strip())
    sol = Solution()
    print(sol.countSetBits(n))
```

---

## Notes & Optimizations

* **Why not brute force?**

  * Brute force → for each `x` from 1 to `n`, count bits in `x`.
  * Cost ≈ `O(n log n)` (because bit count per number is `log n`).
  * For `n = 10^8`, ye bahut heavy ho jayega.

* **Bitwise pattern trick**:

  * Har bit ke pattern ko use karke humne operations reduce kar diye to `O(log n)`.
  * Ye approach competitive programming mein standard aur optimized hai.

* **Overflow safety**:

  * Intermediate sums ke liye C++/Java mein `long long` / `long` use kiya hai.
  * Final answer constraints ke andar comfortably fit ho jaata hai.

* **Portability**:

  * Same logic across C++, Java, JS, Python.
  * Easy to compare and understand language differences.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)

Feel free to fork, star, or open an issue if you want me to add more problems or explanations.
