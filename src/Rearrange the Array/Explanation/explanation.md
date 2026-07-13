# Rearrange the Array | GeeksforGeeks Solution | Cycle Decomposition & LCM

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

---

## Problem Summary

The **Rearrange the Array** problem asks us to repeatedly apply a given permutation to an array until every element returns to its original position at the same time.

Initially, the array is:

```text
[1, 2, 3, ..., n]
```

A permutation array `b` tells us where every element should move after one operation. We must perform at least one operation and find the **minimum number of operations** required for the entire array to become its original form again.

The answer can become very large, so it must be returned modulo **10^9 + 7**.

This problem is a classic example of **permutation cycles**, **cycle decomposition**, and **Least Common Multiple (LCM)**.

---

## Constraints

| Constraint | Value |
|------------|-------|
| `1 ≤ n ≤ 10^4` | Size of the permutation |
| `b.size() = n` | Input size |
| `b` is a permutation of `1...n` | Every number appears exactly once |

---

## Intuition

The first thing I noticed was that repeatedly applying the same permutation makes every element move inside a fixed cycle.

For example, if three positions form a cycle, then every element inside that cycle returns after exactly three operations.

Different cycles can have different lengths.

Since every cycle must return to its starting position at the same time, I need the smallest number that is divisible by every cycle length.

That is exactly what the **Least Common Multiple (LCM)** represents.

So instead of simulating thousands of operations, I only need to:

1. Find every cycle.
2. Compute its length.
3. Calculate the LCM of all cycle lengths.

---

## Approach

I solved the problem using cycle decomposition.

First, I create a visited array so every position is processed only once.

Then I traverse the permutation.

Whenever I find an unvisited position, I keep following the permutation until I return to the starting point. This gives me one complete cycle.

After counting its length, I factorize that length into prime numbers.

Instead of directly computing the LCM of large values, I store the highest exponent of every prime factor found among all cycles.

Finally, I rebuild the LCM using those prime powers while taking every multiplication modulo **10^9 + 7**.

This avoids overflow and remains efficient even for the largest constraints.

---

## Data Structures Used

| Data Structure | Purpose |
|---------------|---------|
| Visited Array | Prevents processing the same cycle multiple times |
| Hash Map / Dictionary | Stores the maximum exponent required for every prime factor |
| Integer Variables | Track cycle length, current index, and final answer |

---

## Operations & Behavior Summary

The algorithm works in the following order:

1. Mark every position as unvisited.
2. Start traversing the permutation.
3. Whenever a new cycle is found, count its length.
4. Prime-factorize the cycle length.
5. Store the largest exponent of every prime.
6. Repeat until every position has been visited.
7. Multiply all required prime powers modulo `10^9 + 7`.
8. Return the final LCM.

No permutation simulation is required.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | **O(n log n)** | Finding cycles takes O(n), while factorizing cycle lengths contributes the remaining work. |
| Space Complexity | **O(n)** | Extra memory is used for the visited array and prime exponent storage. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    int minOperations(vector<int> &b) {
        const int MOD = 1000000007;
        int n = b.size();

        // Marks whether an index has already been included in a cycle
        vector<int> vis(n, 0);

        // Stores maximum exponent needed for every prime
        unordered_map<int, int> mxExp;

        // Find every cycle in the permutation
        for (int i = 0; i < n; i++) {
            if (vis[i]) continue;

            int cur = i;
            int len = 0;

            // Traverse one complete cycle
            while (!vis[cur]) {
                vis[cur] = 1;
                cur = b[cur] - 1; // Convert to 0-based index
                len++;
            }

            // Prime factorization of current cycle length
            int x = len;
            for (int p = 2; p * p <= x; p++) {
                if (x % p == 0) {
                    int cnt = 0;
                    while (x % p == 0) {
                        x /= p;
                        cnt++;
                    }
                    mxExp[p] = max(mxExp[p], cnt);
                }
            }

            // Remaining value is also a prime
            if (x > 1)
                mxExp[x] = max(mxExp[x], 1);
        }

        long long ans = 1;

        // Build the LCM using highest prime powers
        for (auto &it : mxExp) {
            long long base = it.first;
            int exp = it.second;

            while (exp--) {
                ans = (ans * base) % MOD;
            }
        }

        return (int)ans;
    }
};
```

### Java

```java
class Solution {
    int minOperations(int[] b) {

        final int MOD = 1000000007;
        int n = b.length;

        // Keeps track of visited indices
        boolean[] vis = new boolean[n];

        // Maximum exponent required for every prime
        HashMap<Integer, Integer> map = new HashMap<>();

        // Find every cycle
        for (int i = 0; i < n; i++) {

            if (vis[i]) continue;

            int cur = i;
            int len = 0;

            // Traverse current cycle
            while (!vis[cur]) {
                vis[cur] = true;
                cur = b[cur] - 1;
                len++;
            }

            // Prime factorization of cycle length
            int x = len;

            for (int p = 2; p * p <= x; p++) {
                if (x % p == 0) {
                    int cnt = 0;

                    while (x % p == 0) {
                        x /= p;
                        cnt++;
                    }

                    map.put(p, Math.max(map.getOrDefault(p, 0), cnt));
                }
            }

            // Remaining prime factor
            if (x > 1)
                map.put(x, Math.max(map.getOrDefault(x, 0), 1));
        }

        long ans = 1;

        // Construct LCM modulo MOD
        for (Integer prime : map.keySet()) {
            int exp = map.get(prime);

            while (exp-- > 0) {
                ans = (ans * prime) % MOD;
            }
        }

        return (int) ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} b
 * @return {number}
 */

class Solution {
    minOperations(b) {

        const MOD = 1000000007n;
        const n = b.length;

        // Marks visited indices
        const vis = new Array(n).fill(false);

        // Stores maximum exponent of every prime
        const mp = new Map();

        // Find all cycles
        for (let i = 0; i < n; i++) {

            if (vis[i]) continue;

            let cur = i;
            let len = 0;

            // Traverse one cycle
            while (!vis[cur]) {
                vis[cur] = true;
                cur = b[cur] - 1;
                len++;
            }

            // Prime factorization
            let x = len;

            for (let p = 2; p * p <= x; p++) {

                if (x % p === 0) {

                    let cnt = 0;

                    while (x % p === 0) {
                        x /= p;
                        cnt++;
                    }

                    mp.set(p, Math.max(mp.get(p) || 0, cnt));
                }
            }

            // Remaining prime
            if (x > 1)
                mp.set(x, Math.max(mp.get(x) || 0, 1));
        }

        let ans = 1n;

        // Build LCM modulo MOD
        for (const [prime, exp] of mp) {

            for (let i = 0; i < exp; i++) {
                ans = (ans * BigInt(prime)) % MOD;
            }
        }

        return Number(ans);
    }
}
```

### Python3

```python
class Solution:
    def minOperations(self, b):
        MOD = 10 ** 9 + 7
        n = len(b)

        # Marks visited indices
        vis = [False] * n

        # Stores maximum exponent required for every prime
        mx = {}

        # Find every cycle
        for i in range(n):

            if vis[i]:
                continue

            cur = i
            length = 0

            # Traverse current cycle
            while not vis[cur]:
                vis[cur] = True
                cur = b[cur] - 1
                length += 1

            # Prime factorization of cycle length
            x = length
            p = 2

            while p * p <= x:
                if x % p == 0:
                    cnt = 0

                    while x % p == 0:
                        x //= p
                        cnt += 1

                    mx[p] = max(mx.get(p, 0), cnt)

                p += 1

            # Remaining prime factor
            if x > 1:
                mx[x] = max(mx.get(x, 0), 1)

        ans = 1

        # Construct LCM modulo MOD
        for prime, exp in mx.items():
            for _ in range(exp):
                ans = (ans * prime) % MOD

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in all four implementations. Only the language syntax changes.

### Step 1 — Create a Visited Array

The first task is to remember which indices have already been processed.

Without this array, the same cycle could be visited multiple times, increasing the running time unnecessarily.

---

### Step 2 — Traverse Every Position

Loop through every index in the permutation.

If the current index is already visited, simply skip it because its cycle has already been processed.

Otherwise, begin exploring a new cycle.

---

### Step 3 — Count the Cycle Length

Starting from the current position, keep following the permutation.

Each move visits another node in the same cycle.

Continue until the traversal reaches a previously visited node.

The number of visited nodes during this traversal is the cycle length.

---

### Step 4 — Prime Factorize the Cycle Length

Every cycle length contributes to the final LCM.

Instead of repeatedly computing the LCM directly, factorize each cycle length into prime numbers.

For example,

```text
12 = 2² × 3¹
18 = 2¹ × 3²
```

To build the LCM, we only need the largest exponent of every prime.

So the required result becomes

```text
2² × 3²
```

This method avoids dealing with extremely large intermediate values.

---

### Step 5 — Store the Largest Prime Exponents

Maintain a hash map where

- Key = Prime number
- Value = Largest exponent seen so far

Whenever another cycle contains the same prime with a larger exponent, simply update the stored value.

---

### Step 6 — Build the Final LCM

After processing every cycle, rebuild the LCM by multiplying every stored prime power.

Every multiplication is performed modulo **10^9 + 7**, preventing integer overflow.

The final value is the minimum number of operations required.

---

### Language Notes

#### C++

Uses `vector`, `unordered_map`, and efficient integer arithmetic.

#### Java

Uses `boolean[]` for visited positions and `HashMap<Integer, Integer>` for prime exponents.

#### JavaScript

Uses arrays, `Map`, and `BigInt` to safely handle modular multiplication.

#### Python3

Uses lists and dictionaries, making the implementation short and easy to understand.

---

## Examples

### Example 1

**Input**

```text
b = [1, 2, 3]
```

**Output**

```text
1
```

**Explanation**

Every position already points to itself.

All cycles have length `1`.

LCM(1) = 1.

---

### Example 2

**Input**

```text
b = [2, 3, 1, 5, 4]
```

**Output**

```text
6
```

**Explanation**

The permutation contains two cycles.

```text
(1 → 2 → 3 → 1) → Length = 3
(4 → 5 → 4)     → Length = 2
```

The answer becomes

```text
LCM(3, 2) = 6
```

---

### Example 3

**Input**

```text
b = [2, 1, 4, 3]
```

**Output**

```text
2
```

**Explanation**

There are two cycles.

```text
(1,2)
(3,4)
```

Each has length `2`.

LCM(2,2) = 2.

---

## How to Use / Run Locally

### C++

Compile

```bash
g++ solution.cpp -o solution
```

Run

```bash
./solution
```

---

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

---

### JavaScript

Run using Node.js

```bash
node solution.js
```

---

### Python3

Run

```bash
python solution.py
```

or

```bash
python3 solution.py
```

---

## Notes & Optimizations

- The key observation is that every permutation can be broken into independent cycles.
- Simulating every operation is far too slow for large inputs.
- Computing the answer using cycle lengths and LCM is much more efficient.
- Prime factorization avoids overflow that may occur while repeatedly computing LCM.
- Every index is visited exactly once, making the traversal highly efficient.
- The algorithm comfortably satisfies the given constraints.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
