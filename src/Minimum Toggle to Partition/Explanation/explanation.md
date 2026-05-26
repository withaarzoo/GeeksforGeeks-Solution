# Minimum Toggle to Partition

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

The "Minimum Toggle to Partition" problem is a binary array problem where we are given an array containing only `0` and `1`.

The goal is to make the array partitioned in this format:

```text
0 0 0 0 ... 1 1 1 1
```

This means:

* All `0`s should appear first
* All `1`s should appear after them

We are allowed to toggle elements:

* `0 → 1`
* `1 → 0`

The task is to find the minimum number of toggles required to make the binary array properly partitioned.

This is a classic greedy and prefix-counting style DSA problem often asked in coding interviews and competitive programming contests.

---

## Constraints

| Constraint    | Value                   |
| ------------- | ----------------------- |
| Array Size    | `1 ≤ arr.size() ≤ 10^5` |
| Element Value | `0 ≤ arr[i] ≤ 1`        |

---

## Intuition

When I first saw this problem, I realized that the final array must have exactly one transition point.

Everything before that point should be `0`, and everything after that point should be `1`.

So instead of directly modifying the array, I started thinking about every possible partition position.

For every partition:

* Left side should contain only `0`
* Right side should contain only `1`

That means:

* Every `1` on the left side is wrong
* Every `0` on the right side is wrong

If I can count both efficiently, then I can compute the number of required toggles for every partition and take the minimum.

That observation leads directly to an efficient linear-time solution.

---

## Approach

First, I count the total number of zeros in the array.

Why?

Because initially I assume the entire array belongs to the right side, where everything should be `1`. So every `0` currently present would need a toggle.

Then I traverse the array from left to right.

During traversal:

* If I see a `0`, I remove it from the right-side zero count
* If I see a `1`, I add it to the left-side one count

At every step:

* `leftOnes` = invalid elements on left side
* `rightZeros` = invalid elements on right side

So total toggles become:

```text
leftOnes + rightZeros
```

I keep updating the minimum answer while traversing the array once.

This gives an optimal `O(n)` solution.

---

## Data Structures Used

| Data Structure    | Purpose                                                                           |
| ----------------- | --------------------------------------------------------------------------------- |
| Integer Variables | Used for counting left-side `1`s, right-side `0`s, and storing the minimum answer |
| Array             | Input binary array traversal                                                      |

No extra arrays, stacks, queues, maps, or sets are needed.

---

## Operations & Behavior Summary

1. Count total zeros in the array
2. Assume entire array is initially on the right side
3. Start traversing from left to right
4. Move elements one by one from right partition to left partition
5. Track:

   * how many `1`s are on the left
   * how many `0`s are on the right
6. Compute toggles needed for current partition
7. Update the minimum answer
8. Return the smallest toggle count found

---

## Complexity

| Type             | Complexity | Explanation                           |
| ---------------- | ---------- | ------------------------------------- |
| Time Complexity  | `O(n)`     | The array is traversed only once      |
| Space Complexity | `O(1)`     | Only a few integer variables are used |

Where:

* `n` = size of the binary array

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minToggle(vector<int>& arr) {
        
        // Count total zeros in the array
        int rightZeros = 0;
        
        for (int num : arr) {
            if (num == 0)
                rightZeros++;
        }

        // Minimum answer when entire array is considered right side
        int ans = rightZeros;

        // Count of ones on the left side
        int leftOnes = 0;

        // Traverse the array and try every partition
        for (int num : arr) {

            // Current zero moves from right side to left side
            if (num == 0)
                rightZeros--;

            // Current one becomes part of left side
            else
                leftOnes++;

            // Total toggles needed for current partition
            ans = min(ans, leftOnes + rightZeros);
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    int minToggle(int[] arr) {

        // Count total zeros in the array
        int rightZeros = 0;

        for (int num : arr) {
            if (num == 0)
                rightZeros++;
        }

        // Initial answer
        int ans = rightZeros;

        // Count ones on left side
        int leftOnes = 0;

        // Try every partition
        for (int num : arr) {

            // Remove zero from right side
            if (num == 0)
                rightZeros--;

            // Add one to left side
            else
                leftOnes++;

            // Update minimum toggles
            ans = Math.min(ans, leftOnes + rightZeros);
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    minToggle(arr) {

        // Count total zeros
        let rightZeros = 0;

        for (let num of arr) {
            if (num === 0)
                rightZeros++;
        }

        // Initial minimum answer
        let ans = rightZeros;

        // Count ones on left side
        let leftOnes = 0;

        // Traverse array
        for (let num of arr) {

            // Current zero leaves right side
            if (num === 0)
                rightZeros--;

            // Current one enters left side
            else
                leftOnes++;

            // Update answer
            ans = Math.min(ans, leftOnes + rightZeros);
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:
    def minToggle(self, arr):

        # Count total zeros in array
        rightZeros = 0

        for num in arr:
            if num == 0:
                rightZeros += 1

        # Initial answer
        ans = rightZeros

        # Count ones on left side
        leftOnes = 0

        # Traverse array
        for num in arr:

            # Remove zero from right side
            if num == 0:
                rightZeros -= 1

            # Add one to left side
            else:
                leftOnes += 1

            # Update minimum answer
            ans = min(ans, leftOnes + rightZeros)

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in all languages. Only syntax changes.

First, we count the total number of zeros in the array.

This count represents how many wrong elements currently exist on the right side if we place the partition before the first element.

Then we create another variable to track how many `1`s appear on the left side while traversing.

As we move through the array:

* A `0` leaves the right side
* A `1` enters the left side

At every step:

* Left-side `1`s are invalid because left side should contain only `0`
* Right-side `0`s are invalid because right side should contain only `1`

So the total toggles required become:

```text
leftOnes + rightZeros
```

We continuously update the minimum answer.

This approach works efficiently because:

* We never recompute counts from scratch
* Every element is processed only once
* No extra memory is required

### Why This Greedy Counting Approach Works

The final valid array always has exactly one partition point.

So instead of trying all possible toggle combinations, we only try all possible partition positions.

That reduces the problem from exponential possibilities to a simple linear scan.

### Important Edge Cases

#### All zeros

Input:

```text
[0, 0, 0]
```

Already partitioned.

Answer:

```text
0
```

#### All ones

Input:

```text
[1, 1, 1]
```

Already partitioned.

Answer:

```text
0
```

#### Alternating values

Input:

```text
[1, 0, 1, 0, 1]
```

Multiple invalid positions exist, so toggles are required.

The algorithm checks every partition efficiently.

---

## Examples

### Example 1

Input:

```text
arr = [1, 0, 1, 1, 0]
```

Output:

```text
2
```

Explanation:

One valid final array can be:

```text
[0, 0, 1, 1, 1]
```

Changes made:

* First `1 → 0`
* Last `0 → 1`

Total toggles = `2`

---

### Example 2

Input:

```text
arr = [0, 1, 0, 0, 1, 1, 1]
```

Output:

```text
1
```

Explanation:

Only one toggle is needed:

```text
[0, 0, 0, 0, 1, 1, 1]
```

The second element changes from `1 → 0`.

---

### Example 3

Input:

```text
arr = [1, 1, 1, 1]
```

Output:

```text
0
```

Explanation:

The array is already partitioned because all `1`s are together after zero `0`s.

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

Run using Node.js:

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

* This problem is best solved using greedy counting with prefix-style tracking.
* A brute-force solution would try every partition and recount values every time, leading to `O(n²)` complexity.
* The optimized solution avoids repeated counting.
* No additional memory allocation is required.
* This approach is interview-friendly because it demonstrates:

  * observation skills
  * greedy thinking
  * efficient traversal
  * space optimization

### Alternative Idea

Another approach is using prefix and suffix arrays:

* Prefix array for counting left-side `1`s
* Suffix array for counting right-side `0`s`

But that requires extra memory.

The current approach achieves the same result using constant space.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
