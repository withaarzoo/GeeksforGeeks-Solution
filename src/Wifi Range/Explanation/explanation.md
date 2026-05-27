# Wifi Range | GeeksforGeeks Solution

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

The "Wifi Range" problem is a simple but interesting string and coverage checking problem from GeeksforGeeks.

We are given a binary string where:

- `'1'` means a WiFi router is installed in that room
- `'0'` means there is no router

Each router can cover:

- `x` rooms to the left
- `x` rooms to the right

The goal is to check whether every room in the hostel gets WiFi coverage from at least one router.

If all rooms are covered, return `true`. Otherwise, return `false`.

This problem is commonly solved using a greedy scanning approach because we only need to verify whether there are uncovered gaps between routers.

---

## Constraints

| Constraint | Value |
|---|---|
| 1 ≤ n ≤ 10^5 | Length of the string |
| 0 ≤ x ≤ 10^5 | WiFi range |
| s[i] | Either `'0'` or `'1'` |

---

## Intuition

The first thing I noticed was that every router covers a continuous segment of rooms.

So instead of trying to mark every room one by one, I thought about coverage gaps.

If:

- the first router covers the beginning,
- the last router covers the end,
- and no large gap exists between consecutive routers,

then every room is automatically covered.

That observation makes the solution much cleaner and faster.

This turns the problem into a simple linear scan problem.

---

## Approach

I used a single pass greedy approach.

Step-by-step idea:

1. Scan the string from left to right.
2. Whenever I find a router (`'1'`):
   - store its position
   - compare it with the previous router
3. If the distance between two routers is too large, some rooms in the middle are uncovered.
4. After scanning:
   - check whether the first router covers the left side
   - check whether the last router covers the right side
5. If every check passes, return `true`.

The main trick is understanding this condition:

Two routers can fully cover the space between them only if:

`distance <= 2*x + 1`

Otherwise, there will be uncovered rooms between them.

---

## Data Structures Used

| Data Structure | Purpose |
|---|---|
| String | Stores the hostel rooms and router positions |
| Integer Variables | Store first router, previous router, and last router positions |

No extra arrays or hash maps are needed.

This keeps the space complexity optimal.

---

## Operations & Behavior Summary

The algorithm works in these stages:

1. Start scanning the binary string.
2. Detect every router position.
3. Compare consecutive routers.
4. Check whether their coverage ranges overlap properly.
5. Verify left boundary coverage.
6. Verify right boundary coverage.
7. Return final result.

This is essentially a greedy coverage validation algorithm.

---

## Complexity

| Type | Complexity | Explanation |
|---|---|---|
| Time Complexity | O(n) | The string is scanned only once |
| Space Complexity | O(1) | No extra data structures are used |

Where:

- `n` = length of the binary string

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool wifiRange(string &s, int x) {
        // I store the length of the hostel row so I can check the edges later.
        int n = s.size();

        // I keep track of the first router, previous router, and last router.
        int first = -1, prev = -1, last = -1;

        // I scan the whole string once.
        for (int i = 0; i < n; i++) {
            // A '1' means there is a router in this room.
            if (s[i] == '1') {
                // I save the first router position so I can check left-side coverage.
                if (first == -1) first = i;

                // If there was a previous router, I check whether the gap is too large.
                // If the distance is greater than 2*x + 1, then some rooms in between are uncovered.
                if (prev != -1 && i - prev > 2 * x + 1) {
                    return false;
                }

                // I update previous router position for the next comparison.
                prev = i;

                // I also remember the last router to check right-side coverage at the end.
                last = i;
            }
        }

        // If there was no router at all, no room can be covered.
        if (first == -1) return false;

        // The first router must cover the leftmost room.
        // If it is farther than x from index 0, some left rooms stay uncovered.
        if (first > x) return false;

        // The last router must cover the rightmost room.
        // If it is farther than x from the last index, some right rooms stay uncovered.
        if (n - 1 - last > x) return false;

        // If none of the checks failed, every room is covered.
        return true;
    }
}; 
```

### Java

```java
class Solution {
    public boolean wifiRange(String s, int x) {
        // I store the length of the string so I can check the ends later.
        int n = s.length();

        // I keep the first, previous, and last router positions.
        int first = -1, prev = -1, last = -1;

        // I scan every character once.
        for (int i = 0; i < n; i++) {
            // A '1' means a router is present in this room.
            if (s.charAt(i) == '1') {
                // I record the first router so I can verify left coverage.
                if (first == -1) first = i;

                // I compare this router with the previous one.
                // If the gap is too large, some middle rooms are not covered.
                if (prev != -1 && i - prev > 2 * x + 1) {
                    return false;
                }

                // I move prev forward for the next router.
                prev = i;

                // I store the last router so I can verify right coverage.
                last = i;
            }
        }

        // No router means no coverage.
        if (first == -1) return false;

        // The first router must reach the left edge.
        if (first > x) return false;

        // The last router must reach the right edge.
        if (n - 1 - last > x) return false;

        // All checks passed, so every room is covered.
        return true;
    }
} 
```

### JavaScript

```javascript
/**
 * @param {string} s
 * @param {number} x
 * @returns {boolean}
 */
class Solution {
    wifiRange(s, x) {
        // I store the string length to check the boundaries later.
        let n = s.length;

        // I track the first router, previous router, and last router positions.
        let first = -1, prev = -1, last = -1;

        // I scan the string once from left to right.
        for (let i = 0; i < n; i++) {
            // A '1' means there is a router in this room.
            if (s[i] === '1') {
                // I save the first router for the left edge check.
                if (first === -1) first = i;

                // I compare this router with the previous one.
                // If the gap is too large, some rooms between them are uncovered.
                if (prev !== -1 && i - prev > 2 * x + 1) {
                    return false;
                }

                // I update prev so the next router can be checked.
                prev = i;

                // I remember the last router for the right edge check.
                last = i;
            }
        }

        // If there is no router, coverage is impossible.
        if (first === -1) return false;

        // The first router must cover index 0.
        if (first > x) return false;

        // The last router must cover the last index.
        if (n - 1 - last > x) return false;

        // If all checks pass, every room is covered.
        return true;
    }
} 
```

### Python3

```python
class Solution:
    def wifiRange(self, s, x):
        # I store the string length so I can check the ends after the scan.
        n = len(s)

        # I keep track of the first router, previous router, and last router.
        first = -1
        prev = -1
        last = -1

        # I scan the string once.
        for i in range(n):
            # A '1' means a router exists in this room.
            if s[i] == '1':
                # I record the first router so I can check the left boundary.
                if first == -1:
                    first = i

                # I compare this router with the previous one.
                # If the distance is too large, there is an uncovered gap.
                if prev != -1 and i - prev > 2 * x + 1:
                    return False

                # I move prev forward for the next comparison.
                prev = i

                # I save the last router for the right boundary check.
                last = i

        # No router means no room can be covered.
        if first == -1:
            return False

        # The first router must reach the leftmost room.
        if first > x:
            return False

        # The last router must reach the rightmost room.
        if n - 1 - last > x:
            return False

        # If nothing failed, all rooms are covered.
        return True
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all languages.

Only syntax changes.

### Step 1: Store Important Router Positions

I maintain variables for:

- first router
- previous router
- last router

These help me track coverage boundaries.

---

### Step 2: Scan the String

I move from left to right through the string.

Whenever I see `'1'`, it means a router exists in that room.

---

### Step 3: Check Gap Between Routers

This is the most important part.

Suppose:

- previous router = `a`
- current router = `b`

Each router covers `x` rooms in both directions.

If:

`b - a > 2*x + 1`

then there is an uncovered gap between them.

In that case, I immediately return `false`.

This greedy check guarantees correctness.

---

### Step 4: Check Left Boundary

Even if routers cover the middle properly, the beginning may still remain uncovered.

So I verify whether the first router can reach room `0`.

If not, return `false`.

---

### Step 5: Check Right Boundary

Similarly, I check whether the last router can reach the final room.

If not, return `false`.

---

### Step 6: Return Final Answer

If all checks pass:

- no gaps exist
- both ends are covered

So every room has WiFi coverage.

Return `true`.

---

## Examples

### Example 1

Input:

```text
x = 0
s = "010"
```

Output:

```text
false
```

Explanation:

The router only covers its own room because `x = 0`.

Rooms at index `0` and `2` remain uncovered.

---

### Example 2

Input:

```text
x = 1
s = "10010"
```

Output:

```text
true
```

Explanation:

- Router at index `0` covers rooms `0` and `1`
- Router at index `3` covers rooms `2`, `3`, and `4`

All rooms are covered.

---

### Example 3

Input:

```text
x = 1
s = "10001"
```

Output:

```text
false
```

Explanation:

The gap between routers is too large.

Middle rooms remain uncovered.

---

## How to Use / Run Locally

### C++

Compile and run:

```bash
g++ solution.cpp -o solution
./solution
```

---

### Java

Compile and run:

```bash
javac Solution.java
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

Run using Python:

```bash
python solution.py
```

---

## Notes & Optimizations

- This problem does not require simulation of every room.
- A greedy gap-checking strategy is enough.
- The solution is already optimal.
- No extra memory is required.
- Edge cases:
  - no routers present
  - router only at one side
  - `x = 0`
  - single room input

An alternative approach could use a coverage array, but that would increase space complexity unnecessarily.

The greedy linear scan is cleaner and faster.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
