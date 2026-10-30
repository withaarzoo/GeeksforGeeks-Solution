# Subsets with MEX in Range - GeeksforGeeks Solution

## Table of Contents

- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations & Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
  - [C++](#c)
  - [Java](#java)
  - [JavaScript](#javascript)
  - [Python3](#python3)
- [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

## Problem Summary

You are given an array of integers and a range defined by two numbers l and r. The task is to count how many subsets of the array have their Minimum Excluded value (MEX) lying between l and r (both ends included).

MEX of a subset is the smallest non-negative integer that does not appear in that subset. The empty subset has MEX equal to 0.

Because the answer can grow very large, return the result modulo 10^9 + 7.

This is a classic hard-level GeeksforGeeks problem that tests efficient subset counting with modular arithmetic and frequency-based reasoning.

## Constraints

- 2 ≤ arr.size() ≤ 10^5
- 0 ≤ arr[i], r ≤ arr.size()
- 0 ≤ l ≤ r

These limits force an O(n) or O(n + r) solution. Any approach that tries to generate subsets will time out.

## Intuition

The first useful observation is that a subset has MEX exactly equal to k only when two conditions hold:

1. Every integer from 0 to k-1 appears at least once in the subset.
2. The value k itself is completely missing from the subset.

Any numbers larger than k can be chosen freely.  

Once this is clear, the problem reduces to counting, for every possible k between l and r, how many subsets satisfy the two conditions above. Frequency counts and powers of two make the counting fast.

## Approach

Count the frequency of every value from 0 to n.  
Pre-compute every power of two from 2^0 to 2^n under the required modulo.  

Walk through each candidate MEX value k from 0 to r while maintaining two running quantities:

- the product of (2^{freq[i]} − 1) for all i < k (this product becomes zero permanently if any required number is missing),
- the total number of elements whose values are ≤ k.

The remaining elements (those with values > k) contribute a pure power of two. Multiply the two contributions to obtain the number of subsets whose MEX equals k. Add the number to the answer whenever k lies inside [l, r].

All arithmetic stays inside the modulo, and modular inverses are obtained with fast exponentiation.

## Data Structures Used

- Frequency array of size n + 1 – stores how many times each integer appears. Chosen because looking up a count becomes O(1).
- Power-of-two array of size n + 1 – stores 2^i mod (10^9+7). Avoids repeated exponentiation and keeps every multiplication O(1).

No trees, maps or heavy containers are required; plain arrays are enough for linear time.

## Operations & Behavior Summary

1. Build the frequency array by a single pass over the input.
2. Fill the power-of-two table with successive multiplications by 2.
3. Initialise a running product to 1 and a cumulative frequency to 0.
4. For every k from 0 to r:
   - Update the running product with the term belonging to k-1 (or set it to zero if that frequency is zero).
   - Add freq[k] to the cumulative count.
   - Compute the free contribution as 2^(n − cum) using a modular inverse.
   - Multiply and, if k is inside the given range, add the result to the answer.
5. Return the final answer modulo 10^9 + 7.

## Complexity

| Type              | Value     | Explanation                                                                 |
|-------------------|-----------|-----------------------------------------------------------------------------|
| Time Complexity   | O(n + r)  | One pass to build frequencies and powers, then a loop that runs at most r+1 times. Since r ≤ n the whole algorithm is linear in the input size. |
| Space Complexity  | O(n)      | Two arrays of length n+1 are the only extra memory used.                    |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    long long modpow(long long base, long long exp, long long mod) {
        long long res = 1;
        base %= mod;
        while (exp > 0) {
            if (exp & 1) res = res * base % mod;
            base = base * base % mod;
            exp >>= 1;
        }
        return res;
    }
    int cntSubsets(vector<int> &arr, int l, int r) {
        const long long MOD = 1000000007;
        int n = arr.size();
        vector<int> freq(n + 1, 0);
        for (int x : arr) if (x <= n) freq[x]++;
        vector<long long> p2(n + 1, 1);
        for (int i = 1; i <= n; i++) p2[i] = p2[i - 1] * 2 % MOD;
        long long ans = 0, cur_prod = 1, cum = 0;
        for (int k = 0; k <= r; k++) {
            if (k > 0) {
                if (freq[k - 1] == 0) cur_prod = 0;
                else cur_prod = cur_prod * (p2[freq[k - 1]] - 1 + MOD) % MOD;
            }
            cum += freq[k];
            if (cur_prod != 0) {
                long long free = p2[n] * modpow(p2[cum], MOD - 2, MOD) % MOD;
                long long ways = cur_prod * free % MOD;
                if (k >= l) ans = (ans + ways) % MOD;
            }
        }
        return (int)ans;
    }
};
```

### Java

```java
class Solution {
    long modpow(long base, long exp, long mod) {
        long res = 1;
        base %= mod;
        while (exp > 0) {
            if ((exp & 1) == 1) res = res * base % mod;
            base = base * base % mod;
            exp >>= 1;
        }
        return res;
    }
    public int cntSubsets(int arr[], int l, int r) {
        final long MOD = 1000000007;
        int n = arr.length;
        int[] freq = new int[n + 1];
        for (int x : arr) if (x <= n) freq[x]++;
        long[] p2 = new long[n + 1];
        p2[0] = 1;
        for (int i = 1; i <= n; i++) p2[i] = p2[i - 1] * 2 % MOD;
        long ans = 0, cur_prod = 1, cum = 0;
        for (int k = 0; k <= r; k++) {
            if (k > 0) {
                if (freq[k - 1] == 0) cur_prod = 0;
                else cur_prod = cur_prod * (p2[freq[k - 1]] - 1 + MOD) % MOD;
            }
            cum += freq[k];
            if (cur_prod != 0) {
                long free = p2[n] * modpow(p2[(int)cum], MOD - 2, MOD) % MOD;
                long ways = cur_prod * free % MOD;
                if (k >= l) ans = (ans + ways) % MOD;
            }
        }
        return (int)ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @param {number} l
 * @param {number} r
 * @returns {number}
 */
class Solution {
    modpow(base, exp, mod) {
        let res = 1n;
        base %= mod;
        while (exp > 0n) {
            if (exp & 1n) res = res * base % mod;
            base = base * base % mod;
            exp >>= 1n;
        }
        return res;
    }
    cntSubsets(arr, l, r) {
        const MOD = 1000000007n;
        const n = arr.length;
        const freq = new Array(n + 1).fill(0);
        for (const x of arr) if (x <= n) freq[x]++;
        const p2 = new Array(n + 1);
        p2[0] = 1n;
        for (let i = 1; i <= n; i++) p2[i] = p2[i - 1] * 2n % MOD;
        let ans = 0n, cur_prod = 1n, cum = 0n;
        for (let k = 0; k <= r; k++) {
            if (k > 0) {
                if (freq[k - 1] === 0) cur_prod = 0n;
                else cur_prod = cur_prod * (p2[freq[k - 1]] - 1n + MOD) % MOD;
            }
            cum += BigInt(freq[k]);
            if (cur_prod !== 0n) {
                const free = p2[n] * this.modpow(p2[Number(cum)], MOD - 2n, MOD) % MOD;
                const ways = cur_prod * free % MOD;
                if (k >= l) ans = (ans + ways) % MOD;
            }
        }
        return Number(ans);
    }
}
```

### Python3

```python
class Solution:
    def cntSubsets(self, arr: List[int], l: int, r: int) -> int:
        MOD = 10**9 + 7
        n = len(arr)
        freq = [0] * (n + 1)
        for x in arr:
            if x <= n:
                freq[x] += 1
        p2 = [1] * (n + 1)
        for i in range(1, n + 1):
            p2[i] = p2[i - 1] * 2 % MOD
        def modpow(base, exp, mod):
            res = 1
            base %= mod
            while exp > 0:
                if exp & 1:
                    res = res * base % mod
                base = base * base % mod
                exp >>= 1
            return res
        ans = 0
        cur_prod = 1
        cum = 0
        for k in range(r + 1):
            if k > 0:
                if freq[k - 1] == 0:
                    cur_prod = 0
                else:
                    cur_prod = cur_prod * (p2[freq[k - 1]] - 1 + MOD) % MOD
            cum += freq[k]
            if cur_prod != 0:
                free = p2[n] * modpow(p2[cum], MOD - 2, MOD) % MOD
                ways = cur_prod * free % MOD
                if k >= l:
                    ans = (ans + ways) % MOD
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four implementations follow the same logic; only syntax and integer handling differ.

First the frequency array is created. Every element of the input that is at most n is counted. Because the constraints guarantee no larger values, this array fully describes the multiset.

Next the power-of-two table is filled. Starting from 1, each entry is obtained by multiplying the previous entry by 2 and taking the modulo. This table later lets us replace any 2^x with a simple array look-up.

A modular-exponentiation helper is written once. It is used only to obtain the modular inverse of a power of two (needed when we compute 2^(n − cum)).

The main loop walks k from 0 to r. Two variables travel with it:

- cur_prod starts at 1. When k becomes greater than 0 the term (2^{freq[k-1]} − 1) is multiplied in. If that frequency is zero, cur_prod is forced to zero and stays zero forever; a missing number makes every larger MEX impossible.
- cum accumulates the total number of elements whose values are ≤ k.

When cur_prod is still positive the free contribution is calculated as  
p2[n] * inverse(p2[cum]) mod (10^9+7).  
Multiplying by cur_prod gives the exact number of subsets with MEX equal to k. The number is added to the answer only when k is at least l.

Edge cases handled automatically:

- Empty subset (k = 0) is counted correctly because the product of an empty range is 1.
- Missing numbers force the product to zero, so later MEX values contribute nothing.
- When freq[k] itself is zero the “must exclude k” condition is satisfied automatically and the formula still works.

JavaScript uses BigInt for all modular arithmetic so that intermediate products never lose precision. The other three languages rely on 64-bit integers which are safe under the given constraints.

## Examples

**Example 1**  
Input: arr = [2, 0, 1, 0], l = 1, r = 2  
Output: 9  

Trace:  

- freq = {0:2, 1:1, 2:1}  
- For k = 1 the product of (2^2 − 1) = 3 and free elements give 2, total 6.  
- For k = 2 the product becomes 3 * 1 = 3 and free elements give 1, total 3.  
- Sum = 9.

**Example 2**  
Input: arr = [2, 0, 1], l = 1, r = 2  
Output: 3  

Trace:  

- Only three subsets satisfy the range: {0} (MEX 1), {2,0} (MEX 1) and {0,1} (MEX 2).

**Example 3**  
Input: arr = [0, 0, 0], l = 0, r = 0  
Output: 1  

Trace:  

- Only the empty subset has MEX 0. Any non-empty subset contains a 0 and therefore has MEX at least 1.

## How to Use / Run Locally

**C++**  

1. Copy the C++ code into a file named `main.cpp`.  
2. Compile with `g++ -std=c++17 main.cpp -o main`.  
3. Run with `./main` and supply the input according to the problem format.

**Java**  

1. Place the Java code inside a file named `Solution.java`.  
2. Compile with `javac Solution.java`.  
3. Run with `java Solution` (or the class that contains the main method if you add a driver).

**JavaScript**  

1. Save the code as `solution.js`.  
2. Run with Node.js: `node solution.js`.  
   (You may need a small driver that reads input and calls the method.)

**Python3**  

1. Save the code as `solution.py`.  
2. Run with `python3 solution.py`.  
   Again a short driver that reads the array and the range is useful for local testing.

In all cases make sure the input matches the constraints and that you print the returned integer.

## Notes & Optimizations

- The algorithm already meets the expected O(n + r) bound, so further asymptotic improvement is unnecessary.
- If the upper limit r is much smaller than n the loop can be stopped early, but the difference is negligible.
- An alternative formulation that pre-computes prefix products of (2^freq − 1) also works and can be slightly cleaner; the running-product version shown here is easier to understand for beginners.
- Watch the empty-subset case carefully when l = 0; many incorrect solutions forget to count it.
- Modular inverses are the only place where a fast exponentiation routine is required; everything else is simple multiplication and addition.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
