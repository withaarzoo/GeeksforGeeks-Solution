# Marks from Ranks

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

The **Marks from Ranks** problem asks us to find the actual mark for each given rank.

We are given multiple intervals of consecutive valid marks. Each interval is represented by two arrays:

* `l[i]` is the starting mark of the `i-th` interval.
* `r[i]` is the ending mark of the `i-th` interval.

The intervals are already sorted in increasing order and do not overlap.

If all valid marks are arranged in increasing order, their positions become their ranks. The smallest valid mark gets rank `1`, the next valid mark gets rank `2`, and so on.

For every value in the `rank[]` array, we need to find the corresponding valid mark.

The main challenge is to answer rank queries efficiently without creating a large array containing every individual mark.

This problem can be solved efficiently using **prefix sums and binary search**.

## Constraints

| Constraint             | Value                           |
| ---------------------- | ------------------------------- |
| Number of intervals    | `1 ≤ l.size(), r.size() ≤ 10^5` |
| Number of rank queries | `1 ≤ rank.size() ≤ 10^5`        |
| Interval order         | Sorted in increasing order      |
| Interval overlap       | Intervals do not overlap        |

Since there can be up to `10^5` intervals and `10^5` rank queries, checking every interval linearly for every query would be inefficient.

## Intuition

My first thought was to imagine all valid marks written in one sorted array.

For example, if:

`l = [1, 6, 14]`

`r = [3, 9, 15]`

then the valid marks are:

`[1, 2, 3, 6, 7, 8, 9, 14, 15]`

Now finding rank `5` would be easy because the answer is simply the fifth valid mark.

But I noticed that actually building this complete array is unnecessary. An interval can contain a large number of marks, so storing every value could waste memory.

Instead, I only need to know how many marks each interval contains.

Once I know the cumulative number of marks up to every interval, I can use binary search to quickly find which interval contains a particular rank.

That naturally leads to a **prefix sum + binary search solution**.

## Approach

I solve the problem in the following steps.

1. Calculate the number of marks inside every interval.

   For an interval `[l[i], r[i]]`, the count is:

   `r[i] - l[i] + 1`

2. Build a prefix sum array.

   `prefix[i]` stores the total number of valid marks from the first interval up to interval `i`.

3. For every rank query, use binary search on the prefix sum array.

   I find the first interval where:

   `prefix[i] >= rank`

   This tells me that the required rank belongs to interval `i`.

4. Find how many marks appeared before the current interval.

   If `i > 0`, the number of previous marks is:

   `prefix[i - 1]`

   Otherwise, it is `0`.

5. Calculate the position inside the interval.

   The zero-based offset is:

   `rank - marksBefore - 1`

6. Add this offset to the starting value of the interval.

   The final mark is:

   `l[i] + offset`

This avoids storing all valid marks and answers every rank query efficiently.

## Data Structures Used

### Prefix Sum Array

I use a prefix sum array to store the cumulative number of marks covered by each interval.

For example, if the interval sizes are:

`3, 4, 2`

the prefix sum array becomes:

`[3, 7, 9]`

This means:

* The first interval contains ranks `1` to `3`.
* The second interval contains ranks `4` to `7`.
* The third interval contains ranks `8` to `9`.

This makes binary search possible.

### Answer Array

I use an answer array to store the mark corresponding to every query in the same order as the input `rank[]` array.

## Operations & Behavior Summary

The algorithm works like this:

1. Read all intervals.
2. Count the number of marks in each interval.
3. Build prefix sums of those counts.
4. Take one rank query.
5. Binary search for the first prefix value greater than or equal to that rank.
6. Find how many marks come before the selected interval.
7. Calculate the rank's offset inside that interval.
8. Add the offset to the interval's starting mark.
9. Store the result.
10. Repeat for all rank queries.
11. Return the final answer array.

The important point is that I never generate all valid marks. I only store interval counts and cumulative ranks.

## Complexity

| Complexity       | Value            | Explanation                                                                                                                                       |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Time Complexity  | `O(n + q log n)` | Building the prefix sum takes `O(n)`, where `n` is the number of intervals. Each of the `q` rank queries uses binary search and takes `O(log n)`. |
| Space Complexity | `O(n + q)`       | The prefix sum array uses `O(n)` space, and the answer array uses `O(q)` space.                                                                   |

Here:

* `n` = number of intervals
* `q` = number of rank queries

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> getMarks(vector<int> &l, vector<int> &r, vector<int> &rank) {
        // Store the number of valid marks up to each interval.
        int n = l.size();
        vector<long long> prefix(n);

        // Build prefix sums of interval sizes.
        for (int i = 0; i < n; i++) {
            // Calculate how many consecutive marks this interval contains.
            long long count = 1LL * r[i] - l[i] + 1;

            // Add the current interval size to all previous interval sizes.
            prefix[i] = count + (i > 0 ? prefix[i - 1] : 0);
        }

        // Store the mark corresponding to every requested rank.
        vector<int> answer;
        answer.reserve(rank.size());

        // Process every rank query independently.
        for (int currentRank : rank) {
            // Find the first interval whose ending rank is at least currentRank.
            int index = lower_bound(prefix.begin(), prefix.end(), currentRank) - prefix.begin();

            // Count how many valid marks appear before the found interval.
            long long marksBefore = (index > 0 ? prefix[index - 1] : 0);

            // Calculate the zero-based position inside the current interval.
            long long offset = currentRank - marksBefore - 1;

            // Move offset positions from the interval's starting mark.
            answer.push_back(l[index] + offset);
        }

        // Return all marks in the same order as the input rank queries.
        return answer;
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public ArrayList<Integer> getMarks(int[] l, int[] r, int[] rank) {
        // Store the number of valid marks up to each interval.
        int n = l.length;
        long[] prefix = new long[n];

        // Build prefix sums of interval sizes.
        for (int i = 0; i < n; i++) {
            // Calculate how many consecutive marks this interval contains.
            long count = (long) r[i] - l[i] + 1;

            // Add the current interval size to all previous interval sizes.
            prefix[i] = count + (i > 0 ? prefix[i - 1] : 0);
        }

        // Store the mark corresponding to every requested rank.
        ArrayList<Integer> answer = new ArrayList<>();

        // Process every rank query independently.
        for (int currentRank : rank) {
            // Start binary search over the prefix sum array.
            int left = 0;
            int right = n - 1;

            // Find the first index whose prefix value is at least currentRank.
            while (left < right) {
                // Find the middle interval safely.
                int mid = left + (right - left) / 2;

                // The required rank is in this interval or an earlier one.
                if (prefix[mid] >= currentRank) {
                    right = mid;
                } else {
                    // The required rank must be in a later interval.
                    left = mid + 1;
                }
            }

            // left is now the interval containing currentRank.
            int index = left;

            // Count how many valid marks appear before the found interval.
            long marksBefore = index > 0 ? prefix[index - 1] : 0;

            // Calculate the zero-based position inside the current interval.
            long offset = currentRank - marksBefore - 1;

            // Move offset positions from the interval's starting mark.
            answer.add((int) (l[index] + offset));
        }

        // Return all marks in the same order as the input rank queries.
        return answer;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} l
 * @param {number[]} r
 * @param {number[]} rank
 * @returns {number[]}
 */
class Solution {
    getMarks(l, r, rank) {
        // Store the number of valid marks up to each interval.
        const n = l.length;
        const prefix = new Array(n);

        // Build prefix sums of interval sizes.
        for (let i = 0; i < n; i++) {
            // Calculate how many consecutive marks this interval contains.
            const count = r[i] - l[i] + 1;

            // Add the current interval size to all previous interval sizes.
            prefix[i] = count + (i > 0 ? prefix[i - 1] : 0);
        }

        // Store the mark corresponding to every requested rank.
        const answer = [];

        // Process every rank query independently.
        for (const currentRank of rank) {
            // Search for the first interval whose prefix value is at least currentRank.
            let left = 0;
            let right = n - 1;

            // Use binary search because prefix is sorted in increasing order.
            while (left < right) {
                // Find the middle interval.
                const mid = left + Math.floor((right - left) / 2);

                // The required rank belongs to this interval or an earlier one.
                if (prefix[mid] >= currentRank) {
                    right = mid;
                } else {
                    // The required rank must belong to a later interval.
                    left = mid + 1;
                }
            }

            // left is now the interval containing currentRank.
            const index = left;

            // Count how many valid marks appear before the found interval.
            const marksBefore = index > 0 ? prefix[index - 1] : 0;

            // Calculate the zero-based position inside the current interval.
            const offset = currentRank - marksBefore - 1;

            // Move offset positions from the interval's starting mark.
            answer.push(l[index] + offset);
        }

        // Return all marks in the same order as the input rank queries.
        return answer;
    }
}
```

### Python3

```python
class Solution:

    def getMarks(self, l, r, rank):
        # Store the number of valid marks up to each interval.
        n = len(l)
        prefix = [0] * n

        # Build prefix sums of interval sizes.
        for i in range(n):
            # Calculate how many consecutive marks this interval contains.
            count = r[i] - l[i] + 1

            # Add the current interval size to all previous interval sizes.
            prefix[i] = count + (prefix[i - 1] if i > 0 else 0)

        # Store the mark corresponding to every requested rank.
        answer = []

        # Process every rank query independently.
        for current_rank in rank:
            # Start binary search over the prefix sum array.
            left = 0
            right = n - 1

            # Find the first index whose prefix value is at least current_rank.
            while left < right:
                # Find the middle interval.
                mid = left + (right - left) // 2

                # The required rank belongs to this interval or an earlier one.
                if prefix[mid] >= current_rank:
                    right = mid
                else:
                    # The required rank must belong to a later interval.
                    left = mid + 1

            # left is now the interval containing current_rank.
            index = left

            # Count how many valid marks appear before the found interval.
            marks_before = prefix[index - 1] if index > 0 else 0

            # Calculate the zero-based position inside the current interval.
            offset = current_rank - marks_before - 1

            # Move offset positions from the interval's starting mark.
            answer.append(l[index] + offset)

        # Return all marks in the same order as the input rank queries.
        return answer
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core logic is the same in C++, Java, JavaScript, and Python3. The main difference is how each language handles binary search and arrays.

### Step 1: Find the Size of Every Interval

For every interval `[l[i], r[i]]`, I calculate:

`r[i] - l[i] + 1`

The `+1` is important because both ends of the interval are included.

For example:

`[6, 9]`

contains:

`6, 7, 8, 9`

So its size is:

`9 - 6 + 1 = 4`

Without the `+1`, the interval size would be calculated incorrectly.

### Step 2: Build the Prefix Sum Array

I store cumulative interval sizes in a prefix sum array.

Suppose the intervals contain:

* `3` marks
* `4` marks
* `2` marks

The prefix sum becomes:

`[3, 7, 9]`

Each value represents the last rank covered by that interval.

So:

* Rank `3` is the last rank in the first interval.
* Rank `7` is the last rank in the second interval.
* Rank `9` is the last rank in the third interval.

This is why the prefix sum array is useful for locating a rank.

### Step 3: Use Binary Search for Every Rank Query

For a rank `k`, I need to find the first prefix value that is greater than or equal to `k`.

For example:

`prefix = [3, 7, 9]`

If `k = 5`, the first value greater than or equal to `5` is `7`.

So rank `5` belongs to the second interval.

The prefix array is sorted in increasing order, which allows binary search to find the interval in `O(log n)` time.

In C++, this can be done directly with `lower_bound`.

In Java, JavaScript, and Python3, I can implement the same lower-bound behavior manually using binary search.

### Step 4: Count Marks Before the Selected Interval

Once I find the interval index, I check how many valid marks appeared before it.

If the selected interval is not the first interval:

`marksBefore = prefix[index - 1]`

If it is the first interval:

`marksBefore = 0`

This tells me where the current interval starts in terms of ranks.

### Step 5: Find the Position Inside the Interval

Suppose the requested rank is `5` and there are already `3` marks before the selected interval.

Then the requested mark is the second mark inside the interval.

The zero-based offset is:

`5 - 3 - 1 = 1`

The extra `-1` converts the one-based rank position into a zero-based offset.

Without subtracting `1`, the result would move one position too far.

### Step 6: Calculate the Final Mark

If the interval starts at:

`l[index]`

and the offset is:

`offset`

then the answer is:

`l[index] + offset`

For example, if the interval is `[6, 9]` and the offset is `1`, the answer is:

`6 + 1 = 7`

This directly gives the mark for the requested rank.

### Language-specific Behavior

The algorithm remains the same in all four languages.

* **C++:** `lower_bound` can directly find the first prefix sum greater than or equal to the requested rank.
* **Java:** A manual binary search can find the required interval efficiently.
* **JavaScript:** A standard `while` loop with `left`, `right`, and `mid` performs the binary search.
* **Python3:** The same binary search logic works cleanly with Python lists.

The important logic is identical in every implementation: build prefix sums, binary search the correct interval, calculate the offset, and return the mark.

## Examples

### Example 1

**Input:**

```text
l = [1, 6, 14]
r = [3, 9, 15]
rank = [2, 5, 8]
```

**Expected Output:**

```text
[2, 7, 14]
```

**Trace:**

The valid marks are:

`[1, 2, 3, 6, 7, 8, 9, 14, 15]`

The interval sizes are:

`[3, 4, 2]`

The prefix sums are:

`[3, 7, 9]`

* Rank `2` belongs to the first interval, so the answer is `2`.
* Rank `5` belongs to the second interval. There are `3` marks before it, so its offset is `1`. The answer is `6 + 1 = 7`.
* Rank `8` belongs to the third interval. There are `7` marks before it, so its offset is `0`. The answer is `14`.

Final result:

`[2, 7, 14]`

### Example 2

**Input:**

```text
l = [5, 10]
r = [7, 12]
rank = [1, 4, 6]
```

**Expected Output:**

```text
[5, 10, 12]
```

**Trace:**

The valid marks are:

`[5, 6, 7, 10, 11, 12]`

The interval sizes are:

`[3, 3]`

The prefix sums are:

`[3, 6]`

* Rank `1` belongs to the first interval and gives `5`.
* Rank `4` belongs to the second interval and gives `10`.
* Rank `6` is the last mark in the second interval and gives `12`.

Final result:

`[5, 10, 12]`

### Example 3

**Input:**

```text
l = [10, 20, 30]
r = [12, 22, 35]
rank = [3, 4, 8, 11]
```

**Expected Output:**

```text
[12, 20, 31, 35]
```

**Trace:**

The intervals contain:

* `[10, 11, 12]`
* `[20, 21, 22]`
* `[30, 31, 32, 33, 34, 35]`

The interval sizes are:

`[3, 3, 6]`

The prefix sums are:

`[3, 6, 12]`

* Rank `3` gives `12`.
* Rank `4` is the first mark of the second interval, so it gives `20`.
* Rank `8` is inside the third interval and gives `31`.
* Rank `11` gives `35`.

## How to Use / Run Locally

Before running any version, copy the solution code into a file and add a small test driver if needed.

### C++

Create a file named `solution.cpp`.

Compile it using:

```bash
g++ -std=c++17 solution.cpp -o solution
```

Run it using:

```bash
./solution
```

On Windows:

```bash
solution.exe
```

### Java

Create a file named `Solution.java`.

Compile it using:

```bash
javac Solution.java
```

Run it using:

```bash
java Solution
```

Make sure Java is installed and available in your system path.

### JavaScript

Create a file named `solution.js`.

Run it using Node.js:

```bash
node solution.js
```

You can check whether Node.js is installed by running:

```bash
node --version
```

### Python3

Create a file named `solution.py`.

Run it using:

```bash
python3 solution.py
```

On some Windows systems, this command may work instead:

```bash
python solution.py
```

## Notes & Optimizations

The most important optimization is avoiding the creation of a complete array containing every valid mark.

For large intervals, the total number of marks can be much larger than the number of intervals. Generating every mark would use unnecessary memory and could make the solution slower.

Using prefix sums stores only one value per interval.

Binary search is also important because checking intervals one by one for every query would take up to `O(n × q)` time in the worst case.

The prefix sum values should use a sufficiently large integer type when interval sizes and cumulative counts can become large. In C++ and Java, using `long long` and `long` for cumulative calculations is a safer choice.

The first interval is an important edge case. Since no marks come before it, `marksBefore` must be `0`.

Another important case is when a rank is exactly equal to a prefix sum value. That rank belongs to the last mark of the corresponding interval. This is why I search for the first prefix value that is greater than or equal to the requested rank.

A linear search can still work for small inputs, but prefix sums with binary search provide the better scalable solution for this Marks from Ranks problem.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
