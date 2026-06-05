# Lexicographically Smallest After Removing K | Monotonic Stack Solution

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

Given a lowercase string `s` and an integer `k`, the goal is to find the lexicographically smallest string possible after removing exactly `k` characters.

Before removing characters, the value of `k` must be adjusted based on the length of the string:

* If the length of the string is a power of 2, divide `k` by 2.
* Otherwise, multiply `k` by 2.

After correcting `k`, remove exactly that many characters while keeping the remaining string as small as possible in lexicographical order.

If it is impossible to remove the required number of characters or the final string becomes empty, return `-1`.

This problem is a classic variation of the "remove k characters to form the smallest string" problem and can be solved efficiently using a monotonic stack approach.

## Constraints

| Constraint  | Value                     |
| ----------- | ------------------------- |
| 1 ≤ n ≤ 10⁵ | String length             |
| 1 ≤ k ≤ 10⁵ | Number of removals        |
| Characters  | Lowercase English letters |

## Intuition

The first thing I noticed was that the given value of `k` cannot always be used directly. The problem asks us to modify it depending on whether the string length is a power of 2.

Once that adjustment is done, the problem becomes much more familiar.

I need to remove exactly `k` characters while making the resulting string as small as possible in lexicographical order. Whenever I see a larger character appearing before a smaller character, removing the larger one usually helps create a smaller result.

That naturally leads to a monotonic stack solution where I continuously remove characters that make the string larger than necessary.

## Approach

1. Find the length of the string.
2. Check whether the length is a power of 2.
3. Update `k` according to the problem statement.
4. If removing `k` characters would make the string empty or impossible to process, return `-1`.
5. Create a stack-like structure.
6. Traverse the string from left to right.
7. While:

   * the stack is not empty,
   * removals are still available,
   * and the top character is larger than the current character,

   remove the top character.
8. Push the current character into the stack.
9. After processing the entire string, remove any remaining characters from the end if removals are still left.
10. Convert the stack into the final string.
11. Return the result.

## Data Structures Used

### Stack / Dynamic Array

A stack is used to maintain characters that will remain in the final answer.

Why it works:

* Easy access to the most recently added character.
* Supports efficient insertion and deletion.
* Helps maintain a lexicographically smaller sequence while processing the string.

In some languages, a dynamic array such as `vector`, `ArrayList`, or a normal array can be used to simulate stack operations.

## Operations & Behavior Summary

The algorithm performs the following major operations:

1. Calculate string length.
2. Determine whether the length is a power of 2.
3. Correct the value of `k`.
4. Validate whether a solution is possible.
5. Scan characters one by one.
6. Remove larger previous characters whenever a smaller character appears and removals are available.
7. Store useful characters in the stack.
8. Remove leftover characters from the end if required.
9. Build the final answer.
10. Return the smallest possible string.

## Complexity

| Metric           | Complexity | Explanation                                      |
| ---------------- | ---------- | ------------------------------------------------ |
| Time Complexity  | O(n)       | Each character is pushed and popped at most once |
| Space Complexity | O(n)       | Extra stack is used to build the final string    |

Where:

* `n` = length of the input string

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    string lexicographicallySmallest(string &s, int k) {
        int n = s.size();

        // Check whether n is a power of 2
        if ((n & (n - 1)) == 0)
            k /= 2;
        else
            k *= 2;

        // If removal is impossible or result becomes empty
        if (k >= n)
            return "-1";

        vector<char> st;

        // Build lexicographically smallest string
        for (char ch : s) {
            // Remove larger characters from the end
            while (!st.empty() && k > 0 && st.back() > ch) {
                st.pop_back();
                k--;
            }

            st.push_back(ch);
        }

        // If removals are still left, remove from the end
        while (k > 0) {
            st.pop_back();
            k--;
        }

        string ans(st.begin(), st.end());

        // Safety check
        return ans.empty() ? "-1" : ans;
    }
};
```

### Java

```java
class Solution {
    public String lexicographicallySmallest(String s, int k) {
        int n = s.length();

        // Check whether n is a power of 2
        if ((n & (n - 1)) == 0)
            k /= 2;
        else
            k *= 2;

        // If removal is impossible or result becomes empty
        if (k >= n)
            return "-1";

        StringBuilder st = new StringBuilder();

        for (char ch : s.toCharArray()) {

            // Remove larger characters while possible
            while (st.length() > 0 &&
                   k > 0 &&
                   st.charAt(st.length() - 1) > ch) {

                st.deleteCharAt(st.length() - 1);
                k--;
            }

            st.append(ch);
        }

        // Remove remaining characters from the end
        while (k > 0) {
            st.deleteCharAt(st.length() - 1);
            k--;
        }

        return st.length() == 0 ? "-1" : st.toString();
    }
}
```

### JavaScript

```javascript
/**
 * @param {string} s
 * @param {number} k
 * @returns {string}
 */

class Solution {
    lexicographicallySmallest(s, k) {
        const n = s.length;

        // Check whether n is a power of 2
        if ((n & (n - 1)) === 0)
            k = Math.floor(k / 2);
        else
            k = k * 2;

        // If removal is impossible or result becomes empty
        if (k >= n)
            return "-1";

        const st = [];

        for (const ch of s) {

            // Remove larger characters from the end
            while (
                st.length > 0 &&
                k > 0 &&
                st[st.length - 1] > ch
            ) {
                st.pop();
                k--;
            }

            st.push(ch);
        }

        // Remove remaining characters from the end
        while (k > 0) {
            st.pop();
            k--;
        }

        const ans = st.join("");

        return ans.length === 0 ? "-1" : ans;
    }
}
```

### Python3

```python
class Solution:
    def lexicographicallySmallest(self, s, k):
        n = len(s)

        # Check whether n is a power of 2
        if (n & (n - 1)) == 0:
            k //= 2
        else:
            k *= 2

        # If removal is impossible or result becomes empty
        if k >= n:
            return "-1"

        stack = []

        # Build lexicographically smallest string
        for ch in s:

            # Remove larger characters while removals remain
            while stack and k > 0 and stack[-1] > ch:
                stack.pop()
                k -= 1

            stack.append(ch)

        # Remove remaining characters from the end
        while k > 0:
            stack.pop()
            k -= 1

        ans = "".join(stack)

        return "-1" if not ans else ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all language implementations.

### Step 1: Calculate the String Length

The first step is to determine the length of the string because the adjustment of `k` depends on it.

### Step 2: Check Whether Length Is a Power of 2

A common bit manipulation trick is used:

`n & (n - 1)`

If the result is zero, the number is a power of 2.

Examples:

* 2
* 4
* 8
* 16
* 32

All satisfy this condition.

### Step 3: Update K

Depending on the previous result:

* Power of 2 → `k = k / 2`
* Not a power of 2 → `k = k * 2`

This creates the actual number of removals required by the problem.

### Step 4: Validate the Result

If the updated value of `k` is greater than or equal to the string length:

* Either removal is impossible
* Or the resulting string becomes empty

In both cases, return `-1`.

### Step 5: Process Characters One by One

Now the main greedy logic begins.

For every character:

* Compare it with the top character of the stack.
* If the stack top is larger, removing it creates a smaller string.
* Remove it if removals are still available.

### Step 6: Maintain Lexicographical Order

The stack is kept in a way that avoids unnecessary larger characters before smaller ones.

For example:

String:

```text
dbac
```

When `b` appears after `d`, removing `d` creates a smaller prefix.

That is exactly what the stack handles automatically.

### Step 7: Push Current Character

After removing all larger characters that should disappear, insert the current character into the stack.

This means the character is currently part of the best answer.

### Step 8: Remove Remaining Characters

Sometimes removals remain even after processing the entire string.

Example:

```text
abcde
```

No character needs removal during traversal because the string is already increasing.

In that case, remove characters from the end.

This keeps the prefix as small as possible.

### Step 9: Build the Final String

Convert the stack into a string.

The stored characters now represent the lexicographically smallest possible answer after exactly the required number of deletions.

### Step 10: Return the Answer

Return the final string.

If it becomes empty, return `-1`.

## Examples

### Example 1

Input

```text
s = "fooland"
k = 2
```

Processing

```text
Length = 7
7 is not a power of 2

k = 2 × 2 = 4
```

Remove 4 characters optimally.

Output

```text
and
```

### Example 2

Input

```text
s = "code"
k = 4
```

Processing

```text
Length = 4
4 is a power of 2

k = 4 / 2 = 2
```

Remove 2 characters.

Output

```text
cd
```

### Example 3

Input

```text
s = "abc"
k = 2
```

Processing

```text
Length = 3
Not a power of 2

k = 4
```

Since `k >= length`, the result becomes invalid.

Output

```text
-1
```

## How to Use / Run Locally

### C++

Compile

```bash
g++ main.cpp -o main
```

Run

```bash
./main
```

### Java

Compile

```bash
javac Main.java
```

Run

```bash
java Main
```

### JavaScript

Run

```bash
node main.js
```

### Python3

Run

```bash
python main.py
```

or

```bash
python3 main.py
```

## Notes & Optimizations

* The monotonic stack solution is the most efficient approach for this problem.
* Every character is processed only once.
* The algorithm avoids unnecessary comparisons and repeated string construction.
* The power-of-two check using bit manipulation runs in constant time.
* A brute-force solution would require checking many possible removals and would be far too slow for `n = 10⁵`.
* This approach easily handles large inputs within the expected constraints.
* The same greedy strategy is widely used in competitive programming problems involving lexicographically smallest strings and remove-k-character problems.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
