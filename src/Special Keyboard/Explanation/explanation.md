# Special Keyboard | Dynamic Programming Solution in C++, Java, JavaScript, and Python

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

The Special Keyboard problem is a popular Dynamic Programming problem from GeeksforGeeks.

We are given a keyboard with only four keys:

1. Press `'A'`
2. `Ctrl + A` → Select all text
3. `Ctrl + C` → Copy selected text
4. `Ctrl + V` → Paste copied text

The task is to find the maximum number of `'A'` characters that can appear on the screen after exactly `n` key presses.

At first, pressing `'A'` repeatedly looks fine. But after a few operations, using copy-paste combinations becomes much more efficient. The challenge is figuring out the best time to stop typing and start using clipboard operations.

This problem is a great example of Dynamic Programming optimization and state transition thinking.

---

## Constraints

| Constraint         | Value |
| ------------------ | ----- |
| Minimum value of n | 1     |
| Maximum value of n | 70    |

---

## Intuition

My first instinct was simple:

If I want more `'A'` characters, I can just keep pressing the `'A'` key.

But after checking the operations carefully, I noticed that copy-paste operations can multiply the current result very quickly.

The important observation is this:

* Typing manually increases count slowly
* Copy-paste operations increase count much faster
* The real challenge is choosing the perfect breakpoint where typing should stop and copying should begin

This naturally leads toward Dynamic Programming because the best answer for smaller values helps build the answer for larger values.

---

## Approach

I used Dynamic Programming to solve this problem efficiently.

### Step 1: Create a DP array

I store answers in:

```text
dp[i]
```

where:

```text
dp[i] = maximum number of A's possible using exactly i key presses
```

---

### Step 2: Initialize base values

For small values, the best option is simply:

```text
Press 'A'
```

So initially:

```text
dp[i] = i
```

---

### Step 3: Try all possible breakpoints

For every position `j`:

* I assume I already created `dp[j]` characters
* Then I use:

  * Ctrl + A
  * Ctrl + C
  * Multiple Ctrl + V operations

The remaining operations become paste operations.

This creates a multiplication effect.

---

### Step 4: Update the best answer

For every possible breakpoint:

```text
dp[i] = max(current answer, copy-paste answer)
```

This ensures we always keep the maximum possible value.

---

## Data Structures Used

| Data Structure            | Purpose                                                |
| ------------------------- | ------------------------------------------------------ |
| Dynamic Programming Array | Stores the best answer for every number of key presses |

I only used one DP array because each answer depends on previously computed states.

---

## Operations & Behavior Summary

The algorithm works in these stages:

1. Start with the assumption that pressing `'A'` every time is the answer
2. Build solutions from smaller values toward larger values
3. For every key press count:

   * Try every possible position where copy-paste can start
4. Simulate:

   * Select All
   * Copy
   * Multiple Paste operations
5. Compare all possibilities
6. Store the best possible result

This bottom-up Dynamic Programming approach guarantees the optimal solution.

---

## Complexity

| Type             | Complexity | Explanation                                        |
| ---------------- | ---------- | -------------------------------------------------- |
| Time Complexity  | O(n²)      | For every `i`, we try all previous breakpoints `j` |
| Space Complexity | O(n)       | One DP array is used to store intermediate answers |

Where:

* `n` = total number of key presses

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int optimalKeys(int n) {
        
        // dp[i] stores the maximum number of A's
        // possible using exactly i key presses
        vector<int> dp(n + 1, 0);

        // Base case:
        // For small values, simply press 'A'
        for (int i = 1; i <= n; i++) {
            dp[i] = i;
        }

        // Try all lengths from 1 to n
        for (int i = 1; i <= n; i++) {

            // j represents the point where
            // we stop typing and start copy-paste operations
            for (int j = 1; j <= i - 3; j++) {

                // After j presses:
                // Ctrl+A -> 1 press
                // Ctrl+C -> 1 press
                // Remaining are Ctrl+V operations
                // Total multiplication becomes (i - j - 1)
                dp[i] = max(dp[i], dp[j] * (i - j - 1));
            }
        }

        // Final answer
        return dp[n];
    }
};
```

### Java

```java
class Solution {
    public int optimalKeys(int n) {

        // dp[i] stores maximum number of A's
        // possible using exactly i key presses
        int[] dp = new int[n + 1];

        // Base case:
        // Best option initially is pressing 'A'
        for (int i = 1; i <= n; i++) {
            dp[i] = i;
        }

        // Build answers for all values
        for (int i = 1; i <= n; i++) {

            // Try every possible breakpoint
            for (int j = 1; j <= i - 3; j++) {

                // Use copy-paste strategy
                dp[i] = Math.max(dp[i], dp[j] * (i - j - 1));
            }
        }

        // Return final answer
        return dp[n];
    }
}
```

### JavaScript

```javascript
class Solution {
    optimalKeys(n) {

        // dp[i] stores maximum number of A's
        // possible with exactly i key presses
        let dp = new Array(n + 1).fill(0);

        // Base case:
        // Press 'A' directly
        for (let i = 1; i <= n; i++) {
            dp[i] = i;
        }

        // Compute answers for all states
        for (let i = 1; i <= n; i++) {

            // Try every possible breakpoint
            for (let j = 1; j <= i - 3; j++) {

                // Apply copy-paste optimization
                dp[i] = Math.max(dp[i], dp[j] * (i - j - 1));
            }
        }

        // Final result
        return dp[n];
    }
};
```

### Python3

```python
class Solution:

    def optimalKeys(self, n: int):

        # dp[i] stores the maximum number of A's
        # possible using exactly i key presses
        dp = [0] * (n + 1)

        # Base case:
        # Simply press 'A'
        for i in range(1, n + 1):
            dp[i] = i

        # Build DP table
        for i in range(1, n + 1):

            # Try every possible breakpoint
            for j in range(1, i - 2):

                # Copy-paste multiplication logic
                dp[i] = max(dp[i], dp[j] * (i - j - 1))

        # Return final answer
        return dp[n]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in all four languages.

The only difference is syntax.

### DP Array Creation

Every solution starts by creating a DP array.

This array stores the maximum number of `'A'` characters possible for every key press count.

Without storing previous answers, we would repeatedly solve the same subproblems again and again.

That would make the solution much slower.

---

### Base Initialization

Initially:

```text
dp[i] = i
```

This means:

If I do nothing smart and only press `'A'`, then after `i` operations I will get exactly `i` characters.

This becomes the minimum guaranteed answer.

---

### Main DP Transition

For every value of `i`, we try every possible breakpoint `j`.

The idea is:

* Up to `j`, we build characters normally
* After that:

  * Select everything
  * Copy everything
  * Paste repeatedly

This creates the multiplication effect.

The formula becomes:

```text
dp[j] * (i - j - 1)
```

because:

* `dp[j]` = current characters
* `i - j - 2` = number of paste operations
* Total copies on screen become:

  * original text
  * plus all pasted copies

---

### Why Copy-Paste Is Better

Suppose we already have:

```text
AAAA
```

If we:

```text
Ctrl + A
Ctrl + C
Ctrl + V
Ctrl + V
```

then:

```text
AAAA
→ AAAAAAAA
→ AAAAAAAAAAAA
```

The growth becomes much faster than typing manually.

---

### Final Answer

After filling the DP array completely:

```text
dp[n]
```

stores the maximum possible number of `'A'` characters.

That becomes the final answer.

---

## Examples

### Example 1

#### Input

```text
n = 3
```

#### Output

```text
3
```

#### Explanation

Best choice:

```text
A
A
A
```

Final screen:

```text
AAA
```

---

### Example 2

#### Input

```text
n = 7
```

#### Output

```text
9
```

#### Explanation

One optimal sequence:

```text
A
A
A
Ctrl + A
Ctrl + C
Ctrl + V
Ctrl + V
```

Final screen:

```text
AAAAAAAAA
```

Total count = 9

---

### Example 3

#### Input

```text
n = 9
```

#### Output

```text
16
```

#### Explanation

One efficient sequence:

```text
A
A
A
A
Ctrl + A
Ctrl + C
Ctrl + V
Ctrl + V
Ctrl + V
```

Final count becomes 16.

---

## How to Use / Run Locally

### C++

#### Compile

```bash
g++ filename.cpp -o output
```

#### Run

```bash
./output
```

---

### Java

#### Compile

```bash
javac Solution.java
```

#### Run

```bash
java Solution
```

---

### JavaScript

#### Run

```bash
node filename.js
```

---

### Python3

#### Run

```bash
python filename.py
```

---

## Notes & Optimizations

* This problem is one of the classic Dynamic Programming interview questions
* Brute force recursion would be extremely slow because many states repeat
* Dynamic Programming avoids recalculating the same states
* The optimized DP solution works comfortably within constraints
* The most important insight is identifying the correct breakpoint for copy-paste operations
* For very small values of `n`, typing directly is always better
* Copy-paste becomes useful only after building a decent number of characters first

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
