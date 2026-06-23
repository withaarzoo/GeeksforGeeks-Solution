# Maximum Number of People Defeated

A complete solution and explanation for the GeeksforGeeks DSA problem **Maximum Number of People Defeated** using **Binary Search** and the **Sum of Squares Formula**.

This repository contains an optimized approach with implementations in C++, Java, JavaScript, and Python3.

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
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

There are infinitely many people standing in a row.

The strength of the person at index `i` is:

```text
i²
```

You are given an initial strength `p`.

A person can be defeated only if your current strength is greater than or equal to that person's strength. After defeating that person, your strength decreases by the same amount.

The goal is to find the **maximum number of people that can be defeated**.

### Input

A single integer:

```text
p
```

### Output

Return the maximum number of people that can be defeated.

This problem is a classic combination of:

* Binary Search on Answer
* Mathematical Formula
* Sum of Squares
* Efficient Searching

---

## Constraints

| Constraint | Value   |
| ---------- | ------- |
| 1 ≤ p      | 3 × 10⁸ |

---

## Intuition

The first thing I noticed was that every person's strength follows a perfect square pattern:

```text
1, 4, 9, 16, 25, ...
```

If I defeat the first few people, the total strength consumed becomes:

```text
1² + 2² + 3² + ... + k²
```

Instead of simulating every defeat one by one, I can directly calculate the total strength required for the first `k` people.

The well-known mathematical formula is:

```text
1² + 2² + 3² + ... + k²
=
k(k+1)(2k+1)/6
```

Now the problem becomes:

Find the largest value of `k` such that:

```text
k(k+1)(2k+1)/6 ≤ p
```

Since larger values of `k` always require more strength, the answer space is naturally sorted. That immediately suggests using Binary Search.

---

## Approach

### Step 1

Use the sum of squares formula:

```text
sum(k) = k(k+1)(2k+1)/6
```

### Step 2

Binary search on the number of people defeated.

### Step 3

For every middle value:

* Calculate required strength using the formula.
* If the required strength is less than or equal to `p`, this value is valid.
* Store the answer and search for a larger value.
* Otherwise search for a smaller value.

### Step 4

Continue until binary search finishes.

### Step 5

Return the largest valid count.

---

## Data Structures Used

No special data structure is required.

| Data Structure | Purpose                                   |
| -------------- | ----------------------------------------- |
| Variables      | Store binary search boundaries and answer |

The solution relies entirely on mathematical calculations and binary search.

---

## Operations & Behavior Summary

The algorithm performs the following operations:

1. Start with a search range for the answer.
2. Pick the middle value.
3. Calculate the sum of squares for that value.
4. Compare the required strength with `p`.
5. If possible:

   * Save the answer.
   * Move right.
6. Otherwise:

   * Move left.
7. Continue until the search space becomes empty.
8. Return the largest valid answer.

---

## Complexity

| Metric           | Complexity | Explanation                                                   |
| ---------------- | ---------- | ------------------------------------------------------------- |
| Time Complexity  | O(log p)   | Binary search reduces the search space by half each iteration |
| Space Complexity | O(1)       | Only a few variables are used                                 |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxPeopleDefeated(int p) {
        // Binary search range
        long long low = 0, high = 10000;
        
        // Stores the maximum valid answer
        long long ans = 0;
        
        while (low <= high) {
            // Middle value of current search space
            long long mid = low + (high - low) / 2;
            
            // Sum of squares:
            // 1^2 + 2^2 + ... + mid^2
            long long sum = mid * (mid + 1) * (2 * mid + 1) / 6;
            
            // If total required strength is within p
            if (sum <= p) {
                ans = mid;      // mid is a valid answer
                low = mid + 1;  // Try to find a larger one
            } else {
                high = mid - 1; // Need a smaller value
            }
        }
        
        // Return maximum people defeated
        return (int)ans;
    }
};
```

### Java

```java
class Solution {
    int maxPeopleDefeated(int p) {
        
        // Binary search boundaries
        long low = 0;
        long high = 10000;
        
        // Stores best valid answer
        long ans = 0;
        
        while (low <= high) {
            
            // Current middle value
            long mid = low + (high - low) / 2;
            
            // Sum of first mid squares
            long sum = mid * (mid + 1) * (2 * mid + 1) / 6;
            
            // If strength is sufficient
            if (sum <= p) {
                ans = mid;      // Save answer
                low = mid + 1;  // Search right side
            } else {
                high = mid - 1; // Search left side
            }
        }
        
        return (int) ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    maxPeopleDefeated(p) {
        
        // Binary search limits
        let low = 0;
        let high = 10000;
        
        // Best answer found so far
        let ans = 0;
        
        while (low <= high) {
            
            // Middle value
            let mid = Math.floor((low + high) / 2);
            
            // Sum of squares formula
            let sum = mid * (mid + 1) * (2 * mid + 1) / 6;
            
            // Check if this many people can be defeated
            if (sum <= p) {
                ans = mid;      // Valid answer
                low = mid + 1;  // Try larger answer
            } else {
                high = mid - 1; // Reduce answer
            }
        }
        
        return ans;
    }
}
```

### Python3

```python
class Solution:
    def maxPeopleDefeated(self, p):
        
        # Binary search range
        low = 0
        high = 10000
        
        # Stores maximum valid answer
        ans = 0
        
        while low <= high:
            
            # Middle point
            mid = (low + high) // 2
            
            # Sum of squares:
            # 1^2 + 2^2 + ... + mid^2
            total = mid * (mid + 1) * (2 * mid + 1) // 6
            
            # If current count is possible
            if total <= p:
                ans = mid       # Save answer
                low = mid + 1   # Try larger count
            else:
                high = mid - 1  # Need smaller count
        
        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in all four languages.

### Understanding the Strength Pattern

Each person's strength is:

```text
1²
2²
3²
4²
...
```

So the total strength required for defeating the first `k` people is:

```text
1² + 2² + 3² + ... + k²
```

Using the mathematical formula:

```text
k(k+1)(2k+1)/6
```

we can calculate this instantly.

### Why Binary Search Works

Suppose:

```text
k = 5
```

works successfully.

Then:

```text
1
2
3
4
```

will also work.

Similarly, if:

```text
k = 8
```

fails,

then:

```text
9
10
11
...
```

will also fail.

This creates a sorted answer space:

```text
Valid Valid Valid Valid Invalid Invalid Invalid
```

Whenever a problem has this pattern, Binary Search is usually a strong candidate.

### What Happens During Each Iteration

For every middle value:

1. Compute required strength.
2. Compare it with available strength.
3. If valid:

   * Save answer.
   * Search larger values.
4. If invalid:

   * Search smaller values.

Eventually the largest valid answer remains stored.

### Why This Is Better Than Simulation

A direct simulation would repeatedly generate squares and subtract them.

While that may still work for this constraint, Binary Search combined with the mathematical formula is much cleaner and faster.

---

## Examples

### Example 1

#### Input

```text
p = 14
```

#### Output

```text
3
```

#### Trace

```text
1² = 1
2² = 4
3² = 9

Total = 1 + 4 + 9 = 14
```

Exactly matches the available strength.

Maximum people defeated:

```text
3
```

---

### Example 2

#### Input

```text
p = 10
```

#### Output

```text
2
```

#### Trace

```text
1² = 1
2² = 4

Total = 5
```

Remaining strength:

```text
10 - 5 = 5
```

Next person requires:

```text
3² = 9
```

Cannot defeat them.

Answer:

```text
2
```

---

### Example 3

#### Input

```text
p = 30
```

#### Output

```text
4
```

#### Trace

```text
1 + 4 + 9 + 16 = 30
```

Exactly enough strength.

Answer:

```text
4
```

---

## How to Use / Run Locally

### C++

Compile:

```bash
g++ solution.cpp -o solution
```

Run:

```bash
./solution
```

---

### Java

Compile:

```bash
javac Solution.java
```

Run:

```bash
java Solution
```

---

### JavaScript

Run:

```bash
node solution.js
```

---

### Python3

Run:

```bash
python solution.py
```

---

## Notes & Optimizations

### Important Observation

The answer depends only on:

```text
1² + 2² + 3² + ... + k²
```

This allows us to avoid simulation completely.

### Why Use Long Integer Types

The formula contains multiple multiplications:

```text
k(k+1)(2k+1)
```

Using larger integer types prevents overflow.

### Alternative Approach

A linear simulation can also solve the problem.

However:

* Binary Search is faster.
* The mathematical approach is cleaner.
* It scales better for larger constraints.

### Edge Cases

#### Smallest Input

```text
p = 1
```

Answer:

```text
1
```

#### Exact Match

```text
p = 14
```

Answer:

```text
3
```

#### Non-exact Match

```text
p = 15
```

Answer:

```text
3
```

because:

```text
1 + 4 + 9 = 14
```

and the next requirement is:

```text
16
```

which cannot be satisfied.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
