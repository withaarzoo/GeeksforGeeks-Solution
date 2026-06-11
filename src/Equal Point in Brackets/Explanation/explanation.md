# Equal Point in Brackets

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

The **Equal Point in Brackets** problem asks us to find the first valid split position in a string that contains only opening brackets `'('` and closing brackets `')'`.

A position is considered valid if:

* The number of opening brackets `'('` before that position is equal to
* The number of closing brackets `')'` from that position until the end of the string

The goal is to return the first such position.

This is a popular **GeeksforGeeks string problem** that tests counting techniques, efficient traversal, and optimization using a linear-time approach.

### Input

A string containing only:

```text
(
)
```

### Output

An integer representing the first valid split index.

---

## Constraints

| Constraint    | Value            |
| ------------- | ---------------- |
| String Length | 1 ≤ n ≤ 10^5     |
| Characters    | '(' and ')' only |

---

## Intuition

My first observation was that every valid answer depends on two counts:

1. How many opening brackets appear before a position.
2. How many closing brackets appear after that position.

A brute-force solution would check every split position and count both values again and again. That works, but it becomes very slow for large strings.

I realized that these counts change gradually as we move from left to right. Instead of recomputing everything, I can maintain running counts and update them in constant time.

That immediately turns the problem into a simple linear scan.

---

## Approach

1. Count all closing brackets `')'` in the string.
2. Initialize a counter for opening brackets seen so far.
3. Start scanning from left to right.
4. At each split position:

   * Compare the opening count on the left side.
   * Compare the closing count on the right side.
5. If both counts are equal, return the current index.
6. Otherwise update the counters according to the current character.
7. Continue until all positions are checked.
8. Return the first valid position found.

This approach avoids repeated counting and keeps the solution efficient.

---

## Data Structures Used

| Data Structure    | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| Integer Variables | Store running counts of opening and closing brackets |

No arrays, stacks, queues, maps, or extra containers are required.

The solution works using only a few counters.

---

## Operations & Behavior Summary

The algorithm performs the following steps:

1. Count total closing brackets in the entire string.
2. Treat that value as the initial right-side count.
3. Keep a running count of opening brackets encountered so far.
4. Check every possible split position.
5. Compare left opening count and right closing count.
6. Return immediately when both become equal.
7. Update counters while moving the split forward.
8. Finish in a single traversal.

---

## Complexity

| Metric           | Complexity | Explanation                                      |
| ---------------- | ---------- | ------------------------------------------------ |
| Time Complexity  | O(n)       | The string is scanned a constant number of times |
| Space Complexity | O(1)       | Only a few integer variables are used            |

Where:

* `n` = length of the bracket string

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int findIndex(string &s) {
        // I first count all closing brackets, because this is the total
        // number of ')' that will be on the right side before any split.
        int closeCount = 0;
        for (char ch : s) {
            if (ch == ')') closeCount++;
        }

        // This keeps track of how many '(' I have seen on the left side.
        int openCount = 0;
        int n = s.size();

        // I check every split position from 0 to n.
        // Position i means: left side is [0 ... i-1], right side is [i ... n-1].
        for (int i = 0; i <= n; i++) {
            // If both sides have the same count, I found the first valid split.
            if (openCount == closeCount) return i;

            // After checking split i, I move one character forward.
            // That character leaves the right side and joins the left side.
            if (i < n) {
                if (s[i] == '(') {
                    openCount++;   // This '(' now belongs to the left side.
                } else {
                    closeCount--;  // This ')' is no longer on the right side.
                }
            }
        }

        // If no valid index exists, I return -1.
        return -1;
    }
}; 
```

### Java

```java
class Solution {
    public int findIndex(String s) {
        // I count all closing brackets first, because that tells me
        // how many ')' are currently present on the right side.
        int closeCount = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == ')') closeCount++;
        }

        // This keeps the number of '(' that have already moved to the left side.
        int openCount = 0;
        int n = s.length();

        // I check every possible split position from 0 to n.
        // At position i, the split is between s[i - 1] and s[i].
        for (int i = 0; i <= n; i++) {
            // If both counts match, this is the first valid answer.
            if (openCount == closeCount) return i;

            // If I am not past the end, I move s[i] from the right side to the left side.
            if (i < n) {
                if (s.charAt(i) == '(') {
                    openCount++;   // This opening bracket now belongs to the left part.
                } else {
                    closeCount--;  // This closing bracket is removed from the right part.
                }
            }
        }

        // If no split works, I return -1.
        return -1;
    }
} 
```

### JavaScript

```javascript
class Solution {
    findIndex(s) {
        // I count all ')' first so I know how many closing brackets are on the right side.
        let closeCount = 0;
        for (let ch of s) {
            if (ch === ')') closeCount++;
        }

        // This tracks how many '(' have already been included in the left side.
        let openCount = 0;
        const n = s.length;

        // I try every split position from 0 to n.
        for (let i = 0; i <= n; i++) {
            // The first position where both counts match is the answer.
            if (openCount === closeCount) return i;

            // I then move the current character from right side to left side.
            if (i < n) {
                if (s[i] === '(') {
                    openCount++;   // This '(' now belongs to the left side.
                } else {
                    closeCount--;  // This ')' is no longer part of the right side.
                }
            }
        }

        // If no valid split exists, I return -1.
        return -1;
    }
} 
```

### Python3

```python
class Solution:
    def findIndex(self, s):
        # I count all closing brackets first, because that gives me the
        # initial number of ')' on the right side before any split.
        close_count = 0
        for ch in s:
            if ch == ')':
                close_count += 1

        # This stores how many '(' I have already moved to the left side.
        open_count = 0
        n = len(s)

        # I check every split position from 0 to n.
        for i in range(n + 1):
            # If both counts are equal, this is the first valid split.
            if open_count == close_count:
                return i

            # If I am still inside the string, I move s[i] across the split.
            if i < n:
                if s[i] == '(':
                    open_count += 1   # This opening bracket now belongs to the left side.
                else:
                    close_count -= 1  # This closing bracket is removed from the right side.

        # If no split position works, I return -1.
        return -1
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in all language implementations.

### Step 1: Count Closing Brackets

Before checking any split position, count every closing bracket in the string.

This gives the number of closing brackets that initially belong to the right side.

---

### Step 2: Initialize Opening Count

At the beginning, no character exists on the left side.

Therefore:

```text
openingCount = 0
```

---

### Step 3: Start Checking Split Positions

A split can exist:

* Before the first character
* Between any two characters
* After the last character

So every position from `0` to `n` must be checked.

---

### Step 4: Compare Counts

For every position:

```text
openingCount == closingCount
```

If true, the current position is the answer.

Since the problem asks for the first valid position, return immediately.

---

### Step 5: Move the Split Forward

After checking a position, move one character from the right side to the left side.

Two cases exist:

#### Current Character is '('

That bracket now belongs to the left side.

```text
openingCount++
```

#### Current Character is ')'

That bracket is no longer part of the right side.

```text
closingCount--
```

---

### Step 6: Continue Until Completion

Repeat the process for every split position.

The first match is returned.

If no match exists, return `-1`.

---

## Examples

### Example 1

#### Input

```text
((()))
(
```

#### Output

```text
4
```

#### Trace

Before index 4:

```text
( ( ) )
```

Opening brackets before index 4:

```text
2
```

Closing brackets from index 4 onward:

```text
2
```

Counts match, so answer is:

```text
4
```

---

### Example 2

#### Input

```text
))
```

#### Output

```text
2
```

#### Trace

After index 2:

```text
Left  = ))
Right = Empty
```

Opening brackets on left:

```text
0
```

Closing brackets on right:

```text
0
```

Counts match.

Answer:

```text
2
```

---

### Example 3

#### Input

```text
()()
```

#### Output

```text
2
```

#### Trace

Before index 2:

```text
(
)
```

Opening count:

```text
1
```

Remaining closing count:

```text
1
```

Both are equal.

Answer:

```text
2
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

* A brute-force solution would repeatedly count brackets for every split position.
* That approach can take O(n²) time.
* Maintaining running counts reduces the complexity to O(n).
* The solution uses constant extra space.
* It easily handles the maximum constraint of 10^5 characters.
* No additional data structures are necessary.
* Checking positions from left to right guarantees that the first valid index is returned immediately.

### Alternative Approach

Prefix and suffix arrays could also be used to store counts.

However:

* They require O(n) extra space.
* They provide no performance advantage over the running-count solution.

The constant-space approach is therefore the preferred solution.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
