# Missing And Repeating

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

Given an **unsorted array `arr[]` of size `n`** containing numbers from **1 to n**:

* Exactly **one number is missing** from this range.
* Exactly **one number is repeating twice** in the array.

I have to **find both numbers**:

* Return **[repeating, missing]**.

---

## Constraints

* `2 ≤ n ≤ 10^6`
* `1 ≤ arr[i] ≤ n`
* Array may be in any order.
* Only **one** number repeats and **one** number is missing.

---

## Intuition

I thought like this:

1. If the array was perfect (no missing, no repeating), it would contain:

   * All numbers from **1 to n** exactly once.
2. For numbers from `1` to `n`:

   * I already know the formula for **sum**:
     `1 + 2 + ... + n = n(n + 1) / 2`
   * And for **sum of squares**:
     `1² + 2² + ... + n² = n(n + 1)(2n + 1) / 6`
3. But in my real array:

   * One number **R** is repeated.
   * One number **M** is missing.
4. So:

   * `actual_sum = expected_sum + R - M`
   * `actual_sq_sum = expected_sq_sum + R² - M²`
5. From this I get two equations with two unknowns (R and M).
   Using simple algebra, I can solve them and get both values in **O(n)** time and **O(1)** extra space.

---

## Approach

Step-by-step in simple words:

1. Let `n` be the size of the array.
2. Traverse the array once and calculate:

   * `S = sum of all elements`
   * `Sq = sum of squares of all elements`
3. Calculate the **expected** values for numbers from `1` to `n`:

   * `S_exp = n(n + 1) / 2`
   * `Sq_exp = n(n + 1)(2n + 1) / 6`
4. Now form two key differences:

   * `diff = S - S_exp = R - M`
   * `diffSq = Sq - Sq_exp = R² - M²`
5. Notice:

   * `R² - M² = (R - M)(R + M)`
   * So, `diffSq = diff * (R + M)`
   * Hence, `R + M = diffSq / diff`
6. Now I know:

   * `R - M = diff`
   * `R + M = diffSq / diff`
7. Solve them:

   * `R = ( (R - M) + (R + M) ) / 2 = (diff + diffSq/diff) / 2`
   * `M = R - diff`
8. Return the pair as `[R, M]` i.e. `[repeating, missing]`.

I also make sure to use **64-bit integers** (long long / long / BigInt / Python int) to avoid overflow for large `n`.

---

## Data Structures Used

* Only **primitive variables**:

  * For sums and calculations: `S`, `Sq`, `S_exp`, `Sq_exp`, `diff`, `diffSq`, `R`, `M`.
* **No extra arrays**, no hash maps, no frequency arrays.

So space usage is constant, i.e., **O(1)**.

---

## Operations & Behavior Summary

For each test case:

1. Read `n` and the array `arr`.
2. Compute:

   * Sum of elements.
   * Sum of squares of elements.
3. Compute expected sum and expected sum of squares for range `1..n`.
4. Use algebra to derive:

   * Repeating number.
   * Missing number.
5. Output in the format:

   * `[repeating, missing]`.

---

## Complexity

* **Time Complexity:** `O(n)`

  * I only traverse the array **once** to compute both sums.
* **Space Complexity:** `O(1)`

  * I use a fixed number of variables (no extra dynamic data structures).

`n` here is the size of the array `arr`.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> findTwoElement(vector<int>& arr) {
        long long n = arr.size();
        
        // actual sum and sum of squares
        long long S = 0;   // sum of elements
        long long Sq = 0;  // sum of squares
        for (int x : arr) {
            S += x;
            Sq += 1LL * x * x; // 1LL -> make sure multiplication is in 64-bit
        }
        
        // expected sum and sum of squares for 1..n
        long long S_exp = n * (n + 1) / 2;
        long long Sq_exp = n * (n + 1) * (2 * n + 1) / 6;
        
        // diff = R - M
        long long diff = S - S_exp;
        // diffSq = R^2 - M^2
        long long diffSq = Sq - Sq_exp;
        
        // R + M = diffSq / diff
        long long sumRM = diffSq / diff;
        
        // R = ( (R - M) + (R + M) ) / 2
        long long R = (diff + sumRM) / 2;
        long long M = R - diff;
        
        return { (int)R, (int)M }; // [repeating, missing]
    }
};
```

---

### Java

```java
import java.util.*;

class Solution {
    ArrayList<Integer> findTwoElement(int arr[]) {
        int n = arr.length;
        
        long S = 0;   // sum of elements
        long Sq = 0;  // sum of squares
        
        for (int x : arr) {
            S += x;
            Sq += 1L * x * x;
        }
        
        long N = n;
        long S_exp = N * (N + 1) / 2;
        long Sq_exp = N * (N + 1) * (2 * N + 1) / 6;
        
        long diff = S - S_exp;      // R - M
        long diffSq = Sq - Sq_exp;  // R^2 - M^2
        
        long sumRM = diffSq / diff; // R + M
        
        long R = (diff + sumRM) / 2; // repeating
        long M = R - diff;           // missing
        
        ArrayList<Integer> ans = new ArrayList<>();
        ans.add((int) R); // repeating
        ans.add((int) M); // missing
        return ans;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @returns {number[]}
 */
class Solution {
    findTwoElement(arr) {
        const n = arr.length;

        // Use BigInt for safe large integer math
        let S = 0n;   // sum
        let Sq = 0n;  // sum of squares

        for (const x of arr) {
            const bx = BigInt(x);
            S += bx;
            Sq += bx * bx;
        }

        const N = BigInt(n);
        const S_exp = N * (N + 1n) / 2n;
        const Sq_exp = N * (N + 1n) * (2n * N + 1n) / 6n;

        const diff = S - S_exp;     // R - M
        const diffSq = Sq - Sq_exp; // R^2 - M^2

        const sumRM = diffSq / diff; // R + M

        const R = (diff + sumRM) / 2n; // repeating
        const M = R - diff;            // missing

        // convert back to normal numbers
        return [Number(R), Number(M)];
    }
}
```

---

### Python3

```python
class Solution:
    def findTwoElement(self, arr):
        n = len(arr)

        # actual sum and sum of squares
        S = 0
        Sq = 0
        for x in arr:
            S += x
            Sq += x * x

        # expected sum and sum of squares for 1..n
        N = n
        S_exp = N * (N + 1) // 2
        Sq_exp = N * (N + 1) * (2 * N + 1) // 6

        diff = S - S_exp          # R - M
        diffSq = Sq - Sq_exp      # R^2 - M^2

        sumRM = diffSq // diff    # R + M

        R = (diff + sumRM) // 2   # repeating
        M = R - diff              # missing

        return [R, M]             # [repeating, missing]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is exactly the same in all 4 languages.
I’ll explain using **language-independent steps** that directly map to each code.

---

### 1. Read input and size

```cpp
long long n = arr.size();
```

```java
int n = arr.length;
```

```javascript
const n = arr.length;
```

```python
n = len(arr)
```

* Here I store the size of the array in `n`.
* The array has `n` elements, values from `1` to `n`, with one missing and one repeating.

---

### 2. Compute actual sum and actual sum of squares

```cpp
long long S = 0, Sq = 0;
for (int x : arr) {
    S += x;
    Sq += 1LL * x * x;
}
```

```java
long S = 0, Sq = 0;
for (int x : arr) {
    S += x;
    Sq += 1L * x * x;
}
```

```javascript
let S = 0n, Sq = 0n;
for (const x of arr) {
    const bx = BigInt(x);
    S += bx;
    Sq += bx * bx;
}
```

```python
S = 0
Sq = 0
for x in arr:
    S += x
    Sq += x * x
```

What I am doing:

* `S` = sum of all elements in the array.
* `Sq` = sum of squares of all elements.
* I loop once through the array and update both values.
* In C++/Java I force 64-bit multiplication using `1LL` / `1L`.
* In JavaScript I use `BigInt` to avoid precision loss.

---

### 3. Compute expected sum and expected sum of squares for 1..n

```cpp
long long S_exp = n * (n + 1) / 2;
long long Sq_exp = n * (n + 1) * (2 * n + 1) / 6;
```

```java
long N = n;
long S_exp = N * (N + 1) / 2;
long Sq_exp = N * (N + 1) * (2 * N + 1) / 6;
```

```javascript
const N = BigInt(n);
const S_exp = N * (N + 1n) / 2n;
const Sq_exp = N * (N + 1n) * (2n * N + 1n) / 6n;
```

```python
N = n
S_exp = N * (N + 1) // 2
Sq_exp = N * (N + 1) * (2 * N + 1) // 6
```

* `S_exp` is how much the sum **should** be if 1..n were present exactly once.
* `Sq_exp` is how much the sum of squares **should** be if 1..n were present exactly once.

Formulas used from basic maths:

* `1 + 2 + ... + n = n(n + 1)/2`
* `1² + 2² + ... + n² = n(n + 1)(2n + 1)/6`

---

### 4. Build the two equations

```cpp
long long diff = S - S_exp;     // R - M
long long diffSq = Sq - Sq_exp; // R^2 - M^2
```

```java
long diff = S - S_exp;
long diffSq = Sq - Sq_exp;
```

```javascript
const diff = S - S_exp;
const diffSq = Sq - Sq_exp;
```

```python
diff = S - S_exp
diffSq = Sq - Sq_exp
```

* `diff` is `R - M` because only `R` is extra and `M` is missing from the expected sum.
* `diffSq` is `R² - M²` for the same reason but with squares.

---

### 5. Derive `R + M` from `diffSq` and `diff`

```cpp
long long sumRM = diffSq / diff; // R + M
```

```java
long sumRM = diffSq / diff;
```

```javascript
const sumRM = diffSq / diff;
```

```python
sumRM = diffSq // diff
```

* I use the identity:
  `R² - M² = (R - M)(R + M)`
* So `diffSq = diff * (R + M)`
* Hence, `R + M = diffSq / diff`

Now I know:

* `R - M = diff`
* `R + M = sumRM`

---

### 6. Solve for R (repeating) and M (missing)

```cpp
long long R = (diff + sumRM) / 2;
long long M = R - diff;
```

```java
long R = (diff + sumRM) / 2;
long M = R - diff;
```

```javascript
const R = (diff + sumRM) / 2n;
const M = R - diff;
```

```python
R = (diff + sumRM) // 2
M = R - diff
```

Reason:

* Add the two equations:

  * `(R - M) + (R + M) = diff + sumRM`
  * `2R = diff + sumRM`
  * So `R = (diff + sumRM) / 2`
* Then: `M = R - diff`

So now I have:

* `R` = repeating number
* `M` = missing number

---

### 7. Return in required order

```cpp
return { (int)R, (int)M };
```

```java
ans.add((int) R);
ans.add((int) M);
return ans;
```

```javascript
return [Number(R), Number(M)];
```

```python
return [R, M]
```

The format everywhere is:

* First element: **repeating**
* Second element: **missing**

---

## Examples

### Example 1

**Input:**
`arr = [2, 2]`

Numbers 1 to 2 should be: `1, 2`

* Repeating: `2`
* Missing: `1`

**Output:**
`[2, 1]`

---

### Example 2

**Input:**
`arr = [1, 3, 3]`

Numbers 1 to 3 should be: `1, 2, 3`

* Repeating: `3`
* Missing: `2`

**Output:**
`[3, 2]`

---

### Example 3

**Input:**
`arr = [4, 3, 6, 2, 1, 1]`

Numbers 1 to 6 should be: `1, 2, 3, 4, 5, 6`

* Repeating: `1`
* Missing: `5`

**Output:**
`[1, 5]`

---

## How to use / Run locally

### C++

1. Save the C++ code in `solution.cpp`.
2. Wrap it with `main()` if needed for testing:

   ```cpp
   #include <bits/stdc++.h>
   using namespace std;

   // paste Solution class here

   int main() {
       int n;
       cin >> n;
       vector<int> arr(n);
       for (int i = 0; i < n; ++i) cin >> arr[i];

       Solution sol;
       vector<int> ans = sol.findTwoElement(arr);
       cout << ans[0] << " " << ans[1] << "\n";
       return 0;
   }
   ```

3. Compile and run:

   ```bash
   g++ -std=c++17 solution.cpp -o solution
   ./solution
   ```

---

### Java

1. Save file as `Main.java`.

2. Example wrapper:

   ```java
   import java.util.*;

   // paste Solution class here

   public class Main {
       public static void main(String[] args) {
           Scanner sc = new Scanner(System.in);
           int n = sc.nextInt();
           int[] arr = new int[n];
           for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

           Solution sol = new Solution();
           ArrayList<Integer> ans = sol.findTwoElement(arr);
           System.out.println(ans.get(0) + " " + ans.get(1));
       }
   }
   ```

3. Compile and run:

   ```bash
   javac Main.java
   java Main
   ```

---

### JavaScript (Node.js)

1. Save file as `solution.js`.

   ```javascript
   // paste Solution class here

   const fs = require("fs");

   const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
   let idx = 0;
   const n = input[idx++];
   const arr = [];
   for (let i = 0; i < n; i++) arr.push(input[idx++]);

   const sol = new Solution();
   const ans = sol.findTwoElement(arr);
   console.log(ans[0] + " " + ans[1]);
   ```

2. Run with Node:

   ```bash
   node solution.js < input.txt
   ```

---

### Python3

1. Save file as `solution.py`.

   ```python
   # paste Solution class here

   if __name__ == "__main__":
       import sys
       data = list(map(int, sys.stdin.read().strip().split()))
       n = data[0]
       arr = data[1:1+n]

       sol = Solution()
       ans = sol.findTwoElement(arr)
       print(ans[0], ans[1])
   ```

2. Run:

   ```bash
   python3 solution.py < input.txt
   ```

---

## Notes & Optimizations

* This approach is **better** than:

  * Sorting the array (which takes `O(n log n)` time).
  * Using an extra frequency array or hash map (`O(n)` extra space).
* Using **math formulas** plus **algebra** allows me to:

  * Scan the array only once.
  * Use constant extra space.
* Important to use 64-bit / BigInt:

  * Because sums and sums of squares can exceed 32-bit integer range for large `n`.
* Works perfectly under constraints up to `n = 10^6`.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
