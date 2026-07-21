# Maximum Reachable Index Difference

A clean and optimized solution for the GeeksforGeeks **Maximum Reachable Index Difference** problem using a greedy right-to-left traversal. This repository explains the intuition, approach, complexity analysis, and provides implementations in multiple programming languages.

---

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
- [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

---

## Problem Summary

You are given a string containing only lowercase English letters.

You can start from any index that contains the character `'a'`. From there, you are allowed to jump only to the right, and every jump must land on the next alphabet character.

For example:

- `'a'` can jump to any `'b'`
- `'b'` can jump to any `'c'`
- `'c'` can jump to any `'d'`

The process continues until no more valid jumps are possible.

Your task is to find the maximum possible difference between the starting index and the final index reached after completing all valid jumps.

If the string does not contain any `'a'`, return `-1`.

This problem is a good example of **greedy algorithms**, **string processing**, and **right-to-left dynamic thinking**, making it a popular GeeksforGeeks DSA interview question.

---

## Constraints

| Constraint | Value |
|------------|-------|
| String Length | `1 ≤ n ≤ 10^5` |
| Characters | Lowercase English letters (`a-z`) |

---

## Intuition

The first thing I noticed was that every jump always moves to the right. That means I never have to revisit previous positions.

Instead of trying every possible jump from every `'a'`, I realized I could process the string from right to left.

If I already know the farthest place every character can reach, then when I encounter the previous alphabet, I can immediately reuse that information instead of recomputing everything.

This turns what could become a slow solution into a simple linear-time algorithm.

---

## Approach

I solve the problem in a single traversal.

1. Create an array of size `26`.
2. Each position stores the farthest ending index reachable for that character.
3. Traverse the string from right to left.
4. For every character:
   - If it is `'z'`, its reachable index is itself.
   - Otherwise, check whether the next alphabet already has a reachable ending.
   - If yes, inherit that ending index.
   - Otherwise, the current index becomes the ending index.
5. Update the stored value for the current character.
6. Whenever the current character is `'a'`, calculate the index difference.
7. Keep the maximum answer throughout the traversal.

The entire algorithm runs in one pass.

---

## Data Structures Used

### Array (Size 26)

A fixed-size array stores the farthest reachable ending index for every lowercase English letter.

Why this works:

- Constant-time lookup
- Constant-time updates
- Only 26 entries regardless of input size
- Perfect for lowercase English alphabets

No additional dynamic data structures are required.

---

## Operations & Behavior Summary

The algorithm performs these steps:

1. Initialize every alphabet as unseen.
2. Scan the string from right to left.
3. Compute how far the current character can eventually reach.
4. Store the best reachable ending for that character.
5. Whenever an `'a'` appears, calculate its possible answer.
6. Return the largest difference found.
7. If no `'a'` exists, return `-1`.

Because every position is processed exactly once, the solution remains highly efficient even for very large strings.

---

## Complexity

| Type | Complexity | Explanation |
|------|------------|-------------|
| Time Complexity | **O(n)** | Every character in the string is processed exactly once. |
| Space Complexity | **O(1)** | Only a fixed array of 26 elements is used, regardless of input size. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxIndexDifference(string &s) {
        // Store the farthest reachable ending index for each character.
        vector<int> best(26, -1);

        int ans = -1;

        // Traverse from right to left.
        for (int i = (int)s.size() - 1; i >= 0; i--) {

            // Current character index (0 -> 'a', 25 -> 'z').
            int c = s[i] - 'a';

            int reach;

            // 'z' has no next character, so it ends here.
            if (c == 25) {
                reach = i;
            }
            // If the next character exists on the right,
            // inherit its farthest reachable ending index.
            else if (best[c + 1] != -1) {
                reach = best[c + 1];
            }
            // Otherwise, no jump is possible.
            else {
                reach = i;
            }

            // Update the best reachable ending index for this character.
            best[c] = max(best[c], reach);

            // If this is an 'a', update the answer.
            if (c == 0) {
                ans = max(ans, reach - i);
            }
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    public int maxIndexDifference(String s) {

        // Store the farthest reachable ending index for every character.
        int[] best = new int[26];

        // Initialize with -1 (means not seen yet).
        java.util.Arrays.fill(best, -1);

        int ans = -1;

        // Traverse from right to left.
        for (int i = s.length() - 1; i >= 0; i--) {

            // Character index (0 -> 'a').
            int c = s.charAt(i) - 'a';

            int reach;

            // 'z' cannot jump further.
            if (c == 25) {
                reach = i;
            }
            // Use the already computed answer for the next character.
            else if (best[c + 1] != -1) {
                reach = best[c + 1];
            }
            // No next character exists on the right.
            else {
                reach = i;
            }

            // Store the best ending index for this character.
            best[c] = Math.max(best[c], reach);

            // Update answer for every 'a'.
            if (c == 0) {
                ans = Math.max(ans, reach - i);
            }
        }

        return ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {String} s
 * @return {number}
 */

class Solution {
    maxIndexDifference(s) {

        // Store the farthest reachable ending index for each letter.
        const best = new Array(26).fill(-1);

        let ans = -1;

        // Traverse from right to left.
        for (let i = s.length - 1; i >= 0; i--) {

            // Character index.
            const c = s.charCodeAt(i) - 97;

            let reach;

            // 'z' cannot move further.
            if (c === 25) {
                reach = i;
            }
            // Reuse the already computed answer of the next character.
            else if (best[c + 1] !== -1) {
                reach = best[c + 1];
            }
            // No valid jump.
            else {
                reach = i;
            }

            // Update the best reachable ending index.
            best[c] = Math.max(best[c], reach);

            // Update answer for 'a'.
            if (c === 0) {
                ans = Math.max(ans, reach - i);
            }
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:
    def maxIndexDifference(self, s):
        # Store the farthest reachable ending index for each letter.
        best = [-1] * 26

        ans = -1

        # Traverse from right to left.
        for i in range(len(s) - 1, -1, -1):

            # Character index (0 -> 'a').
            c = ord(s[i]) - ord('a')

            # 'z' cannot jump further.
            if c == 25:
                reach = i

            # Use the already computed result of the next character.
            elif best[c + 1] != -1:
                reach = best[c + 1]

            # No valid jump exists.
            else:
                reach = i

            # Update the best reachable ending index.
            best[c] = max(best[c], reach)

            # Update answer whenever the current character is 'a'.
            if c == 0:
                ans = max(ans, reach - i)

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is exactly the same in every language.

First, create an array of size 26. Every entry represents one lowercase English letter.

Initially, every value is marked as unseen.

Next, start scanning the string from the last character toward the beginning.

For each character:

- Convert the character into an index between `0` and `25`.
- Determine how far this character can eventually reach.
- If it is `'z'`, no further jump is possible.
- Otherwise, check whether the next alphabet already has a reachable ending.
- If it exists, reuse that value.
- Otherwise, the current position becomes the ending position.

After finding the reachable ending index, update the stored value for the current character.

Whenever the current character is `'a'`, compute the difference between the ending index and the starting index.

Keep updating the maximum answer throughout the traversal.

At the end:

- Return the maximum difference if at least one `'a'` exists.
- Otherwise, return `-1`.

Since every language follows exactly the same algorithm, only the syntax changes while the overall behavior remains identical.

---

## Examples

### Example 1

**Input**

```text
s = "aaabcb"
```

**Output**

```text
5
```

**Trace**

- Start at index `0`
- Jump from `'a'` to `'b'` at index `5`
- No further jump exists
- Difference = `5 - 0 = 5`

---

### Example 2

**Input**

```text
s = "abcbzzd"
```

**Output**

```text
6
```

**Trace**

- Start at index `0`
- Jump to `'b'`
- Jump to `'c'`
- Jump to `'d'`
- End at index `6`
- Difference = `6`

---

### Example 3

**Input**

```text
s = "xynijr"
```

**Output**

```text
-1
```

**Trace**

The string does not contain any `'a'`, so no valid starting position exists.

---

## How to Use / Run Locally

Clone the repository.

```bash
git clone <repository-url>
```

Move into the project directory.

```bash
cd <repository-name>
```

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

---

## Notes & Optimizations

- The algorithm processes the string only once.
- A fixed-size array makes every lookup constant time.
- The solution works efficiently even for the maximum constraint of `10^5`.
- Since there are only 26 lowercase letters, the extra memory never grows with the input size.
- A brute-force approach would repeatedly search for valid jumps and become much slower.
- Processing the string from right to left allows previously computed information to be reused immediately.
- This is an optimal solution for the given constraints.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
