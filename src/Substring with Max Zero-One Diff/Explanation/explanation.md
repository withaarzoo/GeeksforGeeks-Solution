# Substring with Max Zero-One Diff

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

## Problem Summary

Given a binary string consisting of only `0`s and `1`s, the goal is to find a substring that produces the maximum possible value of:

```text
(number of 0s) - (number of 1s)
```

Among all possible substrings, we need to return the highest difference.

If the string contains only `1`s, the answer must be `-1`.

This problem is a popular Dynamic Programming and Kadane's Algorithm problem frequently asked in coding interviews and competitive programming contests.

## Constraints

| Constraint                | Value            |
| ------------------------- | ---------------- |
| String Length             | 1 ≤ n ≤ 10⁵      |
| Characters                | Only `0` and `1` |
| Expected Time Complexity  | O(n)             |
| Expected Space Complexity | O(1)             |

## Intuition

When I first looked at the problem, I noticed that every `0` increases the required difference by `1`, while every `1` decreases it by `1`.

That means I can transform the string into an array where:

* `0 → +1`
* `1 → -1`

After this conversion, the problem becomes much simpler.

Instead of counting zeros and ones for every substring, I only need to find the maximum sum contiguous subarray.

That is exactly what Kadane's Algorithm is designed for.

## Approach

1. Traverse the binary string from left to right.
2. Convert each character:

   * `0` becomes `+1`
   * `1` becomes `-1`
3. Maintain a running sum for the current substring.
4. Update the maximum answer whenever a larger sum is found.
5. If the running sum becomes negative, reset it to zero because a negative sum can never help future substrings.
6. Return the maximum sum obtained.
7. If no positive sum exists, return `-1`.

This gives the optimal solution in linear time.

## Data Structures Used

| Data Structure    | Purpose                                      |
| ----------------- | -------------------------------------------- |
| Integer Variables | Store current running sum and maximum answer |

No arrays, stacks, queues, hash maps, or additional data structures are required.

## Operations & Behavior Summary

The algorithm performs the following operations:

1. Read one character at a time.
2. Convert the character into either `+1` or `-1`.
3. Add the value to the current running sum.
4. Compare the running sum with the best answer found so far.
5. Reset the running sum if it becomes negative.
6. Continue until the entire string is processed.
7. Return the maximum difference.

This is essentially Kadane's Algorithm applied to a transformed binary string.

## Complexity

| Metric           | Complexity | Explanation                        |
| ---------------- | ---------- | ---------------------------------- |
| Time Complexity  | O(n)       | The string is scanned exactly once |
| Space Complexity | O(1)       | Only a few variables are used      |

Where:

* `n` = length of the binary string

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxSubstring(string &s) {
        
        // Stores maximum difference found so far
        int maxSum = -1;
        
        // Stores current substring sum
        int currentSum = 0;
        
        for(char ch : s) {
            
            // Convert:
            // '0' -> +1
            // '1' -> -1
            int value = (ch == '0') ? 1 : -1;
            
            // Extend current substring
            currentSum += value;
            
            // Update best answer
            maxSum = max(maxSum, currentSum);
            
            // Negative sum can never help future substrings
            if(currentSum < 0) {
                currentSum = 0;
            }
        }
        
        return maxSum;
    }
};
```

### Java

```java
class Solution {
    int maxSubstring(String s) {
        
        // Stores maximum difference found so far
        int maxSum = -1;
        
        // Stores current substring sum
        int currentSum = 0;
        
        for(int i = 0; i < s.length(); i++) {
            
            // Convert character into contribution
            int value = (s.charAt(i) == '0') ? 1 : -1;
            
            // Extend current substring
            currentSum += value;
            
            // Update answer
            maxSum = Math.max(maxSum, currentSum);
            
            // Start fresh if sum becomes negative
            if(currentSum < 0) {
                currentSum = 0;
            }
        }
        
        return maxSum;
    }
}
```

### JavaScript

```javascript
/**
 * @param {string} s
 * @returns {number}
 */

class Solution {
    maxSubstring(s) {
        
        // Stores maximum difference found so far
        let maxSum = -1;
        
        // Stores current substring sum
        let currentSum = 0;
        
        for (let ch of s) {
            
            // Convert:
            // '0' -> +1
            // '1' -> -1
            let value = (ch === '0') ? 1 : -1;
            
            // Extend current substring
            currentSum += value;
            
            // Update maximum answer
            maxSum = Math.max(maxSum, currentSum);
            
            // Reset if current sum becomes negative
            if (currentSum < 0) {
                currentSum = 0;
            }
        }
        
        return maxSum;
    }
}
```

### Python3

```python
class Solution:
 def maxSubstring(self, s):
  
  # Stores maximum difference found so far
  max_sum = -1
  
  # Stores current substring sum
  current_sum = 0
  
  for ch in s:
   
   # Convert:
   # '0' -> +1
   # '1' -> -1
   value = 1 if ch == '0' else -1
   
   # Extend current substring
   current_sum += value
   
   # Update answer
   max_sum = max(max_sum, current_sum)
   
   # Negative sum cannot help future substrings
   if current_sum < 0:
    current_sum = 0
  
  return max_sum
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in all language implementations.

### Step 1: Transform Characters

Every character contributes to the final difference.

* `0` contributes `+1`
* `1` contributes `-1`

This converts the original problem into a maximum subarray sum problem.

### Step 2: Maintain a Running Sum

As we move through the string, we keep adding the transformed values to a running total.

This running total represents the contribution of the current substring.

### Step 3: Track the Best Answer

After updating the running sum, we compare it with the maximum answer found so far.

If the current value is larger, we update the answer.

### Step 4: Reset Negative Sums

Whenever the running sum becomes negative, we discard it.

A negative prefix only reduces the value of future substrings.

Starting fresh from the next position always gives a better result.

### Step 5: Handle All-Ones Strings

If the string contains only `1`s:

```text
1 → -1
```

Every transformed value becomes negative.

Kadane's Algorithm never finds a positive sum, so the answer remains `-1`.

This naturally handles the required edge case.

## Examples

### Example 1

Input

```text
11000010001
```

Output

```text
6
```

Explanation

One optimal substring contains:

```text
7 zeros
1 one
```

Difference:

```text
7 - 1 = 6
```

---

### Example 2

Input

```text
111111
```

Output

```text
-1
```

Explanation

The string contains only ones.

No substring can produce a positive difference.

---

### Example 3

Input

```text
00110
```

Transformation

```text
+1 +1 -1 -1 +1
```

Maximum subarray sum

```text
2
```

Output

```text
2
```

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

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

### JavaScript

Run

```bash
node solution.js
```

### Python3

Run

```bash
python solution.py
```

## Notes & Optimizations

* This problem is a direct application of Kadane's Algorithm.
* Brute force checking all substrings would take O(n²) time or worse.
* The optimized solution runs in O(n) time.
* No extra memory is required.
* The approach scales efficiently for strings of length up to 100000.
* The all-ones edge case is handled naturally without additional checks.
* This is a commonly asked Dynamic Programming and Maximum Subarray interview problem.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
