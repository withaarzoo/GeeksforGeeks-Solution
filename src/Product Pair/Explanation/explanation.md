# Product Pair

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

The Product Pair problem asks us to determine whether an array contains two numbers whose multiplication equals a given target value.

We are given:

* An integer array `arr[]`
* A target value `target`

We need to return:

* `true` if any valid pair exists
* `false` otherwise

This is a common HashSet-based DSA problem that tests array traversal, mathematical observation, and efficient lookup techniques.

The main challenge is solving it efficiently without checking every possible pair using nested loops.

---

## Constraints

| Constraint          | Value                     |
| ------------------- | ------------------------- |
| Array Size          | `2 ≤ arr.size() ≤ 10^5`   |
| Array Element Range | `-10^8 ≤ arr[i] ≤ 10^8`   |
| Target Range        | `-10^18 ≤ target ≤ 10^18` |

---

## Intuition

The first thing I noticed was this:

If I already know one number `x`, then the second number must be:

```text
target / x
```

That means instead of checking every pair manually, I can directly search for the required partner.

This immediately suggests using a HashSet.

While traversing the array:

* I store previously visited numbers
* For every current number, I calculate the value needed to form the target product
* If that value already exists, then I found a valid pair

I also noticed one important edge case involving zero.

Since division by zero is invalid, zero must be handled separately.

This observation turns a slow brute-force solution into an efficient `O(n)` product pair algorithm.

---

## Approach

I used a HashSet-based approach for fast lookup.

Step-by-step process:

1. Create an empty HashSet.
2. Traverse the array one element at a time.
3. For each number:

   * Handle zero separately
   * Check whether the target is divisible by the current number
   * Find the required partner value
   * Check whether that partner already exists in the set
4. If a valid pair is found, return `true`.
5. Otherwise continue traversing.
6. If traversal ends without a match, return `false`.

This approach avoids nested loops and keeps the solution optimized for large inputs.

---

## Data Structures Used

| Data Structure | Purpose                                                  |
| -------------- | -------------------------------------------------------- |
| HashSet / Set  | Stores previously visited numbers for fast `O(1)` lookup |
| Array          | Holds the input elements                                 |

Why HashSet?

Because searching inside a normal array would take `O(n)` time for every element. A HashSet reduces lookup time significantly and helps achieve linear complexity.

---

## Operations & Behavior Summary

The algorithm works like this:

1. Start traversing the array.
2. For every number:

   * Skip invalid division cases
   * Calculate the required partner
   * Search for the partner in the HashSet
3. If the partner exists:

   * A valid product pair is found
4. Otherwise:

   * Store the current number
   * Continue traversal
5. Return `false` if no pair exists

This creates an efficient array product search solution using hashing.

---

## Complexity

| Type             | Complexity | Explanation                                        |
| ---------------- | ---------- | -------------------------------------------------- |
| Time Complexity  | `O(n)`     | The array is traversed only once                   |
| Space Complexity | `O(n)`     | Extra HashSet storage is used for visited elements |

Where:

* `n` = size of the input array

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool isProduct(vector<int>& arr, long long target) {
        
        // HashSet to store visited numbers
        unordered_set<long long> seen;

        // Traverse every element
        for (long long num : arr) {

            // Special handling for zero
            if (num == 0) {

                // If target is also zero,
                // then 0 multiplied with any previous number becomes 0
                if (target == 0 && !seen.empty()) {
                    return true;
                }

                // Store zero and continue
                seen.insert(num);
                continue;
            }

            // If target is not divisible by current number,
            // then no valid pair can exist with this number
            if (target % num != 0) {
                seen.insert(num);
                continue;
            }

            // Calculate required partner
            long long needed = target / num;

            // If partner already exists, pair found
            if (seen.count(needed)) {
                return true;
            }

            // Store current number for future checks
            seen.insert(num);
        }

        // No valid pair found
        return false;
    }
}; 
```

### Java

```java
class Solution {
    public boolean isProduct(int[] arr, long target) {

        // HashSet to store visited numbers
        HashSet<Long> seen = new HashSet<>();

        // Traverse array
        for (long num : arr) {

            // Special case for zero
            if (num == 0) {

                // If target is zero and any previous number exists
                // then product can become zero
                if (target == 0 && !seen.isEmpty()) {
                    return true;
                }

                // Store zero and move ahead
                seen.add(num);
                continue;
            }

            // Skip if target is not divisible
            if (target % num != 0) {
                seen.add(num);
                continue;
            }

            // Required pair value
            long needed = target / num;

            // Check whether partner already exists
            if (seen.contains(needed)) {
                return true;
            }

            // Store current value
            seen.add(num);
        }

        // No pair found
        return false;
    }
}; 
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @param {number} target
 * @returns {boolean}
 */

class Solution {
    isProduct(arr, target) {

        // Set to store visited elements
        let seen = new Set();

        // Traverse array
        for (let num of arr) {

            // Handle zero separately
            if (num === 0) {

                // If target is zero and
                // some previous element exists
                if (target === 0 && seen.size > 0) {
                    return true;
                }

                // Store zero
                seen.add(num);
                continue;
            }

            // If target is not divisible,
            // no pair can be formed
            if (target % num !== 0) {
                seen.add(num);
                continue;
            }

            // Find required partner
            let needed = target / num;

            // Check if partner exists
            if (seen.has(needed)) {
                return true;
            }

            // Store current element
            seen.add(num);
        }

        // No valid pair exists
        return false;
    }
}; 
```

### Python3

```python
class Solution:
    def isProduct(self, arr, target):

        # Set to store visited elements
        seen = set()

        # Traverse every number
        for num in arr:

            # Handle zero separately
            if num == 0:

                # If target is zero and
                # there is any previous number
                if target == 0 and len(seen) > 0:
                    return True

                # Store zero
                seen.add(num)
                continue

            # If target is not divisible by current number,
            # then this number cannot form a valid pair
            if target % num != 0:
                seen.add(num)
                continue

            # Required partner value
            needed = target // num

            # If partner already exists,
            # pair found
            if needed in seen:
                return True

            # Store current number
            seen.add(num)

        # No valid pair found
        return False
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains mostly the same across all languages.

First, a HashSet is created.

The purpose of this set is to store numbers that were already processed earlier in the traversal.

This allows constant-time lookup for the required partner value.

While traversing the array:

* The current element is checked
* If the current value is zero, special handling is required because division by zero is not allowed
* If the target is also zero, then any previous non-empty state may form a valid answer

For non-zero values:

* The algorithm checks whether the target is divisible by the current number
* If not divisible, then no integer partner exists
* If divisible, the required value is calculated

Then the HashSet is searched.

If the required partner already exists:

* The algorithm immediately returns `true`

Otherwise:

* The current value gets added into the set
* Traversal continues

This strategy avoids unnecessary comparisons and keeps the solution efficient even for very large arrays.

Language-specific behavior:

### C++

* `unordered_set` is used for fast average-case lookup
* `long long` is necessary because the target range is large

### Java

* `HashSet<Long>` is used
* Primitive `long` type prevents integer overflow issues

### JavaScript

* `Set` provides quick lookup support
* JavaScript numbers internally use floating-point representation, but integer operations work correctly within problem limits

### Python3

* Python `set()` gives average `O(1)` lookup
* Python integers automatically handle very large values

---

## Examples

### Example 1

Input:

```text
arr = [10, 20, 9, 40]
target = 400
```

Output:

```text
true
```

Explanation:

```text
10 × 40 = 400
```

So a valid product pair exists.

---

### Example 2

Input:

```text
arr = [-10, 20, 9, -40]
target = 30
```

Output:

```text
false
```

Explanation:

No pair produces the target product `30`.

---

### Example 3

Input:

```text
arr = [-10, 0, 9, -40]
target = 0
```

Output:

```text
true
```

Explanation:

```text
-10 × 0 = 0
```

Any number multiplied by zero becomes zero.

---

## How to Use / Run Locally

### C++

Compile:

```bash
g++ main.cpp -o main
```

Run:

```bash
./main
```

---

### Java

Compile:

```bash
javac Main.java
```

Run:

```bash
java Main
```

---

### JavaScript

Run using Node.js:

```bash
node main.js
```

---

### Python3

Run:

```bash
python main.py
```

---

## Notes & Optimizations

* A brute-force solution using nested loops would take `O(n²)` time and fail for large inputs.
* Using a HashSet reduces lookup time dramatically.
* Zero handling is important because division by zero is invalid.
* Large target values require bigger integer types like `long long` or `long`.
* This problem is a good example of using mathematical observation with hashing for optimization.

Possible alternative approaches:

* Sorting + two pointers does not work well here because multiplication with negative numbers complicates traversal logic.
* Hashing remains the cleanest and most efficient solution.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
