# Check Repeated Substring with K Replacements

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

This DSA problem asks whether a given string can become a repetition of the same substring after performing at most one replacement operation on a substring of length `k`.

The string is divided into blocks of size `k`. The goal is to determine if all blocks can become identical by replacing one entire block with any other valid block.

Input:

* A string `s`
* An integer `k`

Output:

* `true` if the string can be converted into repeated occurrences of the same substring
* `false` otherwise

This problem is a good example of string processing, frequency counting, hash map usage, and pattern matching in competitive programming.

## Constraints

| Constraint    | Value              |
| ------------- | ------------------ |
| k             | 2 ≤ k              |
| String Length | k ≤ s.size() ≤ 10⁵ |

## Intuition

The first thing I noticed was that the replacement operation works on an entire block of length `k`.

That means instead of looking at individual characters, I should focus on complete substrings of size `k`.

If every block is already the same, the answer is obviously true.

If there are many different block patterns, one replacement cannot fix everything.

So the real question becomes:

How many unique blocks exist after dividing the string into chunks of length `k`?

Once I started looking at the problem this way, the solution became much simpler.

## Approach

1. Check whether the string length is divisible by `k`.
2. Split the string into blocks of length `k`.
3. Count how many times each block appears.
4. Analyze the number of distinct blocks.
5. If there is only one unique block, return true.
6. If there are more than two unique blocks, return false.
7. If there are exactly two unique blocks, one of them must appear exactly once.
8. If such a block exists, one replacement can make all blocks identical.

This approach avoids unnecessary comparisons and works efficiently even for large input sizes.

## Data Structures Used

### Hash Map

A hash map stores the frequency of each substring block.

Why I used it:

* Fast insertion
* Fast lookup
* Easy frequency counting
* Helps identify unique block patterns quickly

### String

The string itself is sliced into fixed-length chunks of size `k`.

## Operations & Behavior Summary

1. Read the string and value of `k`.
2. Verify that the string can be perfectly divided into blocks of size `k`.
3. Extract every block.
4. Store frequencies inside a hash map.
5. Count distinct block patterns.
6. Handle three possible cases:

   * One unique block
   * Two unique blocks
   * More than two unique blocks
7. Return the final result.

In simple terms, the algorithm checks whether one block replacement is enough to make every block look exactly the same.

## Complexity

| Metric           | Complexity | Explanation                                                                   |
| ---------------- | ---------- | ----------------------------------------------------------------------------- |
| Time Complexity  | O(n)       | The string is processed once while extracting blocks and counting frequencies |
| Space Complexity | O(n)       | The hash map may store multiple unique blocks in the worst case               |

Where:

* `n` = length of the string
* `k` = block size used to divide the string

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool kSubstr(string &s, int k) {
        int n = s.size();

        // String must be completely divisible into blocks of size k
        if (n % k != 0)
            return false;

        // Stores frequency of every k-length block
        unordered_map<string, int> freq;

        // Extract all blocks of length k
        for (int i = 0; i < n; i += k) {
            freq[s.substr(i, k)]++;
        }

        // All blocks are already identical
        if (freq.size() == 1)
            return true;

        // More than two different blocks cannot be fixed
        if (freq.size() > 2)
            return false;

        // If one block appears exactly once,
        // we can replace that block and make all blocks equal
        for (auto &it : freq) {
            if (it.second == 1)
                return true;
        }

        return false;
    }
};
```

### Java

```java
class Solution {
    public boolean kSubstr(String s, int k) {
        int n = s.length();

        // String must be divisible into blocks of size k
        if (n % k != 0)
            return false;

        // Stores frequency of every k-length block
        HashMap<String, Integer> freq = new HashMap<>();

        // Extract all blocks
        for (int i = 0; i < n; i += k) {
            String block = s.substring(i, i + k);
            freq.put(block, freq.getOrDefault(block, 0) + 1);
        }

        // Already a valid repetition
        if (freq.size() == 1)
            return true;

        // More than two unique blocks cannot be fixed
        if (freq.size() > 2)
            return false;

        // One block must occur exactly once
        for (int count : freq.values()) {
            if (count == 1)
                return true;
        }

        return false;
    }
}
```

### JavaScript

```javascript
/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
class Solution {
    kSubstr(s, k) {
        const n = s.length;

        // String must be divisible into blocks of length k
        if (n % k !== 0)
            return false;

        // Frequency map for all blocks
        const freq = new Map();

        // Extract blocks of size k
        for (let i = 0; i < n; i += k) {
            const block = s.substring(i, i + k);
            freq.set(block, (freq.get(block) || 0) + 1);
        }

        // All blocks already same
        if (freq.size === 1)
            return true;

        // More than two distinct blocks cannot be fixed
        if (freq.size > 2)
            return false;

        // One block should appear exactly once
        for (const count of freq.values()) {
            if (count === 1)
                return true;
        }

        return false;
    }
}
```

### Python3

```python
class Solution:
    def kSubstr(self, s: str, k: int) -> bool:
        n = len(s)

        # String must be divisible into blocks of size k
        if n % k != 0:
            return False

        # Frequency of each k-length block
        freq = {}

        # Extract all blocks
        for i in range(0, n, k):
            block = s[i:i + k]
            freq[block] = freq.get(block, 0) + 1

        # Already a repeated substring
        if len(freq) == 1:
            return True

        # More than two distinct blocks cannot be fixed
        if len(freq) > 2:
            return False

        # One block must occur exactly once
        for count in freq.values():
            if count == 1:
                return True

        return False
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all languages.

### Step 1: Check Divisibility

Before doing anything else, I check whether the string length is divisible by `k`.

Why?

Because if the string cannot be split into equal-sized blocks, it can never become a repetition of a substring of length `k`.

Example:

```text
Length = 10
k = 3
```

A block would remain incomplete, making the requirement impossible.

### Step 2: Create Fixed-Length Blocks

Next, I move through the string in jumps of size `k`.

For example:

```text
String = abcbedabcabc
k = 3
```

Blocks become:

```text
abc
bed
abc
abc
```

These blocks are what I actually analyze.

### Step 3: Count Frequencies

Each block is inserted into a hash map.

Example:

```text
abc -> 3
bed -> 1
```

This frequency information tells me how many distinct patterns exist.

### Step 4: Handle the Easy Case

If only one unique block exists:

```text
abc
abc
abc
abc
```

The string is already a valid repetition.

Return:

```text
true
```

### Step 5: Reject Impossible Cases

Suppose the blocks are:

```text
ab
cd
ef
ab
```

Distinct blocks:

```text
ab
cd
ef
```

Now there are three different patterns.

One replacement can only fix one block.

Therefore:

```text
false
```

### Step 6: Check the Two-Pattern Case

Suppose:

```text
ab
ab
cd
ab
```

Frequency table:

```text
ab -> 3
cd -> 1
```

The block `"cd"` is the only odd one out.

I can replace it with `"ab"`.

After replacement:

```text
ab
ab
ab
ab
```

Result:

```text
true
```

### Why Frequency One Matters

Consider:

```text
ab
ab
cd
cd
```

Frequency table:

```text
ab -> 2
cd -> 2
```

Changing one block still leaves another mismatched block.

So one replacement is not enough.

Result:

```text
false
```

That observation is the key idea behind the entire solution.

## Examples

### Example 1

Input

```text
s = "abcbedabcabc"
k = 3
```

Output

```text
true
```

Trace

```text
abc
bed
abc
abc
```

Only one block differs.

Replace:

```text
bed -> abc
```

All blocks become identical.

### Example 2

Input

```text
s = "bdac"
k = 2
```

Output

```text
true
```

Trace

```text
bd
ac
```

One block can be replaced by the other.

Result is true.

### Example 3

Input

```text
s = "abcdabcd"
k = 2
```

Output

```text
false
```

Trace

```text
ab
cd
ab
cd
```

Two different patterns appear multiple times.

One replacement cannot make every block identical.

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

* Always check divisibility first to avoid unnecessary work.
* Hash maps provide efficient frequency counting.
* The solution processes the string only once.
* This is already an optimal approach for the given constraints.
* A brute-force comparison of every block against every other block would be much slower.
* The frequency-based approach scales well for strings up to 10⁵ characters.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
