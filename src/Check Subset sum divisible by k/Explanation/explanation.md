# Check Subset Sum Divisible by K

A clean and optimized solution for the **Check Subset Sum Divisible by K** problem from GeeksforGeeks using **Dynamic Programming**. This repository explains the intuition, approach, complexity analysis, and provides implementations in multiple programming languages. If you're preparing for coding interviews or improving your DSA skills, this problem is a great example of **subset DP**, **modular arithmetic**, and **dynamic programming on remainders**.

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

In this problem, we are given an array of positive integers and an integer `k`.

The goal is to determine whether **there exists at least one non-empty subset** whose total sum is divisible by `k`.

If such a subset exists, return `true`. Otherwise, return `false`.

The challenge is that checking every possible subset would take exponential time, so we need a more efficient Dynamic Programming solution.

This problem is commonly asked in coding interviews because it combines **subset sum**, **modular arithmetic**, and **dynamic programming optimization**.

---

## Constraints

| Constraint       | Value  |
| ---------------- | ------ |
| `1 ≤ arr.size()` | `1000` |
| `1 ≤ k`          | `1000` |
| `1 ≤ arr[i]`     | `1000` |

---

## Intuition

My first thought was to generate every possible subset and check its sum.

That works for very small arrays, but the number of subsets grows as `2ⁿ`, which quickly becomes impossible for larger inputs.

Then I noticed something important.

I don't actually need to remember every subset. I only need to know the remainder of its sum after dividing by `k`.

Since there are only `k` possible remainders (`0` to `k-1`), I can keep track of which remainders are currently possible while processing the array.

If remainder `0` ever becomes possible, I immediately know that some subset sum is divisible by `k`.

This observation reduces the problem from exponential time to an efficient Dynamic Programming solution.

---

## Approach

I solve the problem in the following order.

1. Create a boolean array of size `k`.
2. Each index represents whether a particular remainder is currently achievable.
3. Process one array element at a time.
4. Copy the current DP array before making updates.
5. Mark the current element itself as a valid subset.
6. Combine the current element with every previously reachable remainder.
7. Compute the new remainder using modular arithmetic.
8. Mark the new remainder as reachable.
9. After updating all states, replace the old DP array.
10. If remainder `0` becomes reachable, return `true`.
11. If every element is processed without reaching remainder `0`, return `false`.

---

## Data Structures Used

### Boolean Array

A boolean array of size `k` stores whether a particular remainder is currently reachable.

This keeps the memory usage small because there are only `k` possible remainder values.

### Temporary Boolean Array

A copy of the DP array is used while processing each number.

This prevents the same array element from being counted multiple times during one iteration.

---

## Operations & Behavior Summary

The algorithm works like this:

* Start with no reachable remainders.
* Read one number from the array.
* Treat the current number as a subset by itself.
* Extend every previously reachable subset using the current number.
* Compute the new remainder after adding the current number.
* Mark the new remainder as reachable.
* Continue until every number has been processed.
* If remainder `0` is ever reached, stop immediately and return `true`.
* Otherwise, return `false`.

---

## Complexity

| Complexity       | Value      | Explanation                                                              |
| ---------------- | ---------- | ------------------------------------------------------------------------ |
| Time Complexity  | `O(n × k)` | For every array element, all possible remainder states are checked once. |
| Space Complexity | `O(k)`     | Only two boolean arrays of size `k` are used.                            |

Where:

* `n` = number of elements in the array
* `k` = divisor

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool divisibleByK(vector<int>& arr, int k) {
        // dp[r] tells whether some non-empty subset
        // can produce remainder r
        vector<bool> dp(k, false);

        // Process every element
        for (int num : arr) {

            // Copy previous states so current element
            // is not reused multiple times
            vector<bool> next = dp;

            // Current element alone forms a subset
            next[num % k] = true;

            // Try adding current element to every
            // previously possible remainder
            for (int r = 0; r < k; r++) {
                if (dp[r]) {
                    int newRem = (r + num) % k;
                    next[newRem] = true;
                }
            }

            // Update DP
            dp = next;

            // If remainder 0 exists, answer is true
            if (dp[0])
                return true;
        }

        // No valid subset found
        return false;
    }
};
```

### Java

```java
class Solution {
    public boolean divisibleByK(int[] arr, int k) {

        // dp[r] tells whether some non-empty subset
        // can produce remainder r
        boolean[] dp = new boolean[k];

        // Process every element
        for (int num : arr) {

            // Copy previous DP states
            boolean[] next = dp.clone();

            // Current element alone forms a subset
            next[num % k] = true;

            // Extend all previous subsets
            for (int r = 0; r < k; r++) {
                if (dp[r]) {
                    int newRem = (r + num) % k;
                    next[newRem] = true;
                }
            }

            // Update DP
            dp = next;

            // Remainder 0 means divisible
            if (dp[0])
                return true;
        }

        // No valid subset exists
        return false;
    }
}
```

### JavaScript

```javascript
class Solution {
    divisibleByK(arr, k) {

        // dp[r] tells whether some non-empty subset
        // can produce remainder r
        let dp = new Array(k).fill(false);

        // Process every number
        for (let num of arr) {

            // Copy previous states
            let next = [...dp];

            // Current number alone forms a subset
            next[num % k] = true;

            // Add current number to previous subsets
            for (let r = 0; r < k; r++) {
                if (dp[r]) {
                    let newRem = (r + num) % k;
                    next[newRem] = true;
                }
            }

            // Update DP
            dp = next;

            // If remainder becomes 0
            if (dp[0])
                return true;
        }

        // No valid subset found
        return false;
    }
};
```

### Python3

```python
class Solution:
    def divisibleByK(self, arr, k):

        # dp[r] tells whether some non-empty subset
        # can produce remainder r
        dp = [False] * k

        # Process every element
        for num in arr:

            # Copy previous DP states
            nxt = dp[:]

            # Current element alone forms a subset
            nxt[num % k] = True

            # Extend all previous subsets
            for r in range(k):
                if dp[r]:
                    new_rem = (r + num) % k
                    nxt[new_rem] = True

            # Update DP
            dp = nxt

            # If remainder 0 exists,
            # we found a valid subset
            if dp[0]:
                return True

        # No subset is divisible by k
        return False
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The overall logic is identical in every language. Only the syntax changes.

First, a boolean array is created to represent every possible remainder from `0` to `k-1`.

Initially, every value is `false` because no subset has been selected.

The algorithm then processes the array one number at a time.

Before updating anything, a copy of the current DP array is created. This is important because every array element can be used only once. Updating the original DP array directly would allow the same element to be counted multiple times during a single iteration.

Next, the current number is treated as a subset by itself. Its remainder is calculated using `number % k`, and that remainder is marked as reachable.

After that, every previously reachable remainder is checked.

If remainder `r` was already possible, adding the current number creates a new subset. The new remainder becomes `(r + number) % k`.

That newly calculated remainder is marked as reachable.

Once all previous states have been processed, the copied array replaces the original DP array.

Immediately after updating, the algorithm checks whether remainder `0` is now reachable.

If it is, that means at least one non-empty subset has a sum divisible by `k`, so the answer is `true`.

If every array element is processed and remainder `0` never appears, the answer is `false`.

The implementations in C++, Java, JavaScript, and Python3 all follow this exact sequence of operations. The only differences are language syntax and the way arrays are copied.

---

## Examples

### Example 1

**Input**

```text
arr = [3, 1, 7, 5]
k = 6
```

**Output**

```text
true
```

**Trace**

* Remainders are updated while processing the array.
* After considering `7` and `5`, a subset with sum `12` is formed.
* `12 % 6 = 0`
* Return `true`.

---

### Example 2

**Input**

```text
arr = [1, 2, 6]
k = 5
```

**Output**

```text
false
```

**Trace**

* Every possible remainder is explored.
* Remainder `0` is never reached.
* No valid subset exists.
* Return `false`.

---

### Example 3

**Input**

```text
arr = [4, 8]
k = 4
```

**Output**

```text
true
```

**Trace**

* The first element itself is divisible by `4`.
* Remainder `0` is reached immediately.
* Return `true`.

---

## How to Use / Run Locally

Clone the repository.

```bash
git clone <repository-url>
```

Move into the project directory.

```bash
cd <repository-folder>
```

### C++

Compile the program.

```bash
g++ solution.cpp -o solution
```

Run it.

```bash
./solution
```

---

### Java

Compile the program.

```bash
javac Solution.java
```

Run it.

```bash
java Solution
```

---

### JavaScript

Run the program using Node.js.

```bash
node solution.js
```

---

### Python3

Run the program.

```bash
python solution.py
```

---

## Notes & Optimizations

* The solution avoids generating every subset, which would require exponential time.
* Only remainder values are stored instead of actual subset sums.
* A temporary DP array is necessary to prevent using the same element multiple times during one iteration.
* The algorithm stops immediately when remainder `0` becomes reachable, saving unnecessary work.
* This Dynamic Programming approach is the expected solution for the given constraints.
* The idea of storing only remainders is useful in many subset sum and modular arithmetic problems.

---

## Author

**Md Aarzoo Islam**

Instagram: [https://www.instagram.com/code.with.aarzoo/](https://www.instagram.com/code.with.aarzoo/)
