# Subset XOR – README

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

Given a positive integer **n**, I have to find a subset of numbers from **1** to **n** (inclusive) such that:

1. XOR of all elements in the subset is exactly **n**.
2. The **size** of the subset is as **large** as possible.
3. If multiple such subsets exist, I must choose the **lexicographically smallest** one.

Lexicographical order:

* Compare two subsets like words in a dictionary.
* At the first position where they differ, the subset with the **smaller element** is lexicographically smaller.
* If all common elements are same but one subset is shorter, the **shorter** one is lexicographically smaller.

We need to **return that subset**.

---

## Constraints

* `1 ≤ n ≤ 10^5`
* We must run in about **O(n)** time, otherwise it may be too slow for large `n`.
* Memory usage should also be reasonable (preferably `O(n)` just for the output).

---

## Intuition

I started by asking myself:

> “Agar mujhe XOR `n` chahiye aur numbers 1 se n tak hi use kar sakta hoon, kya main sabhi numbers le sakta hoon?”

Let:

`T = 1 ^ 2 ^ 3 ^ ... ^ n`  (XOR of all numbers from 1 to n)

* If **T = n**, then life is simple:

  * I can just take the entire set `[1, 2, ..., n]`.
  * XOR condition satisfied, subset size is maximum (`n`) and lexicographically smallest.

But what if **T ≠ n**?

Then I thought:

> “Kya main sirf ek element hata kar XOR ko `n` bana sakta hoon?”

If I remove one number `x` from the full set, new XOR becomes:

`T ^ x`

I want:

`T ^ x = n`  ⇒  `x = T ^ n`

So, if this `x` lies between `1` and `n`, I can just **remove that single number**.
Then:

* Subset size = `n - 1`, which is the maximum possible since using all `n` numbers didn’t work.
* XOR = `n` because `T ^ x = T ^ (T ^ n) = n`.

The last question:
**Is `x` always in `[1, n]` when `T ≠ n`?**

Thanks to the known pattern of XOR from `1` to `n`, yes – for this problem’s constraints it always stays within `1..n`.

---

## Approach

1. **Compute XOR of 1..n in O(1)**

   There is a known pattern:

   ```text
   Let T = 1 ^ 2 ^ ... ^ n

   if n % 4 == 0 -> T = n
   if n % 4 == 1 -> T = 1
   if n % 4 == 2 -> T = n + 1
   if n % 4 == 3 -> T = 0
   ```

2. **If T == n**

   * Return the whole list `[1, 2, ..., n]`.

3. **If T != n**

   * Compute `x = T ^ n`.
   * Answer subset is: all numbers from `1` to `n`, except `x`.

4. **Why lexicographically smallest?**

   * Any subset with **maximum size** (`n` or `n - 1`) and XOR `n` is forced to have exactly these elements.
   * When size = `n`, elements are fixed `[1..n]`.
   * When size = `n - 1`, there is exactly one missing element possible, which we computed as `x`.
   * This pattern already gives lexicographically smallest subset.

---

## Data Structures Used

* **Array / List / Vector** to store the resulting subset.
* Only simple integer variables (`T`, `x`, loop counters) besides that.

So the solution is both **simple** and **memory-light**.

---

## Operations & Behavior Summary

For a given `n`:

1. Calculate `T = XOR(1..n)` using `n % 4` pattern.
2. If `T == n`:

   * Add all numbers `1..n` to the result.
3. Else:

   * Calculate `x = T ^ n`.
   * Add all numbers `1..n` except `x` to the result.
4. Return the result list.

---

## Complexity

* **Time Complexity:** `O(n)`

  * We just loop from `1` to `n` once to build our answer list.
  * The XOR pattern calculation is constant time `O(1)`.

* **Space Complexity:** `O(n)`

  * We store at most `n` (or `n - 1`) integers in the answer.
  * No extra big data structures.

---

## Multi-language Solutions

### C++

```c++
class Solution {
  public:
    std::vector<int> subsetXOR(int n) {
        long long T;
        // XOR of 1..n using the pattern based on n % 4
        if (n % 4 == 0)      T = n;
        else if (n % 4 == 1) T = 1;
        else if (n % 4 == 2) T = n + 1;
        else                 T = 0;   // n % 4 == 3
        
        std::vector<int> ans;
        
        if (T == n) {
            // Case 1: All numbers from 1 to n are used
            for (int i = 1; i <= n; ++i) {
                ans.push_back(i);
            }
        } else {
            // Case 2: Remove exactly one element x to make XOR equal to n
            int x = static_cast<int>(T ^ n);
            for (int i = 1; i <= n; ++i) {
                if (i == x) continue; // skip x
                ans.push_back(i);
            }
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
    public static ArrayList<Integer> subsetXOR(int n) {
        long T;
        // XOR of 1..n using the pattern based on n % 4
        if (n % 4 == 0)      T = n;
        else if (n % 4 == 1) T = 1;
        else if (n % 4 == 2) T = n + 1;
        else                 T = 0;   // n % 4 == 3
        
        ArrayList<Integer> ans = new ArrayList<>();
        
        if (T == n) {
            // Case 1: All numbers from 1 to n are used
            for (int i = 1; i <= n; i++) {
                ans.add(i);
            }
        } else {
            // Case 2: Remove exactly one element x to make XOR equal to n
            int x = (int)(T ^ n);
            for (int i = 1; i <= n; i++) {
                if (i == x) continue; // skip x
                ans.add(i);
            }
        }
        
        return ans;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {number} n
 * @returns {number[]}
 */
class Solution {
    subsetXOR(n) {
        let T;
        // XOR of 1..n using the pattern based on n % 4
        if (n % 4 === 0)       T = n;
        else if (n % 4 === 1)  T = 1;
        else if (n % 4 === 2)  T = n + 1;
        else                   T = 0; // n % 4 === 3
        
        const ans = [];
        
        if (T === n) {
            // Case 1: All numbers from 1 to n are used
            for (let i = 1; i <= n; i++) {
                ans.push(i);
            }
        } else {
            // Case 2: Remove exactly one element x to make XOR equal to n
            const x = T ^ n;
            for (let i = 1; i <= n; i++) {
                if (i === x) continue; // skip x
                ans.push(i);
            }
        }
        
        return ans;
    }
}
```

---

### Python3

```python
class Solution:
    def subsetXOR(self, n: int):
        # XOR of 1..n using the pattern based on n % 4
        if n % 4 == 0:
            T = n
        elif n % 4 == 1:
            T = 1
        elif n % 4 == 2:
            T = n + 1
        else:  # n % 4 == 3
            T = 0

        if T == n:
            # Case 1: All numbers from 1 to n are used
            return list(range(1, n + 1))
        else:
            # Case 2: Remove exactly one element x to make XOR equal to n
            x = T ^ n
            ans = []
            for i in range(1, n + 1):
                if i == x:
                    continue  # skip x
                ans.append(i)
            return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Main idea sab languages me same hai, bas syntax change hota hai.
Chalo C++ version ko breakdown karte hain – baaki languages mein bhi same steps follow ho rahe hain.

```c++
long long T;
if (n % 4 == 0)      T = n;
else if (n % 4 == 1) T = 1;
else if (n % 4 == 2) T = n + 1;
else                 T = 0;
```

* Yahan main `T = 1 ^ 2 ^ ... ^ n` directly loop se nahi nikal raha.
* Instead, ek known math pattern use kar raha hoon:

  * `n % 4 == 0 → T = n`
  * `n % 4 == 1 → T = 1`
  * `n % 4 == 2 → T = n + 1`
  * `n % 4 == 3 → T = 0`
* Isse `T` **O(1)** time me mil jaata hai.

```c++
std::vector<int> ans;
```

* Ye vector mera final subset store karega.

```c++
if (T == n) {
    for (int i = 1; i <= n; ++i) {
        ans.push_back(i);
    }
}
```

* Agar `T` already `n` hai:

  * `1 ^ 2 ^ ... ^ n` ka XOR already `n` ke equal hai.
  * To sab numbers ko include karna best hai → largest size & lexicographically smallest.
* So simple loop se `1..n` tak elements push kar diye.

```c++
else {
    int x = static_cast<int>(T ^ n);
```

* Ab `T != n` case.
* Mujhe aisa subset chahiye jo `1..n` se bana ho, par XOR `n` aaye.
* Agar full set ka XOR `T` hai, aur main ek element `x` hata doon,

  * New XOR = `T ^ x`.
  * Condition: `T ^ x = n` ⇒ `x = T ^ n`.
* Isi formula se `x` compute kar raha hoon.

```c++
    for (int i = 1; i <= n; ++i) {
        if (i == x) continue; // skip x
        ans.push_back(i);
    }
}
```

* Ab ek simple loop again `1..n` tak.
* Jab current number `x` ke equal ho, use **skip** kar deta hoon.
* Baaki sab answer me aa jaate hain.
* Is subset ka XOR `n` hoga (math se proven hai),
  aur size `n-1` hoga – jo maximum possible hai is case me.

Exactly yehi logic Java, JavaScript, aur Python3 code me likha hua hai:

* Java: `ArrayList<Integer>` ke through list bana raha hai.
* JS: `ans` array push kar raha hai.
* Python: `list(range(1, n+1))` ya loop + `append`.

---

## Examples

### Example 1

**Input:**
`n = 4`

* `1 ^ 2 ^ 3 ^ 4 = 4`
* So we can take all numbers.

**Output:**
`[1, 2, 3, 4]`

**Explanation:**

* XOR = 1 ^ 2 ^ 3 ^ 4 = 4 (which equals `n`).
* Subset size = 4 (maximum).
* Lexicographically smallest because it starts from 1 and contains all.

---

### Example 2

**Input:**
`n = 3`

* XOR of full set: `1 ^ 2 ^ 3 = 0` (so T = 0)
* T != n → `x = T ^ n = 0 ^ 3 = 3`

So we remove `3`.

**Output:**
`[1, 2]`

**Check XOR:**

* 1 ^ 2 = 3 = n ✅
* Size = 2 (and any subset with 2 elements and XOR 3 must be [1,2])

---

### Example 3

**Input:**
`n = 2`

* `1 ^ 2 = 3`, so T = 3, not equal to `n`.
* `x = T ^ n = 3 ^ 2 = 1`.

**Output:**
`[2]`

**Check XOR:**

* Only 2 → XOR = 2 = n ✅
* Size = 1, and koi aur subset XOR 2 nahi deta.

---

## How to use / Run locally

You can copy respective language solution into your own project or online judge.

### C++

```bash
g++ -std=c++17 main.cpp -o main
./main
```

* Make sure `Solution` class ka `subsetXOR` function call kar rahe ho from `main()`
  with some value of `n`, then print returned vector.

### Java

```bash
javac Main.java
java Main
```

* `Main` class me `public static void main(String[] args)` ke andar:

  * `Solution.subsetXOR(n)` call karo.
  * Result `ArrayList<Integer>` ko print kar do.

### JavaScript (Node.js)

```bash
node main.js
```

* `main.js` file me `Solution` class import ya define karo,
* `const s = new Solution(); console.log(s.subsetXOR(n));`

### Python3

```bash
python3 main.py
```

* `main.py` me `Solution` class define karo,
* `s = Solution(); print(s.subsetXOR(n))`.

You can also integrate this code directly with GeeksforGeeks / other platforms
by only pasting the required class and method.

---

## Notes & Optimizations

* **No explicit XOR loop over 1..n**:

  * Direct pattern use karke humne `O(1)` time me XOR nikala.
  * Ye sabse important optimization hai.

* **Subset uniquely determined**:

  * Either full `[1..n]` or `[1..n]` minus exactly one element `x`.
  * Isse brute-force ya backtracking ki zarurat nahi padti.

* **Lexicographical minimality free me mil gayi**:

  * Kyunki hum numbers ko sorted natural order me hi le rahe hain.

* **Scales easily up to 10^5**:

  * For large `n`, algorithm still linear O(n) hai, which is totally fine.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)

Agar tum isko use kar rahe ho, feel free to fork, star ⭐,
ya apne competitive programming notes me save kar lo.
